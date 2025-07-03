"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  BookOpen,
  Calendar,
  MessageSquare,
  Search,
  TrendingUp,
  User,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import TeacherLayout from "@/components/layouts/teacher-layout";
import React, { useEffect, useState } from "react";

const TEACHER_ID = "685a0acf48b93074f74ed155"; // hardcode hoặc lấy từ session

export default function TeacherDashboardPage() {
  const [totalStudents, setTotalStudents] = useState<number | null>(null);
  const [loadingStudents, setLoadingStudents] = useState<boolean>(true);
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [enrolledKids, setEnrolledKids] = useState<any[]>([]);
  const [loadingKids, setLoadingKids] = useState(false);

  // Lấy danh sách khoá học của giáo viên
  useEffect(() => {
    async function fetchCourses() {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8386";
      const res = await fetch(`${apiUrl}/api/teacher/${TEACHER_ID}/courses`);
      const data = await res.json();
      setCourses(data.data?.courses || []);
      if (data.data?.courses?.length > 0) {
        setSelectedCourseId(data.data.courses[0]._id);
      }
    }
    fetchCourses();
  }, []);

  // Lấy danh sách học sinh đã tham gia khoá học khi đổi tab
  useEffect(() => {
    if (!selectedCourseId) return;
    setLoadingKids(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8386";
    fetch(
      `${apiUrl}/api/course/${selectedCourseId}/enrolled-kids?page=1&limit=10`
    )
      .then((res) => res.json())
      .then((data) => setEnrolledKids(data.data?.progressRecords || []))
      .catch(() => setEnrolledKids([]))
      .finally(() => setLoadingKids(false));
  }, [selectedCourseId]);

  // Tính tổng số học sinh (unique kidId)
  useEffect(() => {
    const uniqueKids = new Set(enrolledKids.map((k) => k.kidId));
    setTotalStudents(uniqueKids.size);
  }, [enrolledKids]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1e1e1e]">
            Teacher Dashboard
          </h1>
          <p className="text-[#6b7280]">
            Welcome back! Here's an overview of your courses.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search students..."
              className="pl-10 bg-white border-none w-64"
            />
          </div>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={loadingKids ? "..." : totalStudents?.toString() ?? "0"}
          change=""
          icon={<User className="h-5 w-5 text-[#4dacc4]" />}
          bgColor="bg-[#d7ebf0]"
        />
        <StatCard
          title="Active Courses"
          value={courses.length.toString()}
          change=""
          icon={<BookOpen className="h-5 w-5 text-[#f15f6c]" />}
          bgColor="bg-[#feccd6]"
        />
      </div>
      {/* Course Tabs */}
      <Tabs
        value={selectedCourseId}
        onValueChange={setSelectedCourseId}
        className="w-full"
      >
        <TabsList className="bg-white w-full justify-start overflow-x-auto">
          {courses.map((course) => (
            <TabsTrigger key={course._id} value={course._id}>
              {course.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {courses.map((course) => (
          <TabsContent key={course._id} value={course._id} className="mt-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Enrolled Students</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingKids ? (
                  <div>Loading...</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Full Name</th>
                          <th className="text-left p-3">Email</th>
                          <th className="text-left p-3">Age</th>
                          <th className="text-left p-3">Points</th>
                          <th className="text-left p-3">Level</th>
                        </tr>
                      </thead>
                      <tbody>
                        {enrolledKids.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="text-center py-4">
                              No students enrolled
                            </td>
                          </tr>
                        ) : (
                          enrolledKids.map((kid, idx) => (
                            <tr
                              key={kid.progressId || idx}
                              className="border-b hover:bg-gray-50"
                            >
                              <td className="p-3">{kid.kidFullName}</td>
                              <td className="p-3">{kid.kidEmail}</td>
                              <td className="p-3">
                                {kid.kidDateOfBirth
                                  ? getAge(kid.kidDateOfBirth)
                                  : "-"}
                              </td>
                              <td className="p-3">{kid.kidPoints}</td>
                              <td className="p-3">{kid.kidLevel}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
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
            <p className="text-xs text-[#6b7280] mt-1">{change}</p>
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

function getAge(dateString: string) {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
