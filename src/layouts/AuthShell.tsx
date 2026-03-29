import { Outlet } from "react-router-dom";

export function AuthShell() {
  return (
    <div className="min-h-screen bg-[#07192b]">
      <div className="mx-auto grid min-h-screen max-w-[1400px] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden lg:flex lg:flex-col lg:justify-between lg:px-12 lg:py-14">
          <div>
            <div className="text-[34px] font-extrabold tracking-tight text-[#FF8A00]">
              Smart Garage
            </div>
            <p className="mt-3 max-w-md text-base leading-7 text-white/70">
              Manage vehicles, track maintenance and expenses, and get AI-powered
              mechanic guidance in one place.
            </p>
          </div>

          <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-white/6 p-6">
              <div className="text-sm font-semibold text-white">Track maintenance</div>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Stay on top of oil changes, reminders, and service history.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/6 p-6">
              <div className="text-sm font-semibold text-white">Monitor expenses</div>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Keep repair, parts, and ownership costs organized.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/6 p-6">
              <div className="text-sm font-semibold text-white">AI mechanic chat</div>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Ask vehicle questions and get guided troubleshooting help.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/6 p-6">
              <div className="text-sm font-semibold text-white">Built for drivers</div>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Same Smart Garage product feel, adapted properly for web.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
          <div className="w-full max-w-[520px] rounded-[32px] bg-white p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)] sm:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}