const styles = {
  error: "border-red-500 bg-red-50",
  warn: "border-yellow-500 bg-yellow-50",
  info: "border-blue-500 bg-blue-50",
  debug: "border-gray-400 bg-gray-50",
};

export default function LogCard({ log }) {
  return (
    <div className={`border-l-4 p-4 rounded ${styles[log.level]}`}>
      <div className="flex justify-between items-center">
        <span className="uppercase font-semibold text-sm">{log.level}</span>
        <span className="text-xs text-gray-500">{log.timestamp}</span>
      </div>
      <p className="mt-2 text-gray-800">{log.message}</p>
      <div className="mt-2 text-xs text-gray-600 space-x-3">
        <span>Resource Id: {log.resourceId}</span>
        <span>Trace Id: {log.traceId}</span>
        <span>Span Id: {log.spanId}</span>
        <span>Commit: {log.commit}</span>
      </div>
      {log.metadata && Object.keys(log.metadata).length > 0 && (
        <div className="mt-2 text-xs text-gray-500">
          Metadata: {JSON.stringify(log.metadata)}
        </div>
      )}
    </div>
  );
}