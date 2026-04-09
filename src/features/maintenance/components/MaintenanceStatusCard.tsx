import { AlertTriangle, CheckCircle2, GaugeCircle, History, Wrench } from "lucide-react";
import type { MaintenanceStatusItem } from "@/features/maintenance/types";

type MaintenanceStatusCardProps = {
  item: MaintenanceStatusItem;
};

function formatKm(value: number | null | undefined) {
  if (value == null) return "Not recorded";
  return `${value.toLocaleString()} km`;
}

function getStatusMeta(item: MaintenanceStatusItem) {
  const remainingKm = item.remainingKm;

  if (remainingKm != null && remainingKm < 0) {
    return {
      label: "Overdue",
      badgeClassName:
        "bg-[#fef2f2] text-[#b91c1c] ring-1 ring-[#fecaca]",
      icon: AlertTriangle,
      panelClassName: "border-[#fecaca] bg-[#fff5f5]",
    };
  }

  if (remainingKm != null && remainingKm <= 2000) {
    return {
      label: "Due soon",
      badgeClassName:
        "bg-[#fff7ed] text-[#c2410c] ring-1 ring-[#fed7aa]",
      icon: AlertTriangle,
      panelClassName: "border-[#fed7aa] bg-[#fffaf5]",
    };
  }

  return {
    label: "Tracked",
    badgeClassName:
      "bg-[#f0fdf4] text-[#166534] ring-1 ring-[#bbf7d0]",
    icon: CheckCircle2,
    panelClassName: "border-[#e5e7eb] bg-white",
  };
}

export function MaintenanceStatusCard({
  item,
}: MaintenanceStatusCardProps) {
  const status = getStatusMeta(item);
  const StatusIcon = status.icon;

  return (
    <div
      className={`rounded-[24px] border p-5 text-[#111827] shadow-[0_10px_30px_rgba(0,0,0,0.10)] ${status.panelClassName}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#6b7280]">
            Maintenance
          </div>
          <h4 className="mt-1 text-xl font-extrabold tracking-tight">
            {item.type}
          </h4>
        </div>

        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] ${status.badgeClassName}`}
        >
          <StatusIcon className="h-3.5 w-3.5" />
          {status.label}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-[#f8fafc] px-4 py-3 ring-1 ring-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <GaugeCircle className="h-5 w-5 text-[#FF8A00]" />
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#6b7280]">
                Interval
              </div>
              <div className="text-base font-extrabold">
                {formatKm(item.intervalKm)}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[#f8fafc] px-4 py-3 ring-1 ring-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <History className="h-5 w-5 text-[#FF8A00]" />
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#6b7280]">
                Last Service
              </div>
              <div className="text-base font-extrabold">
                {formatKm(item.lastServiceMileage)}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[#f8fafc] px-4 py-3 ring-1 ring-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <Wrench className="h-5 w-5 text-[#FF8A00]" />
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#6b7280]">
                Next Due
              </div>
              <div className="text-base font-extrabold">
                {formatKm(item.nextDueMileage)}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[#f8fafc] px-4 py-3 ring-1 ring-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-[#FF8A00]" />
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#6b7280]">
                Remaining
              </div>
              <div className="text-base font-extrabold">
                {item.remainingKm == null
                  ? "Not available"
                  : `${item.remainingKm.toLocaleString()} km`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}