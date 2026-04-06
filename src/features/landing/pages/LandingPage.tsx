import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  Bot,
  CarFront,
  CheckCircle2,
  ChevronDown,
  Download,
  Gauge,
  Laptop,
  Receipt,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wrench,
} from "lucide-react";
import { useAuth } from "@/features/auth/useAuth";

/*
  Replace these 2 links with your real store URLs when ready.
*/
const APP_STORE_URL = "https://apps.apple.com/";
const PLAY_STORE_URL = "https://play.google.com/store";

const TRUST_POINTS = [
  "Vehicle dashboards",
  "Maintenance reminders",
  "Expense tracking",
  "AI mechanic chat",
];

const FEATURES = [
  {
    icon: CarFront,
    title: "Per-vehicle dashboards",
    description:
      "Every car gets its own dashboard with mileage, reminders, expenses, and AI support.",
  },
  {
    icon: BellRing,
    title: "Maintenance reminders",
    description:
      "Track what is due, what is overdue, and what has already been completed before things slip.",
  },
  {
    icon: Receipt,
    title: "Expense visibility",
    description:
      "Log services, repairs, and upgrades so you actually know what each vehicle is costing.",
  },
  {
    icon: Bot,
    title: "AI mechanic assistant",
    description:
      "Ask practical questions, get guided troubleshooting help, and keep support tied to the right vehicle.",
  },
  {
    icon: Gauge,
    title: "Mileage-aware tracking",
    description:
      "Connect reminders and expenses to mileage so the app reflects real vehicle usage.",
  },
  {
    icon: ShieldCheck,
    title: "Cleaner ownership records",
    description:
      "Stop depending on memory, scattered notes, or random receipts to manage vehicle history.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Create your garage",
    description:
      "Add one or more vehicles with details and mileage so everything starts in the right place.",
  },
  {
    step: "02",
    title: "Track what matters",
    description:
      "Log reminders and expenses to build a real record of maintenance and vehicle costs.",
  },
  {
    step: "03",
    title: "Use AI when issues come up",
    description:
      "Ask the assistant for guided help when a symptom shows up or something feels wrong.",
  },
];

const USE_CASES = [
  "Drivers who want to stop forgetting maintenance",
  "Families managing multiple vehicles",
  "People who want clean expense history",
  "Mechanics or shops tracking vehicles more cleanly",
];

const FAQS = [
  {
    question: "What is Smart Garage?",
    answer:
      "Smart Garage is a vehicle manager with an AI mechanic assistant. It helps you manage vehicles, reminders, expenses, mileage, and troubleshooting support in one place.",
  },
  {
    question: "Can I manage more than one vehicle?",
    answer:
      "Yes. Smart Garage is built to support multiple vehicles, each with its own dashboard, reminders, expenses, and AI context.",
  },
  {
    question: "Is the AI mechanic always right?",
    answer:
      "No. It is a support tool, not a replacement for a qualified mechanic. It can help guide your thinking, but important repairs should still be verified professionally.",
  },
  {
    question: "Will Smart Garage work on web and mobile?",
    answer:
      "Yes. Smart Garage is being built to work on both web and mobile so users can manage vehicles from wherever they are.",
  },
];

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-semibold text-white">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-white/60 transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open ? (
        <div className="border-t border-white/10 px-5 py-4 text-sm leading-7 text-white/72">
          {answer}
        </div>
      ) : null}
    </div>
  );
}

