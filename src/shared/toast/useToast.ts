import { useToastContext } from "@/shared/toast/ToastProvider";

export function useToast() {
  return useToastContext();
}