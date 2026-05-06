"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { TextField } from "@/components/ui/text-field";
import { calculateEstimasi, parseEstimasiInput, validateEstimasiInput } from "@/features/estimasi";

type FormState = {
  areaM2: string;
  floors: string;
  quality: string;
  durationMonths: string;
  workerCount: string;
  contingencyPct: string;
};

const QUALITY_OPTIONS = [
  { value: "basic", label: "Basic" },
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium" },
];

export function EstimasiPageClient() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    areaM2: "120",
    floors: "2",
    quality: "standard",
    durationMonths: "8",
    workerCount: "18",
    contingencyPct: "10",
  });
  const [submitError, setSubmitError] = useState<string | null>(null);

  const parsedInput = useMemo(() => parseEstimasiInput(form), [form]);
  const fieldErrors = useMemo(() => validateEstimasiInput(parsedInput), [parsedInput]);
  const preview = useMemo(() => calculateEstimasi(parsedInput), [parsedInput]);

  function hasErrors() {
    return Object.values(fieldErrors).some(Boolean);
  }

  function setField<K extends keyof FormState>(key: K, value: string) {
    setForm((previous) => ({ ...previous, [key]: value }));
  }

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    if (hasErrors()) {
      setSubmitError("Periksa kembali input. Masih ada field yang tidak valid.");
      return;
    }

    const params = new URLSearchParams({
      areaM2: String(parsedInput.areaM2),
      floors: String(parsedInput.floors),
      quality: parsedInput.quality,
      durationMonths: String(parsedInput.durationMonths),
      workerCount: String(parsedInput.workerCount),
      contingencyPct: String(parsedInput.contingencyPct),
    });

    router.push(`/estimasi/hasil?${params.toString()}`);
  }

  return (
    <main className="bg-[var(--color-background)] py-12">
      <section className="mx-auto grid w-full max-w-[1280px] gap-6 px-6 lg:grid-cols-3 lg:px-8">
        <Card variant="bordered" className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Form Estimasi Biaya</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={submitForm}>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  label="Luas Bangunan (m2)"
                  type="number"
                  value={form.areaM2}
                  onChange={(event) => setField("areaM2", event.target.value)}
                  error={fieldErrors.areaM2}
                />
                <TextField
                  label="Jumlah Lantai"
                  type="number"
                  value={form.floors}
                  onChange={(event) => setField("floors", event.target.value)}
                  error={fieldErrors.floors}
                />
                <Select
                  label="Kualitas Material"
                  value={form.quality}
                  onChange={(event) => setField("quality", event.target.value)}
                  options={QUALITY_OPTIONS}
                />
                <TextField
                  label="Durasi Proyek (bulan)"
                  type="number"
                  value={form.durationMonths}
                  onChange={(event) => setField("durationMonths", event.target.value)}
                  error={fieldErrors.durationMonths}
                />
                <TextField
                  label="Jumlah Pekerja"
                  type="number"
                  value={form.workerCount}
                  onChange={(event) => setField("workerCount", event.target.value)}
                  error={fieldErrors.workerCount}
                />
                <TextField
                  label="Contingency (%)"
                  type="number"
                  value={form.contingencyPct}
                  onChange={(event) => setField("contingencyPct", event.target.value)}
                  error={fieldErrors.contingencyPct}
                />
              </div>

              {submitError ? <p className="text-sm text-[var(--color-danger)]">{submitError}</p> : null}

              <div className="flex items-center gap-2">
                <Button type="submit">Lihat Ringkasan</Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() =>
                    setForm({
                      areaM2: "120",
                      floors: "2",
                      quality: "standard",
                      durationMonths: "8",
                      workerCount: "18",
                      contingencyPct: "10",
                    })
                  }
                >
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Preview Cepat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-[var(--color-text-secondary)]">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <strong className="text-[var(--color-text-primary)]">
                Rp {Math.round(preview.subtotal).toLocaleString("id-ID")}
              </strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Contingency</span>
              <strong className="text-[var(--color-text-primary)]">
                Rp {Math.round(preview.contingencyAmount).toLocaleString("id-ID")}
              </strong>
            </div>
            <div className="h-px w-full bg-[var(--color-divider)]" />
            <div className="flex items-center justify-between">
              <span>Total Estimasi</span>
              <strong className="text-lg text-[var(--color-primary)]">
                Rp {Math.round(preview.total).toLocaleString("id-ID")}
              </strong>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
