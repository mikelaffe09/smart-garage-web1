import { Home, Bell, CarFront, DollarSign, User, LogOut } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AppLogo } from "@/shared/ui/AppLogo";
import { useAuth } from "@/features/auth/useAuth";

const navItems = [
  { to: "/app", label: "Home", icon: Home, end: true },
  { to: "/app/vehicles", label: "Vehicles", icon: CarFront },
  { to: "/app/reminders", label: "Reminders", icon: Bell },
  { to: "/app/expenses", label: "Expenses", icon: DollarSign },
  { to: "/app/profile", label: "Profile", icon: User },
];

function getDisplayName(
  rawName?: string | null,
  email?: string | null
): string {
  const cleanName = rawName?.trim();
  if (cleanName) return cleanName;
  if (email) return email.split("@")[0];
  return "Smart Garage User";
}

export function AppShell() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const displayName = getDisplayName(
    (user?.user_metadata?.name as string | undefined) ?? null,
    user?.email ?? null
  );

  async function handleSignOut() {
    try {
      await signOut();
      navigate("/sign-in", { replace: true });
    } catch {
      navigate("/sign-in", { replace: true });
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#17365b_0%,_#09131f_45%,_#050b14_100%)] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px]">
        <aside className="hidden w-[280px] shrink-0 border-r border-white/10 bg-[#0b1930]/80 px-6 py-6 backdrop-blur lg:flex lg:flex-col">
          <div className="mb-8">
            <AppLogo compact clickable to="/app" />
          </div>

          <nav className="space-y-3">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    [
                      "flex h-12 items-center gap-3 rounded-2xl px-4 text-sm font-bold transition",
                      isActive
                        ? "bg-[#FF8A00] text-[#111827] shadow-[0_10px_25px_rgba(255,138,0,0.28)]"
                        : "text-white/85 hover:bg-white/8 hover:text-white",
                    ].join(" ")
                  }
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-auto rounded-[24px] border border-white/10 bg-white/5 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.16)]">
            <div className="truncate text-sm font-extrabold text-white">
              {displayName}
            </div>
            <div className="mt-1 truncate text-xs text-white/55">
              Signed in to Smart Garage
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 text-sm font-bold text-white transition hover:bg-white/15"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </aside>

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-white/8 bg-[#081220]/80 px-4 py-4 backdrop-blur lg:hidden">
            <AppLogo compact clickable to="/app" />
          </header>

          <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
            <div className="mx-auto w-full max-w-[1180px]">
              <Outlet />
            </div>
          </main>

          <nav className="sticky bottom-0 z-20 border-t border-white/10 bg-[#081220]/95 px-3 py-3 backdrop-blur lg:hidden">
            <div className="grid grid-cols-5 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      [
                        "flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-bold transition",
                        isActive
                          ? "bg-[#FF8A00] text-[#111827]"
                          : "text-white/75 hover:bg-white/8 hover:text-white",
                      ].join(" ")
                    }
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}