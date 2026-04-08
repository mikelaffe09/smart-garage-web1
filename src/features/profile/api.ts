import { apiFetch } from "@/shared/api/client";

export async function deleteProfile() {
  return apiFetch<unknown>("/api/profile", {
    method: "DELETE",
  });
}