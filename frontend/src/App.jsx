import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { fetchLogs } from "./services/api";
import Header from "./components/Header";
import Analytics from "./components/Analytics";
import FilterBar from "./components/FilterBar";
import LogList from "./components/LogList";

export default function App() {
  const [filters, setFilters] = useState({});
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);

  const loadLogs = () => {
    setError(null);
    fetchLogs(filters)
      .then((data) => {
        setLogs(data);
      })
      .catch((err) => {
        console.error("Failed to fetch logs:", err);
        setError(err.response?.data?.error || "Failed to load logs");
      });
  };

  useEffect(() => {
    loadLogs();
  }, [filters]);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("newLog", () => {
      // Refetch logs to apply current filters
      loadLogs();
    });
    socket.on("logsUpdated", () => {
      // Refetch logs when file is edited directly
      loadLogs();
    });

    return () => {
      socket.off("newLog");
      socket.off("logsUpdated");
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-6 mt-4">
          <strong>Error:</strong> {error}
          <button
            onClick={() => setError(null)}
            className="float-right text-red-700 hover:text-red-900"
          >
            ×
          </button>
        </div>
      )}
      <main className="max-w-7xl mx-auto p-6">
        <Analytics logs={logs} />
        <FilterBar filters={filters} setFilters={setFilters} />
        <LogList logs={logs} />
      </main>
    </div>
  );
}
