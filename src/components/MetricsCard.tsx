interface MetricsCardProps {
  label: string;
  value: string;
  unit?: string;
  icon?: React.ReactNode;
}

const MetricsCard = ({ label, value, unit, icon }: MetricsCardProps) => {
  return (
    <div className="metric-card rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform">
      {icon && <div className="text-accent">{icon}</div>}
      <div className="text-center">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-3xl font-bold font-mono neon-text">{value}</span>
          {unit && <span className="text-sm text-muted-foreground font-mono">{unit}</span>}
        </div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{label}</p>
      </div>
    </div>
  );
};

export default MetricsCard;
