import { Wrench, GaugeCircle, Sparkles, History } from "lucide-react";
import type { MaintenanceRecommendation, MaintenanceStatusItem } from "@/features/maintenance/types";

type RecommendedMaintenanceSectionProps = {
  vehicleName?: string | null;
  recommendations: MaintenanceRecommendation[];
  maintenanceStatus?: MaintenanceStatusItem[];
  isLoading?: boolean;
  onUseMileage?: (
    recommendation: MaintenanceRecommendation,
    statusItem?: MaintenanceStatusItem
  ) => void;
};

function formatKm(value: number | null | undefined) {
  if (value == null) return "Not available";
  return `${value.toLocaleString()} km`;
}

export function RecommendedMaintenanceSection({
  vehicleName,
  recommendations,
  maintenanceStatus = [],
  isLoading = false,
  onUseMileage,
}: RecommendedMaintenanceSectionProps) {
  if (isLoading) {
    return (
      <section className="rounded-[28px] border border-white/10 bg-[#506caa] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)] sm:p-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-white/80">
          <Wrench className="h-4 w-4 text-[#FF8A00]" />
          Recommended Maintenance Mileage
        </div>

        <div className="mt-4 rounded-2xl bg-white/10 px-4 py-5 text-sm text-white/85">
          Loading recommended maintenance...
        </div>
      </section>
    );
  }

  if (recommendations.length === 0) {
    return (
      <section className="rounded-[28px] border border-white/10 bg-[#506caa] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)] sm:p-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-white/80">
          <Wrench className="h-4 w-4 text-[#FF8A00]" />
          Recommended Maintenance Mileage
        </div>

        <div className="mt-4 rounded-2xl bg-white/10 px-4 py-5 text-sm text-white/85">
          No recommended maintenance intervals were found for this vehicle.
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-[28px] border border-white/10 bg-[#506caa] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)] sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-white/80">
            <Wrench className="h-4 w-4 text-[#FF8A00]" />
            Recommended Maintenance Mileage
          </div>

          <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-[#0B1220] sm:text-3xl">
            Proper maintenance for {vehicleName ?? "this vehicle"}
          </h3>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-[#eaf2ff]">
            These values use the vehicle’s maintenance setup. If a previous service
            record exists, Smart Garage will prefer the backend-calculated next due mileage.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-[#fff7ed] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[#9a3412] ring-1 ring-[#fed7aa]">
          <Sparkles className="h-4 w-4" />
          Vehicle-specific
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {recommendations.map((item) => {
          const statusItem =
            maintenanceStatus.find(
              (status) =>
                status.type.trim().toLowerCase() ===
                item.maintenanceName.trim().toLowerCase()
            ) ?? null;

          return (
            <div
              key={item.recommendationId}
              className="rounded-[22px] border border-white/70 bg-white p-4 text-[#111827] shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#6b7280]">
                    {item.maintenanceCode.replace(/_/g, " ")}
                  </div>
                  <div className="mt-1 text-lg font-extrabold leading-tight">
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

              <div className="mt-4 grid gap-3">
                <div className="inline-flex items-center gap-3 rounded-2xl bg-[#f8fafc] px-4 py-3 ring-1 ring-[#e5e7eb]">
                  <GaugeCircle className="h-5 w-5 text-[#FF8A00]" />
                  <div>
                    <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#6b7280]">
                      Interval
                    </div>
                    <div className="text-lg font-extrabold text-[#111827]">
                      {formatKm(item.intervalKm)}
                    </div>
                  </div>
                </div>

                {statusItem ? (
                  <div className="rounded-2xl bg-[#f8fafc] px-4 py-3 ring-1 ring-[#e5e7eb]">
                    <div className="flex items-start gap-3">
                      <History className="mt-0.5 h-5 w-5 text-[#FF8A00]" />
                      <div className="space-y-1 text-sm">
                        <div>
                          <span className="font-extrabold text-[#6b7280]">
                            Last service:
                          </span>{" "}
                          <span className="font-bold text-[#111827]">
                            {formatKm(statusItem.lastServiceMileage)}
                          </span>
                        </div>
                        <div>
                          <span className="font-extrabold text-[#6b7280]">
                            Next due:
                          </span>{" "}
                          <span className="font-bold text-[#111827]">
                            {formatKm(statusItem.nextDueMileage)}
                          </span>
                        </div>
                        <div>
                          <span className="font-extrabold text-[#6b7280]">
                            Remaining:
                          </span>{" "}
                          <span className="font-bold text-[#111827]">
                            {formatKm(statusItem.remainingKm)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {onUseMileage ? (
                  <button
                    type="button"
                    onClick={() => onUseMileage(item, statusItem ?? undefined)}
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-[#fff7ed] px-4 text-sm font-extrabold text-[#111827] ring-1 ring-[#fed7aa] transition hover:bg-[#ffedd5]"
                  >
                    Use as next due mileage
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}