import type { VehicleReminder } from "@/features/vehicles/types";

type ReminderPreviewCardProps = {
  reminder: VehicleReminder;
};

function getStatusClasses(status: VehicleReminder["status"]) {
  if (status === "Overdue") {
    return "bg-red-50 text-red-700 border-red-200";
  }

  if (status === "Completed") {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }

  return "bg-amber-50 text-amber-700 border-amber-200";
}

function formatDate(input: string) {
  const date = new Date(input);

  if (Number.isNaN(date.getTime())) {
    return input;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function ReminderPreviewCard({ reminder }: ReminderPreviewCardProps) {
  return (
    <div className="rounded-[18px] border border-[#e5e7eb] bg-white p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-sm font-extrabold text-[#111827]">{reminder.title}</div>
          <div className="mt-1 text-xs text-[#6b7280]">Due: {formatDate(reminder.dueDate)}</div>
        </div>

        <div
          className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-bold ${getStatusClasses(
            reminder.status
          )}`}
        >
          {reminder.status}
        </div>
      </div>
    </div>
  );
}