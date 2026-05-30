import { getAuditLogs } from "@/actions/logs/get-audit-logs";

import { AuditLogsTable }
from "@/components/logs/audit-logs-table";

export default async function LogsPage() {
  const logs =
    await getAuditLogs();

  return (
    <div className="space-y-8">
      <div>
        <h1
          className="text-3xl font-semibold"
        >
          Audit Logs
        </h1>

        <p
          className="
            mt-2 text-muted-foreground
          "
        >
          View all system activity.
        </p>
      </div>

      <AuditLogsTable data={logs} />
    </div>
  );
}