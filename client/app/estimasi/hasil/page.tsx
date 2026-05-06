import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/empty-state";
import { parseEstimasiInput, validateEstimasiInput } from "@/features/estimasi";
import { generateAiEstimasiDecision } from "@/services/ai-estimasi.service";
import { formatCurrency } from "@/utils/format";

export const metadata: Metadata = {
  title: "Hasil Estimasi",
  description: "Ringkasan hasil perhitungan estimasi biaya konstruksi.",
};

type HasilPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function EstimasiHasilPage({ searchParams }: HasilPageProps) {
  const params = (await searchParams) ?? {};

  const input = parseEstimasiInput({
    areaM2: firstParam(params.areaM2),
    floors: firstParam(params.floors),
    quality: firstParam(params.quality),
    durationMonths: firstParam(params.durationMonths),
    workerCount: firstParam(params.workerCount),
    contingencyPct: firstParam(params.contingencyPct),
  });

  const errors = validateEstimasiInput(input);
  const hasErrors = Object.values(errors).some(Boolean);

  if (hasErrors) {
    return (
      <main className="bg-[var(--color-background)] py-12">
        <section className="mx-auto w-full max-w-[1280px] px-6 lg:px-8">
          <EmptyState
            title="Input Estimasi Tidak Valid"
            message="Data input tidak lengkap atau tidak valid. Kembali ke form estimasi untuk memperbaiki data."
            action={
              <Link href="/estimasi">
                <Button>Kembali ke Form</Button>
              </Link>
            }
          />
        </section>
      </main>
    );
  }

  const decision = await generateAiEstimasiDecision(input);
  const result = decision.result;

  return (
    <main className="bg-[var(--color-background)] py-12">
      <section className="mx-auto grid w-full max-w-[1280px] gap-6 px-6 lg:grid-cols-3 lg:px-8">
        <Card variant="bordered" className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Ringkasan Estimasi Biaya</CardTitle>
              <Badge variant={decision.mode === "AI" ? "info" : "warning"} size="sm">
                {decision.mode === "AI" ? "AI Mode" : "Fallback Mode"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {result.breakdown.map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm text-[var(--color-text-secondary)]">
                <span>{item.label}</span>
                <strong className="text-[var(--color-text-primary)]">{formatCurrency(item.amount)}</strong>
              </div>
            ))}
            <div className="h-px w-full bg-[var(--color-divider)]" />
            <div className="flex items-center justify-between text-sm text-[var(--color-text-secondary)]">
              <span>Contingency ({input.contingencyPct}%)</span>
              <strong className="text-[var(--color-text-primary)]">{formatCurrency(result.contingencyAmount)}</strong>
            </div>
            <div className="flex items-center justify-between text-base">
              <span className="font-semibold text-[var(--color-text-primary)]">Total Estimasi</span>
              <strong className="text-xl text-[var(--color-primary)]">{formatCurrency(result.total)}</strong>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Parameter Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-[var(--color-text-secondary)]">
            <p>Luas: {input.areaM2} m2</p>
            <p>Lantai: {input.floors}</p>
            <p>Kualitas: {input.quality}</p>
            <p>Durasi: {input.durationMonths} bulan</p>
            <p>Pekerja: {input.workerCount} orang</p>
            <div className="mt-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                Human Validation Checkpoint
              </p>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{decision.summary}</p>
              <p className="mt-2 text-xs text-[var(--color-warning)]">
                Wajib review estimator sebelum nilai ini dipakai untuk keputusan kontrak/final BOQ.
              </p>
            </div>
            <div className="pt-3">
              <Link href="/estimasi">
                <Button variant="secondary">Ubah Estimasi</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
