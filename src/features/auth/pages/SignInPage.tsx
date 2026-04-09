import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/shared/supabase/client";
import { AppLogo } from "@/shared/ui/AppLogo"; 

export function SignInPage() {
 
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTo =
    (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || "/app";

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    navigate(redirectTo, { replace: true });
  }

  return (
    <div>

       <div className="mb-8 flex justify-center">
        <AppLogo />
      </div>
      <div className="mb-8">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FF8A00]">
          Smart Garage
        </div>
        <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-[#111827]">
          Welcome back
        </h2>
        <p className="mt-3 max-w-md text-[15px] leading-7 text-[#6b7280]">
          Sign in to access your vehicles, reminders, expenses, and AI mechanic chat.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#374151]">Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-12 w-full rounded-2xl border border-[#e5e7eb] bg-white px-4 text-[#111827] transition focus:border-[#cbd5e1] focus:ring-4 focus:ring-[#e5eefc]"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#374151]">Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-12 w-full rounded-2xl border border-[#e5e7eb] bg-white px-4 text-[#111827] transition focus:border-[#cbd5e1] focus:ring-4 focus:ring-[#e5eefc]"
            placeholder="Enter your password"
            required
          />
        </div>

        {errorMessage ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full rounded-2xl bg-[#09192a] text-sm font-bold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="mt-6 text-sm text-[#6b7280]">
        Don’t have an account?{" "}
        <Link to="/sign-up" className="font-semibold text-[#111827]">
          Create one
        </Link>
      </p>
    </div>
  );
}