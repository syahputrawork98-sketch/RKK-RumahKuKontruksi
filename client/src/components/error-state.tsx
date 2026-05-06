import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  title?: string;
  message: string;
};

export function ErrorState({ title = "Terjadi Kesalahan", message }: Props) {
  return (
    <Card variant="bordered" className="border-[var(--color-danger)]/40 bg-[var(--color-danger)]/5">
      <CardHeader>
        <CardTitle className="text-[var(--color-danger)]">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-[var(--color-text-secondary)]">{message}</CardContent>
    </Card>
  );
}
