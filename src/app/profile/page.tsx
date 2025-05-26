import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  BookOpen,
  Calendar,
  Clock,
  Edit,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/sidebar";

export default function Profile() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">
      {/* Sidebar */}
      <Sidebar activePage="profile" />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#1e1e1e]">My Profile</h1>
          <Button variant="outline" className="flex items-center gap-2">
            <Edit size={16} />
            Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-[#d9d9d9] mb-4">
                  <Image
                    src="/placeholder.svg?height=96&width=96"
                    alt="Profile"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-semibold">Alex Johnson</h2>
                <p className="text-[#6b7280] mb-4">Student</p>

                <div className="w-full space-y-4 mt-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[#6b7280]" />
                    <span>alex.johnson@example.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[#6b7280]" />
                    <span>+1 234 567 890</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[#6b7280]" />
                    <span>New York, USA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-[#6b7280]" />
                    <span>Joined: Jan 2023</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="achievements" className="w-full">
              <TabsList className="bg-white">
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="courses">My Courses</TabsTrigger>
                <TabsTrigger value="certificates">Certificates</TabsTrigger>
              </TabsList>

              <TabsContent value="achievements" className="mt-6">
                <Card className="border-none shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Your Achievements
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="bg-white border rounded-lg p-4 flex flex-col items-center text-center"
                        >
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${achievement.bgColor}`}
                          >
                            <Award
                              className={`h-8 w-8 ${achievement.iconColor}`}
                            />
                          </div>
                          <h4 className="font-medium mb-1">
                            {achievement.title}
                          </h4>
                          <p className="text-sm text-[#6b7280]">
                            {achievement.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="courses" className="mt-6">
                <Card className="border-none shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Enrolled Courses
                    </h3>
                    <div className="space-y-4">
                      {enrolledCourses.map((course, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                        >
                          <div className="w-full sm:w-32 h-24 bg-[#d9d9d9] rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={`/placeholder.svg?height=96&width=128`}
                              alt={course.title}
                              width={128}
                              height={96}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">{course.title}</h4>
                            <div className="flex items-center text-sm text-[#6b7280] mb-2">
                              <Clock size={16} className="mr-1" />
                              <span>{course.duration}</span>
                              <span className="mx-2">•</span>
                              <BookOpen size={16} className="mr-1" />
                              <span>{course.lessons} lessons</span>
                            </div>
                            <div className="w-full bg-[#e5e7eb] h-2 rounded-full">
                              <div
                                className="bg-[#10b981] h-2 rounded-full"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between items-center mt-2 text-sm">
                              <span className="text-[#6b7280]">Progress</span>
                              <span className="font-medium">
                                {course.progress}%
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="certificates" className="mt-6">
                <Card className="border-none shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Your Certificates
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {certificates.map((certificate, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${certificate.bgColor}`}
                            >
                              <Award
                                className={`h-5 w-5 ${certificate.iconColor}`}
                              />
                            </div>
                            <div>
                              <h4 className="font-medium">
                                {certificate.title}
                              </h4>
                              <p className="text-sm text-[#6b7280]">
                                Issued: {certificate.date}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            View Certificate
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

const achievements = [
  {
    title: "Fast Learner",
    description: "Completed 5 courses in one month",
    bgColor: "bg-[#ebfdf4]",
    iconColor: "text-[#10b981]",
  },
  {
    title: "Perfect Score",
    description: "Scored 100% in a quiz",
    bgColor: "bg-[#ede9fe]",
    iconColor: "text-[#8b5cf6]",
  },
  {
    title: "Early Bird",
    description: "Completed 10 lessons before 9 AM",
    bgColor: "bg-[#fff7ed]",
    iconColor: "text-[#f59e0b]",
  },
  {
    title: "Consistent",
    description: "Logged in for 7 days in a row",
    bgColor: "bg-[#e0f2fe]",
    iconColor: "text-[#0ea5e9]",
  },
  {
    title: "Helping Hand",
    description: "Answered 20 questions in the forum",
    bgColor: "bg-[#fce7f3]",
    iconColor: "text-[#ec4899]",
  },
  {
    title: "Explorer",
    description: "Tried all subject categories",
    bgColor: "bg-[#eff6ff]",
    iconColor: "text-[#3b82f6]",
  },
];

const enrolledCourses = [
  {
    title: "Mathematics for Kids",
    duration: "4 hours",
    lessons: 12,
    progress: 65,
  },
  {
    title: "English Vocabulary",
    duration: "6 hours",
    lessons: 18,
    progress: 30,
  },
  {
    title: "Science Experiments",
    duration: "5 hours",
    lessons: 15,
    progress: 100,
  },
  {
    title: "Art & Craft",
    duration: "3 hours",
    lessons: 10,
    progress: 0,
  },
];

const certificates = [
  {
    title: "Science Experiments",
    date: "Mar 15, 2023",
    bgColor: "bg-[#ebfdf4]",
    iconColor: "text-[#10b981]",
  },
  {
    title: "Basic Mathematics",
    date: "Feb 10, 2023",
    bgColor: "bg-[#ede9fe]",
    iconColor: "text-[#8b5cf6]",
  },
  {
    title: "English Vocabulary",
    date: "Jan 25, 2023",
    bgColor: "bg-[#e0f2fe]",
    iconColor: "text-[#0ea5e9]",
  },
  {
    title: "Introduction to Art",
    date: "Dec 12, 2022",
    bgColor: "bg-[#fff7ed]",
    iconColor: "text-[#f59e0b]",
  },
];
