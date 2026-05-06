"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { Divider } from "@/components/ui/divider";
import { Modal } from "@/components/ui/modal";
import { TextField } from "@/components/ui/text-field";

export function ShowcasePageContent() {
  const [open, setOpen] = useState(false);

  return (
    <main className="bg-[var(--color-background)] py-12 text-[var(--color-text-primary)]">
      <Container className="space-y-8">
        <section className="space-y-2">
          <h1 className="text-3xl font-semibold">Component Showcase</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Halaman publik untuk validasi visual komponen dasar berbasis semantic token.
          </p>
        </section>

        <Card variant="bordered" padding="lg">
          <CardHeader>
            <CardTitle>Buttons & Badge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="tertiary">Tertiary</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <Divider />
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </CardContent>
        </Card>

        <Card variant="bordered" padding="lg">
          <CardHeader>
            <CardTitle>Form & Modal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <TextField label="Nama Proyek" placeholder="Contoh: Renovasi Gudang" hint="Contoh input sesuai style system" />
            <div className="flex gap-2">
              <Button onClick={() => setOpen(true)}>Buka Modal</Button>
            </div>
          </CardContent>
        </Card>
      </Container>

      <Modal open={open} onOpenChange={setOpen} title="Konfirmasi" size="md">
        <div className="space-y-4">
          <p>Semua komponen pada halaman ini sudah memakai semantic token.</p>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Tutup
            </Button>
            <Button onClick={() => setOpen(false)}>Lanjut</Button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
