import { Link } from "react-router-dom";
import { Wrench, X, ChevronRight } from "lucide-react";
import type { MaintenanceRecommendation } from "@/features/maintenance/types";

type MaintenanceSetupModalProps = {
  open: boolean;
  vehicleName: string;
  recommendations: MaintenanceRecommendation[];
  isLoading?: boolean;
  onDismiss: () => void;
  remindersHref: string;
};

function formatKm(value: number) {
  return `${value.toLocaleString()} km`;
}

export function MaintenanceSetupModal({
  open,
  vehicleName,
  recommendations,
  isLoading = false,
  onDismiss,
  remindersHref,
}: MaintenanceSetupModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020817]/70 px-4 py-6 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl rounded-[30px] border border-white/10 bg-[#10253d] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.42)] sm:p-6">
        <button
          type="button"
          onClick={onDismiss}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
          aria-label="Close maintenance setup"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="pr-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-white/65">
            <Wrench className="h-4 w-4 text-[#FF8A00]" />
            Proper Maintenance Setup
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#FF8A00] sm:text-4xl">
            Recommended maintenance for {vehicleName}
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75 sm:text-[15px]">
            Smart Garage found the default maintenance intervals for this vehicle.
            You can dismiss this for now or go directly to reminders and start
            setting up your maintenance schedule.
          </p>
        </div>

        <div className="mt-6 rounded-[26px] border border-white/10 bg-white/5 p-4 sm:p-5">
          {isLoading ? (
            <div className="rounded-2xl bg-white/5 px-4 py-5 text-sm text-white/75">
              Loading maintenance recommendations...
            </div>
          ) : recommendations.length === 0 ? (
            <div className="rounded-2xl bg-white/5 px-4 py-5 text-sm text-white/75">
              No predefined maintenance recommendations were found for this vehicle.
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {recommendations.map((item) => (
                <div
                  key={item.recommendationId}
                  className="rounded-2xl border border-white/10 bg-white p-4 text-[#111827] shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#6b7280]">
                        {item.maintenanceCode.replace(/_/g, " ")}
                      </div>
                      <div className="mt-1 truncate text-lg font-extrabold">
                        {item.maintenanceName}
                      </div>
                    </div>

                    {item.isCustom ? (
                      <span className="shrink-0 rounded-full bg-[#fff7ed] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#9a3412] ring-1 ring-[#fed7aa]">
                        Custom
                      </span>
                    ) : (
                      <span className="shrink-0 rounded-full bg-[#f8fafc] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#475569] ring-1 ring-[#e5e7eb]">
                        Default
                      </span>
                    )}
                  </div>

                  <div className="mt-4 rounded-2xl bg-[#f8fafc] px-4 py-3 ring-1 ring-[#e5e7eb]">
                    <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#6b7280]">
                      Recommended interval
                    </div>
                    <div className="mt-1 text-xl font-extrabold text-[#FF8A00]">
                      {formatKm(item.intervalKm)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onDismiss}
            className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/15 bg-transparent px-5 text-sm font-extrabold text-white transition hover:bg-white/5"
          >
            Dismiss
          </button>

          <Link
            to={remindersHref}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#FF8A00] px-5 text-sm font-extrabold text-[#111827] transition hover:brightness-95"
          >
            Go to reminders
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}