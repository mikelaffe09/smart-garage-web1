import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <section className="flex flex-col gap-4 rounded-[28px] bg-gradient-to-br from-[#10253d] to-[#0b1c2e] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.22)] ring-1 ring-white/8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.18em] text-white/45">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#FF8A00] sm:text-4xl">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
          {description}
        </p>
      </div>

      {action ? <div>{action}</div> : null}
    </section>
  );
}