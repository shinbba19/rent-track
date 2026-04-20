"use client";

import { useEffect, useState } from "react";
import { supabase, DbPayment } from "@/lib/supabase";
import { tenants, units, formatCurrency, getStatusColor, getStatusLabel } from "@/lib/mockData";

function generateMonths(): string[] {
  const end   = new Date("2026-12-01");
  const start = new Date("2025-11-01");
  const months: string[] = [];
  const cur = new Date(end);
  while (cur >= start) {
    const y = cur.getFullYear();
    const m = String(cur.getMonth() + 1).padStart(2, "0");
    months.push(`${y}-${m}`);
    cur.setMonth(cur.getMonth() - 1);
  }
  return months;
}

const MONTHS = generateMonths();

function computeStatus(amountPaid: number, amountDue: number, month: string): DbPayment["status"] {
  const [y, m] = month.split("-").map(Number);
  const dueDate = new Date(y, m - 1, 5);
  const today = new Date("2026-04-16");
  if (amountPaid >= amountDue) return today > dueDate ? "paid_late" : "paid";
  if (today > dueDate) return "late";
  return "pending";
}

let localIdCounter = 10000;
function tempId() { return `tmp_${localIdCounter++}`; }

export default function PaymentsPage() {
  const [selectedMonth, setSelectedMonth] = useState("2026-04");
  const [payments, setPayments] = useState<DbPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState("");
  const [editDate, setEditDate] = useState("");
  const [saving, setSaving] = useState(false);

  const [adding, setAdding] = useState(false);
  const [newTenantId, setNewTenantId] = useState("");
  const [newAmountDue, setNewAmountDue] = useState("");
  const [newAmountPaid, setNewAmountPaid] = useState("");
  const [newDate, setNewDate] = useState("");

  useEffect(() => {
    fetchPayments();
    setAdding(false);
    setEditingId(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth]);

  async function fetchPayments() {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .eq("month", selectedMonth)
      .order("tenant_id");
    if (error) { setError(error.message); setLoading(false); return; }
    setPayments(data ?? []);
    setLoading(false);
  }

  function startEdit(p: DbPayment) {
    setEditingId(p.id);
    setEditAmount(String(p.amount_paid));
    setEditDate(p.payment_date ?? "");
  }

  async function saveEdit(id: string, amountDue: number) {
    setSaving(true);
    const amountPaid = parseFloat(editAmount) || 0;
    const paymentDate = editDate || null;
    const status = computeStatus(amountPaid, amountDue, selectedMonth);

    const { error } = await supabase
      .from("payments")
      .update({ amount_paid: amountPaid, payment_date: paymentDate, status })
      .eq("id", id);

    if (error) { alert("Save failed: " + error.message); setSaving(false); return; }

    setPayments((prev) =>
      prev.map((p) => p.id === id ? { ...p, amount_paid: amountPaid, payment_date: paymentDate, status } : p)
    );
    setEditingId(null);
    setSaving(false);
  }

  function handleTenantSelect(tenantId: string) {
    setNewTenantId(tenantId);
    if (tenantId) {
      const tenant = tenants.find((t) => t.id === tenantId);
      const unit = tenant ? units.find((u) => u.id === tenant.unitId) : undefined;
      setNewAmountDue(String(unit?.rentPrice ?? ""));
    } else {
      setNewAmountDue("");
    }
  }

  async function saveNew() {
    if (!newTenantId) return;
    setSaving(true);
    const amountDue = parseFloat(newAmountDue) || 0;
    const amountPaid = parseFloat(newAmountPaid) || 0;
    const paymentDate = newDate || null;
    const status = computeStatus(amountPaid, amountDue, selectedMonth);

    const { data, error } = await supabase
      .from("payments")
      .insert({
        id: tempId(),
        tenant_id: newTenantId,
        month: selectedMonth,
        amount_due: amountDue,
        amount_paid: amountPaid,
        payment_date: paymentDate,
        status,
      })
      .select()
      .single();

    if (error) { alert("Add failed: " + error.message); setSaving(false); return; }

    setPayments((prev) => [...prev, data]);
    setAdding(false);
    setNewTenantId("");
    setNewAmountDue("");
    setNewAmountPaid("");
    setNewDate("");
    setSaving(false);
  }

  const existingTenantIds = new Set(payments.map((p) => p.tenant_id));
  const availableTenants = tenants.filter((t) => !existingTenantIds.has(t.id));

  const totalDue = payments.reduce((s, p) => s + p.amount_due, 0);
  const totalPaid = payments.reduce((s, p) => s + p.amount_paid, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payments</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manual payment tracking</p>
        </div>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white shadow-sm"
        >
          {MONTHS.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Due",   value: formatCurrency(totalDue),            color: "text-slate-900" },
          { label: "Collected",   value: formatCurrency(totalPaid),           color: "text-green-600" },
          { label: "Outstanding", value: formatCurrency(totalDue - totalPaid),color: "text-red-600"   },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-xl shadow-sm p-4 text-center">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{item.label}</p>
            <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr className="text-xs text-slate-400 uppercase">
              <th className="text-left px-5 py-3">Tenant</th>
              <th className="text-left px-5 py-3">Unit</th>
              <th className="text-right px-5 py-3">Amount Due</th>
              <th className="text-right px-5 py-3">Amount Paid</th>
              <th className="text-left px-5 py-3">Payment Date</th>
              <th className="text-left px-5 py-3">Status</th>
              <th className="text-left px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-slate-400 text-sm">
                  Loading…
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-red-500 text-sm">
                  {error}
                </td>
              </tr>
            ) : (
              payments.map((p) => {
                const tenant = tenants.find((t) => t.id === p.tenant_id);
                const unit = tenant ? units.find((u) => u.id === tenant.unitId) : undefined;
                const isEditing = editingId === p.id;

                return (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-slate-800">{tenant?.name ?? "—"}</td>
                    <td className="px-5 py-3 text-slate-500">{unit?.unitNumber ?? "—"}</td>
                    <td className="px-5 py-3 text-right text-slate-700">{formatCurrency(p.amount_due)}</td>
                    <td className="px-5 py-3 text-right">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editAmount}
                          onChange={(e) => setEditAmount(e.target.value)}
                          className="w-28 border border-indigo-300 rounded px-2 py-1 text-right text-sm"
                        />
                      ) : (
                        <span className="font-medium text-slate-700">{formatCurrency(p.amount_paid)}</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-slate-500">
                      {isEditing ? (
                        <input
                          type="date"
                          value={editDate}
                          onChange={(e) => setEditDate(e.target.value)}
                          className="border border-indigo-300 rounded px-2 py-1 text-sm"
                        />
                      ) : (
                        p.payment_date ?? "—"
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(p.status)}`}>
                        {getStatusLabel(p.status)}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      {isEditing ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveEdit(p.id, p.amount_due)}
                            disabled={saving}
                            className="text-xs bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-3 py-1 rounded-md transition-colors"
                          >
                            {saving ? "…" : "Save"}
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-xs text-slate-500 hover:text-slate-700 px-2 py-1"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(p)}
                          className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          Update
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}

            {/* Add new row */}
            {adding && (
              <tr className="bg-indigo-50">
                <td className="px-5 py-3" colSpan={2}>
                  <select
                    value={newTenantId}
                    onChange={(e) => handleTenantSelect(e.target.value)}
                    className="w-full border border-indigo-300 rounded px-2 py-1 text-sm bg-white"
                  >
                    <option value="">Select tenant…</option>
                    {availableTenants.map((t) => {
                      const u = units.find((u) => u.id === t.unitId);
                      return (
                        <option key={t.id} value={t.id}>
                          {t.name} ({u?.unitNumber ?? t.unitId})
                        </option>
                      );
                    })}
                  </select>
                </td>
                <td className="px-5 py-3 text-right">
                  <input
                    type="number"
                    placeholder="Due"
                    value={newAmountDue}
                    onChange={(e) => setNewAmountDue(e.target.value)}
                    className="w-28 border border-indigo-300 rounded px-2 py-1 text-right text-sm"
                  />
                </td>
                <td className="px-5 py-3 text-right">
                  <input
                    type="number"
                    placeholder="Paid"
                    value={newAmountPaid}
                    onChange={(e) => setNewAmountPaid(e.target.value)}
                    className="w-28 border border-indigo-300 rounded px-2 py-1 text-right text-sm"
                  />
                </td>
                <td className="px-5 py-3">
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="border border-indigo-300 rounded px-2 py-1 text-sm"
                  />
                </td>
                <td className="px-5 py-3" />
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={saveNew}
                      disabled={!newTenantId || saving}
                      className="text-xs bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white px-3 py-1 rounded-md transition-colors"
                    >
                      {saving ? "…" : "Add"}
                    </button>
                    <button
                      onClick={() => setAdding(false)}
                      className="text-xs text-slate-500 hover:text-slate-700 px-2 py-1"
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>

        {!loading && !adding && availableTenants.length > 0 && (
          <div className="px-5 py-3 border-t border-slate-100">
            <button
              onClick={() => setAdding(true)}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              + Add payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
