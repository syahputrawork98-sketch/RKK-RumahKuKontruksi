import type { Metadata } from "next";
import { ShowcasePageContent } from "@/components/sections/showcase-page";

export const metadata: Metadata = {
  title: "Showcase Komponen",
  description: "Halaman showcase untuk memvalidasi komponen dan design token RumahkuKonstruksi.",
};

export default function ShowcasePage() {
  return <ShowcasePageContent />;
}
