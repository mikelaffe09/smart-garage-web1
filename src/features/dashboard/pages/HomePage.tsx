import { Link } from "react-router-dom";
import { Bell, Bot, CarFront, DollarSign, Plus, Wrench } from "lucide-react";
import { useAuth } from "@/features/auth/useAuth";
import { mockVehicles } from "@/features/vehicles/mockData";
import { VehicleCard } from "@/features/vehicles/components/VehicleCard";

function getDisplayName(rawName?: string | null, email?: string | null) {
  const trimmed = rawName?.trim();
  if (trimmed) return trimmed;
  if (email) return email.split("@")[0];
  return "Your";
}

function getPossessive(name: string) {
  return name.toLowerCase().endsWith("s") ? `${name}'` : `${name}'s`;
}

export function HomePage() {
  const { user } = useAuth();

  const displayName = getDisplayName(
    (user?.user_metadata?.name as string | undefined) ?? null,
    user?.email ?? null
  );

  const garageTitle = `${getPossessive(displayName)} Garage`;

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <section className="rounded-[30px] bg-gradient-to-br from-[#10253d] to-[#0b1c2e] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.22)] ring-1 ring-white/8 sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-white/45">
              Dashboard
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#FF8A00] sm:text-4xl">
              {garageTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              Manage your vehicles, track maintenance, control expenses, and use the AI mechanic assistant from one place.
            </p>
          </div>

          <Link
            to="/app/vehicles/new"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#FF8A00] px-5 text-sm font-bold text-[#111827] shadow-[0_10px_25px_rgba(255,138,0,0.28)] transition hover:brightness-95"
          >
            <Plus className="h-4 w-4" />
            Add Vehicle
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[24px] bg-white p-5 text-[#111827] shadow-[0_10px_30px_rgba(0,0,0,0.16)]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#374151]">Vehicles</span>
            <CarFront className="h-5 w-5 text-[#FF8A00]" />
          </div>
          <div className="mt-4 text-3xl font-extrabold">{mockVehicles.length}</div>
          <p className="mt-2 text-sm text-[#6b7280]">Vehicles in your garage.</p>
        </div>

        <div className="rounded-[24px] bg-white p-5 text-[#111827] shadow-[0_10px_30px_rgba(0,0,0,0.16)]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#374151]">Reminders</span>
            <Bell className="h-5 w-5 text-[#FF8A00]" />
          </div>
          <div className="mt-4 text-3xl font-extrabold">5</div>
          <p className="mt-2 text-sm text-[#6b7280]">Upcoming and overdue tasks.</p>
        </div>

        <div className="rounded-[24px] bg-white p-5 text-[#111827] shadow-[0_10px_30px_rgba(0,0,0,0.16)]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#374151]">Expenses</span>
            <DollarSign className="h-5 w-5 text-[#FF8A00]" />
          </div>
          <div className="mt-4 text-3xl font-extrabold">$5,196</div>
          <p className="mt-2 text-sm text-[#6b7280]">Tracked ownership spending.</p>
        </div>

        <div className="rounded-[24px] bg-white p-5 text-[#111827] shadow-[0_10px_30px_rgba(0,0,0,0.16)]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#374151]">AI Assistant</span>
            <Bot className="h-5 w-5 text-[#FF8A00]" />
          </div>
          <div className="mt-4 text-lg font-extrabold">Ready</div>
          <p className="mt-2 text-sm text-[#6b7280]">Ask maintenance and diagnosis questions.</p>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.35fr_0.9fr]">
        <div className="rounded-[28px] bg-white p-6 text-[#111827] shadow-[0_10px_30px_rgba(0,0,0,0.16)]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-extrabold">Your Vehicles</h3>
              <p className="mt-1 text-sm text-[#6b7280]">
                Open any vehicle to access its dashboard.
              </p>
            </div>

            <Link
              to="/app/vehicles"
              className="hidden rounded-xl bg-[#f3f4f6] px-4 py-2 text-sm font-semibold text-[#111827] transition hover:bg-[#e5e7eb] sm:inline-flex"
            >
              View all
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {mockVehicles.slice(0, 2).map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>

        <div className="rounded-[28px] bg-[#10253d] p-6 text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] ring-1 ring-white/8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <Wrench className="h-6 w-6 text-[#FF8A00]" />
            </div>

            <div>
              <h3 className="text-lg font-extrabold">Smart Garage AI</h3>
              <p className="text-sm text-white/65">Vehicle-aware mechanic assistant</p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-7 text-white/70">
            Each vehicle can have its own dashboard, stats, and AI mechanic context, just like in the mobile app.
          </p>

          <div className="mt-5 rounded-[20px] bg-white/6 p-4 text-sm text-white/72 ring-1 ring-white/8">
            Smart Garage AI can make mistakes. Always verify important repairs with a qualified mechanic.
          </div>
        </div>
      </section>
    </div>
  );
}