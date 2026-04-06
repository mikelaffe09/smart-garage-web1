import { apiFetch } from "@/shared/api/client";

export type AskVehicleAiInput = {
  externalVehicleId: string;
  vehicleKey: string;
  vehicleName: string;
  vehicleModel: string;
  mileage: number;
  question: string;
};

export type AskVehicleAiResponse = {
  answer: string;
};

export async function askVehicleAi(input: AskVehicleAiInput) {
  if (!String(input.question || "").trim()) {
    throw new Error("Question is required");
  }

  return apiFetch<AskVehicleAiResponse>("/api/query/ask", {
    method: "POST",
    body: {
      externalVehicleId: input.externalVehicleId,
      vehicleKey: input.vehicleKey,
      vehicleName: input.vehicleName,
      vehicleModel: input.vehicleModel,
      mileage: Number(input.mileage || 0),
      question: input.question.trim(),
    },
  });
}