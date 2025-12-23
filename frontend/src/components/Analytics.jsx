import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Analytics({ logs }) {
  // Count logs by level
  const levelCounts = logs.reduce((acc, log) => {
    acc[log.level] = (acc[log.level] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for chart
  const data = [
    { level: "Error", count: levelCounts.error || 0 },
    { level: "Warning", count: levelCounts.warn || 0 },
    { level: "Info", count: levelCounts.info || 0 },
    { level: "Debug", count: levelCounts.debug || 0 },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Log Analytics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="level" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-sm text-gray-600 mt-2">
        Total logs: {logs.length} | Showing counts by level for current filters
      </p>
    </div>
  );
}
