'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, Star, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, use } from "react"
import { getCourseById, getLessonsByCourse } from "@/lib/api"

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
}

interface Lesson {
  _id: string;
  title: string;
  description?: string;
  duration?: number;
  order?: number;
}

interface Test {
  _id: string;
  title: string;
  lessonId?: string;
}

export default function CoursePage({ params }: { params: Promise<{ courseId: string; kidId: string }> }) {
  const resolvedParams = use(params);
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);

        // Gọi song song course và lessons
        const [courseResponse, lessonsResponse] = await Promise.all([
          getCourseById(resolvedParams.courseId),
          getLessonsByCourse(resolvedParams.courseId)
        ]);

        setCourse(courseResponse.course || courseResponse.data || courseResponse);

        const lessonsData = Array.isArray(lessonsResponse)
          ? lessonsResponse
          : lessonsResponse?.lessons || lessonsResponse?.data?.lessons || [];

        setLessons(lessonsData);
        
        // Initialize tests as empty array for now
        setTests([]);
      } catch (error) {
        console.error('Error fetching course data:', error);
        setError('Không thể tải thông tin khóa học');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [resolvedParams.courseId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
          <div className="flex items-center gap-6">
            <div className="h-40 w-40 bg-gray-300 rounded-lg"></div>
            <div className="flex-1">
              <div className="h-8 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-4"></div>
              <div className="h-2 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error || 'Không tìm thấy khóa học'}</p>
          <Button onClick={() => window.location.reload()} className="bg-[#83d98c] hover:bg-[#6bc275]">
            Thử lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" className="p-2">
          <Link href={`/environment-kid/kid-learning-zone/${resolvedParams.kidId}/courses/`} className="flex items-center gap-2">
            <ArrowLeft className="h-6 w-6" />
            <span>Back to Courses</span>
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="h-40 w-40 bg-[#d9d9d9] rounded-lg overflow-hidden">
            <Image
              src={course.thumbnailUrl || "https://res.cloudinary.com/dfkb8qo66/image/upload/v1742822285/1000000018_aifdis.jpg"}
              alt="ảnh con thỏ"
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
            <div className="flex items-center gap-4 text-sm text-[#6b7280] mb-4">
              <div className="flex items-center">
                <BookOpen size={16} className="mr-1" />
                <span>{lessons.length} Lessons</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{Array.isArray(lessons) ? lessons.reduce((total, lesson) => total + (lesson.duration || 0), 0) : 0} Minutes</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-[#f59e0b] fill-[#f59e0b] mr-1" />
                <span>{tests.length} Tests Available</span>
              </div>
            </div>
            <p className="text-[#4b5563] mb-4">
              {course.description}
            </p>
            <div className="w-full bg-[#e5e7eb] h-2 rounded-full mb-2">
              <div className="bg-[#83d98c] h-2 rounded-full" style={{ width: "0%" }}></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#6b7280]">Overall Progress</span>
              <span className="font-medium">0%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Course Lessons</h2>
        <div className="space-y-4">
          {lessons.length > 0 ? (
            lessons
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((lesson, index) => (
                <Card key={lesson._id} className="border-none shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-[#e5e7eb] flex items-center justify-center">
                          <span className="text-lg font-bold text-[#6b7280]">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{lesson.title}</h3>
                          <p className="text-sm text-[#6b7280]">{lesson.duration || 15} minutes</p>
                        </div>
                      </div>
                      <Button className="bg-[#e5e7eb] text-[#6b7280]">
                        <Link href={`/environment-kid/kid-learning-zone/${resolvedParams.kidId}/courses/${resolvedParams.courseId}/lessons/${lesson._id}`}>
                          Start
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
          ) : (
            <p className="text-center text-[#6b7280] py-8">Chưa có bài học nào trong khóa học này.</p>
          )}
        </div>
      </div>

      {tests.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Course Tests</h2>
          <div className="space-y-4">
            {tests.map((test, index) => (
              <Card key={test._id} className="border-none shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#f59e0b] flex items-center justify-center">
                        <span className="text-lg font-bold text-white">T{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{test.title}</h3>
                        <p className="text-sm text-[#6b7280]">Test</p>
                      </div>
                    </div>
                    <Button className="bg-[#f59e0b] hover:bg-[#d97706] text-white">
                      <Link href={`/environment-kid/kid-learning-zone/courses/${resolvedParams.courseId}/tests/${test._id}`}>
                        Take Test
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}