import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, BookOpen, DollarSign, Users } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Users"
          value="2,845"
          change="+12% from last month"
          icon={<Users className="h-5 w-5 text-[#ef4444]" />}
          bgColor="bg-red-50"
        />
        <StatCard
          title="Total Courses"
          value="124"
          change="+5 new this week"
          icon={<BookOpen className="h-5 w-5 text-[#0ea5e9]" />}
          bgColor="bg-blue-50"
        />
        <StatCard
          title="Revenue"
          value="$48,294"
          change="+18% from last month"
          icon={<DollarSign className="h-5 w-5 text-[#10b981]" />}
          bgColor="bg-green-50"
        />
        <StatCard
          title="Active Subscriptions"
          value="1,432"
          change="+7% from last month"
          icon={<BarChart className="h-5 w-5 text-[#8b5cf6]" />}
          bgColor="bg-purple-50"
        />
      </div>

      {/* Additional dashboard content would go here */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Activity content would go here</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p>System status content would go here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  change,
  icon,
  bgColor,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  bgColor: string;
}) {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#6b7280]">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <p className="text-xs text-[#10b981] mt-1">{change}</p>
          </div>
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${bgColor}`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
