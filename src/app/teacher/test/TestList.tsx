import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { DeleteTest } from './DeleteTest';

interface Question {
    questionText: string;
    questionType: 'multiple-choice' | 'true-false';
    options: string[];
    correctAnswer: string;
    explanation: string;
    points: number;
}

interface Test {
    _id: string;
    title: string;
    description: string;
    timeLimit: number;
    passingScore: number;
    attempts: number;
    questions: Question[];
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

interface TestListProps {
    isOpen: boolean;
    onClose: () => void;
    lessonId: string;
}

export function TestList({ isOpen, onClose, lessonId }: TestListProps) {
    const [tests, setTests] = useState<Test[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTestId, setSelectedTestId] = useState<string | null>(null);

    const fetchTests = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8386/api/test/lesson/${lessonId}`);
            const data = await response.json();

            if (data.success) {
                setTests(data.data.tests);
            } else {
                setError(data.message || 'Không thể lấy danh sách bài test');
            }
        } catch (error) {
            console.error('Error fetching tests:', error);
            setError('Không thể kết nối đến server');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchTests();
        }
    }, [isOpen, lessonId]);

    const handleOpenUpdateModal = (testId: string) => {
        setSelectedTestId(testId);
        setIsUpdateModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedTestId(null);
        fetchTests(); // Refresh the list after update
    };

    const handleOpenDeleteModal = (testId: string) => {
        setSelectedTestId(testId);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedTestId(null);
    };

    const handleDeleteSuccess = () => {
        fetchTests(); // Refresh the list after delete
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Danh sách bài test</DialogTitle>
                </DialogHeader>

                {loading ? (
                    <div className="text-center py-8">Đang tải...</div>
                ) : error ? (
                    <div className="text-center py-8 text-red-500">{error}</div>
                ) : tests.length === 0 ? (
                    <div className="text-center py-8">Chưa có bài test nào</div>
                ) : (
                    <div className="space-y-4">
                        {tests.map((test) => (
                            <div key={test._id} className="border rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold">{test.title}</h3>
                                        <p className="text-gray-600 text-sm mt-1">{test.description}</p>
                                        <div className="mt-2 space-y-1 text-sm text-gray-500">
                                            <p>Thời gian làm bài: {test.timeLimit} phút</p>
                                            <p>Điểm đạt: {test.passingScore}%</p>
                                            <p>Số lần làm lại: {test.attempts}</p>
                                            <p>Số câu hỏi: {test.questions.length}</p>
                                            <p>Ngày tạo: {formatDate(test.createdAt)}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {/* TODO: Xem chi tiết */ }}
                                        >
                                            <Eye size={16} />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleOpenUpdateModal(test._id)}
                                        >
                                            <Edit size={16} />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleOpenDeleteModal(test._id)}
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex justify-end mt-6">
                    <Button variant="outline" onClick={onClose}>
                        Đóng
                    </Button>
                </div>
            </DialogContent>
            {/* {selectedTestId && (
                <UpdateTest
                    isOpen={isUpdateModalOpen}
                    onClose={handleCloseUpdateModal}
                    testId={selectedTestId}
                />
            )} */}
            {selectedTestId && (
                <DeleteTest
                    isOpen={isDeleteModalOpen}
                    onClose={handleCloseDeleteModal}
                    testId={selectedTestId}
                    onSuccess={handleDeleteSuccess}
                />
            )}
        </Dialog>
    );
} 