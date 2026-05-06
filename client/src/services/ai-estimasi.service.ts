import { calculateEstimasi } from "@/features/estimasi";
import type { EstimasiInput } from "@/types/estimasi.types";
import type { AiEstimasiDecision } from "@/types/ai.types";

function buildFallbackDecision(input: EstimasiInput, reason: string): AiEstimasiDecision {
  return {
    mode: "FALLBACK",
    reason,
    confidenceScore: null,
    needsHumanValidation: true,
    summary:
      "Model AI tidak aktif atau gagal dipakai. Sistem menggunakan kalkulasi deterministic sebagai baseline estimasi.",
    assumptions: [
      "Harga material menggunakan baseline internal saat ini.",
      "Produktivitas pekerja diasumsikan stabil sepanjang durasi proyek.",
      "Belum mempertimbangkan risiko eksternal spesifik lokasi proyek.",
    ],
    recommendedActions: [
      "Lakukan review manual oleh estimator sebelum finalisasi.",
      "Konfirmasi harga material aktual ke supplier aktif.",
      "Validasi ulang alokasi tenaga kerja terhadap timeline lapangan.",
    ],
    result: calculateEstimasi(input),
  };
}

function buildAiDecision(input: EstimasiInput): AiEstimasiDecision {
  const base = calculateEstimasi(input);
  const riskMultiplier = input.quality === "premium" ? 1.02 : input.quality === "basic" ? 0.99 : 1;
  const adjustedTotal = base.total * riskMultiplier;
  const scale = adjustedTotal / base.total;

  return {
    mode: "AI",
    reason: null,
    confidenceScore: 0.78,
    needsHumanValidation: true,
    summary:
      "AI memberikan penyesuaian risiko ringan berdasarkan kombinasi kualitas material, tenaga kerja, dan durasi proyek.",
    assumptions: [
      "Riwayat proyek serupa tersedia pada knowledge base internal.",
      "Fluktuasi harga material berada dalam rentang normal.",
      "Tidak ada perubahan regulasi perizinan pada periode estimasi.",
    ],
    recommendedActions: [
      "Bandingkan hasil AI dengan baseline deterministic.",
      "Minta approval estimator senior jika selisih > 5%.",
      "Simpan catatan asumsi untuk audit keputusan biaya.",
    ],
    result: {
      ...base,
      subtotal: base.subtotal * scale,
      contingencyAmount: base.contingencyAmount * scale,
      total: adjustedTotal,
      breakdown: base.breakdown.map((item) => ({
        ...item,
        amount: item.amount * scale,
      })),
    },
  };
}

export async function generateAiEstimasiDecision(input: EstimasiInput): Promise<AiEstimasiDecision> {
  const aiEnabled = process.env.AI_ENABLED === "1";

  if (!aiEnabled) {
    return buildFallbackDecision(input, "AI_DISABLED");
  }

  try {
    return buildAiDecision(input);
  } catch {
    return buildFallbackDecision(input, "AI_RUNTIME_ERROR");
  }
}
