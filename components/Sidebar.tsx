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
    <aside className="w-14 md:w-60 min-h-screen bg-slate-900 text-slate-100 flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-2 md:px-6 py-5 border-b border-slate-700 flex items-center justify-center md:block">
        <span className="md:hidden text-white font-bold text-lg">R</span>
        <div className="hidden md:block">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-0.5">Rent Track</p>
          <h1 className="text-lg font-bold text-white">Owner Portal</h1>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-1 md:px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-center md:justify-start gap-3 px-2 md:px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-indigo-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
              title={item.label}
            >
              <span className="text-base">{item.icon}</span>
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-2 md:px-4 py-4 border-t border-slate-700">
        <div className="flex items-center justify-center md:justify-start gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
            {currentUser.name.charAt(0)}
          </div>
          <div className="hidden md:block min-w-0">
            <p className="text-sm font-medium text-white truncate">{currentUser.name}</p>
            <p className="text-xs text-slate-400 capitalize">{currentUser.role}</p>
          </div>
        </div>
        <Link
          href="/login"
          className="mt-3 hidden md:block text-center text-xs text-slate-400 hover:text-white transition-colors"
        >
          Sign out
        </Link>
      </div>
    </aside>
  );
}
