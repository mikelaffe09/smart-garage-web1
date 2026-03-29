import { Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useAuth } from "@/features/auth/useAuth";

function getInitials(nameOrEmail?: string | null) {
  const value = String(nameOrEmail || "").trim();
  if (!value) return "SG";

  const parts = value.split(" ").filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  return value.slice(0, 2).toUpperCase();
}

function RowLink({
  to,
  title,
  subtitle,
  danger = false,
}: {
  to: string;
  title: string;
  subtitle: string;
  danger?: boolean;
}) {
  return (
    <Link
      to={to}
      className={[
        "flex items-center justify-between gap-4 px-4 py-4 transition",
        danger ? "bg-[#1a0f12] hover:bg-[#231317]" : "hover:bg-white/5",
      ].join(" ")}
    >
      <div>
        <div
          className={[
            "text-sm font-extrabold",
            danger ? "text-[#fecaca]" : "text-white",
          ].join(" ")}
        >
          {title}
        </div>
        <div
          className={[
            "mt-1 text-xs",
            danger ? "text-[#fca5a5]" : "text-[#cbd5e1]",
          ].join(" ")}
        >
          {subtitle}
        </div>
      </div>

      <div className={danger ? "text-[#fca5a5]" : "text-[#cbd5e1]"}>›</div>
    </Link>
  );
}

export function ProfilePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const displayName =
    (user?.user_metadata?.name as string | undefined) || user?.email || "User";

  const initials = useMemo(() => getInitials(displayName), [displayName]);

  async function handleSignOut() {
    await signOut();
    navigate("/sign-in", { replace: true });
  }

  return (
    <div className="space-y-5 pb-20 lg:pb-0">
      <div>
        <h2 className="text-[28px] font-extrabold tracking-tight text-[#FF8A00]">
          Profile
        </h2>
        <p className="mt-2 text-sm text-white/75">
          Manage your account details
        </p>
      </div>

      <section className="flex items-center gap-4 rounded-[22px] border border-white/10 bg-[#506caa] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.16)]">
        <div className="flex h-16 w-16 items-center justify-center rounded-[18px] border border-white/20 bg-[#09192a] text-lg font-extrabold text-[#FF8A00]">
          {initials}
        </div>

        <div className="min-w-0">
          <div className="truncate text-[18px] font-extrabold text-white">
            {displayName}
          </div>
          <div className="mt-1 truncate text-sm text-[#e5e7eb]">
            {user?.email || "-"}
          </div>
        </div>
      </section>

      <div>
        <div className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#cbd5e1]">
          Account
        </div>

        <section className="overflow-hidden rounded-[18px] border border-white/10 bg-[#0f2236]">
          <RowLink
            to="/app/profile/update"
            title="Update profile"
            subtitle="Change your name"
          />
        </section>
      </div>

      <div>
        <div className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#cbd5e1]">
          Security
        </div>

        <section className="overflow-hidden rounded-[18px] border border-white/10 bg-[#0f2236]">
          <RowLink
            to="/app/profile/update"
            title="Profile settings"
            subtitle="Manage account information"
          />
          <div className="h-px bg-white/10" />
          <button
            type="button"
            className="flex w-full items-center justify-between gap-4 bg-[#1a0f12] px-4 py-4 text-left transition hover:bg-[#231317]"
          >
            <div>
              <div className="text-sm font-extrabold text-[#fecaca]">
                Delete account
              </div>
              <div className="mt-1 text-xs text-[#fca5a5]">
                Backend action will be wired next
              </div>
            </div>
            <div className="text-[#fca5a5]">›</div>
          </button>
        </section>
      </div>

      <button
        type="button"
        onClick={handleSignOut}
        className="h-12 w-full rounded-2xl bg-white px-5 text-sm font-extrabold text-[#111827] transition hover:bg-[#f3f4f6]"
      >
        Sign Out
      </button>

      <div className="text-center text-xs text-[#94a3b8]">
        SmartGarage is still improving—double-check important information.
      </div>
    </div>
  );
}