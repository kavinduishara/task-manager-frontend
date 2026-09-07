interface MetricCardProps {
  title: string;
  value: string;
  subtext: string;
  badge?: string;
  icon: React.ReactNode;
}

export const MetricCard = ({ title, value, subtext, badge, icon }: MetricCardProps) => (
  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{title}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <span className="text-xs text-gray-500">{subtext}</span>
      </div>
      {badge && <p className="text-xs text-indigo-600 font-medium mt-1">{badge}</p>}
    </div>
    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl text-lg">{icon}</div>
  </div>
);