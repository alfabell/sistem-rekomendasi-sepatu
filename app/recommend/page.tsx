import { Suspense } from "react";

import { Container } from "@/components/Container";
import { Card } from "@/components/ui/Card";
import { RecommendClient } from "@/app/recommend/RecommendClient";

export default function RecommendPage() {
  return (
    <Suspense
      fallback={
        <Container>
          <Card className="p-6 animate-fade-up">
            <p className="font-semibold text-zinc-900">Loading...</p>
            <p className="text-sm text-zinc-600 mt-1">
              Menyiapkan halaman rekomendasi.
            </p>
          </Card>
        </Container>
      }
    >
      <RecommendClient />
    </Suspense>
  );
}