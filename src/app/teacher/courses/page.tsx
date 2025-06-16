'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Filter, BookOpen, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { EditCourseModal } from './EditCourseModal';
import { DeleteCourseModal } from './DeleteCourse';
import CreateCourseModal from './CreateCourse';
import { CourseDetailModal } from './CourseDetail';
import { getAllCourses, updateCourse, deleteCourse, createCourse } from '@/lib/api';
import { toast } from "sonner"


export interface Instructor {
  _id: string;
  fullName: string;
  specializations: string[];
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  ageGroup: string;
  thumbnailUrl: string;
  pointsEarned: number;
  isPremium: boolean;
  instructor: Instructor;
  isPublished: boolean;
  status?: 'active' | 'archived'; // Thêm field này
  createdAt: string;
  updatedAt: string;
}

export interface CourseUpdatePayload {
  title?: string;
  description?: string;
  category?: string;
  ageGroup?: string;
  thumbnailUrl?: string;
  pointsEarned?: number;
  isPremium?: boolean;
  instructor?: string; // API might expect instructor ID as string for update
  isPublished?: boolean;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// interface CourseResponse {
//   success: boolean;
//   message: string;
//   data: {
//     courses: Course[];
//     pagination: Pagination;
//   };
// }

export default function TeacherCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCourseDetailModalOpen, setIsCourseDetailModalOpen] = useState(false);
  const [courseToView, setCourseToView] = useState<Course | null>(null);

  const fetchCourses = async (page: number = 1) => {
    try {
      setLoading(true);
      const data = await getAllCourses(page, 10);

      if (data.success) {
        setCourses(data.data.courses);
        setPagination(data.data.pagination);
        setCurrentPage(page);
      } else {
        setError(data.message);
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleEditCourse = async (courseId: string, updatedData: CourseUpdatePayload) => {
    try {
      const data = await updateCourse(courseId, updatedData);

      if (data.success) {
        toast.success("Khóa học đã được cập nhật thành công!");
        fetchCourses(currentPage); // Refetch courses to update the list
      } else {
        toast.error("Cập nhật khóa học thất bại!");
      }
    } catch (error: unknown) {
      console.log(error)
    }
  };

  const handlePageChange = (page: number) => {
    fetchCourses(page);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const openEditModal = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const openDeleteModal = (course: Course) => {
    setCourseToDelete(course);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCourseToDelete(null);
  };

  const handleDeleteCourse = async () => {
    if (courseToDelete) {
      try {
        const data = await deleteCourse(courseToDelete._id);

        if (data.success) {
          toast.success("Khóa học đã được cập nhật thành công!");
          fetchCourses(currentPage); // Refetch courses to update the list
          closeDeleteModal();
        } else {
          toast.success("Xóa khóa học thất bại!");
        }
      } catch (error: unknown) {
        console.log(error)
      }
    }
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateCourse = async (newCourseData: Omit<Course, '_id' | 'createdAt' | 'updatedAt' | 'instructor'> & { instructor: string }) => {
    try {
      const data = await createCourse(newCourseData);

      if (data.success) {
        toast.success("Khóa học đã được cập nhật thành công!");
        fetchCourses(currentPage); // Refetch courses to update the list
        closeCreateModal();
      } else {
        toast.success("Tạo khóa học thất bại!");
      }
    } catch (error: unknown) {
      console.log(error)
    }
  };

  const openCourseDetailModal = (course: Course) => {
    setCourseToView(course);
    setIsCourseDetailModalOpen(true);
  };

  const closeCourseDetailModal = () => {
    setIsCourseDetailModalOpen(false);
    setCourseToView(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#1e1e1e]">My Courses</h1>
        <Button className="bg-[#702dff] hover:bg-[#5811f2]" onClick={openCreateModal}>
          <Plus className="mr-2 h-4 w-4" /> Create New Course
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input placeholder="Search courses..." className="pl-10 bg-white border-none" />
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-white border-gray-300 hover:bg-gray-100 text-gray-800"
        >
          <Filter size={18} />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="bg-white">
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {courses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Không có khóa học nào</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                  <CourseCard key={index} course={course} onEdit={openEditModal} onDelete={openDeleteModal} onView={openCourseDetailModal} />
                ))}
              </div>

              <div className="flex justify-center mt-8">
                {pagination?.hasNextPage ? (
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={loading}
                  >
                    {loading ? 'Đang tải...' : 'Load More'}
                  </Button>
                ) : (
                  <p className="text-gray-500"></p>
                )}
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="published" className="mt-6">
          {courses.filter((course) => course.isPublished).length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Không có khóa học đã xuất bản</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses
                  .filter((course) => course.isPublished)
                  .map((course, index) => (
                    <CourseCard key={index} course={course} onEdit={openEditModal} onDelete={openDeleteModal} onView={openCourseDetailModal} />
                  ))}
              </div>

              <div className="flex justify-center mt-8">
                {pagination?.hasNextPage ? (
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={loading}
                  >
                    {loading ? 'Đang tải...' : 'Load More'}
                  </Button>
                ) : (
                  <p className="text-gray-500">Không có khóa học mới</p>
                )}
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="draft" className="mt-6">
          {courses.filter((course) => !course.isPublished).length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Không có khóa học nháp</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses
                  .filter((course) => !course.isPublished)
                  .map((course, index) => (
                    <CourseCard key={index} course={course} onEdit={openEditModal} onDelete={openDeleteModal} onView={openCourseDetailModal} />
                  ))}
              </div>

              <div className="flex justify-center mt-8">
                {pagination?.hasNextPage ? (
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={loading}
                  >
                    {loading ? 'Đang tải...' : 'Load More'}
                  </Button>
                ) : (
                  <p className="text-gray-500">Không có khóa học mới</p>
                )}
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="archived" className="mt-6">
          {courses.filter((course) => course.status === 'archived').length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Không có khóa học đã lưu trữ</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses
                  .filter((course) => course.status === 'archived')
                  .map((course, index) => (
                    <CourseCard key={index} course={course} onEdit={openEditModal} onDelete={openDeleteModal} onView={openCourseDetailModal} />
                  ))}
              </div>

              <div className="flex justify-center mt-8">
                {pagination?.hasNextPage ? (
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={loading}
                  >
                    {loading ? 'Đang tải...' : 'Load More'}
                  </Button>
                ) : (
                  <p className="text-gray-500">Không có khóa học mới</p>
                )}
              </div>
            </>
          )}
        </TabsContent>

        {/* Other tabs would have similar content but filtered by status */}
        <TabsContent value="published" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses
              .filter((course) => course.isPublished)
              .map((course, index) => (
                <CourseCard key={index} course={course} onEdit={openEditModal} onDelete={openDeleteModal} onView={openCourseDetailModal} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="draft" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses
              .filter((course) => !course.isPublished)
              .map((course, index) => (
                <CourseCard key={index} course={course} onEdit={openEditModal} onDelete={openDeleteModal} onView={openCourseDetailModal} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="archived" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses
              .filter((course) => course.status === 'archived')
              .map((course, index) => (
                <CourseCard key={index} course={course} onEdit={openEditModal} onDelete={openDeleteModal} onView={openCourseDetailModal} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Course Statistics */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Course Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#f0e5fc] rounded-full flex items-center justify-center">
                  <BookOpen className="text-[#702dff]" />
                </div>
                <div>
                  <p className="text-[#6b7280]">Total Courses</p>
                  <h3 className="text-2xl font-bold">12</h3>
                  <p className="text-xs text-[#10b981]">+2 this month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#ebfdf4] rounded-full flex items-center justify-center">
                  <User className="text-[#10b981]" />
                </div>
                <div>
                  <p className="text-[#6b7280]">Total Students</p>
                  <h3 className="text-2xl font-bold">248</h3>
                  <p className="text-xs text-[#10b981]">+18 this month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#e0f2fe] rounded-full flex items-center justify-center">
                  <StarIcon className="text-[#0ea5e9]" />
                </div>
                <div>
                  <p className="text-[#6b7280]">Average Rating</p>
                  <h3 className="text-2xl font-bold">4.8</h3>
                  <p className="text-xs text-[#10b981]">+0.2 this month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <EditCourseModal
        isOpen={isModalOpen}
        onClose={closeEditModal}
        course={selectedCourse}
        onSave={handleEditCourse}
      />

      <DeleteCourseModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteCourse}
        courseTitle={courseToDelete?.title || ''}
      />

      <CreateCourseModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onCreate={handleCreateCourse}
      />

      <CourseDetailModal
        isOpen={isCourseDetailModalOpen}
        onClose={closeCourseDetailModal}
        course={courseToView}
      />
    </div>
  )
}

function CourseCard({ course, onEdit, onDelete, onView }: { course: Course; onEdit: (course: Course) => void; onDelete: (course: Course) => void; onView: (course: Course) => void }) {
  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <div className="h-40 bg-[#d9d9d9] relative">
        <Image
          src={course.thumbnailUrl}
          alt={course.title}
          width={320}
          height={160}
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${getStatusBadgeColor(course.isPublished ? "Published" : "Draft")}`}
        >
          {course.isPublished ? "Published" : "Draft"}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-[#f0e5fc] px-2 py-1 rounded text-xs text-[#702dff] font-medium">{course.category}</div>
          <div className="text-[#6b7280] text-xs flex items-center">
            <StarIcon className="h-3 w-3 text-[#f59e0b] mr-1" />
            {course.pointsEarned}
          </div>
        </div>
        <Link href={`/teacher/courses/${course._id}`}>
          <h3 className="font-semibold mb-2 hover:text-[#702dff] transition-colors">{course.title}</h3>
        </Link>
        <p className="text-sm text-gray-600 mb-2">{course.description}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-[#6b7280]">
            <Clock className="mr-1 w-4 h-4" />
            <span>{course.ageGroup}</span>
          </div>
          <div className="flex items-center text-[#6b7280]">
            <User className="mr-1 w-4 h-4" />
            <span>
              {typeof course.instructor === 'string'
                ? course.instructor
                : course.instructor?.fullName || 'Unknown Instructor'
              }
            </span>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <Button size="sm" variant="outline" className="flex-1" onClick={() => onEdit(course)}>
            Edit
          </Button>
          <Button size="sm" variant="outline" className="flex-1 ml-2" onClick={() => onDelete(course)}>
            Delete
          </Button>
          <Button size="sm" variant="outline" className="flex-1 ml-2" onClick={() => onView(course)}>
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function getStatusBadgeColor(status: string): string {
  switch (status) {
    case "Published":
      return "bg-green-100 text-green-800"
    case "Draft":
      return "bg-amber-100 text-amber-800"
    case "Archived":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function User(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

