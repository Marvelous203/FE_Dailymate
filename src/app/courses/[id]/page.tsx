import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  ChevronLeft,
  Clock,
  Play,
  Star,
  User,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/sidebar";

// Update the component to handle async params
export default async function CourseDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const courseId = resolvedParams.id;
  const course =
    courses.find((c) => c.id.toString() === courseId) || courses[0];

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">
      {/* Sidebar */}
      <Sidebar activePage="courses" />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <Link
          href="/courses"
          className="flex items-center text-[#6b7280] mb-6 hover:text-[#10b981]"
        >
          <ChevronLeft size={20} className="mr-1" />
          Back to Courses
        </Link>

        <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-8">
          <div className="h-64 bg-[#d9d9d9] relative">
            <Image
              src={`/placeholder.svg?height=300&width=1200`}
              alt={course.title}
              width={1200}
              height={300}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Button className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm p-4">
                <Play className="h-8 w-8 text-white fill-white" />
              </Button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <div className="bg-[#ebfdf4] px-3 py-1 rounded-full text-sm text-[#10b981] font-medium">
                {course.category}
              </div>
              <div className="flex items-center text-[#f59e0b]">
                <Star className="h-5 w-5 fill-[#f59e0b] mr-1" />
                <span className="font-medium">{course.rating}</span>
              </div>
              <div className="flex items-center text-[#6b7280] text-sm">
                <User className="h-4 w-4 mr-1" />
                <span>2,500 students</span>
              </div>
              <div className="flex items-center text-[#6b7280] text-sm">
                <Clock className="h-4 w-4 mr-1" />
                <span>{course.duration}</span>
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-4">{course.title}</h1>

            <p className="text-[#4b5563] mb-6">
              This course is designed to help children learn{" "}
              {course.category.toLowerCase()} in a fun and interactive way.
              Through engaging lessons and activities, students will develop
              essential skills and knowledge.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-[#10b981] hover:bg-[#059669] flex-1">
                Continue Learning
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <BookmarkIcon className="h-5 w-5" />
                Save Course
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="curriculum" className="mb-8">
          <TabsList className="bg-white">
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="curriculum" className="mt-6">
            <Card className="border-none shadow-sm">
              <CardContent className="p-0">
                {lessons.map((lesson, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 border-b last:border-b-0 ${
                      lesson.completed ? "bg-[#f9fafb]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          lesson.completed
                            ? "bg-[#d1fae5] text-[#10b981]"
                            : "bg-[#e5e7eb] text-[#6b7280]"
                        }`}
                      >
                        {lesson.completed ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{lesson.title}</h3>
                        <div className="flex items-center text-sm text-[#6b7280]">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant={lesson.completed ? "outline" : "default"}
                      size="sm"
                      className={
                        lesson.completed
                          ? "text-[#10b981] border-[#10b981]"
                          : "bg-[#10b981]"
                      }
                    >
                      {lesson.completed ? "Review" : "Start"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="overview" className="mt-6">
            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  About This Course
                </h2>
                <p className="text-[#4b5563] mb-4">
                  This comprehensive course is designed to make learning{" "}
                  {course.category.toLowerCase()} fun and engaging for children.
                  Through interactive lessons, games, and activities, students
                  will develop a strong foundation in key concepts.
                </p>

                <h3 className="text-lg font-semibold mb-3 mt-6">
                  What You&apos;ll Learn
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <li key={item} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#10b981] mr-2 mt-0.5 flex-shrink-0" />
                      <span>
                        Key concept #{item} in {course.category}
                      </span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold mb-3 mt-6">
                  Requirements
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#4b5563] mt-2 mr-2"></div>
                    <span>
                      No prior knowledge required - perfect for beginners
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#4b5563] mt-2 mr-2"></div>
                    <span>Basic reading skills recommended</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructor" className="mt-6">
            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-[#d9d9d9] flex-shrink-0">
                    <Image
                      src="/placeholder.svg?height=96&width=96"
                      alt="Instructor"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      Sarah Johnson
                    </h2>
                    <p className="text-[#6b7280] mb-4">
                      Expert {course.category} Teacher
                    </p>
                    <p className="text-[#4b5563] mb-4">
                      Sarah has been teaching {course.category.toLowerCase()} to
                      children for over 10 years. She specializes in making
                      complex concepts easy to understand through interactive
                      and engaging teaching methods.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="font-bold text-lg">15+</div>
                        <div className="text-sm text-[#6b7280]">Courses</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-lg">10k+</div>
                        <div className="text-sm text-[#6b7280]">Students</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-lg">4.8</div>
                        <div className="text-sm text-[#6b7280]">Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  <div className="text-center md:text-left md:border-r md:pr-6 flex-shrink-0">
                    <div className="text-5xl font-bold text-[#1e1e1e]">
                      {course.rating}
                    </div>
                    <div className="flex items-center justify-center md:justify-start mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= Math.floor(course.rating)
                              ? "text-[#f59e0b] fill-[#f59e0b]"
                              : "text-[#e5e7eb]"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-[#6b7280] mt-1">
                      Based on 245 reviews
                    </div>
                  </div>

                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div
                        key={rating}
                        className="flex items-center gap-3 mb-2"
                      >
                        <div className="text-sm text-[#6b7280] w-2">
                          {rating}
                        </div>
                        <Star className="h-4 w-4 text-[#f59e0b] fill-[#f59e0b]" />
                        <div className="flex-1 h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#f59e0b]"
                            style={{
                              width: `${
                                rating === 5
                                  ? 75
                                  : rating === 4
                                  ? 20
                                  : rating === 3
                                  ? 5
                                  : 0
                              }%`,
                            }}
                          ></div>
                        </div>
                        <div className="text-sm text-[#6b7280] w-8">
                          {rating === 5
                            ? "75%"
                            : rating === 4
                            ? "20%"
                            : rating === 3
                            ? "5%"
                            : "0%"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-[#d9d9d9]">
                          <Image
                            src={`/placeholder.svg?height=40&width=40`}
                            alt="User"
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">User Name {review}</div>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= 5
                                    ? "text-[#f59e0b] fill-[#f59e0b]"
                                    : "text-[#e5e7eb]"
                                }`}
                              />
                            ))}
                            <span className="text-xs text-[#6b7280] ml-2">
                              2 weeks ago
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[#4b5563]">
                        My child loves this course! The content is engaging and
                        easy to follow. The instructor explains concepts clearly
                        and the interactive activities make learning fun.
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function BookmarkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

const courses = [
  {
    id: 1,
    title: "Mathematics for Kids",
    category: "Mathematics",
    rating: 4.8,
    duration: "4 hours",
    progress: 65,
    saved: true,
  },
  {
    id: 2,
    title: "English Vocabulary",
    category: "Language",
    rating: 4.5,
    duration: "6 hours",
    progress: 30,
    saved: false,
  },
  {
    id: 3,
    title: "Science Experiments",
    category: "Science",
    rating: 4.9,
    duration: "5 hours",
    progress: 100,
    saved: true,
  },
];

const lessons = [
  {
    title: "Introduction to the Course",
    duration: "10 min",
    completed: true,
  },
  {
    title: "Basic Concepts",
    duration: "15 min",
    completed: true,
  },
  {
    title: "Interactive Activities",
    duration: "20 min",
    completed: false,
  },
  {
    title: "Practice Exercises",
    duration: "25 min",
    completed: false,
  },
  {
    title: "Fun Games and Challenges",
    duration: "15 min",
    completed: false,
  },
  {
    title: "Final Quiz",
    duration: "10 min",
    completed: false,
  },
];
