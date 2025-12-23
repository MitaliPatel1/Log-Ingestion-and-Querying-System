export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Log Ingestion & Querying System</h1>
        <span className="text-sm text-gray-500">Developer Monitoring Tool</span>
      </div>
    </header>
  );
}
