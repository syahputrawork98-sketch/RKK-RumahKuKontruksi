import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { ErrorState } from "@/components/error-state";
import { EmptyState } from "@/components/empty-state";
import { getServerAuthHeaders } from "@/lib/auth-server";
import { api } from "@/lib/api";

export const metadata: Metadata = {
  title: "Projects",
  description: "Daftar proyek aktif dan status pelaksanaan pada sistem RumahkuKonstruksi.",
};

function getErrorMessage(err: unknown): string {
  if (typeof err === "object" && err !== null && "message" in err) {
    const message = (err as { message?: unknown }).message;
    if (typeof message === "string") return message;
  }
  return "Unknown error";
}

export default async function ProjectsPage() {
  const result = await api
    .get("/projects", {
      query: { status: "execution", page: 1, limit: 10 },
      headers: {
        ...(await getServerAuthHeaders()),
        Prefer: "example=sample",
      },
    })
    .then((projects) => ({ projects, error: null as string | null }))
    .catch((err: unknown) => ({ projects: null, error: getErrorMessage(err) }));

  return (
    <main className="bg-[var(--color-background)] py-12">
      <Container className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-[var(--color-text-primary)]">Projects</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Daftar proyek aktif dari API kontrak.</p>
        </div>

        {result.error ? (
          <ErrorState message={result.error} />
        ) : result.projects && result.projects.length > 0 ? (
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Project List</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-[var(--color-divider)]">
                {result.projects.map((project) => (
                  <li key={project.id} className="py-3">
                    <Link
                      href={`/projects/${project.id}`}
                      className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                    >
                      {project.name}
                    </Link>
                    <p className="text-sm text-[var(--color-text-muted)]">Status: {project.status}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ) : (
          <EmptyState
            title="Belum ada proyek"
            message="Data proyek belum tersedia pada environment mock saat ini."
          />
        )}
      </Container>
    </main>
  );
}


