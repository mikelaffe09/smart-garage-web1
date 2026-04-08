import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { VehicleCard } from "@/features/vehicles/components/VehicleCard";
import { useVehicles } from "@/features/vehicles/hooks";
import { PageIntro, StateCard } from "@/shared/ui/page";

export function VehiclesPage() {
  const vehiclesQuery = useVehicles();
  const vehicles = vehiclesQuery.data ?? [];

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <PageIntro
        eyebrow="Garage"
        title="Your Vehicles"
        description="Open any vehicle to access its dashboard, reminders, expenses, and AI mechanic chat."
        action={
          <Link
            to="/app/vehicles/new"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#FF8A00] px-5 text-sm font-bold text-[#111827] shadow-[0_10px_25px_rgba(255,138,0,0.28)] transition hover:brightness-95"
          >
            <Plus className="h-4 w-4" />
            Add Vehicle
          </Link>
        }
      />

      {vehiclesQuery.isLoading ? (
        <StateCard
          variant="loading"
          description="Loading your vehicles..."
        />
      ) : vehiclesQuery.isError ? (
        <StateCard
          variant="error"
          title="Failed to load vehicles"
          description="We could not load your garage right now."
        />
      ) : vehicles.length === 0 ? (
        <StateCard
          variant="empty"
          title="No vehicles yet"
          description="Add your first vehicle to get started."
        />
      ) : (
        <section className="grid gap-4 xl:grid-cols-2">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </section>
      )}
    </div>
  );
}