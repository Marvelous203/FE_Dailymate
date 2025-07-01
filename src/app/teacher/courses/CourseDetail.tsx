'use client';

import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { PlayCircle, Clock, Eye } from 'lucide-react';
import { Course } from './page';
import { CreateLessonModal, NewLessonData } from '../lesson/LesongDetail/CreateLesson';
import { UpdateLessonModal } from '../lesson/LesongDetail/UpdateLesson';
import { DeleteLessonModal } from '../lesson/LesongDetail/DeleteLesson';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { CreateTest } from '../test/CreateTest';
import { TestList } from '../test/TestList';

interface Lesson {
    _id: string;
    title: string;
    description: string;
    videoUrl: string;
    duration: number; // in minutes
    order: number;
    content?: string;
    audioUrl?: string;
    imageUrl?: string;
    isPublished?: boolean;
    createdBy?: string;
}

interface CourseInfo {
    courseId: string;
    courseTitle: string;
    courseCategory: string;
}

interface LessonsResponse {
    success: boolean;
    message: string;
    data: {
        lessons: Lesson[];
        courseInfo: CourseInfo;
        pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        };
    };
}

interface CourseDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    course: Course | null;
}

export function CourseDetailModal({ isOpen, onClose, course }: CourseDetailModalProps) {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [courseInfo, setCourseInfo] = useState<CourseInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isCreateLessonModalOpen, setIsCreateLessonModalOpen] = useState(false);
    const [isUpdateLessonModalOpen, setIsUpdateLessonModalOpen] = useState(false);
    const [isDeleteLessonModalOpen, setIsDeleteLessonModalOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const [isCreateTestModalOpen, setIsCreateTestModalOpen] = useState(false);
    const [selectedLessonForTest, setSelectedLessonForTest] = useState<Lesson | null>(null);
    const [isTestListModalOpen, setIsTestListModalOpen] = useState(false);
    const [selectedLessonForTestList, setSelectedLessonForTestList] = useState<Lesson | null>(null);

    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const teacherId = userData?.roleData?._id || "";

    const fetchLessons = async () => {
        if (!course?._id) return;
        try {
            const response = await fetch(`http://localhost:8386/api/lesson/course/${course._id}`);
            const data: LessonsResponse = await response.json();

            if (data.success) {
                setLessons(data.data.lessons);
                setCourseInfo(data.data.courseInfo);
            } else {
                setError(data.message);
            }
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'Failed to fetch lessons');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen && course) {
            setLoading(true);
            setError(null);
            fetchLessons();
        } else if (!isOpen) {
            // Reset state when modal is closed
            setLessons([]);
            setCourseInfo(null);
            setLoading(true);
            setError(null);
        }
    }, [isOpen, course]);

    const handleCreateLesson = async (courseId: string, newLessonData: NewLessonData) => {
        try {
            // Tạo object mới chỉ chứa các trường có giá trị
            const filteredData: any = {
                ...newLessonData,
                content: { sections: newLessonData.content },
                courseId: courseId,
            };

            // Xóa các trường media nếu rỗng
            if (!filteredData.videoUrl) delete filteredData.videoUrl;
            if (!filteredData.audioUrl) delete filteredData.audioUrl;
            if (!filteredData.imageUrl) delete filteredData.imageUrl;

            const response = await fetch(`http://localhost:8386/api/lesson`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filteredData),
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Lesson created successfully!');
                fetchLessons();
                setIsCreateLessonModalOpen(false);
            } else {
                toast.error(`Create lesson failed: ${data.message}`);
            }
        } catch (error: unknown) {
            toast.error(`Error creating lesson: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    const handleUpdateLesson = async (lessonId: string, updatedData: { title?: string; description?: string; videoUrl?: string; duration?: number; order?: number }) => {
        try {
            const response = await fetch(`http://localhost:8386/api/lesson/${lessonId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Bài học đã được cập nhật thành công!");
                fetchLessons(); // Refetch lessons to update the list
                setIsUpdateLessonModalOpen(false);
            } else {
                toast.success("Cập nhật bài học thất bại");
            }
        } catch (error: unknown) {
            toast.error(`Lỗi khi cập nhật bài học: ${error instanceof Error ? error.message : 'Lỗi không xác định'}`);
        }
    };

    const handleDeleteLesson = async () => {
        if (!selectedLesson) return;
        try {
            const response = await fetch(`http://localhost:8386/api/lesson/${selectedLesson._id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Bài học đã được cập nhật thành công!");
                fetchLessons(); // Refetch lessons to update the list
                setIsDeleteLessonModalOpen(false);
            } else {
                toast.success("Xóa bài học thất bại");
            }
        } catch (error: unknown) {
            toast.error(`Lỗi khi xóa bài học: ${error instanceof Error ? error.message : 'Lỗi không xác định'}`);
        }
    };

    const openCreateLessonModal = () => setIsCreateLessonModalOpen(true);
    const closeCreateLessonModal = () => setIsCreateLessonModalOpen(false);

    const openUpdateLessonModal = (lesson: Lesson) => {
        setSelectedLesson(lesson);
        setIsUpdateLessonModalOpen(true);
    };
    const closeUpdateLessonModal = () => {
        setSelectedLesson(null);
        setIsUpdateLessonModalOpen(false);
    };

    const openDeleteLessonModal = (lesson: Lesson) => {
        setSelectedLesson(lesson);
        setIsDeleteLessonModalOpen(true);
    };
    const closeDeleteLessonModal = () => {
        setSelectedLesson(null);
        setIsDeleteLessonModalOpen(false);
    };

    const openCreateTestModal = (lesson: Lesson) => {
        setSelectedLessonForTest(lesson);
        setIsCreateTestModalOpen(true);
    };

    const closeCreateTestModal = () => {
        setSelectedLessonForTest(null);
        setIsCreateTestModalOpen(false);
    };

    const openTestListModal = (lesson: Lesson) => {
        setSelectedLessonForTestList(lesson);
        setIsTestListModalOpen(true);
    };

    const closeTestListModal = () => {
        setSelectedLessonForTestList(null);
        setIsTestListModalOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{courseInfo?.courseTitle || 'Chi tiết khóa học'}</DialogTitle>
                    <DialogDescription>
                        {courseInfo?.courseCategory ? `Danh mục: ${courseInfo.courseCategory}` : ''}
                    </DialogDescription>
                </DialogHeader>

                {loading ? (
                    <div className="text-center py-8">Đang tải bài học...</div>
                ) : error ? (
                    <div className="text-center py-8 text-red-500">Lỗi: {error}</div>
                ) : !courseInfo ? (
                    <div className="text-center py-8">Không tìm thấy thông tin khóa học.</div>
                ) : (
                    <div className="py-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Các bài học</h2>
                            <Button size="sm" onClick={openCreateLessonModal}>
                                <Plus className="mr-2 h-4 w-4" /> Thêm bài học mới
                            </Button>
                        </div>

                        {lessons.length === 0 ? (
                            <p>Chưa có bài học nào cho khóa học này.</p>
                        ) : (
                            <div className="grid gap-4">
                                {lessons.map((lesson) => (
                                    <Card key={lesson._id} className="shadow-sm hover:shadow-md transition-shadow">
                                        <CardContent className="p-4 flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <PlayCircle className="text-blue-500 flex-shrink-0" size={24} />
                                                <div>
                                                    <h3 className="text-lg font-semibold">{lesson.title}</h3>
                                                    <p className="text-gray-600 text-sm mb-1">{lesson.description}</p>
                                                    <div className="flex items-center text-gray-500 text-xs">
                                                        <Clock size={14} className="mr-1" />
                                                        <span>{lesson.duration} phút</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => openTestListModal(lesson)}
                                                >
                                                    <Eye size={16} className="mr-1" />
                                                    Xem test
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => openCreateTestModal(lesson)}
                                                >
                                                    <Plus size={16} className="mr-1" />
                                                    Tạo test
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={() => openUpdateLessonModal(lesson)}>
                                                    <Edit size={16} />
                                                </Button>
                                                <Button variant="destructive" size="sm" onClick={() => openDeleteLessonModal(lesson)}>
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </DialogContent>
            {course && (
                <>
                    <CreateLessonModal
                        isOpen={isCreateLessonModalOpen}
                        onClose={closeCreateLessonModal}
                        courseId={course._id}
                        onCreate={handleCreateLesson}
                        teacherId={teacherId}
                    />
                    <UpdateLessonModal
                        isOpen={isUpdateLessonModalOpen}
                        onClose={closeUpdateLessonModal}
                        lesson={selectedLesson}
                        onUpdate={handleUpdateLesson}
                    />
                    <DeleteLessonModal
                        isOpen={isDeleteLessonModalOpen}
                        onClose={closeDeleteLessonModal}
                        onConfirm={handleDeleteLesson}
                        lessonTitle={selectedLesson?.title || ''}
                    />
                    {selectedLessonForTest && (
                        <CreateTest
                            isOpen={isCreateTestModalOpen}
                            onClose={closeCreateTestModal}
                            lessonId={selectedLessonForTest._id}
                        />
                    )}
                    {selectedLessonForTestList && (
                        <TestList
                            isOpen={isTestListModalOpen}
                            onClose={closeTestListModal}
                            lessonId={selectedLessonForTestList._id}
                        />
                    )}
                </>
            )}
        </Dialog>
    );
}
