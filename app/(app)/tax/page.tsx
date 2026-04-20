"use client";

import { useEffect, useState } from "react";
import KPICard from "@/components/KPICard";
import { supabase, DbBuildingTaxItem, DbLandTaxItem } from "@/lib/supabase";
import { formatCurrency } from "@/lib/mockData";

function PaidBadge({
  paid, hasTax, onToggle,
}: { paid: boolean; hasTax: boolean; onToggle: () => void }) {
  if (!hasTax) return <span className="text-slate-300 text-xs">—</span>;
  return (
    <button
      onClick={onToggle}
      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold transition-opacity hover:opacity-75 ${
        paid ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
      }`}
    >
      {paid ? "Paid" : "Unpaid"}
    </button>
  );
}

export default function TaxPage() {
  const [building, setBuilding] = useState<DbBuildingTaxItem[]>([]);
  const [land,     setLand]     = useState<DbLandTaxItem[]>([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    async function load() {
      const [{ data: b }, { data: l }] = await Promise.all([
        supabase.from("building_tax_items").select("*").order("province").order("property"),
        supabase.from("land_tax_items").select("*").order("province").order("property"),
      ]);
      setBuilding(b ?? []);
      setLand(l ?? []);
      setLoading(false);
    }
    load();
  }, []);

  async function toggleBuilding(id: number, current: boolean) {
    const next = !current;
    setBuilding((prev) => prev.map((r) => r.id === id ? { ...r, paid: next } : r));
    await supabase.from("building_tax_items").update({ paid: next }).eq("id", id);
  }

  async function toggleLand(id: number, current: boolean) {
    const next = !current;
    setLand((prev) => prev.map((r) => r.id === id ? { ...r, paid: next } : r));
    await supabase.from("land_tax_items").update({ paid: next }).eq("id", id);
  }

  const buildingTotal = building.reduce((s, r) => s + (r.tax_amount ?? 0), 0);
  const landTotal     = land.reduce((s, r) => s + (r.tax_amount_2569 ?? 0), 0);
  const unpaidCount   =
    building.filter((r) => !r.paid && r.tax_amount !== null && r.tax_amount > 0).length +
    land.filter((r) => !r.paid && r.tax_amount_2569 !== null && r.tax_amount_2569 > 0).length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Property Tax 2569</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Building/condo tax and land tax for fiscal year 2569 · click status to toggle
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KPICard title="Building Tax 2569" value={formatCurrency(Math.round(buildingTotal * 100) / 100)} subtitle={`${building.length} units`} />
        <KPICard title="Land Tax 2569"     value={formatCurrency(Math.round(landTotal * 100) / 100)}    subtitle={`${land.length} parcels`} />
        <KPICard title="Unpaid Items"       value={String(unpaidCount)} subtitle="with known tax amount" accent="red" />
      </div>

      {/* Building Tax */}
      <div>
        <h2 className="text-base font-semibold text-slate-800 mb-3">
          Building &amp; Condo Tax (ภาษีที่ดิน บ้านและคอนโด)
        </h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-xs text-slate-400 uppercase">
                <th className="text-left px-4 py-3">Province</th>
                <th className="text-left px-4 py-3">Property</th>
                <th className="text-left px-4 py-3">Unit</th>
                <th className="text-right px-4 py-3">sqm</th>
                <th className="text-right px-4 py-3">Assessment Value</th>
                <th className="text-right px-4 py-3">Tax Amount</th>
                <th className="text-left px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-400">Loading…</td></tr>
              ) : (
                building.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-slate-500">{r.province}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{r.property}</td>
                    <td className="px-4 py-3 text-slate-700">{r.unit}</td>
                    <td className="px-4 py-3 text-right text-slate-500">{r.sqm ?? "—"}</td>
                    <td className="px-4 py-3 text-right text-slate-700">
                      {r.assessment_value !== null ? formatCurrency(r.assessment_value) : "—"}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-slate-800">
                      {r.tax_amount !== null
                        ? `฿${r.tax_amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <PaidBadge
                        paid={r.paid}
                        hasTax={r.tax_amount !== null}
                        onToggle={() => toggleBuilding(r.id, r.paid)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          </div>
        </div>
      </div>

      {/* Land Tax */}
      <div>
        <h2 className="text-base font-semibold text-slate-800 mb-3">
          Land Tax (ภาษีที่ดิน)
        </h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-xs text-slate-400 uppercase">
                <th className="text-left px-4 py-3">Province</th>
                <th className="text-left px-4 py-3">Property</th>
                <th className="text-left px-4 py-3">Deed No.</th>
                <th className="text-left px-4 py-3">Size</th>
                <th className="text-right px-4 py-3">Assessment Value</th>
                <th className="text-right px-4 py-3">Tax Amount</th>
                <th className="text-left px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-400">Loading…</td></tr>
              ) : (
                land.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-slate-500">{r.province}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{r.property}</td>
                    <td className="px-4 py-3 text-slate-600">{r.deed}</td>
                    <td className="px-4 py-3 text-slate-500">{r.size}</td>
                    <td className="px-4 py-3 text-right text-slate-700">
                      {r.assessment_value_2569 !== null ? formatCurrency(r.assessment_value_2569) : "—"}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-slate-800">
                      {r.tax_amount_2569 !== null && r.tax_amount_2569 > 0
                        ? `฿${r.tax_amount_2569.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                        : r.tax_amount_2569 === 0 ? "฿0" : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <PaidBadge
                        paid={r.paid}
                        hasTax={r.tax_amount_2569 !== null && r.tax_amount_2569 > 0}
                        onToggle={() => toggleLand(r.id, r.paid)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
}
