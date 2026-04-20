"use client";

import { useEffect, useState } from "react";
import KPICard from "@/components/KPICard";
import { supabase, DbPortfolioItem } from "@/lib/supabase";
import { formatCurrency } from "@/lib/mockData";

function yieldColor(pct: number): string {
  if (pct >= 7) return "text-green-700 bg-green-50";
  if (pct >= 5) return "text-amber-700 bg-amber-50";
  return "text-red-600 bg-red-50";
}

const statusBadge: Record<string, string> = {
  rented:  "text-green-700 bg-green-50",
  vacant:  "text-slate-600 bg-slate-100",
};

export default function ReturnsPage() {
  const [items,   setItems]   = useState<DbPortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("portfolio_items")
        .select("*")
        .neq("status", "sold");
      setItems(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const rentable        = items.filter((p) => p.purchase_price > 0 && p.rent_price !== null);
  const totalInvestment = items.reduce((s, p) => s + p.purchase_price, 0);
  const activeInvest    = rentable.reduce((s, p) => s + p.purchase_price, 0);
  const totalAnnualRent = rentable.reduce((s, p) => s + (p.rent_price! * 12), 0);
  const portfolioYield  = activeInvest > 0 ? (totalAnnualRent / activeInvest) * 100 : 0;

  const rows = [...items].sort((a, b) => {
    const order: Record<string, number> = { rented: 0, vacant: 1, sold: 2 };
    if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status];
    const yA = a.purchase_price > 0 && a.rent_price ? (a.rent_price * 12) / a.purchase_price : 0;
    const yB = b.purchase_price > 0 && b.rent_price ? (b.rent_price * 12) / b.purchase_price : 0;
    return yB - yA;
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Portfolio Returns</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Gross yield per unit — annual rent ÷ purchase price ·{" "}
          {loading ? "…" : `${items.length} properties (excl. sold)`}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Investment"    value={formatCurrency(totalInvestment)} subtitle={`${items.length} properties`} />
        <KPICard title="Yielding Investment" value={formatCurrency(activeInvest)}    subtitle={`${rentable.length} with known rent`} />
        <KPICard title="Annual Rent Income"  value={formatCurrency(totalAnnualRent)} subtitle={`${formatCurrency(Math.round(totalAnnualRent / 12))} / month`} accent="green" />
        <KPICard title="Portfolio Gross Yield" value={`${portfolioYield.toFixed(2)}%`} subtitle="on yielding properties" accent="green" />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-left text-xs text-slate-500 uppercase tracking-wide">
              <th className="px-4 py-3">Property</th>
              <th className="px-4 py-3">Unit</th>
              <th className="px-4 py-3">Province</th>
              <th className="px-4 py-3 text-right">sqm</th>
              <th className="px-4 py-3 text-right">Purchase Price</th>
              <th className="px-4 py-3 text-right">Monthly Rent</th>
              <th className="px-4 py-3 text-right">Annual Rent</th>
              <th className="px-4 py-3 text-right">Gross Yield</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={9} className="px-4 py-8 text-center text-slate-400">Loading…</td></tr>
            ) : (
              rows.map((p) => {
                const annualRent = p.rent_price ? p.rent_price * 12 : null;
                const grossYield = p.purchase_price > 0 && annualRent
                  ? (annualRent / p.purchase_price) * 100 : null;
                return (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-800">{p.name}</td>
                    <td className="px-4 py-3 text-slate-600">{p.unit}</td>
                    <td className="px-4 py-3 text-slate-500">{p.province}</td>
                    <td className="px-4 py-3 text-right text-slate-500">{p.sqm}</td>
                    <td className="px-4 py-3 text-right text-slate-700">
                      {p.purchase_price > 0 ? formatCurrency(p.purchase_price) : "—"}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-700">
                      {p.rent_price ? formatCurrency(p.rent_price) : "—"}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-700">
                      {annualRent ? formatCurrency(annualRent) : "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {grossYield !== null ? (
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${yieldColor(grossYield)}`}>
                          {grossYield.toFixed(2)}%
                        </span>
                      ) : <span className="text-slate-400 text-xs">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusBadge[p.status] ?? ""}`}>
                        {p.status}
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
