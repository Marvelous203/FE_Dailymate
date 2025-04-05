import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  UserCog,
  ClapperboardIcon as ChalkboardTeacher,
  Users,
} from "lucide-react";

export default function RoleSelect() {
  return (
    <main className="min-h-screen bg-[#ecffee] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1e1e1e]">
            Select Your Role
          </h1>
          <p className="text-[#4b5563] mt-2">
            Choose how you want to access EduKids
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RoleCard
            title="Administrator"
            description="Manage courses, users, and platform settings"
            icon={<UserCog size={48} className="text-[#ef4444]" />}
            color="bg-red-50"
            href="/admin/dashboard"
          />

          <RoleCard
            title="Teacher"
            description="Create content and manage your classes"
            icon={<ChalkboardTeacher size={48} className="text-[#702dff]" />}
            color="bg-purple-50"
            href="/teacher/dashboard"
          />

          <RoleCard
            title="Parent"
            description="Monitor your child's progress and purchase courses"
            icon={<Users size={48} className="text-[#8b5cf6]" />}
            color="bg-violet-50"
            href="/parent/dashboard"
          />
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="text-[#10b981] font-medium">
            Back to login
          </Link>
        </div>
      </div>
    </main>
  );
}

function RoleCard({
  title,
  description,
  icon,
  color,
  href,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <Card className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
        <CardContent className="p-6 flex flex-col items-center text-center h-full">
          <div
            className={`w-16 h-16 rounded-full ${color} flex items-center justify-center mb-4`}
          >
            {icon}
          </div>
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-[#4b5563]">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
