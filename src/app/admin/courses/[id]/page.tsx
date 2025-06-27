"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Save, Plus, Clock, BookOpen, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [courseId, setCourseId] = useState<string>("");
  const [course, setCourse] = useState<any>(null);
  const [loadingCourse, setLoadingCourse] = useState(true);
  const [analyticsTab, setAnalyticsTab] = useState(false);
  const [enrolledKids, setEnrolledKids] = useState<any[]>([]);
  const [loadingKids, setLoadingKids] = useState(false);

  // Handle async params in Next.js 15
  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params;
      setCourseId(resolvedParams.id);
    };
    loadParams();
  }, [params]);

  useEffect(() => {
    if (!courseId) return;
    setLoadingCourse(true);
    fetch(`http://localhost:8386/api/course/${courseId}`)
      .then((res) => res.json())
      .then((data) => setCourse(data.data))
      .catch(() => setCourse(null))
      .finally(() => setLoadingCourse(false));
  }, [courseId]);

  // Fetch enrolled kids when Analytics tab is selected
  useEffect(() => {
    if (!analyticsTab || !courseId) return;
    setLoadingKids(true);
    fetch(
      `http://localhost:8386/api/course/${courseId}/enrolled-kids?page=1&limit=100`
    )
      .then((res) => res.json())
      .then((data) => {
        setEnrolledKids(data.data?.progressRecords || []);
      })
      .catch(() => setEnrolledKids([]))
      .finally(() => setLoadingKids(false));
  }, [analyticsTab, courseId]);

  // Tính toán dữ liệu cho biểu đồ: số học sinh theo level
  const levelStats = enrolledKids.reduce((acc: Record<number, number>, kid) => {
    const level = kid.kidLevel || 0;
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {});

  if (loadingCourse) return <div>Loading...</div>;
  if (!course) return <div className="text-red-500">Course not found</div>;

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Link
          href="/admin/courses"
          className="text-[#6b7280] hover:text-[#ef4444] flex items-center"
        >
          <ChevronLeft size={20} className="mr-1" />
          Back to Courses
        </Link>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#1e1e1e]">Course Detail</h1>
        <div className="flex gap-3">
          <Button variant="outline">Preview</Button>
          <Button className="bg-[#ef4444] hover:bg-[#dc2626]" disabled>
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="details"
        className="mb-8"
        onValueChange={(tab) => setAnalyticsTab(tab === "analytics")}
      >
        <TabsList className="bg-white">
          <TabsTrigger value="details">Course Details</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="border-none shadow-sm mb-6">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Course Title</Label>
                      <Input
                        id="title"
                        defaultValue={course.title}
                        className="mt-1"
                        readOnly
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        defaultValue={course.description}
                        className="mt-1 min-h-[120px]"
                        readOnly
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          defaultValue={course.category}
                          className="mt-1"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pointsEarned">Points Earned</Label>
                        <Input
                          id="pointsEarned"
                          defaultValue={course.pointsEarned?.toString() || "0"}
                          className="mt-1"
                          readOnly
                        />
                      </div>
                      <div>
                        <Label htmlFor="isPremium">Premium</Label>
                        <Input
                          id="isPremium"
                          defaultValue={course.isPremium ? "Yes" : "No"}
                          className="mt-1"
                          readOnly
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="ageGroup">Age Group</Label>
                      <Input
                        id="ageGroup"
                        defaultValue={course.ageGroup}
                        className="mt-1"
                        readOnly
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle>Learning Outcomes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Hiện tại API chưa có learning outcomes, có thể bổ sung sau */}
                    <Button variant="outline" className="w-full">
                      <Plus size={16} className="mr-2" /> Add Learning Outcome
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="border-none shadow-sm mb-6">
                <CardHeader>
                  <CardTitle>Course Thumbnail</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="h-48 bg-[#d9d9d9] rounded-md overflow-hidden">
                      <Image
                        src={
                          course.thumbnailUrl ||
                          "/placeholder.svg?height=192&width=384"
                        }
                        alt="Course thumbnail"
                        width={384}
                        height={192}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Change Thumbnail
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle>Course Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Input
                        id="status"
                        defaultValue={
                          course.isPublished ? "Published" : "Draft"
                        }
                        className="mt-1"
                        readOnly
                      />
                    </div>
                    <div>
                      <Label htmlFor="instructor">Instructor</Label>
                      <Input
                        id="instructor"
                        defaultValue={course.instructor}
                        className="mt-1"
                        readOnly
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="curriculum" className="mt-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Course Curriculum</CardTitle>
              <Button className="bg-[#ef4444] hover:bg-[#dc2626]">
                <Plus size={16} className="mr-2" /> Add Section
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Có thể fetch curriculum từ API nếu có */}
                <div className="text-gray-400">No curriculum data.</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Course Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Enable Discussion</p>
                        <p className="text-sm text-gray-500">
                          Allow students to comment and discuss
                        </p>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="discussion"
                          className="w-4 h-4"
                          defaultChecked
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Certificate on Completion</p>
                        <p className="text-sm text-gray-500">
                          Issue certificate when course is completed
                        </p>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="certificate"
                          className="w-4 h-4"
                          defaultChecked
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Featured Course</p>
                        <p className="text-sm text-gray-500">
                          Show this course on the homepage
                        </p>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="featured"
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Access Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="enrollment">Enrollment Duration</Label>
                      <select
                        id="enrollment"
                        className="w-full border border-gray-300 rounded-md p-2 mt-1"
                        defaultValue="lifetime"
                      >
                        <option value="lifetime">Lifetime</option>
                        <option value="1-year">1 Year</option>
                        <option value="6-months">6 Months</option>
                        <option value="3-months">3 Months</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="prerequisite">Prerequisites</Label>
                      <select
                        id="prerequisite"
                        className="w-full border border-gray-300 rounded-md p-2 mt-1"
                        defaultValue="none"
                      >
                        <option value="none">None</option>
                        <option value="1">Basic Mathematics</option>
                        <option value="2">Introduction to Numbers</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card className="border-none shadow-sm mb-6">
            <CardHeader>
              <CardTitle>Enrolled Kids</CardTitle>
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
                            No kids enrolled
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
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Kids by Level</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart data={levelStats} />
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

function Star(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

// Biểu đồ đơn giản bằng SVG (nếu chưa có thư viện chart)
function BarChart({ data }: { data: Record<number, number> }) {
  const levels = Object.keys(data).sort((a, b) => Number(a) - Number(b));
  const max = Math.max(...Object.values(data), 1);
  return (
    <div className="flex items-end gap-2 h-40 mt-4">
      {levels.map((level) => (
        <div key={level} className="flex flex-col items-center">
          <div
            className="bg-[#ef4444] w-8"
            style={{ height: `${(data[Number(level)] / max) * 100}%` }}
            title={`Level ${level}: ${data[Number(level)]}`}
          ></div>
          <span className="text-xs mt-1">{level}</span>
        </div>
      ))}
    </div>
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
