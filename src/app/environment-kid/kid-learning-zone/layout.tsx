import KidLayout from "@/components/layouts/kid-layout"
import { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return <KidLayout>{children}</KidLayout>
}
