import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "Portal publik RumahkuKonstruksi untuk akses modul, showcase UI, dan onboarding role demo.",
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
