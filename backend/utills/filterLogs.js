export default function filterLogs(logs, q) {
  return logs.filter(log => {

    if (q.level && log.level !== q.level) return false;

    if (
      q.message &&
      !log.message.toLowerCase().includes(q.message.toLowerCase())
    ) return false;

    if (q.resourceId && !log.resourceId.toLowerCase().includes(q.resourceId.toLowerCase())) return false;
    if (q.traceId && !log.traceId.toLowerCase().includes(q.traceId.toLowerCase())) return false;
    if (q.spanId && !log.spanId.toLowerCase().includes(q.spanId.toLowerCase())) return false;
    if (q.commit && !log.commit.toLowerCase().includes(q.commit.toLowerCase())) return false;

    if (q.timestamp_start && new Date(log.timestamp) < new Date(q.timestamp_start))
      return false;

    if (q.timestamp_end && new Date(log.timestamp) > new Date(q.timestamp_end))
      return false;

    return true;
  });
}
