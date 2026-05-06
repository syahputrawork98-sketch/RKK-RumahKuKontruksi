import type { EstimasiInput, EstimasiResult, EstimasiValidationErrors } from "@/types/estimasi.types";

const QUALITY_FACTOR: Record<EstimasiInput["quality"], number> = {
  basic: 1,
  standard: 1.15,
  premium: 1.35,
};

const BASE_COST_PER_M2 = 3_500_000;
const LABOR_COST_PER_WORKER_PER_MONTH = 4_500_000;

type PartialInput = Partial<Record<keyof EstimasiInput, number | string>>;

export function parseEstimasiInput(values: PartialInput): EstimasiInput {
  const qualityRaw = String(values.quality ?? "standard").toLowerCase();
  const quality =
    qualityRaw === "basic" || qualityRaw === "premium" || qualityRaw === "standard"
      ? qualityRaw
      : "standard";

  return {
    areaM2: Number(values.areaM2 ?? 0),
    floors: Number(values.floors ?? 0),
    quality,
    durationMonths: Number(values.durationMonths ?? 0),
    workerCount: Number(values.workerCount ?? 0),
    contingencyPct: Number(values.contingencyPct ?? 0),
  };
}

export function validateEstimasiInput(input: EstimasiInput): EstimasiValidationErrors {
  const errors: EstimasiValidationErrors = {};

  if (!Number.isFinite(input.areaM2) || input.areaM2 < 12 || input.areaM2 > 10000) {
    errors.areaM2 = "Luas bangunan harus antara 12 - 10.000 m2.";
  }

  if (!Number.isInteger(input.floors) || input.floors < 1 || input.floors > 5) {
    errors.floors = "Jumlah lantai harus antara 1 - 5.";
  }

  if (!Number.isInteger(input.durationMonths) || input.durationMonths < 1 || input.durationMonths > 36) {
    errors.durationMonths = "Durasi proyek harus antara 1 - 36 bulan.";
  }

  if (!Number.isInteger(input.workerCount) || input.workerCount < 1 || input.workerCount > 200) {
    errors.workerCount = "Jumlah pekerja harus antara 1 - 200 orang.";
  }

  if (!Number.isFinite(input.contingencyPct) || input.contingencyPct < 0 || input.contingencyPct > 30) {
    errors.contingencyPct = "Contingency harus antara 0% - 30%.";
  }

  return errors;
}

export function calculateEstimasi(input: EstimasiInput): EstimasiResult {
  const qualityFactor = QUALITY_FACTOR[input.quality];
  const floorFactor = 1 + (input.floors - 1) * 0.12;

  const materialCost = input.areaM2 * BASE_COST_PER_M2 * qualityFactor * floorFactor;
  const laborCost = input.workerCount * input.durationMonths * LABOR_COST_PER_WORKER_PER_MONTH;
  const designAndSupervision = materialCost * 0.05;
  const permitAndAdministration = materialCost * 0.03;
  const equipmentAndLogistics = materialCost * 0.04;

  const subtotal =
    materialCost + laborCost + designAndSupervision + permitAndAdministration + equipmentAndLogistics;

  const contingencyAmount = subtotal * (input.contingencyPct / 100);
  const total = subtotal + contingencyAmount;

  return {
    subtotal,
    contingencyAmount,
    total,
    breakdown: [
      { label: "Biaya Material", amount: materialCost },
      { label: "Biaya Tenaga Kerja", amount: laborCost },
      { label: "Desain & Supervisi", amount: designAndSupervision },
      { label: "Perizinan & Administrasi", amount: permitAndAdministration },
      { label: "Peralatan & Logistik", amount: equipmentAndLogistics },
    ],
  };
}
