import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { LoadingState } from "@/components/loading-state";

export default function MarketplaceLoading() {
  return (
    <main className="bg-[var(--color-background)] py-12">
      <Container>
        <Card variant="bordered">
          <CardHeader>
            <CardTitle>Memuat Marketplace...</CardTitle>
          </CardHeader>
          <CardContent>
            <LoadingState lines={6} />
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
