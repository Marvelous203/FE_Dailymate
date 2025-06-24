"use client";

import KidLayout from "@/components/layouts/kid-layout";
import { EnvironmentKidGuard } from "@/components/guards/RouteGuard";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <EnvironmentKidGuard requireKidAuth={true}>
      <KidLayout>{children}</KidLayout>
    </EnvironmentKidGuard>
  );
}
