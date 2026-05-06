"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextField } from "@/components/ui/text-field";
import { Container } from "@/components/layout/container";

type LoginError = {
  error?: {
    code?: string;
    message?: string;
  };
};

export function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("budi@company.com");
  const [password, setPassword] = useState("secret123");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const nextPath = searchParams.get("next") ?? "/dashboard";

  useEffect(() => {
    const emailFromQuery = searchParams.get("email");
    if (emailFromQuery) {
      setEmail(emailFromQuery);
      setPassword("");
    }
  }, [searchParams]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as LoginError | null;
        setErrorMessage(body?.error?.message ?? "Login gagal.");
        return;
      }

      router.push(nextPath);
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
            <CardTitle>Masuk Akun</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
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

              {errorMessage ? <p className="text-sm text-[var(--color-danger)]">{errorMessage}</p> : null}

              <div className="flex items-center gap-2">
                <Button type="submit" isLoading={isSubmitting}>
                  {isSubmitting ? "Memproses..." : "Masuk"}
                </Button>
                <a
                  href="/register"
                  className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                >
                  Belum punya akun?
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
