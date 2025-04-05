import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
} from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#1e1e1e]">
          Analytics Dashboard
        </h1>
        <div className="flex items-center gap-3">
          <Button variant="outline">This Month</Button>
          <Button variant="outline">Export Data</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Revenue"
          value="$48,294"
          change="+18% from last month"
          icon={<DollarSign className="h-5 w-5 text-[#ef4444]" />}
          bgColor="bg-red-50"
        />
        <StatCard
          title="Active Users"
          value="2,845"
          change="+12% from last month"
          icon={<Users className="h-5 w-5 text-[#0ea5e9]" />}
          bgColor="bg-blue-50"
        />
        <StatCard
          title="Course Enrollments"
          value="1,432"
          change="+7% from last month"
          icon={<BookOpen className="h-5 w-5 text-[#10b981]" />}
          bgColor="bg-green-50"
        />
        <StatCard
          title="Completion Rate"
          value="68%"
          change="+5% from last month"
          icon={<TrendingUp className="h-5 w-5 text-[#8b5cf6]" />}
          bgColor="bg-purple-50"
        />
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="bg-white">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <div className="flex h-64 items-end gap-2 pt-6">
                    {[45, 60, 30, 70, 85, 50, 20, 40, 65, 55, 75, 90].map(
                      (value, i) => (
                        <div
                          key={i}
                          className="relative flex h-full w-full flex-col items-center"
                        >
                          <div
                            className="absolute bottom-0 w-full max-w-12 rounded-t bg-[#ef4444]"
                            style={{ height: `${value}%` }}
                          ></div>
                        </div>
                      )
                    )}
                  </div>
                  <div className="flex justify-between mt-2">
                    {[
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ].map((month, i) => (
                      <div key={i} className="text-xs text-[#6b7280]">
                        {month}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <div className="flex h-64 items-end gap-2 pt-6">
                    {[20, 35, 45, 50, 65, 75, 85, 90, 95, 100, 110, 120].map(
                      (value, i) => (
                        <div
                          key={i}
                          className="relative flex h-full w-full flex-col items-center"
                        >
                          <div
                            className="absolute bottom-0 w-full max-w-12 rounded-t bg-[#0ea5e9]"
                            style={{ height: `${value * 0.8}%` }}
                          ></div>
                        </div>
                      )
                    )}
                  </div>
                  <div className="flex justify-between mt-2">
                    {[
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ].map((month, i) => (
                      <div key={i} className="text-xs text-[#6b7280]">
                        {month}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Top Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCourses.map((course, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#f0e5fc] text-[#8b5cf6] flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{course.title}</p>
                          <p className="text-sm text-[#6b7280]">
                            {course.enrollments} enrollments
                          </p>
                        </div>
                      </div>
                      <div className="text-[#10b981] font-medium">
                        ${course.revenue}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-[#6b7280]">Parents</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#8b5cf6]"
                        style={{ width: "45%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-[#6b7280]">Children</span>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                    <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#10b981]"
                        style={{ width: "35%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-[#6b7280]">Teachers</span>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                    <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#0ea5e9]"
                        style={{ width: "15%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-[#6b7280]">
                        Administrators
                      </span>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                    <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#ef4444]"
                        style={{ width: "5%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#f0e5fc] text-[#8b5cf6] flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-[#6b7280]">{event.date}</p>
                        <p className="text-sm text-[#6b7280]">
                          {event.attendees} attendees
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="mt-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Revenue analytics content would go here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>User Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p>User analytics content would go here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="mt-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Course Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Course analytics content would go here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
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

const topCourses = [
  {
    title: "Mathematics for Kids",
    enrollments: 248,
    revenue: 12400,
  },
  {
    title: "Science Experiments",
    enrollments: 186,
    revenue: 9300,
  },
  {
    title: "English Vocabulary",
    enrollments: 154,
    revenue: 7700,
  },
  {
    title: "Art & Craft",
    enrollments: 132,
    revenue: 6600,
  },
  {
    title: "Music Basics",
    enrollments: 98,
    revenue: 4900,
  },
];

const events = [
  {
    title: "Summer Learning Festival",
    date: "July 15, 2023",
    attendees: 120,
  },
  {
    title: "Teacher Training Workshop",
    date: "July 22, 2023",
    attendees: 45,
  },
  {
    title: "Parent-Teacher Conference",
    date: "July 30, 2023",
    attendees: 85,
  },
];
