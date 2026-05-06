import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (
    !payload ||
    typeof payload !== "object" ||
    typeof (payload as { supplierId?: unknown }).supplierId !== "string" ||
    typeof (payload as { projectName?: unknown }).projectName !== "string" ||
    typeof (payload as { budget?: unknown }).budget !== "number" ||
    !Number.isFinite((payload as { budget: number }).budget) ||
    (payload as { budget: number }).budget <= 0 ||
    typeof (payload as { startDate?: unknown }).startDate !== "string" ||
    typeof (payload as { message?: unknown }).message !== "string"
  ) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "Data proposal tidak valid. Periksa kembali form Anda.",
        },
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Proposal submitted",
      data: {
        proposalId: `prp-${Date.now()}`,
      },
    },
    { status: 201 }
  );
}
