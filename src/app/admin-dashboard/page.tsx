import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, DollarSign, LineChart, Users } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1e1e1e]">Admin Dashboard</h1>
          <p className="text-[#6b7280]">Welcome back, Admin! Here's an overview of the platform.</p>
        </div>

        <div className="flex gap-3">
          <Button className="bg-[#f15f6c] hover:bg-[#e74c3c]">
            <Users className="mr-2 h-4 w-4" />
            Add User
          </Button>
          <Button variant="outline">
            <LineChart className="mr-2 h-4 w-4" />
            Reports
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value="2,845"
          change="+12% from last month"
          icon={<Users className="h-5 w-5 text-[#f15f6c]" />}
          bgColor="bg-[#feccd6]"
        />
        <StatCard
          title="Total Courses"
          value="124"
          change="+5 new this week"
          icon={<BookOpen className="h-5 w-5 text-[#4dacc4]" />}
          bgColor="bg-[#d7ebf0]"
        />
        <StatCard
          title="Revenue"
          value="$48,294"
          change="+18% from last month"
          icon={<DollarSign className="h-5 w-5 text-[#10b981]" />}
          bgColor="bg-[#ebfdf4]"
        />
        <StatCard
          title="Active Subscriptions"
          value="1,432"
          change="+7% from last month"
          icon={<LineChart className="h-5 w-5 text-[#8b5cf6]" />}
          bgColor="bg-[#ede9fe]"
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-white w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
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
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>User management content would go here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="mt-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Course Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Course management content would go here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatCard({ title, value, change, icon, bgColor }) {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#6b7280]">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <p className="text-xs text-[#10b981] mt-1">{change}</p>
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bgColor}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}