function AppPreviewMock() {
  return (
    <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#0f2236] p-5 shadow-[0_22px_80px_rgba(0,0,0,0.42)]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-16 right-0 h-52 w-52 rounded-full bg-[#FF8A00]/10 blur-[80px]" />
        <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-[#506caa]/20 blur-[80px]" />
      </div>

      <div className="relative">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-white/40">
              Smart Garage
            </div>
            <div className="text-2xl font-extrabold text-[#FF8A00]">
              Vehicle Manager + AI Mechanic
            </div>
          </div>

          <div className="rounded-2xl bg-[#FF8A00] px-3 py-2 text-xs font-extrabold text-[#111827]">
            Web + Mobile
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-[28px] bg-gradient-to-br from-[#10253d] to-[#0b1c2e] p-5 ring-1 ring-white/8">
            <div className="text-sm uppercase tracking-[0.18em] text-white/45">
              Dashboard
            </div>
            <div className="mt-2 text-3xl font-extrabold text-[#FF8A00]">
              Your Garage
            </div>
            <div className="mt-3 max-w-xl text-sm leading-7 text-white/72">
              Open any vehicle, track costs, manage reminders, and use AI help
              without bouncing between different tools.
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-4 text-[#111827]">
                <div className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#6b7280]">
                  Vehicles
                </div>
                <div className="mt-2 text-2xl font-extrabold">Organized</div>
              </div>

              <div className="rounded-2xl bg-white p-4 text-[#111827]">
                <div className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#6b7280]">
                  Reminders
                </div>
                <div className="mt-2 text-2xl font-extrabold">Tracked</div>
              </div>

              <div className="rounded-2xl bg-white p-4 text-[#111827]">
                <div className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#6b7280]">
                  Costs
                </div>
                <div className="mt-2 text-2xl font-extrabold">Visible</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[26px] bg-white p-5 text-[#111827] shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff7ed]">
                  <Bot className="h-6 w-6 text-[#FF8A00]" />
                </div>
                <div>
                  <div className="font-extrabold">AI Mechanic</div>
                  <div className="text-xs text-[#6b7280]">
                    Ask practical vehicle questions
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#f9fafb] p-3 text-sm text-[#374151]">
                “My car makes a clicking sound when starting.”
              </div>

              <div className="mt-3 rounded-2xl bg-[#fff7ed] p-3 text-sm leading-7 text-[#7c2d12]">
                Start with the battery, terminals, and starter connection before
                assuming a bigger repair.
              </div>
            </div>

            <div className="rounded-[26px] bg-[#506caa] p-5 text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
              <div className="font-extrabold">Built for daily use</div>
              <div className="mt-2 text-sm leading-7 text-white/88">
                Same product feel across web and mobile, with a layout adapted
                properly for each platform.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StoreButton({
  href,
  title,
  subtitle,
}: {
  href: string;
  title: string;
  subtitle: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-[58px] items-center gap-3 rounded-2xl border border-white/12 bg-white/8 px-5 py-3 text-left transition hover:bg-white/12"
    >
      <Download className="h-5 w-5 shrink-0 text-[#FF8A00]" />
      <div>
        <div className="text-[11px] uppercase tracking-[0.16em] text-white/50">
          Download on
        </div>
        <div className="text-sm font-extrabold text-white">{title}</div>
        <div className="text-xs text-white/55">{subtitle}</div>
      </div>
    </a>
  );
}

export function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#07192b] text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#07192b]/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="block">
            <div className="text-[30px] font-extrabold tracking-tight text-[#FF8A00]">
              Smart Garage
            </div>
            <div className="text-sm text-white/60">
              Vehicle manager + AI mechanic
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <a href="#features" className="text-sm text-white/70 hover:text-white">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-white/70 hover:text-white">
              How it works
            </a>
            <a href="#download" className="text-sm text-white/70 hover:text-white">
              Mobile app
            </a>
            <a href="#faq" className="text-sm text-white/70 hover:text-white">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <Link
                to="/app"
                className="inline-flex h-11 items-center rounded-2xl bg-[#FF8A00] px-5 text-sm font-extrabold text-[#111827] transition hover:brightness-95"
              >
                Open App
              </Link>
            ) : (
              <>
                <Link
                  to="/sign-in"
                  className="hidden h-11 items-center rounded-2xl border border-white/15 px-5 text-sm font-bold text-white/85 transition hover:bg-white/5 sm:inline-flex"
                >
                  Log In
                </Link>
                <Link
                  to="/sign-up"
                  className="inline-flex h-11 items-center rounded-2xl bg-[#FF8A00] px-5 text-sm font-extrabold text-[#111827] transition hover:brightness-95"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-[-8%] top-[-4%] h-[480px] w-[480px] rounded-full bg-[#FF8A00]/12 blur-[130px]" />
            <div className="absolute right-[-6%] top-[18%] h-[420px] w-[420px] rounded-full bg-[#506caa]/20 blur-[130px]" />
            <div className="absolute left-[28%] top-[38%] h-[260px] w-[260px] rounded-full bg-white/5 blur-[100px]" />
          </div>

          <div className="relative mx-auto grid max-w-[1440px] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-24">
            <div className="flex flex-col justify-center">
              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                <Sparkles className="h-4 w-4 text-[#FF8A00]" />
                Built to manage real vehicles, not just look pretty
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                The smarter way to manage
                <span className="block text-[#FF8A00]">your garage and your cars</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
                Smart Garage helps you track maintenance, log expenses, keep
                mileage organized, and use an AI mechanic assistant across web
                and mobile.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {user ? (
                  <Link
                    to="/app"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#FF8A00] px-6 text-sm font-extrabold text-[#111827] transition hover:brightness-95"
                  >
                    Open Smart Garage
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/sign-up"
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#FF8A00] px-6 text-sm font-extrabold text-[#111827] transition hover:brightness-95"
                    >
                      Create Your Account
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      to="/sign-in"
                      className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/15 px-6 text-sm font-bold text-white/90 transition hover:bg-white/5"
                    >
                      Log In
                    </Link>
                  </>
                )}
              </div>

              <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/70">
                {TRUST_POINTS.map((item) => (
                  <div
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#FF8A00]" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <StoreButton
                  href={APP_STORE_URL}
                  title="App Store"
                  subtitle="iPhone & iPad"
                />
                <StoreButton
                  href={PLAY_STORE_URL}
                  title="Google Play"
                  subtitle="Android phones & tablets"
                />
              </div>
            </div>

            <div className="flex items-center">
              <AppPreviewMock />
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0b2035]">
          <div className="mx-auto grid max-w-[1440px] gap-4 px-4 py-8 sm:px-6 md:grid-cols-2 xl:grid-cols-4 lg:px-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FF8A00] text-[#111827]">
                <CarFront className="h-5 w-5" />
              </div>
              <div className="font-extrabold">Multiple vehicles</div>
              <div className="mt-1 text-sm leading-7 text-white/65">
                Manage one personal car or a full garage in one place.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FF8A00] text-[#111827]">
                <Smartphone className="h-5 w-5" />
              </div>
              <div className="font-extrabold">Real mobile companion</div>
              <div className="mt-1 text-sm leading-7 text-white/65">
                Built from a real mobile app, not a fake one-page concept.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FF8A00] text-[#111827]">
                <Laptop className="h-5 w-5" />
              </div>
              <div className="font-extrabold">Proper web workflow</div>
              <div className="mt-1 text-sm leading-7 text-white/65">
                Same Smart Garage feel, adapted properly for the browser.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FF8A00] text-[#111827]">
                <Wrench className="h-5 w-5" />
              </div>
              <div className="font-extrabold">Practical AI help</div>
              <div className="mt-1 text-sm leading-7 text-white/65">
                Use AI guidance when something feels off with a vehicle.
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
              Features
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Everything the product needs to feel useful from day one
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/68">
              Smart Garage is built around the actual things people need when
              they want to manage vehicles properly.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-[30px] border border-white/10 bg-[#0f2236] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.16)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)]"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff7ed]">
                    <Icon className="h-7 w-7 text-[#FF8A00]" />
                  </div>

                  <h3 className="text-xl font-extrabold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/68">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-[#0b2035]">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
                Built for real use cases
              </div>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Useful whether you manage one car or several
              </h2>
              <p className="mt-4 text-base leading-8 text-white/68">
                Smart Garage is not just for one type of user. It works for
                drivers, families, vehicle enthusiasts, and people who want
                cleaner ownership records.
              </p>

              <div className="mt-8 space-y-3">
                {USE_CASES.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#FF8A00]" />
                    <div className="text-sm leading-7 text-white/75">{item}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] bg-white p-6 text-[#111827] shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff7ed]">
                  <BellRing className="h-6 w-6 text-[#FF8A00]" />
                </div>
                <h3 className="text-xl font-extrabold">Prevent missed maintenance</h3>
                <p className="mt-3 text-sm leading-7 text-[#6b7280]">
                  Know what is due before it becomes a bigger and more expensive
                  problem.
                </p>
              </div>

              <div className="rounded-[28px] bg-white p-6 text-[#111827] shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff7ed]">
                  <Receipt className="h-6 w-6 text-[#FF8A00]" />
                </div>
                <h3 className="text-xl font-extrabold">Understand your costs</h3>
                <p className="mt-3 text-sm leading-7 text-[#6b7280]">
                  Keep repairs, services, and upgrade spending visible instead of
                  buried in random receipts.
                </p>
              </div>

              <div className="rounded-[28px] bg-white p-6 text-[#111827] shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff7ed]">
                  <Bot className="h-6 w-6 text-[#FF8A00]" />
                </div>
                <h3 className="text-xl font-extrabold">Ask better questions</h3>
                <p className="mt-3 text-sm leading-7 text-[#6b7280]">
                  Use the AI assistant to get quicker direction when a vehicle
                  starts acting up.
                </p>
              </div>

              <div className="rounded-[28px] bg-white p-6 text-[#111827] shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff7ed]">
                  <ShieldCheck className="h-6 w-6 text-[#FF8A00]" />
                </div>
                <h3 className="text-xl font-extrabold">Keep records clean</h3>
                <p className="mt-3 text-sm leading-7 text-[#6b7280]">
                  Give every vehicle a proper place instead of relying on memory
                  and scattered notes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
              How it works
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Straightforward setup. Real value fast.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {HOW_IT_WORKS.map((item) => (
              <div
                key={item.step}
                className="rounded-[30px] border border-white/10 bg-[#0f2236] p-6 shadow-[0_10px_24px_rgba(0,0,0,0.14)]"
              >
                <div className="text-5xl font-extrabold text-[#FF8A00]/25">
                  {item.step}
                </div>
                <h3 className="mt-4 text-xl font-extrabold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/68">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="download" className="bg-[#0b2035]">
          <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
            <div className="flex flex-col justify-center">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
                Download the mobile app
              </div>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Take Smart Garage with you
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/70">
                Manage your vehicles from your phone with the same Smart Garage
                experience. Add reminders, check expenses, and ask the AI
                mechanic on the go.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <StoreButton
                  href={APP_STORE_URL}
                  title="App Store"
                  subtitle="Download for iPhone"
                />
                <StoreButton
                  href={PLAY_STORE_URL}
                  title="Google Play"
                  subtitle="Download for Android"
                />
              </div>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/70">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2">
                  <BadgeCheck className="h-4 w-4 text-[#FF8A00]" />
                  Mobile access anywhere
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2">
                  <BadgeCheck className="h-4 w-4 text-[#FF8A00]" />
                  Same account across web and mobile
                </div>
              </div>
            </div>

            <div className="rounded-[34px] border border-white/10 bg-gradient-to-br from-[#10253d] to-[#0b1c2e] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
              <div className="mx-auto max-w-[320px] rounded-[34px] border border-white/10 bg-[#07192b] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                <div className="rounded-[28px] bg-[#09192a] p-4">
                  <div className="mb-4 rounded-2xl bg-white px-4 py-3 text-[#111827]">
                    <div className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#6b7280]">
                      Smart Garage
                    </div>
                    <div className="mt-1 text-xl font-extrabold">
                      Mobile App
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-2xl bg-white p-4 text-[#111827]">
                      <div className="font-extrabold">Vehicle dashboard</div>
                      <div className="mt-1 text-sm text-[#6b7280]">
                        Open your car details anywhere
                      </div>
                    </div>

                    <div className="rounded-2xl bg-[#506caa] p-4 text-white">
                      <div className="font-extrabold">AI mechanic chat</div>
                      <div className="mt-1 text-sm text-white/85">
                        Ask questions when issues happen
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white p-4 text-[#111827]">
                      <div className="font-extrabold">Reminders & expenses</div>
                      <div className="mt-1 text-sm text-[#6b7280]">
                        Track everything on the move
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 text-center text-sm text-white/62">
                Add your real store links and this section becomes production-ready.
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-[1000px] px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
              FAQ
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Questions before users sign up
            </h2>
          </div>

          <div className="mt-10 space-y-3 text-left">
            {FAQS.map((faq) => (
              <FaqItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-[40px] bg-gradient-to-br from-[#10253d] to-[#0b1c2e] p-8 text-center shadow-[0_20px_70px_rgba(0,0,0,0.32)] ring-1 ring-white/8 sm:p-10">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Start managing your garage properly
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/72">
              Put your vehicles, reminders, expenses, and AI support in one
              cleaner system across web and mobile.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              {user ? (
                <Link
                  to="/app"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#FF8A00] px-6 text-sm font-extrabold text-[#111827] transition hover:brightness-95"
                >
                  Open App
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/sign-up"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#FF8A00] px-6 text-sm font-extrabold text-[#111827] transition hover:brightness-95"
                  >
                    Sign Up
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/sign-in"
                    className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/15 px-6 text-sm font-bold text-white/90 transition hover:bg-white/5"
                  >
                    Log In
                  </Link>
                </>
              )}
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <StoreButton
                href={APP_STORE_URL}
                title="App Store"
                subtitle="iPhone"
              />
              <StoreButton
                href={PLAY_STORE_URL}
                title="Google Play"
                subtitle="Android"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#07192b]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <div className="text-[24px] font-extrabold tracking-tight text-[#FF8A00]">
              Smart Garage
            </div>
            <div className="text-sm text-white/55">
              Vehicle manager + AI mechanic
            </div>
          </div>

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
            <a href={APP_STORE_URL} target="_blank" rel="noreferrer" className="hover:text-white">
              App Store
            </a>
            <a href={PLAY_STORE_URL} target="_blank" rel="noreferrer" className="hover:text-white">
              Google Play
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}