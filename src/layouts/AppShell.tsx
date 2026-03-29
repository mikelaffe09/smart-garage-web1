import {
  Home,
  Bell,
  Receipt,
  User,
  CarFront,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth";

const navItems = [
  { to: "/app", label: "Home", icon: Home, end: true },
  { to: "/app/vehicles", label: "Vehicles", icon: CarFront },
  { to: "/app/reminders", label: "Reminders", icon: Bell },
  { to: "/app/expenses", label: "Expenses", icon: Receipt },
  { to: "/app/profile", label: "Profile", icon: User },
];

function getPageTitle(pathname: string) {
  if (pathname === "/app") return "Home";
  if (pathname === "/app/vehicles") return "Vehicles";
  if (pathname === "/app/vehicles/new") return "Add Vehicle";
  if (pathname === "/app/reminders") return "Reminders";
  if (pathname === "/app/reminders/new") return "Add Reminder";
  if (pathname === "/app/expenses") return "Expenses";
  if (pathname === "/app/expenses/new") return "Add Expense";
  if (pathname === "/app/profile") return "Profile";
  if (pathname === "/app/profile/update") return "Update Profile";
  if (/^\/app\/vehicles\/[^/]+\/chat$/.test(pathname)) return "AI Mechanic Chat";
  if (/^\/app\/vehicles\/[^/]+$/.test(pathname)) return "Vehicle Dashboard";
  return "Smart Garage";
}

function shouldShowBack(pathname: string) {
  return ![
    "/app",
    "/app/vehicles",
    "/app/reminders",
    "/app/expenses",
    "/app/profile",
  ].includes(pathname);
}

export function AppShell() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const pageTitle = getPageTitle(location.pathname);
  const showBack = shouldShowBack(location.pathname);

  async function handleSignOut() {
    await signOut();
    navigate("/sign-in", { replace: true });
  }

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/app", { replace: true });
  }

  return (
    <div className="min-h-screen bg-[#07192b] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px]">
        <aside className="hidden w-[270px] shrink-0 border-r border-white/10 bg-[#0b2035] px-6 py-7 lg:flex lg:flex-col">
          <div className="mb-8">
            <div className="text-[26px] font-extrabold tracking-tight text-[#FF8A00]">
              Smart Garage
            </div>
            <p className="mt-1 text-sm text-white/60">
              Vehicle manager + AI mechanic
            </p>
          </div>

          <nav className="flex flex-1 flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                      isActive
                        ? "bg-[#FF8A00] text-[#111827] shadow-[0_8px_20px_rgba(255,138,0,0.25)]"
                        : "text-white/75 hover:bg-white/7 hover:text-white",
                    ].join(" ")
                  }
                >
                  <Icon className="h-5 w-5" strokeWidth={2.2} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm font-semibold text-white">
              {user?.user_metadata?.name || user?.email || "Authenticated user"}
            </div>
            <div className="mt-1 text-xs text-white/55">
              Signed in to Smart Garage
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/85 transition hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-[#07192b]/90 backdrop-blur">
            <div className="flex h-[72px] items-center gap-3 px-4 sm:px-6 lg:px-8">
              {showBack ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              ) : null}

              <div className="min-w-0">
                <div className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Smart Garage
                </div>
                <h1 className="truncate text-xl font-bold text-white">{pageTitle}</h1>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
            <div className="mx-auto w-full max-w-[1200px]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-[#0b2035]/95 px-3 py-2 backdrop-blur lg:hidden">
        <div className="grid grid-cols-5 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  [
                    "flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition",
                    isActive ? "text-[#FF8A00]" : "text-white/55",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                    <span className={isActive ? "text-[#FF8A00]" : ""}>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}