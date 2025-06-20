import TeacherLayout from "@/components/layouts/teacher-layout"
import { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return <TeacherLayout>{children}</TeacherLayout>
}
