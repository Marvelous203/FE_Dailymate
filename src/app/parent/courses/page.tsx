import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Filter, Search, Star, User } from "lucide-react";
import ParentHeader from "@/components/parent-header";

export default function ParentCourses() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <ParentHeader />

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#1e1e1e]">Course Catalog</h1>
          <div className="flex items-center gap-3">
            <Button className="bg-[#8b5cf6] hover:bg-[#7c3aed]">
              My Purchases
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search courses..."
              className="pl-10 bg-white border-none"
            />
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-white"
          >
            <Filter size={18} />
            Filter
          </Button>
        </div>

        {/* Featured Courses */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCourses.map((course, index) => (
              <FeaturedCourseCard key={index} course={course} />
            ))}
          </div>
        </div>

        {/* Course Categories */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-white">
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="math">Mathematics</TabsTrigger>
            <TabsTrigger value="science">Science</TabsTrigger>
            <TabsTrigger value="language">Language</TabsTrigger>
            <TabsTrigger value="art">Art & Music</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCourses.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="math" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCourses
                .filter((c) => c.category === "Mathematics")
                .map((course, index) => (
                  <CourseCard key={index} course={course} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="science" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCourses
                .filter((c) => c.category === "Science")
                .map((course, index) => (
                  <CourseCard key={index} course={course} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="language" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCourses
                .filter((c) => c.category === "Language")
                .map((course, index) => (
                  <CourseCard key={index} course={course} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="art" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCourses
                .filter((c) => c.category === "Art" || c.category === "Music")
                .map((course, index) => (
                  <CourseCard key={index} course={course} />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Age Groups */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Browse by Age Group</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {ageGroups.map((group, index) => (
              <Card
                key={index}
                className="border-none shadow-sm overflow-hidden"
              >
                <div className="h-32 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center">
                  <h3 className="text-xl font-bold text-white">{group.name}</h3>
                </div>
                <CardContent className="p-4">
                  <p className="text-[#4b5563] mb-4">{group.description}</p>
                  <Button variant="outline" className="w-full">
                    Browse Courses
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6">What Parents Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-[#d9d9d9]">
                      <Image
                        src="/placeholder.svg?height=48&width=48"
                        alt="Parent"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating
                                ? "text-[#f59e0b] fill-[#f59e0b]"
                                : "text-[#e5e7eb]"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-[#4b5563]">{testimonial.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="border-none shadow-sm bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white mb-12">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">
                  Ready to start your child's learning journey?
                </h2>
                <p className="text-white/80">
                  Get access to all our premium courses with a subscription.
                </p>
              </div>
              <Button className="bg-white text-[#8b5cf6] hover:bg-white/90">
                <Link href="/parent/premium">View Premium Plans</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function FeaturedCourseCard({ course }) {
  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <div className="h-48 bg-[#d9d9d9] relative">
        <Image
          src={`/placeholder.svg?height=192&width=384`}
          alt={course.title}
          width={384}
          height={192}
          className="w-full h-full object-cover"
        />
        {course.featured && (
          <div className="absolute top-2 right-2 bg-[#8b5cf6] text-white px-2 py-1 rounded text-xs font-medium">
            Featured
          </div>
        )}
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
          <h3 className="font-semibold mb-2 hover:text-[#8b5cf6] transition-colors">
            {course.title}
          </h3>
        </Link>
        <p className="text-sm text-[#4b5563] mb-3 line-clamp-2">
          {course.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-[#6b7280]">
            <User size={16} className="mr-1" />
            <span>Ages {course.ageRange}</span>
          </div>
          <div className="font-bold text-[#8b5cf6]">${course.price}</div>
        </div>
        <Button className="w-full mt-4 bg-[#8b5cf6] hover:bg-[#7c3aed]">
          <Link href={`/parent/courses/${course.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function CourseCard({ course }) {
  return (
    <Card className="border-none shadow-sm overflow-hidden">
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
          <h3 className="font-semibold mb-2 hover:text-[#8b5cf6] transition-colors">
            {course.title}
          </h3>
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
  );
}

const featuredCourses = [
  {
    id: 1,
    title: "Complete Mathematics for Elementary Students",
    description:
      "A comprehensive course covering all essential math concepts for elementary school students with interactive exercises and games.",
    category: "Mathematics",
    rating: 4.9,
    lessons: 24,
    price: 49.99,
    ageRange: "6-10",
    featured: true,
  },
  {
    id: 2,
    title: "Science Experiments at Home",
    description:
      "Exciting science experiments that can be done at home with common household items. Perfect for curious young minds!",
    category: "Science",
    rating: 4.8,
    lessons: 18,
    price: 39.99,
    ageRange: "7-12",
    featured: true,
  },
  {
    id: 3,
    title: "English Reading & Writing Mastery",
    description:
      "Help your child develop strong reading and writing skills with our comprehensive English language course.",
    category: "Language",
    rating: 4.7,
    lessons: 30,
    price: 54.99,
    ageRange: "5-11",
    featured: true,
  },
];

const allCourses = [
  {
    id: 1,
    title: "Complete Mathematics for Elementary Students",
    category: "Mathematics",
    rating: 4.9,
    lessons: 24,
    price: 49.99,
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
    id: 3,
    title: "English Reading & Writing Mastery",
    category: "Language",
    rating: 4.7,
    lessons: 30,
    price: 54.99,
  },
  {
    id: 4,
    title: "Introduction to Art & Drawing",
    category: "Art",
    rating: 4.6,
    lessons: 15,
    price: 29.99,
  },
  {
    id: 5,
    title: "Basic Music Theory for Kids",
    category: "Music",
    rating: 4.5,
    lessons: 12,
    price: 34.99,
  },
  {
    id: 6,
    title: "Geography Adventures",
    category: "Science",
    rating: 4.4,
    lessons: 20,
    price: 44.99,
  },
  {
    id: 7,
    title: "Multiplication & Division Mastery",
    category: "Mathematics",
    rating: 4.9,
    lessons: 16,
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
  {
    id: 9,
    title: "Creative Crafts for Kids",
    category: "Art",
    rating: 4.8,
    lessons: 14,
    price: 32.99,
  },
];

const ageGroups = [
  {
    name: "Ages 3-5",
    description: "Early learning fundamentals with fun activities and games.",
  },
  {
    name: "Ages 6-8",
    description: "Building core skills in reading, writing, and mathematics.",
  },
  {
    name: "Ages 9-11",
    description: "Advanced concepts and critical thinking development.",
  },
  {
    name: "Ages 12+",
    description: "Preparation for middle school with complex subjects.",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "My daughter loves the mathematics course! The interactive lessons keep her engaged and she's showing real improvement in school.",
  },
  {
    name: "Michael T.",
    rating: 5,
    text: "The science experiments course is fantastic. My son looks forward to the weekend when we do the experiments together. Highly recommended!",
  },
  {
    name: "Jennifer L.",
    rating: 4,
    text: "The English course has helped my child improve their reading comprehension significantly. The lessons are well-structured and easy to follow.",
  },
];
