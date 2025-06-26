"use client";

import { ReactNode } from "react";
import { EnvironmentKidGuard } from "@/components/guards/RouteGuard";

export default function EnvironmentKidLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <EnvironmentKidGuard>{children}</EnvironmentKidGuard>;
}
