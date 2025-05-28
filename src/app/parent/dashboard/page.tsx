"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, BookOpen, Calendar, Clock, Mail, MessageCircle, Phone, TrendingUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { AddChild } from "@/components/addchild"

export default function ParentDashboard() {
  const [children, setChildren] = useState([
    {
      name: "Alex Johnson",
      age: 8,
      courses: 4,
    },
    {
      name: "Emma Johnson",
      age: 6,
      courses: 3,
    },
    {
      name: "Noah Johnson",
      age: 5,
      courses: 2,
    },
  ]);

  const handleAddChild = (child: {
    name: string;
    age: string;
    gender: string;
    avatar: string;
  }) => {
    // Add the new child to the list
    const newChildWithCourses = {
      name: child.name,
      age: parseInt(child.age) || 0,
      courses: 0,
    };
    
    setChildren([...children, newChildWithCourses]);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#1e1e1e]">Parent Dashboard</h1>
        <AddChild onAddChild={handleAddChild} />
      </div>

      {/* Child Selector */}
      <Tabs defaultValue="alex" className="mb-8">
        <TabsList className="bg-white">
          <TabsTrigger value="alex" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#d9d9d9] rounded-full"></div>
            Alex
          </TabsTrigger>
          <TabsTrigger value="emma" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#d9d9d9] rounded-full"></div>
            Emma
          </TabsTrigger>
          <TabsTrigger value="noah" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#d9d9d9] rounded-full"></div>
            Noah
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
    <div className="space-y-8">
      {/* Child Overview */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-[#d9d9d9]">
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
                    <Progress value={course.progress} className="h-2 bg-[#e5e7eb]">
                      <div className="h-full bg-[#8b5cf6]" style={{ width: `${course.progress}%` }} />
                    </Progress>
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

      {/* Teacher Communication */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Teacher Communication</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#d9d9d9]">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Teacher"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">Ms. Sarah Johnson</h3>
                  <p className="text-sm text-[#6b7280]">Mathematics Teacher</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-[#6b7280]" />
                  <span>sarah.johnson@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-[#6b7280]" />
                  <span>+1 234 567 890</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#6b7280]" />
                  <span>Office hours: Mon-Fri, 2-4 PM</span>
                </div>
              </div>

              <Button className="mt-4 bg-[#8b5cf6] hover:bg-[#7c3aed] w-full md:w-auto">
                <MessageCircle className="h-5 w-5 mr-2" />
                Send Message
              </Button>
            </div>

            <div className="flex-1 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
              <h3 className="font-medium mb-3">Latest Message</h3>
              <div className="bg-[#f9fafb] p-4 rounded-lg">
                <p className="text-[#4b5563] mb-2">
                  Alex is doing great in mathematics! He's showing excellent progress in multiplication and division. I
                  recommend practicing more word problems at home to reinforce these skills.
                </p>
                <p className="text-sm text-[#6b7280]">Received: Yesterday, 3:45 PM</p>
              </div>
              <Button variant="outline" className="mt-4 w-full">
                View All Messages
              </Button>
            </div>
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
