import type { ReactNode } from "react";
import { AlertTriangle, Inbox, LoaderCircle } from "lucide-react";

export function PageIntro({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 rounded-[28px] bg-gradient-to-br from-[#10253d] to-[#0b1c2e] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.22)] ring-1 ring-white/8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? (
          <p className="text-sm uppercase tracking-[0.18em] text-white/45">
            {eyebrow}
          </p>
        ) : null}

        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#FF8A00] sm:text-4xl">
          {title}
        </h2>

        {description ? (
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </section>
  );
}

function getVariantUi(variant: "loading" | "empty" | "error") {
  if (variant === "loading") {
    return {
      icon: <LoaderCircle className="h-5 w-5 animate-spin text-[#FF8A00]" />,
      wrapper:
        "border-white/10 bg-white text-[#111827] shadow-[0_10px_30px_rgba(0,0,0,0.14)]",
      title: "Loading...",
    };
  }

  if (variant === "error") {
    return {
      icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
      wrapper:
        "border-red-200 bg-red-50 text-red-900 shadow-[0_10px_30px_rgba(0,0,0,0.08)]",
      title: "Something went wrong",
    };
  }

  return {
    icon: <Inbox className="h-5 w-5 text-white/60" />,
    wrapper: "border-white/20 bg-[#0f2236] text-white/75",
    title: "Nothing here yet",
  };
}

export function StateCard({
  variant,
  title,
  description,
}: {
  variant: "loading" | "empty" | "error";
  title?: string;
  description: string;
}) {
  const ui = getVariantUi(variant);

  return (
    <div
      className={`rounded-[22px] border p-5 ${ui.wrapper}`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">{ui.icon}</div>

        <div>
          <div className="text-sm font-extrabold">
            {title || ui.title}
          </div>
          <div className="mt-1 text-sm leading-7 opacity-80">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}