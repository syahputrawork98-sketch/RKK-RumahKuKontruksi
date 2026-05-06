"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextField } from "@/components/ui/text-field";
import { Container } from "@/components/layout/container";

type RegisterError = {
  error?: {
    code?: string;
    message?: string;
  };
};

export function RegisterPageContent() {
  const router = useRouter();

  const [name, setName] = useState("Budi Santoso");
  const [email, setEmail] = useState("budi@company.com");
  const [password, setPassword] = useState("secret123");
  const [confirmPassword, setConfirmPassword] = useState("secret123");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage("Konfirmasi password tidak sama.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const body = await response.json().catch(() => null);

      if (!response.ok) {
        const payload = body as RegisterError | null;
        setErrorMessage(payload?.error?.message ?? "Register gagal.");
        return;
      }

      setSuccessMessage("Registrasi berhasil. Lanjutkan login.");
      router.push(`/login?email=${encodeURIComponent(email)}`);
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="bg-[var(--color-background)] py-16">
      <Container className="max-w-xl">
        <Card variant="bordered" padding="lg">
          <CardHeader>
            <CardTitle>Daftar Akun</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <TextField label="Nama Lengkap" required value={name} onChange={(event) => setName(event.target.value)} />
              <TextField
                label="Email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <TextField
                label="Konfirmasi Password"
                type="password"
                required
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />

              {errorMessage ? <p className="text-sm text-[var(--color-danger)]">{errorMessage}</p> : null}
              {successMessage ? <p className="text-sm text-[var(--color-success)]">{successMessage}</p> : null}

              <div className="flex items-center gap-2">
                <Button type="submit" isLoading={isSubmitting}>
                  {isSubmitting ? "Memproses..." : "Daftar"}
                </Button>
                <a href="/login" className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]">
                  Sudah punya akun?
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
