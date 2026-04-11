import { apiFetch } from "@/shared/api/client";

export async function deleteProfile() {
  return apiFetch<unknown>("/api/account/me", {
    method: "DELETE",
  });
}