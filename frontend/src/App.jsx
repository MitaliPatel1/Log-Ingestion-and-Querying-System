import { useEffect, useState, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import { fetchLogs } from "./services/api";
import Header from "./components/Header";
import Analytics from "./components/Analytics";
import FilterBar from "./components/FilterBar";
import LogList from "./components/LogList";

const SOCKET_URL = "http://localhost:5000";

export default function App() {
  const [filters, setFilters] = useState({});
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);

  const socketRef = useRef(null);
  const filtersRef = useRef(filters);

  // Keep latest filters in ref (prevents stale values)
  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  const loadLogs = useCallback(() => {
    setError(null);
    fetchLogs(filtersRef.current)
      .then((data) => setLogs(data))
      .catch((err) => {
        console.error("Failed to fetch logs:", err);
        setError(err.response?.data?.error || "Failed to load logs");
      });
  }, []);

  // Load logs when filters change (USER action)
  useEffect(() => {
    loadLogs();
  }, [filters, loadLogs]);

  // Socket connection (ONLY once)
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL);
    }

    const socket = socketRef.current;

    const handleUpdate = () => {
      loadLogs(); // single controlled call
    };

    socket.on("newLog", handleUpdate);
    socket.on("logsUpdated", handleUpdate);

    return () => {
      socket.off("newLog", handleUpdate);
      socket.off("logsUpdated", handleUpdate);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [loadLogs]);

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
