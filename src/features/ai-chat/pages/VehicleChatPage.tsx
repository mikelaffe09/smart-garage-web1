import { FormEvent, useState } from "react";
import { AlertTriangle, Bot, SendHorizonal } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";
import { getMockVehicleById } from "@/features/vehicles/mockData";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

function buildReply(question: string, vehicleName: string) {
  const q = question.toLowerCase();

  if (q.includes("click") || q.includes("starting") || q.includes("start")) {
    return `For ${vehicleName}, a clicking sound while starting often points to a weak battery, poor terminal connection, or starter issue. Check battery voltage and terminal corrosion first.`;
  }

  if (q.includes("brake")) {
    return `If the brakes feel weak or noisy on ${vehicleName}, inspect pad thickness, rotor wear, and brake fluid level. Do not ignore vibration or grinding.`;
  }

  if (q.includes("oil")) {
    return `For oil-related questions on ${vehicleName}, start with oil level, service interval, leaks under the vehicle, and whether the engine is running rough or louder than usual.`;
  }

  if (q.includes("engine light") || q.includes("check engine")) {
    return `A check-engine light on ${vehicleName} needs a scan before guessing. Start with any recent symptoms, fuel cap tightness, idle quality, and whether the light is flashing or steady.`;
  }

  return `Based on your question about ${vehicleName}, start by identifying when the symptom happens, whether it is constant or intermittent, and if there are warning lights, fluid leaks, unusual sounds, or performance loss.`;
}

export function VehicleChatPage() {
  const { carId = "" } = useParams();
  const vehicle = getMockVehicleById(carId);

  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Ask a question about this vehicle. Example: My car is making a clicking sound when starting.",
    },
  ]);

  if (!vehicle) {
    return <Navigate to="/app/vehicles" replace />;
  }

  const vehicleTitle = `${vehicle.year} ${vehicle.vehicleName}`;
  const hasAiSupport = Boolean(vehicle.vehicleKey?.trim());

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const text = input.trim();
    if (!text || sending) return;

    if (!hasAiSupport) {
      window.alert(
        "Vehicle-specific AI support is not available yet for this custom vehicle."
      );
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSending(true);

    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: buildReply(text, vehicleTitle),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setSending(false);
    }, 700);
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
              This vehicle does not have a valid supported vehicle key, so the AI cannot answer vehicle-specific questions for it yet.
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
              <div className="text-sm leading-7">{message.text}</div>
            </div>
          ))}

          {sending ? (
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
            disabled={sending || !hasAiSupport}
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