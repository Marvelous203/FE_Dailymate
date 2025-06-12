"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, ChevronLeft, Clock, Play, User, Download, Share2, Volume2 } from "lucide-react"
import { useState, useEffect } from "react"
import { getLessonById } from "@/lib/api"
import { use } from 'react';

interface Lesson {
  _id: string;
  courseId: {
    _id: string;
    title: string;
    category: string;
    ageGroup: string;
  };
  title: string;
  description: string;
  content?: {
    sections: {
      title: string;
      text: string;
    }[];
  };
  videoUrl?: string;
  audioUrl?: string;
  imageUrl?: string;
  duration: number;
  order: number;
  isPublished: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export default function ParentLessonDetail({ 
  params 
}: { 
  params: Promise<{ id: string; lessonId: string }> 
}) {
  const resolvedParams = use(params);
  const { id: courseId, lessonId } = resolvedParams;
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Fetch lesson details
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true)
        console.log('Fetching lesson details for ID:', lessonId)
        const response = await getLessonById(lessonId)
        console.log('Lesson API Response:', response)
        
        // Handle different response structures
        let lessonData = null
        if (response && response.success && response.data) {
          lessonData = response.data
        } else if (response && response.data && response.data.lesson) {
          lessonData = response.data.lesson
        } else if (response && response._id) {
          lessonData = response
        }
        
        if (lessonData && lessonData.isPublished) {
          setLesson(lessonData)
        } else {
          setError('Bài học không tồn tại hoặc chưa được xuất bản')
        }
      } catch (err) {
        console.error('Error fetching lesson:', err)
        setError('Không thể tải thông tin bài học')
      } finally {
        setLoading(false)
      }
    }

    if (lessonId) {
      fetchLesson()
    }
  }, [lessonId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8b5cf6] mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải bài học...</p>
        </div>
      </div>
    )
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy bài học</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href={`/parent/courses/${courseId}`}>
            <Button className="bg-[#8b5cf6] hover:bg-[#7c3aed]">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Quay lại khóa học
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={`/parent/courses/${courseId}`}>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-[#8b5cf6]">
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Quay lại khóa học
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{lesson.title}</h1>
                <p className="text-sm text-gray-500">{lesson.courseId.title}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Chia sẻ
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Tải xuống
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <Card className="mb-6 overflow-hidden">
              <div className="relative aspect-video bg-black">
                {lesson.videoUrl ? (
                  <video
                    className="w-full h-full"
                    controls
                    poster={lesson.imageUrl}
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                  >
                    <source src={lesson.videoUrl} type="video/mp4" />
                    Trình duyệt của bạn không hỗ trợ video.
                  </video>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-white">
                      <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Video chưa có sẵn</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Lesson Content */}
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                    <TabsTrigger value="content">Nội dung</TabsTrigger>
                    <TabsTrigger value="resources">Tài nguyên</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Mô tả bài học</h3>
                        <p className="text-gray-600 leading-relaxed">{lesson.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                        <div>
                          <span className="text-sm text-gray-500">Thời lượng</span>
                          <p className="font-medium flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {lesson.duration} phút
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Thứ tự</span>
                          <p className="font-medium">Bài {lesson.order}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="content" className="mt-6">
                    <div className="space-y-4">
                      {lesson.content?.sections && lesson.content.sections.length > 0 ? (
                        lesson.content.sections.map((section, index) => (
                          <div key={index} className="border-l-4 border-[#8b5cf6] pl-4">
                            <h4 className="font-semibold text-gray-900 mb-2">{section.title}</h4>
                            <p className="text-gray-600 leading-relaxed">{section.text}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 italic">Nội dung chi tiết chưa có sẵn</p>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="resources" className="mt-6">
                    <div className="space-y-4">
                      {lesson.audioUrl && (
                        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                          <Volume2 className="w-5 h-5 text-[#8b5cf6] mr-3" />
                          <div className="flex-1">
                            <p className="font-medium">File âm thanh</p>
                            <audio controls className="w-full mt-2">
                              <source src={lesson.audioUrl} type="audio/mpeg" />
                              Trình duyệt của bạn không hỗ trợ audio.
                            </audio>
                          </div>
                        </div>
                      )}
                      
                      {lesson.imageUrl && (
                        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium mb-2">Hình ảnh minh họa</p>
                            <Image
                              src={lesson.imageUrl}
                              alt={lesson.title}
                              width={400}
                              height={200}
                              className="rounded-lg object-cover"
                            />
                          </div>
                        </div>
                      )}
                      
                      {!lesson.audioUrl && !lesson.imageUrl && (
                        <p className="text-gray-500 italic">Chưa có tài nguyên bổ sung</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Thông tin khóa học</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 text-[#8b5cf6] mr-2" />
                    <span className="text-sm text-gray-600">Khóa học:</span>
                    <span className="ml-2 font-medium">{lesson.courseId.title}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600">Danh mục:</span>
                    <span className="ml-2 font-medium">{lesson.courseId.category}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600">Độ tuổi:</span>
                    <span className="ml-2 font-medium">{lesson.courseId.ageGroup}</span>
                  </div>
                </div>
                
                <Link href={`/parent/courses/${courseId}`} className="block mt-4">
                  <Button className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed]">
                    Xem tất cả bài học
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Lesson Progress */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Tiến độ học tập</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Bài học hiện tại</span>
                    <span className="font-medium">Bài {lesson.order}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Thời lượng</span>
                    <span className="font-medium">{lesson.duration} phút</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Trạng thái</span>
                    <span className="font-medium text-green-600">Đã xuất bản</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}