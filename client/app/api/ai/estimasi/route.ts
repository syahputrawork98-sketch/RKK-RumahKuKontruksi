import { parseEstimasiInput, validateEstimasiInput } from "@/features/estimasi";
import { generateAiEstimasiDecision } from "@/services/ai-estimasi.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload || typeof payload !== "object") {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "Payload estimasi tidak valid.",
        },
      },
      { status: 400 }
    );
  }

  const input = parseEstimasiInput(payload as Record<string, string | number>);
  const errors = validateEstimasiInput(input);
  const hasError = Object.values(errors).some(Boolean);

  if (hasError) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "Input estimasi belum valid.",
          details: errors,
        },
      },
      { status: 422 }
    );
  }

  const decision = await generateAiEstimasiDecision(input);

  return NextResponse.json({
    success: true,
    message: "Estimasi berhasil dihitung.",
    data: decision,
    meta: {
      process_state: decision.mode === "AI" ? "AI_SCORING" : "FALLBACK_RULE_BASED",
      allowed_actions: ["RECALCULATE", "REQUEST_HUMAN_VALIDATION"],
    },
  });
}
