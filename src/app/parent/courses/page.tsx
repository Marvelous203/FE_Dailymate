"use client"
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Search, Star, User, Filter, ChevronDown, Heart, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ParentCourses() {
  const [filteredCourses, setFilteredCourses] = useState(allCourses);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle search functionality
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setFilteredCourses(allCourses);
    } else {
      const filtered = allCourses.filter((course) =>
        course.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  };

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      {/* Header */}
      <header className={`sticky top-0 z-10 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1e1e1e] flex items-center">
            <span className="text-[#8b5cf6] mr-2">Kid</span>Learning
          </h1>
          <div className="flex items-center gap-4">
            <Button className="bg-[#8b5cf6] hover:bg-[#7c3aed] rounded-full">
              My Purchases
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] py-16 mb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                Discover the Joy of Learning
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-white/90 text-lg mb-6"
              >
                Interactive courses designed to make education fun and engaging for children of all ages
              </motion.p>
              
              <div className="relative max-w-md">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  placeholder="Search for courses..."
                  className="pl-10 py-6 rounded-full bg-white/90 backdrop-blur-sm border-none text-[#1e1e1e] placeholder:text-gray-500"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="md:w-1/2 flex justify-center"
            >
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="Kids learning"
                width={400}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        {/* Featured Courses */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#1e1e1e] border-l-4 border-[#8b5cf6] pl-3">
              Featured Courses
            </h2>
            <Button variant="ghost" className="text-[#8b5cf6] hover:text-[#7c3aed] flex items-center">
              View All <ChevronDown size={16} className="ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <FeaturedCourseCard course={course} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Course Categories */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#1e1e1e] border-l-4 border-[#8b5cf6] pl-3">
              Browse Courses
            </h2>
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
              <Filter size={16} className="text-[#8b5cf6]" />
              <span className="text-sm">Filter</span>
            </div>
          </div>
          
          <Tabs 
            defaultValue="all" 
            className="mb-8"
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <div className="overflow-x-auto pb-2">
              <TabsList className="bg-white rounded-full p-1 shadow-sm w-fit">
                <TabsTrigger value="all" className="rounded-full">All Courses</TabsTrigger>
                <TabsTrigger value="math" className="rounded-full">Mathematics</TabsTrigger>
                <TabsTrigger value="science" className="rounded-full">Science</TabsTrigger>
                <TabsTrigger value="language" className="rounded-full">Language</TabsTrigger>
                <TabsTrigger value="art" className="rounded-full">Art & Music</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="math" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses
                  .filter((c) => c.category === "Mathematics")
                  .map((course, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <CourseCard course={course} />
                    </motion.div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="science" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses
                  .filter((c) => c.category === "Science")
                  .map((course, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <CourseCard course={course} />
                    </motion.div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="language" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses
                  .filter((c) => c.category === "Language")
                  .map((course, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <CourseCard course={course} />
                    </motion.div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="art" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses
                  .filter((c) => c.category === "Art" || c.category === "Music")
                  .map((course, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <CourseCard course={course} />
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Age Groups */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1e1e1e] border-l-4 border-[#8b5cf6] pl-3 mb-8">
            Browse by Age Group
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ageGroups.map((group, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="border-none rounded-xl shadow-md overflow-hidden h-full">
                  <div className="h-32 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/placeholder.svg?height=128&width=384')] opacity-20 mix-blend-overlay"></div>
                    <h3 className="text-2xl font-bold text-white relative z-10">{group.name}</h3>
                  </div>
                  <CardContent className="p-5">
                    <p className="text-[#4b5563] mb-5">{group.description}</p>
                    <Button variant="outline" className="w-full rounded-full hover:bg-[#8b5cf6] hover:text-white transition-colors">
                      Browse Courses
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1e1e1e] border-l-4 border-[#8b5cf6] pl-3 mb-8">
            What Parents Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
              >
                <Card className="border-none rounded-xl shadow-md h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-[#f0e5fc] flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=56&width=56"
                          alt={testimonial.name}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{testimonial.name}</p>
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
                    <p className="text-[#4b5563] italic">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-none rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] p-8 md:p-12 relative">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=300&width=1200')] opacity-10 mix-blend-overlay"></div>
              <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Ready to start your child's learning journey?
                  </h2>
                  <p className="text-white/80 text-lg">
                    Get access to all our premium courses with a subscription.
                  </p>
                </div>
                <Button className="bg-white text-[#8b5cf6] hover:bg-white/90 rounded-full px-8 py-6 text-lg font-semibold">
                  <Link href="/parent/premium">View Premium Plans</Link>
                </Button>
              </div>
            </div>
          </Card>
        </motion.section>
      </main>
    </div>
  );
}

function FeaturedCourseCard({ course }) {
  return (
    <Card className="border-none rounded-xl shadow-md overflow-hidden h-full hover:shadow-xl transition-all duration-300">
      <div className="h-52 relative overflow-hidden">
        <Image
          src={`/placeholder.svg?height=208&width=416`}
          alt={course.title}
          width={416}
          height={208}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {course.featured && (
          <div className="absolute top-3 right-3 bg-[#8b5cf6] text-white px-3 py-1 rounded-full text-xs font-medium">
            Featured
          </div>
        )}
        <button className="absolute top-3 left-3 bg-white/30 backdrop-blur-sm p-2 rounded-full hover:bg-white/50 transition-colors">
          <Heart className="h-5 w-5 text-white" />
        </button>
      </div>
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-[#f0e5fc] px-3 py-1 rounded-full text-xs text-[#8b5cf6] font-medium">
            {course.category}
          </div>
          <div className="text-[#6b7280] text-xs flex items-center">
            <Star className="h-3 w-3 text-[#f59e0b] fill-[#f59e0b] mr-1" />
            {course.rating}
          </div>
        </div>
        <Link href={`/parent/courses/${course.id}`}>
          <h3 className="font-semibold text-lg mb-3 hover:text-[#8b5cf6] transition-colors line-clamp-2">
            {course.title}
          </h3>
        </Link>
        <p className="text-sm text-[#4b5563] mb-4 line-clamp-2">
          {course.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center text-sm text-[#6b7280]">
            <User size={16} className="mr-1" />
            <span>Ages {course.ageRange}</span>
          </div>
          <div className="font-bold text-[#8b5cf6]">${course.price}</div>
        </div>
        <Button className="w-full mt-4 bg-[#8b5cf6] hover:bg-[#7c3aed] rounded-full">
          <Link href={`/parent/courses/${course.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function CourseCard({ course }) {
  return (
    <Card className="border-none rounded-xl shadow-md overflow-hidden h-full hover:shadow-lg transition-all duration-300">
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
          <h3 className="font-semibold mb-3 hover:text-[#8b5cf6] transition-colors line-clamp-2">
            {course.title}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center text-xs text-[#6b7280]">
              <BookOpen size={14} className="mr-1" />
              <span>{course.lessons}</span>
            </div>
            <div className="flex items-center text-xs text-[#6b7280]">
              <Clock size={14} className="mr-1" />
              <span>4h</span>
            </div>
          </div>
          <div className="font-bold text-[#8b5cf6]">${course.price}</div>
        </div>
      </CardContent>
    </Card>
  );
}

// Dữ liệu mẫu giữ nguyên như cũ
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
