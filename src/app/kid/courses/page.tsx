import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Star } from "lucide-react";

export default function KidCoursesPage() {
  return (
    <div>
      <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">My Learning Journey</h1>
        <p className="text-[#6b7280]">
          Explore your courses and continue learning!
        </p>
      </div>

      {/* Course Categories */}
      <div className="flex overflow-x-auto gap-3 pb-4 mb-8 hide-scrollbar">
        <Button className="bg-[#10b981] hover:bg-[#059669] rounded-full">
          All Courses
        </Button>
        <Button variant="outline" className="rounded-full">
          Mathematics
        </Button>
        <Button variant="outline" className="rounded-full">
          Science
        </Button>
        <Button variant="outline" className="rounded-full">
          Language
        </Button>
        <Button variant="outline" className="rounded-full">
          Art
        </Button>
        <Button variant="outline" className="rounded-full">
          Music
        </Button>
      </div>

      {/* My Courses */}
      <h2 className="text-xl font-bold mb-4">My Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {kidCourses.map((course, index) => (
          <Card key={index} className="border-none shadow-sm overflow-hidden">
            <div className="h-32 bg-[#d9d9d9] relative">
              <Image
                src={`/placeholder.svg?height=128&width=256`}
                alt={course.title}
                width={256}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">{course.title}</h3>
              <div className="flex items-center justify-between text-sm mb-2">
                <div className="flex items-center text-[#6b7280]">
                  <BookOpen size={16} className="mr-1" />
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-[#f59e0b] fill-[#f59e0b] mr-1" />
                  <span>{course.stars} stars</span>
                </div>
              </div>
              <div className="w-full bg-[#e5e7eb] h-2 rounded-full">
                <div
                  className="bg-[#10b981] h-2 rounded-full"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center mt-2 text-sm">
                <span className="text-[#6b7280]">Progress</span>
                <span className="font-medium">{course.progress}%</span>
              </div>
              <Button className="w-full mt-4 bg-[#10b981] hover:bg-[#059669]">
                <Link href={`/kid/courses/${course.id}`}>Continue</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recommended Courses */}
      <h2 className="text-xl font-bold mb-4">Recommended For You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recommendedCourses.map((course, index) => (
          <Card key={index} className="border-none shadow-sm overflow-hidden">
            <div className="h-32 bg-[#d9d9d9] relative">
              <Image
                src={`/placeholder.svg?height=128&width=256`}
                alt={course.title}
                width={256}
                height={128}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-[#10b981] text-white px-2 py-1 rounded-full text-xs">
                New
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">{course.title}</h3>
              <div className="flex items-center justify-between text-sm mb-2">
                <div className="flex items-center text-[#6b7280]">
                  <BookOpen size={16} className="mr-1" />
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-1 text-[#6b7280]" />
                  <span className="text-[#6b7280]">{course.duration}</span>
                </div>
              </div>
              <Button className="w-full mt-4 bg-[#10b981] hover:bg-[#059669]">
                <Link href={`/kid/courses/${course.id}`}>Start Learning</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

const kidCourses = [
  {
    id: 1,
    title: "Mathematics for Kids",
    lessons: 12,
    stars: 45,
    progress: 65,
  },
  {
    id: 2,
    title: "English Vocabulary",
    lessons: 18,
    stars: 32,
    progress: 30,
  },
  {
    id: 3,
    title: "Science Experiments",
    lessons: 15,
    stars: 50,
    progress: 100,
  },
];

const recommendedCourses = [
  {
    id: 4,
    title: "Art & Craft",
    lessons: 10,
    duration: "3 hours",
  },
  {
    id: 5,
    title: "Music Basics",
    lessons: 12,
    duration: "4 hours",
  },
  {
    id: 6,
    title: "Geography Adventures",
    lessons: 14,
    duration: "5 hours",
  },
];
