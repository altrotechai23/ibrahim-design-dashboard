interface Activity {
  id: string;
  title: string;
  date: string;
}

export interface RecentActivitiesProps {
  activities: Activity[];
}

export function RecentActivity({
  activities,
}: RecentActivitiesProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#09090b]/70 p-6">
      <h3 className="mb-6 text-lg font-semibold">
        Recent Activity
      </h3>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="border-b border-white/10 pb-4"
          >
            <p className="font-medium">
              {activity.title}
            </p>

            <p className="text-sm text-muted-foreground">
              {activity.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}