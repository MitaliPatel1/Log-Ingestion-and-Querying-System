import { useState, useEffect } from "react";

export default function FilterBar({ filters, setFilters }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const onChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({ ...localFilters, [name]: value });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters(localFilters);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [localFilters, setFilters]);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <input
          name="message"
          placeholder="Search message…"
          value={localFilters.message || ""}
          onChange={onChange}
          className="border rounded px-3 py-2 focus:ring w-full"
        />
        <select
          name="level"
          value={localFilters.level || ""}
          onChange={onChange}
          className="border rounded px-3 py-2"
        >
          <option value="">All Levels</option>
          <option value="error">Error</option>
          <option value="warn">Warning</option>
          <option value="info">Info</option>
          <option value="debug">Debug</option>
        </select>
        <input
          name="resourceId"
          placeholder="Resource ID"
          value={localFilters.resourceId || ""}
          onChange={onChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="datetime-local"
          name="timestamp_start"
          value={localFilters.timestamp_start || ""}
          onChange={onChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="datetime-local"
          name="timestamp_end"
          value={localFilters.timestamp_end || ""}
          onChange={onChange}
          className="border rounded px-3 py-2"
        />
        <input
          name="traceId"
          placeholder="Trace ID"
          value={localFilters.traceId || ""}
          onChange={onChange}
          className="border rounded px-3 py-2"
        />
        <input
          name="spanId"
          placeholder="Span ID"
          value={localFilters.spanId || ""}
          onChange={onChange}
          className="border rounded px-3 py-2"
        />
        <input
          name="commit"
          placeholder="Commit Hash"
          value={localFilters.commit || ""}
          onChange={onChange}
          className="border rounded px-3 py-2"
        />
        <button
          onClick={() => setFilters({})}
          className="bg-gray-100 hover:bg-gray-200 rounded px-3 py-2 text-sm"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
