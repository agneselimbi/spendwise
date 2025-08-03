import {
  BarChart,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
  LabelList,
  ResponsiveContainer,
} from "recharts";

export default function BudgetProgressBar({ data }) {
  console.log(data);
  const barHeight = 8;
  if (!Array.isArray(data)) return <h2>No Budget Progress</h2>;

  const rows = data.map((b) => ({
    ...b,
    remaining: Math.max(0, b.limit - b.spent),
    perc_spent: b.spent / b.limit,
  }));

  console.log("rows", rows);
  return (
    <ResponsiveContainer width="60%" height={data.length * 48}>
      <BarChart
        width={500}
        height={data.length * (barHeight + 8)}
        data={rows}
        layout="vertical"
        margin={{ top: 8, right: 60, left: 60, bottom: 8 }}
      >
        <XAxis type="number" hide domain={[0, "dataMax"]} />
        <YAxis
          dataKey="category"
          type="category"
          padding={{ top: 20, bottom: 20 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip formatter={(v) => `$${v}`}></Tooltip>

        <Bar dataKey="spent" stackId="a" fill="#4F46E5"></Bar>
        <Bar dataKey="remaining" stackId="a" fill="#82ca9d">
          <LabelList
            dataKey="perc_spent"
            position="right"
            formatter={(v) => `${v.toFixed(2) * 100}%`}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
