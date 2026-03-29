import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { mockVehicles } from "@/features/vehicles/mockData";
import { VehicleCard } from "@/features/vehicles/components/VehicleCard";

export function VehiclesPage() {
  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <section className="flex flex-col gap-4 rounded-[28px] bg-gradient-to-br from-[#10253d] to-[#0b1c2e] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.22)] ring-1 ring-white/8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-white/45">Garage</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#FF8A00] sm:text-4xl">
            Your Vehicles
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
            Open any vehicle to access its dashboard, reminders, expenses, and AI mechanic chat.
          </p>
        </div>

        <Link
          to="/app/vehicles/new"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#FF8A00] px-5 text-sm font-bold text-[#111827] shadow-[0_10px_25px_rgba(255,138,0,0.28)] transition hover:brightness-95"
        >
          <Plus className="h-4 w-4" />
          Add Vehicle
        </Link>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {mockVehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </section>
    </div>
  );
}