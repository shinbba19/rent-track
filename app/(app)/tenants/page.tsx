"use client";

import { useEffect, useState } from "react";
import { supabase, DbTenant, DbUnit, DbProperty } from "@/lib/supabase";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

function contractStatus(end: string): { label: string; color: string } {
  const endDate = new Date(end);
  const today   = new Date("2026-04-16");
  const diff    = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0)    return { label: "Expired",              color: "bg-red-50 text-red-600"    };
  if (diff <= 90)  return { label: `Expiring in ${diff}d`, color: "bg-yellow-50 text-yellow-600" };
  return               { label: "Active",               color: "bg-green-50 text-green-600" };
}

export default function TenantsPage() {
  const [tenants,    setTenants]    = useState<DbTenant[]>([]);
  const [units,      setUnits]      = useState<DbUnit[]>([]);
  const [properties, setProperties] = useState<DbProperty[]>([]);
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    async function load() {
      const [{ data: t }, { data: u }, { data: p }] = await Promise.all([
        supabase.from("tenants").select("*").order("id"),
        supabase.from("units").select("*"),
        supabase.from("properties").select("*"),
      ]);
      setTenants(t ?? []);
      setUnits(u ?? []);
      setProperties(p ?? []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tenants</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {loading ? "Loading…" : `${tenants.length} tenants`}
          </p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          + Add Tenant
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr className="text-xs text-slate-400 uppercase">
              <th className="text-left px-5 py-3">Name</th>
              <th className="text-left px-5 py-3">Phone</th>
              <th className="text-left px-5 py-3">Unit</th>
              <th className="text-left px-5 py-3">Property</th>
              <th className="text-left px-5 py-3">Contract Period</th>
              <th className="text-left px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr><td colSpan={6} className="px-5 py-8 text-center text-slate-400">Loading…</td></tr>
            ) : (
              tenants.map((tenant) => {
                const unit     = units.find((u) => u.id === tenant.unit_id);
                const property = unit ? properties.find((p) => p.id === unit.property_id) : undefined;
                const cs       = tenant.contract_end ? contractStatus(tenant.contract_end) : null;
                return (
                  <tr key={tenant.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-slate-800">{tenant.name}</td>
                    <td className="px-5 py-3 text-slate-500">{tenant.phone ?? "—"}</td>
                    <td className="px-5 py-3 text-slate-700">{unit?.unit_number ?? "—"}</td>
                    <td className="px-5 py-3 text-slate-500">{property?.name ?? "—"}</td>
                    <td className="px-5 py-3 text-slate-500 whitespace-nowrap">
                      {tenant.contract_start ? formatDate(tenant.contract_start) : "—"} –{" "}
                      {tenant.contract_end   ? formatDate(tenant.contract_end)   : "—"}
                    </td>
                    <td className="px-5 py-3">
                      {cs && (
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${cs.color}`}>
                          {cs.label}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
