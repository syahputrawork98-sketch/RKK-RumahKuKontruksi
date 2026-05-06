import type { Metadata } from "next";
import { EstimasiPageClient } from "./estimasi-page-client";

export const metadata: Metadata = {
  title: "Estimasi Biaya",
  description: "Form estimasi biaya konstruksi berbasis parameter proyek utama.",
};

export default function EstimasiPage() {
  return <EstimasiPageClient />;
}
