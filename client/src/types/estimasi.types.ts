export type EstimasiBreakdownItem = {
  label: string;
  amount: number;
};

export type EstimasiQuality = "basic" | "standard" | "premium";

export type EstimasiInput = {
  areaM2: number;
  floors: number;
  quality: EstimasiQuality;
  durationMonths: number;
  workerCount: number;
  contingencyPct: number;
};

export type EstimasiValidationErrors = Partial<Record<keyof EstimasiInput, string>>;

export type EstimasiResult = {
  subtotal: number;
  contingencyAmount: number;
  total: number;
  breakdown: EstimasiBreakdownItem[];
};
