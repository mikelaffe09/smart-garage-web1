import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, CircleAlert, Info, X } from "lucide-react";

type ToastVariant = "success" | "error" | "info";

type ToastItem = {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  showToast: (input: {
    title: string;
    description?: string;
    variant?: ToastVariant;
  }) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

function getToastClasses(variant: ToastVariant) {
  if (variant === "success") {
    return {
      wrapper: "border-emerald-200 bg-emerald-50 text-emerald-900",
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
    };
  }

  if (variant === "error") {
    return {
      wrapper: "border-red-200 bg-red-50 text-red-900",
      icon: <CircleAlert className="h-5 w-5 text-red-600" />,
    };
  }

  return {
    wrapper: "border-sky-200 bg-sky-50 text-sky-900",
    icon: <Info className="h-5 w-5 text-sky-600" />,
  };
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const showToast = useCallback(
    ({
      title,
      description,
      variant = "info",
    }: {
      title: string;
      description?: string;
      variant?: ToastVariant;
    }) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

      setToasts((prev) => [...prev, { id, title, description, variant }]);

      window.setTimeout(() => {
        removeToast(id);
      }, 3500);
    },
    [removeToast]
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[min(380px,calc(100vw-2rem))] flex-col gap-3">
        {toasts.map((toast) => {
          const ui = getToastClasses(toast.variant);

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto rounded-2xl border px-4 py-4 shadow-[0_16px_40px_rgba(0,0,0,0.18)] ${ui.wrapper}`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">{ui.icon}</div>

                <div className="min-w-0 flex-1">
                  <div className="text-sm font-extrabold">{toast.title}</div>
                  {toast.description ? (
                    <div className="mt-1 text-sm opacity-85">
                      {toast.description}
                    </div>
                  ) : null}
                </div>

                <button
                  type="button"
                  onClick={() => removeToast(toast.id)}
                  className="rounded-full p-1 opacity-60 transition hover:bg-black/5 hover:opacity-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToastContext must be used inside ToastProvider.");
  }

  return context;
}