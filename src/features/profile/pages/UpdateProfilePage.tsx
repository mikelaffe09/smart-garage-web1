import { FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth";
import { supabase } from "@/shared/supabase/client";
import { useToast } from "@/shared/toast/useToast";

export function UpdateProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const initialName = useMemo(() => {
    return ((user?.user_metadata?.name as string | undefined) ?? "").trim();
  }, [user]);

  const [name, setName] = useState(initialName);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const cleanName = name.trim();

    if (!cleanName) {
      showToast({
        title: "Invalid name",
        description: "Enter a valid name first.",
        variant: "error",
      });
      return;
    }

    try {
      setSaving(true);

      const { error } = await supabase.auth.updateUser({
        data: { name: cleanName },
      });

      if (error) {
        throw error;
      }

      // Force session refresh so the updated user metadata is reflected immediately.
      const { error: refreshError } = await supabase.auth.refreshSession();

      if (refreshError) {
        throw refreshError;
      }

      showToast({
        title: "Profile updated",
        description: "Your name was updated successfully.",
        variant: "success",
      });

      navigate("/app/profile");
    } catch (error) {
      showToast({
        title: "Failed to update profile",
        description:
          error instanceof Error ? error.message : "Please try again.",
        variant: "error",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5 pb-20 lg:pb-0">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-[#FF8A00]">
          Update Profile
        </h2>
        <p className="mt-2 text-sm leading-7 text-white/75">
          Change the name shown in your Smart Garage account.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-[28px] border border-white/10 bg-[#0f2236] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)] sm:p-6"
      >
        <label className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-[#cbd5e1]">
          Full Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your name"
          className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827] placeholder:text-[#9ca3af]"
        />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate("/app/profile")}
            className="h-12 flex-1 rounded-2xl border border-white/20 bg-transparent px-5 text-sm font-extrabold text-white transition hover:bg-white/10"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="h-12 flex-1 rounded-2xl bg-[#FF8A00] px-5 text-sm font-extrabold text-[#0B1220] transition hover:brightness-95 disabled:opacity-70"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}