import type { EstimasiResult } from "@/types/estimasi.types";

export type AiEstimasiMode = "AI" | "FALLBACK";

export type AiEstimasiDecision = {
  mode: AiEstimasiMode;
  reason: string | null;
  confidenceScore: number | null;
  needsHumanValidation: boolean;
  summary: string;
  assumptions: string[];
  recommendedActions: string[];
  result: EstimasiResult;
};
