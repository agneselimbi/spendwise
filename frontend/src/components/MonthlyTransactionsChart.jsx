import {
  BarChart,
  Bar,
  Legend,
  Tooltip,
  XAxis,
  ResponsiveContainer,
} from "recharts";

export default function MonthlyTransactionsBar({ dt }) {
  if (!Array.isArray(dt)) return <h2>No Monthly Transactions</h2>;
  return (
    <ResponsiveContainer width="80%" height="80%">
      <BarChart width={730} height={250} data={dt}>
        <XAxis dataKey="month" />
        <Bar dataKey="amount" fill="#8884d8" />
        <Legend verticalAlign="bottom" height={36} />
        <Tooltip />
      </BarChart>
    </ResponsiveContainer>
  );
}
