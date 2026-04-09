import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { AppLogo } from "@/shared/ui/AppLogo";

type LegalPageLayoutProps = {
  title: string;
  lastUpdated: string;
  children: ReactNode;
};

export function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#07192b] text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#07192b]/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <AppLogo clickable to="/" />

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex h-11 items-center rounded-2xl border border-white/15 px-5 text-sm font-bold text-white/85 transition hover:bg-white/5"
            >
              Back to home
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[-8%] top-[-10%] h-[320px] w-[320px] rounded-full bg-[#FF8A00]/12 blur-[120px]" />
            <div className="absolute right-[-6%] top-[10%] h-[280px] w-[280px] rounded-full bg-[#506caa]/20 blur-[120px]" />
          </div>

          <div className="relative mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-4xl">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-white/65">
                Legal
              </div>

              <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                {title}
              </h1>

              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#FF8A00]">
                Last updated: {lastUpdated}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="rounded-[32px] border border-white/10 bg-[#0f2236] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.28)] sm:p-8 lg:p-10">
            <div className="space-y-8">{children}</div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#07192b]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <AppLogo clickable to="/" />

          <div className="flex flex-wrap gap-4 text-sm text-white/60">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <Link to="/sign-in" className="hover:text-white">
              Log In
            </Link>
            <Link to="/sign-up" className="hover:text-white">
              Sign Up
            </Link>
            <Link to="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function LegalSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[24px] border border-white/10 bg-white/5 p-5 sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}

export function LegalH2({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-2xl font-extrabold tracking-tight text-[#FF8A00] ${className}`}
    >
      {children}
    </h2>
  );
}

export function LegalH3({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3 className={`text-lg font-extrabold tracking-tight text-white ${className}`}>
      {children}
    </h3>
  );
}

export function LegalP({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-sm leading-8 text-white/75 sm:text-[15px] ${className}`}>
      {children}
    </p>
  );
}

export function LegalUL({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={`list-disc space-y-2 pl-6 text-sm leading-8 text-white/75 sm:text-[15px] ${className}`}
      {...props}
    >
      {children}
    </ul>
  );
}

export function LegalLI({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLLIElement>) {
  return (
    <li className={className} {...props}>
      {children}
    </li>
  );
}

export function LegalStrong({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <strong className={`font-bold text-white ${className}`}>{children}</strong>;
}

export function LegalA({
  children,
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={`font-semibold text-[#FF8A00] underline underline-offset-4 transition hover:text-[#ffb454] ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}