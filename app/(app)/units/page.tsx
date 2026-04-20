"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase, DbPortfolioItem, DbUnit, DbTenant } from "@/lib/supabase";
import { formatCurrency } from "@/lib/mockData";

const nameToPropertyId: Record<string, string> = {
  "Ideo":            "ideo",
  "Life":            "life",
  "KNB":             "knb",
  "Andromedra":      "ando",
  "Origin":          "origin",
  "Silom Terrace":   "silom",
  "Diamond":         "diamond",
  "I-House RCA":     "ihouse",
  "Lumphini Ville":  "lumphini",
  "ภัทร ศรีพัฒน์":  "phattara",
  "ทิวเขา":          "tiwkao",
};

function UnitsContent() {
  const searchParams = useSearchParams();
  const [filterProperty, setFilterProperty] = useState(searchParams.get("property") ?? "all");
  const [portfolio, setPortfolio] = useState<DbPortfolioItem[]>([]);
  const [units,     setUnits]     = useState<DbUnit[]>([]);
  const [tenants,   setTenants]   = useState<DbTenant[]>([]);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    async function load() {
      const [{ data: p }, { data: u }, { data: t }] = await Promise.all([
        supabase.from("portfolio_items").select("*").neq("status", "sold").order("province").order("name"),
        supabase.from("units").select("*"),
        supabase.from("tenants").select("*"),
      ]);
      setPortfolio(p ?? []);
      setUnits(u ?? []);
      setTenants(t ?? []);
      setLoading(false);
    }
    load();
  }, []);

  function getTenant(name: string, unitNumber: string) {
    const propId = nameToPropertyId[name];
    if (!propId) return null;
    const unit = units.find((u) => u.property_id === propId && u.unit_number === unitNumber);
    if (!unit) return null;
    return tenants.find((t) => t.unit_id === unit.id) ?? null;
  }

  const propertyNames = [...new Set(portfolio.map((p) => p.name))].sort();
  const filtered = filterProperty === "all"
    ? portfolio
    : portfolio.filter((p) => p.name === filterProperty);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Units</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {loading ? "Loading…" : `${filtered.length} units`}
          </p>
        </div>
        <div className="flex gap-3">
          <select
            value={filterProperty}
            onChange={(e) => setFilterProperty(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white shadow-sm"
          >
            <option value="all">All Properties</option>
            {propertyNames.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            + Add Unit
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr className="text-xs text-slate-400 uppercase">
              <th className="text-left px-5 py-3">Unit No.</th>
              <th className="text-left px-5 py-3">Property</th>
              <th className="text-left px-5 py-3">Province</th>
              <th className="text-right px-5 py-3">Rent Price</th>
              <th className="text-left px-5 py-3">Tenant</th>
              <th className="text-left px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr><td colSpan={6} className="px-5 py-8 text-center text-slate-400">Loading…</td></tr>
            ) : (
              filtered.map((p) => {
                const tenant   = getTenant(p.name, p.unit);
                const occupied = !!tenant;
                return (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 font-semibold text-slate-800">{p.unit}</td>
                    <td className="px-5 py-3 text-slate-700">{p.name}</td>
                    <td className="px-5 py-3 text-slate-500">{p.province}</td>
                    <td className="px-5 py-3 text-right font-medium text-slate-700">
                      {p.rent_price ? formatCurrency(p.rent_price) : "—"}
                    </td>
                    <td className="px-5 py-3 text-slate-700">{tenant?.name ?? "—"}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                        occupied ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-500"
                      }`}>
                        {occupied ? "Occupied" : "Vacant"}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function UnitsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-slate-400">Loading…</div>}>
      <UnitsContent />
    </Suspense>
  );
}
