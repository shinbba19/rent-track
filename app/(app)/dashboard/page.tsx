"use client";

import { useEffect, useState } from "react";
import KPICard from "@/components/KPICard";
import { supabase, DbPayment, DbTenant, DbUnit, DbProperty } from "@/lib/supabase";
import { formatCurrency, getStatusColor, getStatusLabel } from "@/lib/mockData";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const CURRENT_MONTH  = "2026-04";
const CHART_MONTHS   = ["2025-11","2025-12","2026-01","2026-02","2026-03","2026-04"];
const MONTH_LABELS: Record<string, string> = {
  "2025-11": "Nov 25", "2025-12": "Dec 25",
  "2026-01": "Jan 26", "2026-02": "Feb 26",
  "2026-03": "Mar 26", "2026-04": "Apr 26",
};

export default function DashboardPage() {
  const [filterProperty, setFilterProperty] = useState("all");
  const [payments,   setPayments]   = useState<DbPayment[]>([]);
  const [tenants,    setTenants]    = useState<DbTenant[]>([]);
  const [units,      setUnits]      = useState<DbUnit[]>([]);
  const [properties, setProperties] = useState<DbProperty[]>([]);
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    async function load() {
      const [{ data: pay }, { data: ten }, { data: uni }, { data: pro }] = await Promise.all([
        supabase.from("payments").select("*"),
        supabase.from("tenants").select("*"),
        supabase.from("units").select("*"),
        supabase.from("properties").select("*"),
      ]);
      setPayments(pay ?? []);
      setTenants(ten ?? []);
      setUnits(uni ?? []);
      setProperties(pro ?? []);
      setLoading(false);
    }
    load();
  }, []);

  function getUnitForTenant(tenantId: string) {
    const tenant = tenants.find((t) => t.id === tenantId);
    if (!tenant) return undefined;
    return units.find((u) => u.id === tenant.unit_id);
  }

  // Filter payments for current month
  const monthPayments = payments.filter((p) => p.month === CURRENT_MONTH);
  const filteredPayments = filterProperty === "all"
    ? monthPayments
    : monthPayments.filter((p) => {
        const unit = getUnitForTenant(p.tenant_id);
        return unit?.property_id === filterProperty;
      });

  const totalExpected  = filteredPayments.reduce((s, p) => s + p.amount_due, 0);
  const totalCollected = filteredPayments.reduce((s, p) => s + p.amount_paid, 0);
  const outstanding    = totalExpected - totalCollected;
  const lateCount      = filteredPayments.filter((p) => p.amount_paid < p.amount_due).length;
  const latePercent    = filteredPayments.length
    ? Math.round((lateCount / filteredPayments.length) * 100) : 0;

  // FY 2026 (Jan–Apr)
  const fy2026 = filterProperty === "all"
    ? payments.filter((p) => p.month.startsWith("2026-"))
    : payments.filter((p) => {
        if (!p.month.startsWith("2026-")) return false;
        const unit = getUnitForTenant(p.tenant_id);
        return unit?.property_id === filterProperty;
      });
  const fyExpected    = fy2026.reduce((s, p) => s + p.amount_due, 0);
  const fyCollected   = fy2026.reduce((s, p) => s + p.amount_paid, 0);
  const fyOutstanding = fyExpected - fyCollected;

  // Chart data derived from payments
  const chartData = CHART_MONTHS.map((month) => ({
    month: MONTH_LABELS[month],
    expected:  payments.filter((p) => p.month === month).reduce((s, p) => s + p.amount_due, 0),
    collected: payments.filter((p) => p.month === month).reduce((s, p) => s + p.amount_paid, 0),
  }));

  const latePayments = filteredPayments.filter((p) => p.amount_paid < p.amount_due);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">April 2026</p>
        </div>
        <select
          value={filterProperty}
          onChange={(e) => setFilterProperty(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white shadow-sm"
        >
          <option value="all">All Properties</option>
          {properties.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Expected"  value={formatCurrency(totalExpected)}  subtitle="This month" />
        <KPICard title="Total Collected" value={formatCurrency(totalCollected)} subtitle={`${Math.round((totalCollected / totalExpected) * 100) || 0}% of expected`} accent="green" />
        <KPICard title="Outstanding"     value={formatCurrency(outstanding)}    subtitle="Not yet collected" accent="yellow" />
        <KPICard title="Late Units"      value={`${lateCount} unit${lateCount !== 1 ? "s" : ""}`} subtitle={`${latePercent}% late rate`} accent="red" />
      </div>

      {/* FY 2026 */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-slate-600 mb-4">
          FY 2026 Year-to-Date
          <span className="ml-2 text-xs font-normal text-slate-400">Jan – Apr 2026</span>
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Expected</p>
            <p className="text-xl font-bold text-slate-800">{formatCurrency(fyExpected)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Collected</p>
            <p className="text-xl font-bold text-indigo-600">{formatCurrency(fyCollected)}</p>
            <p className="text-xs text-slate-400 mt-0.5">
              {fyExpected ? Math.round((fyCollected / fyExpected) * 100) : 0}% of expected
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Outstanding</p>
            <p className="text-xl font-bold text-red-500">{formatCurrency(fyOutstanding)}</p>
          </div>
        </div>
      </div>

      {/* Chart + Late Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Monthly Income Trend</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} barSize={28}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `฿${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
              <Legend />
              <Bar dataKey="expected"  fill="#e2e8f0" name="Expected"  radius={[4,4,0,0]} />
              <Bar dataKey="collected" fill="#6366f1" name="Collected" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Late Payments</h2>
          {loading ? (
            <p className="text-sm text-slate-400 py-8 text-center">Loading…</p>
          ) : latePayments.length === 0 ? (
            <p className="text-sm text-slate-400 py-8 text-center">No late payments this month 🎉</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-400 uppercase border-b border-slate-100">
                  <th className="text-left pb-2 pr-3">Tenant</th>
                  <th className="text-left pb-2 pr-3">Unit</th>
                  <th className="text-right pb-2">Amount Due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {latePayments.map((p) => {
                  const tenant = tenants.find((t) => t.id === p.tenant_id);
                  const unit   = tenant ? units.find((u) => u.id === tenant.unit_id) : undefined;
                  const prop   = unit ? properties.find((pr) => pr.id === unit.property_id) : undefined;
                  return (
                    <tr key={p.id}>
                      <td className="py-2.5 pr-3 font-medium text-slate-700">{tenant?.name}</td>
                      <td className="py-2.5 pr-3 text-slate-500">{unit?.unit_number} · {prop?.name}</td>
                      <td className="py-2.5 text-right text-red-600 font-semibold">{formatCurrency(p.amount_due)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Unit breakdown */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Unit-Level Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-400 uppercase border-b border-slate-100">
                <th className="text-left pb-2 pr-4">Unit</th>
                <th className="text-left pb-2 pr-4">Property</th>
                <th className="text-left pb-2 pr-4">Tenant</th>
                <th className="text-right pb-2 pr-4">Due</th>
                <th className="text-right pb-2 pr-4">Paid</th>
                <th className="text-left pb-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPayments.map((p) => {
                const tenant = tenants.find((t) => t.id === p.tenant_id);
                const unit   = tenant ? units.find((u) => u.id === tenant.unit_id) : undefined;
                const prop   = unit ? properties.find((pr) => pr.id === unit.property_id) : undefined;
                return (
                  <tr key={p.id}>
                    <td className="py-2.5 pr-4 font-medium text-slate-700">{unit?.unit_number ?? "—"}</td>
                    <td className="py-2.5 pr-4 text-slate-500">{prop?.name ?? "—"}</td>
                    <td className="py-2.5 pr-4 text-slate-700">{tenant?.name ?? "Vacant"}</td>
                    <td className="py-2.5 pr-4 text-right text-slate-700">{formatCurrency(p.amount_due)}</td>
                    <td className="py-2.5 pr-4 text-right text-slate-700">{formatCurrency(p.amount_paid)}</td>
                    <td className="py-2.5">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(p.status)}`}>
                        {getStatusLabel(p.status)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
