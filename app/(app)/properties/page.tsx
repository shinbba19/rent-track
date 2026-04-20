"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

export default function PropertiesPage() {
  const [portfolio, setPortfolio] = useState<DbPortfolioItem[]>([]);
  const [units,     setUnits]     = useState<DbUnit[]>([]);
  const [tenants,   setTenants]   = useState<DbTenant[]>([]);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    async function load() {
      const [{ data: p }, { data: u }, { data: t }] = await Promise.all([
        supabase.from("portfolio_items").select("*").neq("status", "sold"),
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

  // Group by property name
  const groupMap = new Map<string, DbPortfolioItem[]>();
  for (const p of portfolio) {
    if (!groupMap.has(p.name)) groupMap.set(p.name, []);
    groupMap.get(p.name)!.push(p);
  }
  const groups = [...groupMap.entries()].map(([name, items]) => {
    const occupied  = items.filter((p) => !!getTenant(p.name, p.unit)).length;
    const totalRent = items.reduce((s, p) => s + (p.rent_price ?? 0), 0);
    return { name, province: items[0].province, items, occupied, totalRent };
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Properties</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {loading ? "Loading…" : `${groups.length} properties · ${portfolio.length} units`}
          </p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          + Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {loading ? (
          <p className="text-slate-400 text-sm">Loading…</p>
        ) : (
          groups.map(({ name, province, items, occupied, totalRent }) => (
            <div key={name} className="bg-white rounded-xl shadow-sm p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-semibold text-slate-900 text-base">{name}</h2>
                  <p className="text-sm text-slate-400 mt-0.5">📍 {province}</p>
                </div>
                <span className="text-xs bg-indigo-50 text-indigo-600 font-semibold px-2 py-1 rounded-full">
                  {items.length} unit{items.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-slate-900">{items.length}</p>
                  <p className="text-xs text-slate-400">Total Units</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-green-600">{occupied}</p>
                  <p className="text-xs text-slate-400">Occupied</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-slate-900">{formatCurrency(totalRent)}</p>
                  <p className="text-xs text-slate-400">Total Rent</p>
                </div>
              </div>
              <Link
                href={`/units?property=${encodeURIComponent(name)}`}
                className="block text-center text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                View units →
              </Link>
            </div>
          ))
        )}
      </div>

      {/* Summary table */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">All Properties</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-400 uppercase border-b border-slate-100">
                <th className="text-left pb-2 pr-4">Name</th>
                <th className="text-left pb-2 pr-4">Province</th>
                <th className="text-right pb-2 pr-4">Units</th>
                <th className="text-right pb-2 pr-4">Occupied</th>
                <th className="text-right pb-2">Total Rent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {groups.map(({ name, province, items, occupied, totalRent }) => (
                <tr key={name}>
                  <td className="py-2.5 pr-4 font-medium text-slate-700">{name}</td>
                  <td className="py-2.5 pr-4 text-slate-500">{province}</td>
                  <td className="py-2.5 pr-4 text-right text-slate-700">{items.length}</td>
                  <td className="py-2.5 pr-4 text-right text-slate-700">{occupied}</td>
                  <td className="py-2.5 text-right font-semibold text-slate-900">{formatCurrency(totalRent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
