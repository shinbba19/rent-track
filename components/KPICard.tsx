interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  accent?: "default" | "green" | "yellow" | "red";
}

const accentMap = {
  default: "border-slate-200",
  green: "border-green-400",
  yellow: "border-yellow-400",
  red: "border-red-400",
};

const valueColorMap = {
  default: "text-slate-900",
  green: "text-green-600",
  yellow: "text-yellow-600",
  red: "text-red-600",
};

export default function KPICard({ title, value, subtitle, accent = "default" }: KPICardProps) {
  return (
    <div className={`bg-white rounded-xl border-l-4 ${accentMap[accent]} shadow-sm p-5`}>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{title}</p>
      <p className={`text-2xl font-bold ${valueColorMap[accent]}`}>{value}</p>
      {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
    </div>
  );
}
