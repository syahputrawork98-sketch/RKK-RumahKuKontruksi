import type { Metadata } from "next";
import { LoginPageContent } from "@/components/sections/login-page";

export const metadata: Metadata = {
  title: "Login",
  description: "Halaman login RumahkuKonstruksi untuk mengakses area operasional internal.",
};

export default function LoginPage() {
  return <LoginPageContent />;
}
