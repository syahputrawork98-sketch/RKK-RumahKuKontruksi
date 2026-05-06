import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "Halaman autentikasi pengguna RumahkuKonstruksi.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
