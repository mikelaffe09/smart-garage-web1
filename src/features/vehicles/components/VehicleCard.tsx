import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Vehicle } from "@/features/vehicles/types";

type VehicleCardProps = {
  vehicle: Vehicle;
};

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Link
      to={`/app/vehicles/${vehicle.id}`}
      className="group flex items-center justify-between rounded-[22px] border border-[#e5e7eb] bg-white p-5 text-[#111827] shadow-[0_10px_30px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(0,0,0,0.18)]"
    >
      <div className="min-w-0">
        <div className="truncate text-[18px] font-extrabold">
          {vehicle.year} {vehicle.vehicleName}
        </div>
        <div className="mt-1 text-sm text-[#6b7280]">
          Mileage: {vehicle.mileage.toLocaleString()} km
        </div>
      </div>

      <div className="ml-4 shrink-0 rounded-full bg-[#f3f4f6] p-2 text-[#9ca3af] transition group-hover:bg-[#fff7ed] group-hover:text-[#FF8A00]">
        <ChevronRight className="h-5 w-5" />
      </div>
    </Link>
  );
}