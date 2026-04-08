import { FormEvent, useMemo, useState } from "react";
import { AlertTriangle, Bot, SendHorizonal } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { askVehicleAi } from "@/features/ai-chat/api";
import { useVehicle } from "@/features/vehicles/hooks";
import { useToast } from "@/shared/toast/useToast";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

function splitVehicleName(vehicleName: string) {
  const s = String(vehicleName || "").trim();

  if (!s) {
    return { make: "", model: "" };
  }

  const parts = s.split(" ").filter(Boolean);

  if (parts.length === 1) {
    return { make: parts[0], model: parts[0] };
  }

  return {
    make: parts[0],
    model: parts.slice(1).join(" "),
  };
}

export function VehicleChatPage() {
  const { carId = "" } = useParams();
  const { showToast } = useToast();

  const vehicleQuery = useVehicle(carId);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Ask a question about this vehicle. Example: My car is making a clicking sound when starting.",
    },
  ]);

  const vehicle = vehicleQuery.data;

  const askMutation = useMutation({
    mutationFn: async (question: string) => {
      if (!vehicle) {
        throw new Error("Vehicle not found.");
      }

      const parsed = splitVehicleName(vehicle.vehicleName);

      return askVehicleAi({
        externalVehicleId: String(vehicle.id),
        vehicleKey: String(vehicle.vehicleKey || ""),
        vehicleName: String(vehicle.vehicleName || "").trim(),
        vehicleModel: parsed.model || vehicle.vehicleName || "",
        mileage: Number(vehicle.mileage || 0),
        question,
      });
    },
    onSuccess: (result) => {
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: result?.answer || "No answer returned by the AI service.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    },
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : "The AI request failed.";

      const assistantMessage: ChatMessage = {
        id: `assistant-error-${Date.now()}`,
        role: "assistant",
        text: message,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      showToast({
        title: "AI request failed",
        description: message,
        variant: "error",
      });
    },
  });

  const vehicleTitle = useMemo(() => {
    if (!vehicle) return "";
    return `${vehicle.year} ${vehicle.vehicleName}`;
  }, [vehicle]);

  const hasAiSupport = Boolean(
    vehicle?.vehicleKey && String(vehicle.vehicleKey).trim() !== "" && vehicle.vehicleKey !== "generic"
  );

  if (!vehicleQuery.isLoading && !vehicle) {
    return <Navigate to="/app/vehicles" replace />;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const text = input.trim();
    if (!text || askMutation.isPending || !vehicle) return;

    if (!hasAiSupport) {
      showToast({
        title: "AI not available for this vehicle",
        description:
          "This custom vehicle does not have a supported vehicle catalog key yet.",
        variant: "info",
      });
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    await askMutation.mutateAsync(text);
  }

  if (vehicleQuery.isLoading) {
    return (
      <div className="rounded-[24px] border border-white/10 bg-white p-5 text-[#111827] shadow-[0_10px_30px_rgba(0,0,0,0.14)]">
        Loading AI chat...
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-20 lg:pb-0">
      <section className="rounded-[28px] border border-white/10 bg-[#25324d] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.2)] sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FF8A00] text-[#0B1220]">
            <Bot className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-[28px] font-extrabold tracking-tight text-[#FF8A00]">
              AI Chat
            </h2>
            <p className="mt-2 text-sm text-[#e2e8f0]">Vehicle: {vehicleTitle}</p>
          </div>
        </div>

        {!hasAiSupport ? (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-800 bg-red-950/60 p-4 text-red-100">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <div className="text-sm leading-7">
              This vehicle does not have a supported vehicle key, so the AI cannot answer vehicle-specific questions for it yet.
            </div>
          </div>
        ) : null}

        <div className="mt-5 rounded-2xl bg-white/6 p-4 text-sm leading-7 text-white/75 ring-1 ring-white/10">
          Smart Garage AI can make mistakes. Verify important repairs with a qualified mechanic.
        </div>
      </section>

      <section className="rounded-[28px] bg-[#0f2236] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.18)] ring-1 ring-white/8 sm:p-5">
        <div className="max-h-[460px] space-y-3 overflow-y-auto pr-1">
          {messages.map((message) => (
            <div
              key={message.id}
              className={[
                "max-w-[85%] rounded-2xl border px-4 py-3 shadow-sm",
                message.role === "user"
                  ? "ml-auto border-[#FF8A00] bg-[#FF8A00] text-[#111827]"
                  : "border-[#e5e7eb] bg-white text-[#111827]",
              ].join(" ")}
            >
              <div className="mb-1 text-xs font-extrabold uppercase tracking-[0.1em] opacity-70">
                {message.role === "user" ? "You" : "AI"}
              </div>
              <div className="text-sm leading-7 whitespace-pre-wrap">{message.text}</div>
            </div>
          ))}

          {askMutation.isPending ? (
            <div className="max-w-[85%] rounded-2xl border border-[#e5e7eb] bg-white px-4 py-3 text-[#111827] shadow-sm">
              <div className="mb-1 text-xs font-extrabold uppercase tracking-[0.1em] opacity-70">
                AI
              </div>
              <div className="text-sm">Thinking...</div>
            </div>
          ) : null}
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col gap-3 sm:flex-row"
        >
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Describe the issue..."
            rows={3}
            className="min-h-[54px] flex-1 resize-none rounded-2xl border border-[#d1d5db] bg-white px-4 py-3 text-sm text-[#111827] placeholder:text-[#9ca3af]"
          />

          <button
            type="submit"
            disabled={askMutation.isPending || !hasAiSupport}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#FF8A00] px-5 text-sm font-extrabold text-[#111827] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <SendHorizonal className="h-4 w-4" />
            Send
          </button>
        </form>
      </section>
    </div>
  );
}