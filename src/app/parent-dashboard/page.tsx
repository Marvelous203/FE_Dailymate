import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, BookOpen, Calendar, Clock, ExternalLink, MessageSquare, Star, TrendingUp, Users } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import ParentLayout from "@/components/layouts/parent-layout"

export default function ParentDashboardPage() {
  return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1e1e1e]">Parent Dashboard</h1>
            <p className="text-[#6b7280]">
              Welcome back, Sarah! Here's what's happening with your children's learning.
            </p>
          </div>

          <div className="flex gap-3">
            <Button className="bg-[#8b5cf6] hover:bg-[#7c3aed]">
              <Users className="mr-2 h-4 w-4" />
              Add Child
            </Button>
            <Button variant="outline" className="border-[#8b5cf6] text-[#8b5cf6] hover:bg-[#8b5cf6]/10">
              <ExternalLink className="mr-2 h-4 w-4" />
              Kid's Environment
            </Button>
          </div>
        </div>

        {/* Child Selector */}
        <Tabs defaultValue="alex" className="w-full">
          <TabsList className="bg-white w-full justify-start overflow-x-auto">
            <TabsTrigger value="alex" className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#d1fae5] rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-[#10b981]">A</span>
              </div>
              Alex
            </TabsTrigger>
            <TabsTrigger value="emma" className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#feccd6] rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-[#f15f6c]">E</span>
              </div>
              Emma
            </TabsTrigger>
            <TabsTrigger value="noah" className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#d7ebf0] rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-[#4dacc4]">N</span>
              </div>
              Noah
            </TabsTrigger>
            <TabsTrigger value="add" className="text-[#8b5cf6]">
              + Add Child
            </TabsTrigger>
          </TabsList>

          <TabsContent value="alex" className="mt-6">
            <ChildDashboard name="Alex Johnson" />
          </TabsContent>

          <TabsContent value="emma" className="mt-6">
            <ChildDashboard name="Emma Johnson" />
          </TabsContent>

          <TabsContent value="noah" className="mt-6">
            <ChildDashboard name="Noah Johnson" />
          </TabsContent>
        </Tabs>
      </div>

  )
}

