import { PieChart, Pie, LineChart, Cell, Tooltip, Legend } from "recharts";

export default function TransactionPieChart({ dt, dtKey, nKey }) {
  const COLORS = [
    "#4f46e5",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
    "#22d3ee",
  ];

  return (
    <PieChart width={500} height={420}>
      <Pie
        data={dt}
        dataKey={dtKey}
        nameKey={nKey}
        innerRadius={60}
        outerRadius={100}
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
      >
        {dt.map((_, idx) => (
          <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(val) => `$${val.toFixed(2)}`} />
      <Legend verticalAlign="bottom" height={36} />
    </PieChart>
  );
}
