"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, CheckCircle, ChevronLeft, Clock, Play, Shield, Star, User, Heart, Download, Share2 } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export default function ParentCourseDetail({ params }) {
  const courseId = params.id
  const course = courses.find((c) => c.id.toString() === courseId) || courses[0]
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/parent/courses" className="flex items-center text-[#6b7280] mb-6 hover:text-[#8b5cf6] group">
            <ChevronLeft size={20} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Courses
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Details */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-none rounded-xl overflow-hidden shadow-md mb-8">
              <div className="h-[400px] relative">
                {!isVideoPlaying ? (
                  <>
                    <Image
                      src={`/placeholder.svg?height=400&width=800`}
                      alt={course.title}
                      width={800}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Button 
                        className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm p-6 group"
                        onClick={() => setIsVideoPlaying(true)}
                      >
                        <Play className="h-10 w-10 text-white fill-white group-hover:scale-110 transition-transform" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    <div className="text-white text-center">
                      <p className="text-xl mb-4">Video Player Placeholder</p>
                      <Button 
                        variant="outline" 
                        className="text-white border-white hover:bg-white/10"
                        onClick={() => setIsVideoPlaying(false)}
                      >
                        Close Video
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="bg-[#f0e5fc] px-3 py-1 rounded-full text-sm text-[#8b5cf6] font-medium">
                    {course.category}
                  </div>
                  <div className="flex items-center text-[#f59e0b]">
                    <Star className="h-5 w-5 fill-[#f59e0b] mr-1" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="text-[#6b7280] text-sm ml-1">({course.reviewCount} reviews)</span>
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

                <h1 className="text-2xl md:text-3xl font-bold mb-4">{course.title}</h1>

                <p className="text-[#4b5563] mb-6 text-lg">{course.description}</p>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 bg-[#f9fafb] px-4 py-2 rounded-full">
                    <BookOpen className="h-5 w-5 text-[#8b5cf6]" />
                    <span>{course.lessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#f9fafb] px-4 py-2 rounded-full">
                    <User className="h-5 w-5 text-[#8b5cf6]" />
                    <span>Ages {course.ageRange}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#f9fafb] px-4 py-2 rounded-full">
                    <Clock className="h-5 w-5 text-[#8b5cf6]" />
                    <span>{course.accessPeriod} access</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-[#8b5cf6] hover:bg-[#7c3aed] rounded-full flex-1 py-6 text-lg">
                    Purchase This Course
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" className="rounded-full flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Save
                    </Button>
                    <Button variant="outline" className="rounded-full flex items-center gap-2">
                      <Share2 className="h-5 w-5" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <Tabs defaultValue="curriculum" className="mb-8">
              <TabsList className="bg-white rounded-full p-1 w-full flex justify-between md:w-auto">
                <TabsTrigger value="curriculum" className="rounded-full">Curriculum</TabsTrigger>
                <TabsTrigger value="overview" className="rounded-full">Overview</TabsTrigger>
                <TabsTrigger value="instructor" className="rounded-full">Instructor</TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-full">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="curriculum" className="mt-6">
                <Card className="border-none rounded-xl shadow-md">
                  <CardContent className="p-0">
                    {lessons.map((lesson, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-center justify-between p-5 border-b last:border-b-0 hover:bg-[#f9fafb] transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#f0e5fc] text-[#8b5cf6] flex items-center justify-center font-semibold">
                            {index + 1}
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
                          <Button variant="outline" size="sm" className="text-[#8b5cf6] border-[#8b5cf6] rounded-full">
                            Preview
                          </Button>
                        ) : (
                          <div className="w-8 h-8 rounded-full border border-[#e5e7eb] flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-[#6b7280]"
                            >
                              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="overview" className="mt-6">
                <Card className="border-none rounded-xl shadow-md">
                  <CardContent className="p-6 md:p-8">
                    <h2 className="text-xl font-semibold mb-6">About This Course</h2>
                    <p className="text-[#4b5563] mb-6 leading-relaxed">{course.longDescription}</p>

                    <h3 className="text-lg font-semibold mb-4 mt-8">What Your Child Will Learn</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {course.learningOutcomes.map((outcome, index) => (
                        <motion.div 
                          key={index} 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <CheckCircle className="h-5 w-5 text-[#8b5cf6] mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-[#4b5563]">{outcome}</span>
                        </motion.div>
                      ))}
                    </div>

                    <h3 className="text-lg font-semibold mb-4">Requirements</h3>
                    <ul className="space-y-3 mb-8">
                      {course.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-[#8b5cf6] mt-2 mr-3"></div>
                          <span className="text-[#4b5563]">{requirement}</span>
                        </li>
                      ))}
                    </ul>

                    <h3 className="text-lg font-semibold mb-4">Who This Course is For</h3>
                    <ul className="space-y-3">
                      {course.targetAudience.map((audience, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-[#8b5cf6] mt-2 mr-3"></div>
                          <span className="text-[#4b5563]">{audience}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="instructor" className="mt-6">
                <Card className="border-none rounded-xl shadow-md">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-[#f0e5fc] flex-shrink-0 border-4 border-white shadow-md">
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
                        <p className="text-[#8b5cf6] mb-4">{course.instructor.title}</p>
                        <p className="text-[#4b5563] mb-6 leading-relaxed">{course.instructor.bio}</p>
                        <div className="flex items-center gap-8">
                          <div className="text-center">
                            <div className="font-bold text-2xl text-[#8b5cf6]">{course.instructor.courses}+</div>
                            <div className="text-sm text-[#6b7280]">Courses</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-2xl text-[#8b5cf6]">{course.instructor.students}+</div>
                            <div className="text-sm text-[#6b7280]">Students</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-2xl text-[#8b5cf6]">{course.instructor.rating}</div>
                            <div className="text-sm text-[#6b7280]">Rating</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card className="border-none rounded-xl shadow-md">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-8 mb-10 border-b pb-8">
                      <div className="text-center md:text-left md:border-r md:pr-8 flex-shrink-0">
                        <div className="text-5xl font-bold text-[#1e1e1e]">{course.rating}</div>
                        <div className="flex items-center justify-center md:justify-start mt-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-5 w-5 ${star <= Math.floor(course.rating) ? "text-[#f59e0b] fill-[#f59e0b]" : "text-[#e5e7eb]"
                                }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-[#6b7280] mt-1">Based on {course.reviewCount} reviews</div>
                      </div>

                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center gap-3 mb-3">
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
                            <div className="text-sm text-[#6b7280] w-10">
                              {rating === 5 ? "75%" : rating === 4 ? "20%" : rating === 3 ? "5%" : "0%"}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sample Reviews */}
                    <div className="space-y-8">
                      {[1, 2, 3].map((review) => (
                        <motion.div 
                          key={review} 
                          className="border-b pb-8 last:border-b-0 last:pb-0"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4, delay: review * 0.1 }}
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-[#f0e5fc]">
                              <Image
                                src={`/placeholder.svg?height=48&width=48`}
                                alt="User"
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">Parent Name {review}</div>
                              <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${star <= 5 ? "text-[#f59e0b] fill-[#f59e0b]" : "text-[#e5e7eb]"
                                      }`}
                                  />
                                ))}
                                <span className="text-xs text-[#6b7280] ml-2">2 weeks ago</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-[#4b5563] leading-relaxed">
                            My child loves this course! The content is engaging and easy to follow. The instructor
                            explains concepts clearly and the interactive activities make learning fun. I've seen
                            significant improvement in my child's understanding.
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-none rounded-xl shadow-md sticky top-4">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-[#1e1e1e] mb-6">${course.price}</div>

                <div className="space-y-5 mb-8">
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

                <Button className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] rounded-full py-6 text-lg mb-3">
                  Purchase This Course
                </Button>
                <Button variant="outline" className="w-full rounded-full">
                  Add to Cart
                </Button>

                <div className="mt-6 flex items-center justify-center text-sm text-[#6b7280]">
                  <Shield className="h-4 w-4 mr-2" />
                  <span>30-day money-back guarantee</span>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2 mb-3 rounded-full">
                    <Download className="h-4 w-4" />
                    Download Course Syllabus
                  </Button>
                  <Button variant="ghost" className="w-full flex items-center justify-center gap-2 text-[#6b7280] rounded-full">
                    <Share2 className="h-4 w-4" />
                    Share This Course
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Related Courses */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-[#1e1e1e] border-l-4 border-[#8b5cf6] pl-3 mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedCourses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="border-none rounded-xl shadow-md overflow-hidden h-full">
                  <div className="h-44 relative overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=176&width=352`}
                      alt={course.title}
                      width={352}
                      height={176}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <button className="absolute top-3 right-3 bg-white/30 backdrop-blur-sm p-2 rounded-full hover:bg-white/50 transition-colors">
                      <Heart className="h-4 w-4 text-white" />
                    </button>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-[#f0e5fc] px-2 py-1 rounded-full text-xs text-[#8b5cf6] font-medium">
                        {course.category}
                      </div>
                      <div className="text-[#6b7280] text-xs flex items-center">
                        <Star className="h-3 w-3 text-[#f59e0b] fill-[#f59e0b] mr-1" />
                        {course.rating}
                      </div>
                    </div>
                    <Link href={`/parent/courses/${course.id}`}>
                      <h3 className="font-semibold mb-3 hover:text-[#8b5cf6] transition-colors line-clamp-2">{course.title}</h3>
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
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
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

