import { Container } from "@/components/layout/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FEATURES = [
  {
    title: "Arsitektur Modular",
    desc: "Struktur folder berbasis domain untuk memisahkan UI, logic fitur, dan integrasi API.",
  },
  {
    title: "Design System Konsisten",
    desc: "Semantic token untuk warna, tipografi, spacing, dan komponen dasar lintas halaman.",
  },
  {
    title: "API Contract Ready",
    desc: "Frontend disiapkan untuk envelope response, mapping state, dan workflow process state.",
  },
];

export function Features() {
  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <Container className="py-20">
        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">Fondasi Utama</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {FEATURES.map((item) => (
            <Card key={item.title} variant="bordered" padding="md" className="bg-[var(--color-surface-secondary)]">
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-[var(--color-text-secondary)]">{item.desc}</CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
