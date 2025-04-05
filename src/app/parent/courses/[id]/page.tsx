import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, CheckCircle, ChevronLeft, Clock, Play, Shield, Star, User } from "lucide-react"
import ParentHeader from "@/components/parent-header"

export default function ParentCourseDetail({ params }) {
  const courseId = params.id
  const course = courses.find((c) => c.id.toString() === courseId) || courses[0]

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <ParentHeader />

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-8">
        <Link href="/parent/courses" className="flex items-center text-[#6b7280] mb-6 hover:text-[#8b5cf6]">
          <ChevronLeft size={20} className="mr-1" />
          Back to Courses
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-8">
              <div className="h-64 bg-[#d9d9d9] relative">
                <Image
                  src={`/placeholder.svg?height=300&width=800`}
                  alt={course.title}
                  width={800}
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
                  <div className="bg-[#f0e5fc] px-3 py-1 rounded-full text-sm text-[#8b5cf6] font-medium">
                    {course.category}
                  </div>
                  <div className="flex items-center text-[#f59e0b]">
                    <Star className="h-5 w-5 fill-[#f59e0b] mr-1" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                  <div className="flex items-center text-[#6b7280] text-sm">
                    <User className="h-4 w-4 mr-1" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center text-[#6b7280] text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <h1 className="text-2xl font-bold mb-4">{course.title}</h1>

                <p className="text-[#4b5563] mb-6">{course.description}</p>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 bg-[#f9fafb] px-3 py-2 rounded-md">
                    <BookOpen className="h-5 w-5 text-[#8b5cf6]" />
                    <span>{course.lessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#f9fafb] px-3 py-2 rounded-md">
                    <User className="h-5 w-5 text-[#8b5cf6]" />
                    <span>Ages {course.ageRange}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#f9fafb] px-3 py-2 rounded-md">
                    <Clock className="h-5 w-5 text-[#8b5cf6]" />
                    <span>{course.accessPeriod} access</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-[#8b5cf6] hover:bg-[#7c3aed] flex-1">Purchase This Course</Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <BookmarkIcon className="h-5 w-5" />
                    Save for Later
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
                      <div key={index} className="flex items-center justify-between p-4 border-b last:border-b-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#f0e5fc] text-[#8b5cf6] flex items-center justify-center">
                            <span>{index + 1}</span>
                          </div>
                          <div>
                            <h3 className="font-medium">{lesson.title}</h3>
                            <div className="flex items-center text-sm text-[#6b7280]">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{lesson.duration}</span>
                            </div>
                          </div>
                        </div>
                        {lesson.preview ? (
                          <Button variant="outline" size="sm" className="text-[#8b5cf6] border-[#8b5cf6]">
                            Preview
                          </Button>
                        ) : (
                          <LockIcon className="h-5 w-5 text-[#6b7280]" />
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="overview" className="mt-6">
                <Card className="border-none shadow-sm">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">About This Course</h2>
                    <p className="text-[#4b5563] mb-4">{course.longDescription}</p>

                    <h3 className="text-lg font-semibold mb-3 mt-6">What Your Child Will Learn</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.learningOutcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-[#8b5cf6] mr-2 mt-0.5 flex-shrink-0" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>

                    <h3 className="text-lg font-semibold mb-3 mt-6">Requirements</h3>
                    <ul className="space-y-2">
                      {course.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-1.5 w-1.5 rounded-full bg-[#4b5563] mt-2 mr-2"></div>
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>

                    <h3 className="text-lg font-semibold mb-3 mt-6">Who This Course is For</h3>
                    <ul className="space-y-2">
                      {course.targetAudience.map((audience, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-1.5 w-1.5 rounded-full bg-[#4b5563] mt-2 mr-2"></div>
                          <span>{audience}</span>
                        </li>
                      ))}
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
                        <h2 className="text-xl font-semibold mb-2">{course.instructor.name}</h2>
                        <p className="text-[#6b7280] mb-4">{course.instructor.title}</p>
                        <p className="text-[#4b5563] mb-4">{course.instructor.bio}</p>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="font-bold text-lg">{course.instructor.courses}+</div>
                            <div className="text-sm text-[#6b7280]">Courses</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-lg">{course.instructor.students}+</div>
                            <div className="text-sm text-[#6b7280]">Students</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-lg">{course.instructor.rating}</div>
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
                        <div className="text-5xl font-bold text-[#1e1e1e]">{course.rating}</div>
                        <div className="flex items-center justify-center md:justify-start mt-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-5 w-5 ${
                                star <= Math.floor(course.rating) ? "text-[#f59e0b] fill-[#f59e0b]" : "text-[#e5e7eb]"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-[#6b7280] mt-1">Based on {course.reviewCount} reviews</div>
                      </div>

                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center gap-3 mb-2">
                            <div className="text-sm text-[#6b7280] w-2">{rating}</div>
                            <Star className="h-4 w-4 text-[#f59e0b] fill-[#f59e0b]" />
                            <div className="flex-1 h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#f59e0b]"
                                style={{
                                  width: `${rating === 5 ? 75 : rating === 4 ? 20 : rating === 3 ? 5 : 0}%`,
                                }}
                              ></div>
                            </div>
                            <div className="text-sm text-[#6b7280] w-8">
                              {rating === 5 ? "75%" : rating === 4 ? "20%" : rating === 3 ? "5%" : "0%"}
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
                              <div className="font-medium">Parent Name {review}</div>
                              <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= 5 ? "text-[#f59e0b] fill-[#f59e0b]" : "text-[#e5e7eb]"
                                    }`}
                                  />
                                ))}
                                <span className="text-xs text-[#6b7280] ml-2">2 weeks ago</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-[#4b5563]">
                            My child loves this course! The content is engaging and easy to follow. The instructor
                            explains concepts clearly and the interactive activities make learning fun. I've seen
                            significant improvement in my child's understanding.
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div>
            <Card className="border-none shadow-sm sticky top-4">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-[#1e1e1e] mb-4">${course.price}</div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#8b5cf6] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Full course access</p>
                      <p className="text-sm text-[#6b7280]">{course.lessons} lessons</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#8b5cf6] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Access period</p>
                      <p className="text-sm text-[#6b7280]">{course.accessPeriod}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#8b5cf6] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Interactive activities</p>
                      <p className="text-sm text-[#6b7280]">Games and quizzes</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#8b5cf6] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Progress tracking</p>
                      <p className="text-sm text-[#6b7280]">Monitor your child's learning</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#8b5cf6] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Certificate of completion</p>
                      <p className="text-sm text-[#6b7280]">Upon finishing the course</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] mb-3">Purchase This Course</Button>
                <Button variant="outline" className="w-full">
                  Add to Cart
                </Button>

                <div className="mt-6 flex items-center justify-center text-sm text-[#6b7280]">
                  <Shield className="h-4 w-4 mr-2" />
                  <span>30-day money-back guarantee</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Courses */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCourses.map((course, index) => (
              <Card key={index} className="border-none shadow-sm overflow-hidden">
                <div className="h-40 bg-[#d9d9d9] relative">
                  <Image
                    src={`/placeholder.svg?height=160&width=320`}
                    alt={course.title}
                    width={320}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-[#f0e5fc] px-2 py-1 rounded text-xs text-[#8b5cf6] font-medium">
                      {course.category}
                    </div>
                    <div className="text-[#6b7280] text-xs flex items-center">
                      <Star className="h-3 w-3 text-[#f59e0b] mr-1" />
                      {course.rating}
                    </div>
                  </div>
                  <Link href={`/parent/courses/${course.id}`}>
                    <h3 className="font-semibold mb-2 hover:text-[#8b5cf6] transition-colors">{course.title}</h3>
                  </Link>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-[#6b7280]">
                      <BookOpen size={16} className="mr-1" />
                      <span>{course.lessons} lessons</span>
                    </div>
                    <div className="font-bold text-[#8b5cf6]">${course.price}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

function BookmarkIcon(props) {
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
  )
}

function LockIcon(props) {
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
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

const courses = [
  {
    id: 1,
    title: "Complete Mathematics for Elementary Students",
    description:
      "A comprehensive course covering all essential math concepts for elementary school students with interactive exercises and games.",
    longDescription:
      "This comprehensive mathematics course is designed specifically for elementary school students. It covers all essential math concepts including numbers, operations, geometry, measurement, and data analysis. Through interactive lessons, engaging exercises, and fun games, students will develop a strong foundation in mathematics that will serve them throughout their academic journey. The course is structured to build confidence and foster a love for mathematics.",
    category: "Mathematics",
    rating: 4.9,
    reviewCount: 245,
    lessons: 24,
    duration: "12 hours",
    price: 49.99,
    ageRange: "6-10",
    students: 2500,
    accessPeriod: "Lifetime",
    learningOutcomes: [
      "Master basic arithmetic operations (addition, subtraction, multiplication, division)",
      "Understand place value and number systems",
      "Solve word problems using mathematical reasoning",
      "Learn basic geometry concepts including shapes and measurements",
      "Develop skills in data interpretation using graphs and charts",
      "Build a strong foundation for future mathematical learning",
    ],
    requirements: [
      "No prior knowledge required - perfect for beginners",
      "Basic reading skills recommended",
      "A computer or tablet with internet connection",
    ],
    targetAudience: [
      "Elementary school students aged 6-10",
      "Parents looking to support their child's math education",
      "Teachers seeking supplementary materials for their students",
      "Homeschooling families",
    ],
    instructor: {
      name: "Sarah Johnson",
      title: "Mathematics Education Specialist",
      bio: "Sarah has been teaching mathematics to elementary students for over 15 years. She specializes in making complex concepts easy to understand through interactive and engaging teaching methods. She holds a Master's degree in Education with a focus on mathematics instruction.",
      courses: 15,
      students: 10000,
      rating: 4.8,
    },
  },
]

const lessons = [
  {
    title: "Introduction to Numbers",
    duration: "30 min",
    preview: true,
  },
  {
    title: "Addition and Subtraction Basics",
    duration: "45 min",
    preview: true,
  },
  {
    title: "Multiplication Tables",
    duration: "60 min",
    preview: false,
  },
  {
    title: "Division Concepts",
    duration: "45 min",
    preview: false,
  },
  {
    title: "Fractions Introduction",
    duration: "50 min",
    preview: false,
  },
  {
    title: "Geometry: Shapes and Angles",
    duration: "40 min",
    preview: false,
  },
  {
    title: "Measurement Units",
    duration: "35 min",
    preview: false,
  },
  {
    title: "Word Problems",
    duration: "55 min",
    preview: false,
  },
]

const relatedCourses = [
  {
    id: 7,
    title: "Multiplication & Division Mastery",
    category: "Mathematics",
    rating: 4.9,
    lessons: 16,
    price: 39.99,
  },
  {
    id: 2,
    title: "Science Experiments at Home",
    category: "Science",
    rating: 4.8,
    lessons: 18,
    price: 39.99,
  },
  {
    id: 8,
    title: "Vocabulary Building for Kids",
    category: "Language",
    rating: 4.7,
    lessons: 22,
    price: 42.99,
  },
]