function ChildDashboard({ name }) {
  return (
    <div className="space-y-6">
      {/* Child Overview */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-[#d1fae5]">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Child"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{name}</h2>
                <p className="text-[#6b7280]">Age: 8 years</p>
                <p className="text-[#6b7280]">Grade: 3rd</p>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 md:ml-8">
              <div className="bg-[#f5f3ff] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="h-5 w-5 text-[#8b5cf6]" />
                  <span className="font-medium">Courses</span>
                </div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-sm text-[#6b7280]">Active courses</p>
              </div>

              <div className="bg-[#f5f3ff] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-5 w-5 text-[#8b5cf6]" />
                  <span className="font-medium">Time</span>
                </div>
                <p className="text-2xl font-bold">12h</p>
                <p className="text-sm text-[#6b7280]">This week</p>
              </div>

              <div className="bg-[#f5f3ff] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="h-5 w-5 text-[#8b5cf6]" />
                  <span className="font-medium">Achievements</span>
                </div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-[#6b7280]">Total earned</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-none shadow-sm h-full">
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {courses.map((course, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{course.title}</h3>
                        <p className="text-sm text-[#6b7280]">{course.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{course.progress}%</p>
                        <p className="text-sm text-[#6b7280]">
                          {course.completed}/{course.total} lessons
                        </p>
                      </div>
                    </div>
                    <Progress value={course.progress} className="h-2 bg-[#e5e7eb]" indicatorClassName="bg-[#8b5cf6]" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border-none shadow-sm h-full">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, i) => (
                  <div key={i} className="flex gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.bgColor} flex-shrink-0`}
                    >
                      {activity.icon}
                    </div>
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-[#6b7280]">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recommended Courses */}
      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recommended Courses</CardTitle>
            <CardDescription>Courses that might interest your child</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="border-[#8b5cf6] text-[#8b5cf6] hover:bg-[#8b5cf6]/10">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedCourses.map((course, i) => (
              <Link href={`/parent/courses/${i}`} key={i}>
                <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video relative bg-[#f3f4f6]">
                    <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium px-2 py-1 bg-[#f5f3ff] text-[#8b5cf6] rounded-full">
                        {course.category}
                      </span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-[#f59e0b] text-[#f59e0b]" />
                        <span className="text-xs ml-1">{course.rating}</span>
                      </div>
                    </div>
                    <h3 className="font-medium mb-1">{course.title}</h3>
                    <p className="text-sm text-[#6b7280] mb-2">{course.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#8b5cf6]">${course.price}</span>
                      <Button size="sm" className="bg-[#8b5cf6] hover:bg-[#7c3aed]">
                        Enroll
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {events.map((event, i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${event.bgColor}`}>
                    {event.icon}
                  </div>
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-[#6b7280]">{event.date}</p>
                  </div>
                </div>
                <p className="text-sm text-[#4b5563] mb-3">{event.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-[#8b5cf6] text-[#8b5cf6] hover:bg-[#8b5cf6]/10"
                >
                  Add to Calendar
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const courses = [
  {
    title: "Mathematics for Kids",
    category: "Mathematics",
    progress: 65,
    completed: 8,
    total: 12,
  },
  {
    title: "English Vocabulary",
    category: "Language",
    progress: 30,
    completed: 5,
    total: 18,
  },
  {
    title: "Science Experiments",
    category: "Science",
    progress: 100,
    completed: 15,
    total: 15,
  },
  {
    title: "Art & Craft",
    category: "Art",
    progress: 0,
    completed: 0,
    total: 10,
  },
]

const activities = [
  {
    title: "Completed Mathematics Lesson 5",
    time: "Today, 10:30 AM",
    bgColor: "bg-[#f5f3ff]",
    icon: <BookOpen className="h-5 w-5 text-[#8b5cf6]" />,
  },
  {
    title: "Scored 95% on Science Quiz",
    time: "Yesterday, 3:15 PM",
    bgColor: "bg-[#f5f3ff]",
    icon: <TrendingUp className="h-5 w-5 text-[#8b5cf6]" />,
  },
  {
    title: "Started Art & Craft course",
    time: "2 days ago",
    bgColor: "bg-[#f5f3ff]",
    icon: <BookOpen className="h-5 w-5 text-[#8b5cf6]" />,
  },
]

const recommendedCourses = [
  {
    title: "Creative Problem Solving",
    category: "Life Skills",
    description: "Learn how to approach problems creatively",
    price: 29.99,
    rating: 4.8,
    image: "/placeholder.svg?height=180&width=320",
  },
  {
    title: "Emotional Intelligence",
    category: "Social Skills",
    description: "Understanding and managing emotions",
    price: 24.99,
    rating: 4.7,
    image: "/placeholder.svg?height=180&width=320",
  },
  {
    title: "Public Speaking for Kids",
    category: "Communication",
    description: "Build confidence in public speaking",
    price: 19.99,
    rating: 4.9,
    image: "/placeholder.svg?height=180&width=320",
  },
]

const events = [
  {
    title: "Life Skills Workshop",
    date: "Tomorrow, 10:00 AM",
    description: "Interactive workshop on problem-solving skills",
    bgColor: "bg-[#f5f3ff]",
    icon: <BookOpen className="h-5 w-5 text-[#8b5cf6]" />,
  },
  {
    title: "Parent-Teacher Meeting",
    date: "Next Friday, 1:00 PM",
    description: "Discuss your child's progress and development",
    bgColor: "bg-[#f5f3ff]",
    icon: <MessageSquare className="h-5 w-5 text-[#8b5cf6]" />,
  },
  {
    title: "Summer Camp Registration",
    date: "May 15, 4:00 PM",
    description: "Last day to register for summer life skills camp",
    bgColor: "bg-[#f5f3ff]",
    icon: <Calendar className="h-5 w-5 text-[#8b5cf6]" />,
  },
]
