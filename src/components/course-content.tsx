"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Search, Star, User } from "lucide-react";
import { useState } from "react";

interface Course {
    id: number;
    title: string;
    description?: string;
    category: string;
    rating: number;
    lessons: number;
    price: number;
    ageRange?: string;
    featured?: boolean;
}

interface CourseContentProps {
    allCourses: Course[];
    featuredCourses: Course[];
    ageGroups: { name: string; description: string }[];
    testimonials: { name: string; rating: number; text: string }[];
}

export function CourseContent({ allCourses, featuredCourses, ageGroups, testimonials }: CourseContentProps) {
    const [filteredCourses, setFilteredCourses] = useState(allCourses);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = allCourses.filter((course) =>
            course.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCourses(filtered);
    };

    return (
        <main className="container mx-auto p-4 md:p-8 bg-gradient-to-b from-[#f5f5f5] to-white">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-[#1e1e1e] bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] bg-clip-text text-transparent">
                    Course Catalog
                </h1>
                <div className="flex items-center gap-3">
                    <Button className="bg-[#8b5cf6] hover:bg-[#7c3aed] transition-all duration-300 shadow-lg hover:shadow-xl">
                        My Purchases
                    </Button>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center gap-4 mb-8">
                <div className="relative flex-1">
                    <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                    />
                    <Input
                        placeholder="Search courses..."
                        className="pl-10 bg-white border-none shadow-md hover:shadow-lg transition-all duration-300 rounded-xl"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Featured Courses */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6 text-[#1e1e1e]">Featured Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featuredCourses.map((course, index) => (
                        <FeaturedCourseCard key={index} course={course} />
                    ))}
                </div>
            </div>

            {/* Course Categories */}
            <Tabs defaultValue="all" className="mb-8">
                <TabsList className="bg-white shadow-md rounded-xl p-1">
                    <TabsTrigger value="all" className="data-[state=active]:bg-[#8b5cf6] data-[state=active]:text-white rounded-lg transition-all duration-300">
                        All Courses
                    </TabsTrigger>
                    <TabsTrigger value="math" className="data-[state=active]:bg-[#8b5cf6] data-[state=active]:text-white rounded-lg transition-all duration-300">
                        Mathematics
                    </TabsTrigger>
                    <TabsTrigger value="science" className="data-[state=active]:bg-[#8b5cf6] data-[state=active]:text-white rounded-lg transition-all duration-300">
                        Science
                    </TabsTrigger>
                    <TabsTrigger value="language" className="data-[state=active]:bg-[#8b5cf6] data-[state=active]:text-white rounded-lg transition-all duration-300">
                        Language
                    </TabsTrigger>
                    <TabsTrigger value="art" className="data-[state=active]:bg-[#8b5cf6] data-[state=active]:text-white rounded-lg transition-all duration-300">
                        Art & Music
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map((course, index) => (
                            <CourseCard key={index} course={course} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="math" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses
                            .filter((c) => c.category === "Mathematics")
                            .map((course, index) => (
                                <CourseCard key={index} course={course} />
                            ))}
                    </div>
                </TabsContent>

                <TabsContent value="science" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses
                            .filter((c) => c.category === "Science")
                            .map((course, index) => (
                                <CourseCard key={index} course={course} />
                            ))}
                    </div>
                </TabsContent>

                <TabsContent value="language" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses
                            .filter((c) => c.category === "Language")
                            .map((course, index) => (
                                <CourseCard key={index} course={course} />
                            ))}
                    </div>
                </TabsContent>

                <TabsContent value="art" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses
                            .filter((c) => c.category === "Art" || c.category === "Music")
                            .map((course, index) => (
                                <CourseCard key={index} course={course} />
                            ))}
                    </div>
                </TabsContent>
            </Tabs>

            {/* Age Groups */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6 text-[#1e1e1e]">Browse by Age Group</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {ageGroups.map((group, index) => (
                        <Card
                            key={index}
                            className="border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden rounded-xl"
                        >
                            <div className="h-32 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center">
                                <h3 className="text-xl font-bold text-white">{group.name}</h3>
                            </div>
                            <CardContent className="p-6">
                                <p className="text-[#4b5563] mb-4">{group.description}</p>
                                <Button variant="outline" className="w-full hover:bg-[#8b5cf6] hover:text-white transition-all duration-300">
                                    Browse Courses
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Testimonials */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6 text-[#1e1e1e]">What Parents Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-xl">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] p-0.5">
                                        <div className="w-full h-full rounded-full bg-white">
                                            <Image
                                                src="/placeholder.svg?height=48&width=48"
                                                alt="Parent"
                                                width={48}
                                                height={48}
                                                className="w-full h-full object-cover rounded-full"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#1e1e1e]">{testimonial.name}</p>
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${i < testimonial.rating
                                                        ? "text-[#f59e0b] fill-[#f59e0b]"
                                                        : "text-[#e5e7eb]"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[#4b5563] italic">{testimonial.text}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Call to Action */}
            <Card className="border-none shadow-xl bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white mb-12 rounded-2xl">
                <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-6 md:mb-0">
                            <h2 className="text-3xl font-bold mb-4">
                                Ready to start your child&apos;s learning journey?
                            </h2>
                            <p className="text-white/90 text-lg">
                                Get access to all our premium courses with a subscription.
                            </p>
                        </div>
                        <Button className="bg-white text-[#8b5cf6] hover:bg-white/90 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                            <Link href="/parent/premium">View Premium Plans</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}

function FeaturedCourseCard({ course }: { course: Course }) {
    return (
        <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden rounded-xl group">
            <div className="h-48 bg-[#d9d9d9] relative overflow-hidden">
                <Image
                    src={`/placeholder.svg?height=192&width=384`}
                    alt={course.title}
                    width={384}
                    height={192}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {course.featured && (
                    <div className="absolute top-2 right-2 bg-[#8b5cf6] text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                        Featured
                    </div>
                )}
            </div>
            <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                    <div className="bg-[#f0e5fc] px-3 py-1 rounded-full text-xs text-[#8b5cf6] font-medium">
                        {course.category}
                    </div>
                    <div className="text-[#6b7280] text-xs flex items-center">
                        <Star className="h-3 w-3 text-[#f59e0b] mr-1" />
                        {course.rating}
                    </div>
                </div>
                <Link href={`/parent/courses/${course.id}`}>
                    <h3 className="font-semibold mb-2 hover:text-[#8b5cf6] transition-colors text-lg">
                        {course.title}
                    </h3>
                </Link>
                <p className="text-sm text-[#4b5563] mb-4 line-clamp-2">
                    {course.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-[#6b7280]">
                        <User size={16} className="mr-1" />
                        <span>Ages {course.ageRange}</span>
                    </div>
                    <div className="font-bold text-[#8b5cf6] text-lg">${course.price}</div>
                </div>
                <Button className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] transition-all duration-300 shadow-md hover:shadow-lg rounded-xl">
                    <Link href={`/parent/courses/${course.id}`}>View Details</Link>
                </Button>
            </CardContent>
        </Card>
    );
}

function CourseCard({ course }: { course: Course }) {
    return (
        <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden rounded-xl group">
            <div className="h-40 bg-[#d9d9d9] relative overflow-hidden">
                <Image
                    src={`/placeholder.svg?height=160&width=320`}
                    alt={course.title}
                    width={320}
                    height={160}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                    <div className="bg-[#f0e5fc] px-3 py-1 rounded-full text-xs text-[#8b5cf6] font-medium">
                        {course.category}
                    </div>
                    <div className="text-[#6b7280] text-xs flex items-center">
                        <Star className="h-3 w-3 text-[#f59e0b] mr-1" />
                        {course.rating}
                    </div>
                </div>
                <Link href={`/parent/courses/${course.id}`}>
                    <h3 className="font-semibold mb-2 hover:text-[#8b5cf6] transition-colors text-lg">
                        {course.title}
                    </h3>
                </Link>
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-[#6b7280]">
                        <BookOpen size={16} className="mr-1" />
                        <span>{course.lessons} lessons</span>
                    </div>
                    <div className="font-bold text-[#8b5cf6] text-lg">${course.price}</div>
                </div>
            </CardContent>
        </Card>
    );
} 