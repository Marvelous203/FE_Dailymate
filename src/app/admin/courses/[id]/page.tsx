import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ChevronLeft, Save, Plus, Trash, Clock, BookOpen, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const courseId = params.id
  const course = courses.find((c) => c.id.toString() === courseId) || courses[0]

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Link href="/admin/courses" className="text-[#6b7280] hover:text-[#ef4444] flex items-center">
          <ChevronLeft size={20} className="mr-1" />
          Back to Courses
        </Link>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#1e1e1e]">Edit Course</h1>
        <div className="flex gap-3">
          <Button variant="outline">Preview</Button>
          <Button className="bg-[#ef4444] hover:bg-[#dc2626]">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="mb-8">
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
                      <Input id="title" defaultValue={course.title} className="mt-1" />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        defaultValue="This comprehensive course is designed to help children learn mathematics in a fun and interactive way. Through engaging lessons and activities, students will develop essential skills and knowledge."
                        className="mt-1 min-h-[120px]"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Input id="category" defaultValue={course.category} className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="level">Level</Label>
                        <Input id="level" defaultValue="Beginner" className="mt-1" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="duration">Duration</Label>
                        <Input id="duration" defaultValue={course.duration} className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="price">Price ($)</Label>
                        <Input id="price" type="number" defaultValue="49.99" className="mt-1" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="ageRange">Age Range</Label>
                      <Input id="ageRange" defaultValue="6-10 years" className="mt-1" />
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
                    {[1, 2, 3].map((outcome, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input defaultValue={`Learning outcome ${outcome}`} className="flex-1" />
                        <Button variant="ghost" size="icon" className="text-red-500">
                          <Trash size={16} />
                        </Button>
                      </div>
                    ))}

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
                        src={`/placeholder.svg?height=192&width=384`}
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
                      <select
                        id="status"
                        className="w-full border border-gray-300 rounded-md p-2 mt-1"
                        defaultValue={course.status}
                      >
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="visibility">Visibility</Label>
                      <select
                        id="visibility"
                        className="w-full border border-gray-300 rounded-md p-2 mt-1"
                        defaultValue="Public"
                      >
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                        <option value="Password Protected">Password Protected</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="instructor">Instructor</Label>
                      <select
                        id="instructor"
                        className="w-full border border-gray-300 rounded-md p-2 mt-1"
                        defaultValue="1"
                      >
                        <option value="1">Sarah Johnson</option>
                        <option value="2">Michael Brown</option>
                        <option value="3">Emily Davis</option>
                      </select>
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
                {/* Section 1 */}
                <div className="border rounded-md">
                  <div className="bg-gray-50 p-4 flex justify-between items-center border-b">
                    <div>
                      <h3 className="font-medium">Section 1: Introduction</h3>
                      <p className="text-sm text-gray-500">3 lessons • 45 minutes</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    {[1, 2, 3].map((lesson, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#f0e5fc] text-[#8b5cf6] flex items-center justify-center">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium">Lesson {index + 1}: Introduction to Numbers</h4>
                            <div className="flex items-center text-sm text-[#6b7280]">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>15 minutes</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500">
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}

                    <Button variant="outline" className="w-full">
                      <Plus size={16} className="mr-2" /> Add Lesson
                    </Button>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="border rounded-md">
                  <div className="bg-gray-50 p-4 flex justify-between items-center border-b">
                    <div>
                      <h3 className="font-medium">Section 2: Basic Operations</h3>
                      <p className="text-sm text-gray-500">4 lessons • 60 minutes</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="p-4">
                    <Button variant="outline" className="w-full">
                      <Plus size={16} className="mr-2" /> Add Lesson
                    </Button>
                  </div>
                </div>
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
                        <p className="text-sm text-gray-500">Allow students to comment and discuss</p>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="discussion" className="w-4 h-4" defaultChecked />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Certificate on Completion</p>
                        <p className="text-sm text-gray-500">Issue certificate when course is completed</p>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="certificate" className="w-4 h-4" defaultChecked />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Featured Course</p>
                        <p className="text-sm text-gray-500">Show this course on the homepage</p>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="featured" className="w-4 h-4" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Enrollments"
              value="248"
              change="+12 this week"
              icon={<User className="h-5 w-5 text-[#ef4444]" />}
              bgColor="bg-red-50"
            />
            <StatCard
              title="Completion Rate"
              value="68%"
              change="+5% from last month"
              icon={<BookOpen className="h-5 w-5 text-[#0ea5e9]" />}
              bgColor="bg-blue-50"
            />
            <StatCard
              title="Average Rating"
              value="4.8/5"
              change="Based on 45 reviews"
              icon={<Star className="h-5 w-5 text-[#f59e0b]" />}
              bgColor="bg-amber-50"
            />
            <StatCard
              title="Avg. Completion Time"
              value="3.5 days"
              change="-0.5 days from average"
              icon={<Clock className="h-5 w-5 text-[#10b981]" />}
              bgColor="bg-green-50"
            />
          </div>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Enrollment Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <div className="flex h-64 items-end gap-2 pt-6">
                  {[45, 60, 30, 70, 85, 50, 20, 40, 65, 55, 75, 90].map((value, i) => (
                    <div key={i} className="relative flex h-full w-full flex-col items-center">
                      <div
                        className="absolute bottom-0 w-full max-w-12 rounded-t bg-[#ef4444]"
                        style={{ height: `${value}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                    (month, i) => (
                      <div key={i} className="text-xs text-[#6b7280]">
                        {month}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatCard({ title, value, change, icon, bgColor,
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
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bgColor}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
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
  )
}

const courses = [
  {
    id: 1,
    title: "Mathematics for Kids",
    category: "Mathematics",
    rating: 4.8,
    duration: "4 hours",
    lessons: 12,
    status: "Published",
  },
  {
    id: 2,
    title: "English Vocabulary",
    category: "Language",
    rating: 4.5,
    duration: "6 hours",
    lessons: 18,
    status: "Published",
  },
  {
    id: 3,
    title: "Science Experiments",
    category: "Science",
    rating: 4.9,
    duration: "5 hours",
    lessons: 15,
    status: "Published",
  },
]

