import type { Metadata } from "next";
import { DashboardTopbar } from "@/components/layout/dashboard-topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Ringkasan operasional utama RumahkuKonstruksi berdasarkan role aktif.",
};

export default function DashboardPage() {
  return (
    <section>
      <DashboardTopbar
        title="Dashboard Overview"
        subtitle="Fondasi struktur dashboard, state handling, dan komponen reusable sudah siap."
      />

      <div className="space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card variant="bordered">
            <CardHeader>
              <CardTitle className="text-sm text-[var(--color-text-muted)]">Total Proyek</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <strong className="text-2xl">18</strong>
              <Badge variant="success" size="sm">+4 bulan ini</Badge>
            </CardContent>
          </Card>

          <Card variant="bordered">
            <CardHeader>
              <CardTitle className="text-sm text-[var(--color-text-muted)]">Perlu Approval</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <strong className="text-2xl">5</strong>
              <Badge variant="warning" size="sm">Pending</Badge>
            </CardContent>
          </Card>

          <Card variant="bordered">
            <CardHeader>
              <CardTitle className="text-sm text-[var(--color-text-muted)]">Risiko Tinggi</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <strong className="text-2xl">2</strong>
              <Badge variant="error" size="sm">Perhatian</Badge>
            </CardContent>
          </Card>

          <Card variant="bordered">
            <CardHeader>
              <CardTitle className="text-sm text-[var(--color-text-muted)]">Vendor Aktif</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <strong className="text-2xl">27</strong>
              <Badge variant="info" size="sm">Terverifikasi</Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card variant="elevated" className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Loading State Contoh</CardTitle>
            </CardHeader>
            <CardContent>
              <LoadingState lines={6} />
            </CardContent>
          </Card>

          <EmptyState
            title="Belum Ada Data Proyek"
            message="Saat ini belum ada proyek pada filter aktif. Ubah filter atau buat proyek baru."
            action={<a href="/estimasi"><Button size="sm">Buka Estimasi</Button></a>}
          />
        </div>

        <ErrorState
          title="Koneksi API Gagal"
          message="Gagal memuat ringkasan dashboard. Coba lagi beberapa saat atau periksa koneksi backend."
        />
      </div>
    </section>
  );
}

