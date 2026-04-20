"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { currentUser } from "@/lib/mockData";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "▦" },
  { href: "/properties", label: "Properties", icon: "🏢" },
  { href: "/units", label: "Units", icon: "🚪" },
  { href: "/tenants", label: "Tenants", icon: "👤" },
  { href: "/payments", label: "Payments", icon: "💳" },
  { href: "/returns", label: "Returns", icon: "📈" },
  { href: "/tax",     label: "Tax",     icon: "🧾" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-700">
        <p className="text-xs text-slate-400 uppercase tracking-widest mb-0.5">Rent Track</p>
        <h1 className="text-lg font-bold text-white">Owner Portal</h1>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-indigo-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-bold">
            {currentUser.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">{currentUser.name}</p>
            <p className="text-xs text-slate-400 capitalize">{currentUser.role}</p>
          </div>
        </div>
        <Link
          href="/login"
          className="mt-3 block text-center text-xs text-slate-400 hover:text-white transition-colors"
        >
          Sign out
        </Link>
      </div>
    </aside>
  );
}
