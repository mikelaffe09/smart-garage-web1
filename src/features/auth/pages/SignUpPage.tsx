import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/shared/supabase/client";
import { AppLogo } from "@/shared/ui/AppLogo";

export function SignUpPage() {


   <div className="mb-8 flex justify-center">
    <AppLogo />
  </div>

  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: fullName.trim(),
        },
      },
    });

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    navigate("/app", { replace: true });
  }

  return (
    <div>

       <div className="mb-8 flex justify-center">
          <AppLogo />
        </div>
      <div className="mb-8">
        <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-[#111827]">
          Create account
        </h2>
        <p className="mt-3 max-w-md text-[15px] leading-7 text-[#6b7280]">
          Start tracking your vehicles, maintenance, expenses, and AI assistance.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#374151]">Full name</label>
          <input
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className="h-12 w-full rounded-2xl border border-[#e5e7eb] bg-white px-4 text-[#111827] transition focus:border-[#cbd5e1] focus:ring-4 focus:ring-[#e5eefc]"
            placeholder="Your name"
            required
          />
        </div>

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
            placeholder="Create a password"
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
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <p className="mt-6 text-sm text-[#6b7280]">
        Already have an account?{" "}
        <Link to="/sign-in" className="font-semibold text-[#111827]">
          Sign in
        </Link>
      </p>
    </div>
  );
}