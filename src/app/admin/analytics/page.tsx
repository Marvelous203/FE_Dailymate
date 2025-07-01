'use client'
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
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getTopCourses, getAllCourses } from '@/lib/api';
import { getAllTransactionsCount, getAllTransactions, getReviewsByCourseId } from "@/utils/apis";

export default function AnalyticsPage() {
  const [monthlyRevenue, setMonthlyRevenue] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [revenueData, setRevenueData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [parentGrowth, setParentGrowth] = useState<any[]>([]);
  const [loadingParentGrowth, setLoadingParentGrowth] = useState(false);
  const [growthYear, setGrowthYear] = useState<number>(2025);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [activeUsers, setActiveUsers] = useState<number>(0);
  const [loadingStats, setLoadingStats] = useState(false);
  const [topCourses, setTopCourses] = useState<{ title: string; enrollmentCount: number }[]>([]);
  const [loadingTopCourses, setLoadingTopCourses] = useState(false);
  const [transactionCount, setTransactionCount] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [totalAllReviews, setTotalAllReviews] = useState<number>(0);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8386';

  useEffect(() => {
    setLoading(true);
    Promise.all(
      Array.from({ length: 12 }, (_, i) =>
        fetch(`${API_URL}/api/transaction`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ month: i + 1, year: 2025 }),
          cache: "no-store",
        })
          .then((res) => res.json())
          .then((data) => ({
            month: i + 1,
            revenue: data.data?.revenue || 0,
          }))
      )
    )
      .then((data) => {
        setMonthlyRevenue(data);
        const sum = data.reduce((acc, cur) => acc + (cur.revenue || 0), 0);
        setTotalRevenue(sum);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoadingStats(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/parents/count/year?year=${selectedYear}`)
      .then(res => res.json())
      .then(data => setActiveUsers(data.data?.parentCount || 0))
      .finally(() => setLoadingStats(false));
  }, [selectedYear]);

  useEffect(() => {
    setLoadingParentGrowth(true);
    Promise.all(
      Array.from({ length: 12 }, (_, i) =>
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/parents/count/month?month=${i + 1}&year=${growthYear}`)
          .then((res) => res.json())
          .then((data) => ({
            month: i + 1,
            count: data.data?.parentCount || 0,
          }))
      )
    )
      .then(setParentGrowth)
      .finally(() => setLoadingParentGrowth(false));
  }, [growthYear]);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/transaction`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ month: selectedMonth, year: selectedYear }),
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => setRevenueData(data.data))
      .catch(() => setRevenueData(null))
      .finally(() => setLoading(false));
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    setLoadingTopCourses(true);
    getTopCourses()
      .then((data) => {
        console.log('Top courses data:', data);
        if (data && data.data && Array.isArray(data.data.courses)) {
          setTopCourses(data.data.courses);
        } else {
          setTopCourses([]);
        }
      })
      .catch(() => setTopCourses([]))
      .finally(() => setLoadingTopCourses(false));
  }, []);

  useEffect(() => {
    async function fetchCount() {
      try {
        const count = await getAllTransactionsCount();
        setTransactionCount(count);
      } catch (error) {
        setTransactionCount(0);
      }
    }
    fetchCount();
  }, []);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await getAllTransactions(1, 100);
        const allTransactions = res?.data?.transactions || [];
        const filtered = allTransactions.filter((t: any) => {
          const date = new Date(t.createdAt);
          return date.getMonth() + 1 === selectedMonth && date.getFullYear() === selectedYear;
        });
        setTransactions(filtered);
      } catch {
        setTransactions([]);
      }
    }
    fetchTransactions();
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    async function fetchTotalAllReviews() {
      try {
        const coursesRes = await getAllCourses();
        const courses = coursesRes.data?.courses || [];
        let total = 0;
        for (const course of courses) {
          const reviewRes = await getReviewsByCourseId(course._id, 1, 1, 'star', 'asc');
          // Ưu tiên lấy total, nếu không có thì lấy độ dài mảng reviews
          total += reviewRes.data?.total || (reviewRes.data?.reviews?.length ?? 0);
        }
        setTotalAllReviews(total);
      } catch {
        setTotalAllReviews(0);
      }
    }
    fetchTotalAllReviews();
  }, []);

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
          value={loading ? "..." : totalRevenue.toLocaleString("vi-VN") + "₫"}
          change=""
          icon={<DollarSign className="h-5 w-5 text-[#ef4444]" />}
          bgColor="bg-red-50"
        />
        <StatCard
          title="Active Users"
          value={loadingStats ? "..." : activeUsers.toLocaleString("vi-VN")}
          change=""
          icon={<Users className="h-5 w-5 text-[#0ea5e9]" />}
          bgColor="bg-blue-50"
        />
        <StatCard
          title="Transaction history"
          value={`Total transactions: ${transactions.length}`}
          change="+7% from last month"
          icon={<BookOpen className="h-5 w-5 text-[#10b981]" />}
          bgColor="bg-green-50"
        />
        <StatCard
          title="Review"
          value={typeof totalAllReviews === 'number' ? totalAllReviews.toString() : "0"}
          change="+5% from last month"
          icon={<TrendingUp className="h-5 w-5 text-[#8b5cf6]" />}
          bgColor="bg-purple-50"
        />
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="bg-white">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="reviews">Review</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p>Loading revenue chart...</p>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyRevenue}>
                      <XAxis dataKey="month" tickFormatter={(m) => `Th${m}`} />
                      <YAxis />
                      <Tooltip formatter={(value) => `${value.toLocaleString()}₫`} />
                      <Bar dataKey="revenue" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-center w-full">
                  <CardTitle>User Growth</CardTitle>
                  <div className="flex gap-2 items-center">
                    <span className="text-sm">Năm:</span>
                    <input type="number" value={growthYear} onChange={e => setGrowthYear(Number(e.target.value))} className="border rounded p-1 w-24" min={2000} max={2100} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  {loadingParentGrowth ? (
                    <div>Loading user chart..</div>
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={parentGrowth}>
                        <XAxis dataKey="month" tickFormatter={(m) => `Th${m}`} />
                        <YAxis allowDecimals={false} />
                        <Tooltip formatter={(value) => `${value} phụ huynh`} />
                        <Bar dataKey="count" fill="#0ea5e9" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
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
                  {loadingTopCourses ? (
                    <div>Loading top courses...</div>
                  ) : (
                    topCourses.map((course, index) => (
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
                              {course.enrollmentCount} enrollments
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
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
              <div className="flex gap-4 mb-4">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="border rounded px-2 py-1"
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Tháng {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="border rounded px-2 py-1"
                >
                  {[2024, 2025, 2026, 2027].map((year) => (
                    <option key={year} value={year}>
                      Năm {year}
                    </option>
                  ))}
                </select>
              </div>
              {loading ? (
                <p>Đang tải doanh thu...</p>
              ) : (
                <div>
                  <div className="text-2xl font-bold">
                    Doanh thu tháng {selectedMonth}/{selectedYear}:{" "}
                    <span className="text-[#ef4444]">
                      {revenueData ? `${revenueData.revenue.toLocaleString()}₫` : "0₫"}
                    </span>
                  </div>
                  <div className="mt-2">
                    Số giao dịch thành công: {revenueData?.successfulTransactions ?? 0}
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Tổng số giao dịch: {transactions.length}
                  </div>
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Danh sách giao dịch gần đây</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border text-sm">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="px-2 py-1 border">Ngày</th>
                            <th className="px-2 py-1 border">Tên</th>
                            <th className="px-2 py-1 border">Email</th>
                            <th className="px-2 py-1 border">Mô tả</th>
                            <th className="px-2 py-1 border">Mã đơn</th>
                            <th className="px-2 py-1 border">Giá</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.length === 0 ? (
                            <tr><td colSpan={6} className="text-center py-2">Không có giao dịch</td></tr>
                          ) : (
                            transactions.map((t, idx) => (
                              <tr key={t._id || idx}>
                                <td className="px-2 py-1 border">{new Date(t.createdAt).toLocaleString('vi-VN')}</td>
                                <td className="px-2 py-1 border">{t.parentFullName || '-'}</td>
                                <td className="px-2 py-1 border">{t.userEmail || '-'}</td>
                                <td className="px-2 py-1 border">{t.description || '-'}</td>
                                <td className="px-2 py-1 border">{t.orderCode || '-'}</td>
                                <td className="px-2 py-1 border">{t.amount?.toLocaleString('vi-VN')}₫</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Review từng khóa học</CardTitle>
            </CardHeader>
            <CardContent>
              <ReviewTab />
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

function ReviewTab() {
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [reviews, setReviews] = useState<any[]>([]);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllCourses()
      .then((data) => setCourses(data.data?.courses || []))
      .catch(() => setCourses([]));
  }, []);

  useEffect(() => {
    if (!selectedCourse) return;
    setLoading(true);
    getReviewsByCourseId(selectedCourse, 1, 10, 'star', 'asc')
      .then((data) => {
        setReviews(data.data?.reviews || []);
        setTotalReviews(data.data?.total || (data.data?.reviews?.length ?? 0));
      })
      .catch(() => {
        setReviews([]);
        setTotalReviews(0);
      })
      .finally(() => setLoading(false));
  }, [selectedCourse]);

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <select
          value={selectedCourse}
          onChange={e => setSelectedCourse(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">Chọn khóa học</option>
          {courses.map(course => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
        {selectedCourse && (
          <span className="text-sm text-gray-600">
            Tổng lượt review: <b>{totalReviews}</b>
          </span>
        )}
      </div>
      {loading ? (
        <p>Đang tải review...</p>
      ) : (
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 py-1 border">Tên học sinh</th>
              <th className="px-2 py-1 border">Số sao</th>
              <th className="px-2 py-1 border">Nội dung</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-2">Không có review</td>
              </tr>
            ) : (
              reviews.map((r: any, idx: number) => (
                <tr key={r._id || idx}>
                  <td className="px-2 py-1 border">{r.kidId?.fullName || "-"}</td>
                  <td className="px-2 py-1 border">{r.star}</td>
                  <td className="px-2 py-1 border">{r.content}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
