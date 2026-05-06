import type { Metadata } from "next";
import { RegisterPageContent } from "@/components/sections/register-page";

export const metadata: Metadata = {
  title: "Register",
  description: "Pendaftaran akun RumahkuKonstruksi.",
};

export default function RegisterPage() {
  return <RegisterPageContent />;
}
