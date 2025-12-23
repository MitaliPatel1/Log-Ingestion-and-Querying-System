import LogCard from "./LogCard";

export default function LogList({ logs }) {
  if (!logs.length) {
    return (
      <div className="text-center text-gray-500 py-10">
        No logs found for selected filters
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {logs.map((log, i) => (
        <LogCard key={i} log={log} />
      ))}
    </div>
  );
}
