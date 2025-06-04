import KidParentLayout from "@/components/layouts/kid-parent-layout"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <KidParentLayout>{children}</KidParentLayout>
}
