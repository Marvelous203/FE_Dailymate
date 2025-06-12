import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

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

interface UpdateTestProps {
    isOpen: boolean;
    onClose: () => void;
    testId: string;
}

export function UpdateTest({ isOpen, onClose, testId }: UpdateTestProps) {
    const [test, setTest] = useState<Test | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<Question>({
        questionText: '',
        questionType: 'multiple-choice',
        options: ['', '', '', ''],
        correctAnswer: '',
        explanation: '',
        points: 10
    });

    const fetchTest = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8386/api/test/${testId}`);

            if (!response.ok) { // Check for HTTP errors (e.g., 404, 500)
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json(); // Data is directly the test object

            setTest(data);
            setError(null); // Clear any previous errors
        } catch (error: unknown) {
            console.error('Error fetching test:', error);
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Không thể kết nối đến server');
            }
            setTest(null); // Ensure test is null on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchTest();
        }
    }, [isOpen, testId]);

    const handleAddQuestion = () => {
        if (!currentQuestion.questionText.trim()) {
            toast.error('Vui lòng nhập câu hỏi');
            return;
        }

        if (currentQuestion.options.some(option => !option.trim())) {
            toast.error('Vui lòng nhập đầy đủ các lựa chọn');
            return;
        }

        if (!currentQuestion.correctAnswer) {
            toast.error('Vui lòng chọn đáp án đúng');
            return;
        }

        if (test) {
            setTest({
                ...test,
                questions: [...test.questions, currentQuestion]
            });
            setCurrentQuestion({
                questionText: '',
                questionType: 'multiple-choice',
                options: ['', '', '', ''],
                correctAnswer: '',
                explanation: '',
                points: 10
            });
        }
    };

    const handleRemoveQuestion = (index: number) => {
        if (test) {
            setTest({
                ...test,
                questions: test.questions.filter((_, i) => i !== index)
            });
        }
    };

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...currentQuestion.options];
        newOptions[index] = value;
        setCurrentQuestion({ ...currentQuestion, options: newOptions });
    };

    const handleExistingQuestionChange = (questionIndex: number, field: keyof Question, value: any) => {
        if (test) {
            const newQuestions = [...test.questions];
            if (field === 'questionType') {
                newQuestions[questionIndex] = {
                    ...newQuestions[questionIndex],
                    [field]: value,
                    options: value === 'true-false' ? ['True', 'False'] : ['', '', '', ''],
                    correctAnswer: ''
                };
            } else {
                newQuestions[questionIndex] = {
                    ...newQuestions[questionIndex],
                    [field]: value
                };
            }
            setTest({ ...test, questions: newQuestions });
        }
    };

    const handleExistingOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
        if (test) {
            const newQuestions = [...test.questions];
            const newOptions = [...newQuestions[questionIndex].options];
            newOptions[optionIndex] = value;
            newQuestions[questionIndex] = {
                ...newQuestions[questionIndex],
                options: newOptions
            };
            setTest({ ...test, questions: newQuestions });
        }
    };

    const handleExistingCorrectAnswerChange = (questionIndex: number, answer: string) => {
        if (test) {
            const newQuestions = [...test.questions];
            newQuestions[questionIndex] = {
                ...newQuestions[questionIndex],
                correctAnswer: answer
            };
            setTest({ ...test, questions: newQuestions });
        }
    };

    const handleSubmit = async () => {
        if (!test) return;

        if (!test.title.trim()) {
            toast.error('Vui lòng nhập tiêu đề bài test');
            return;
        }

        if (test.questions.length === 0) {
            toast.error('Vui lòng thêm ít nhất một câu hỏi');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8386/api/test/${testId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: test.title,
                    description: test.description,
                    timeLimit: test.timeLimit,
                    passingScore: test.passingScore,
                    questions: test.questions
                }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Cập nhật bài test thành công');
                onClose();
            } else {
                toast.error(data.message || 'Không thể cập nhật bài test');
            }
        } catch (error: unknown) {
            console.error('Error updating test:', error);
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('Không thể cập nhật bài test');
            }
        }
    };

    if (loading) {
        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent>
                    <div className="text-center py-8">Đang tải...</div>
                </DialogContent>
            </Dialog>
        );
    }

    if (error || !test) {
        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent>
                    <div className="text-center py-8 text-red-500">{error || 'Không tìm thấy bài test'}</div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Cập nhật bài test</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Tiêu đề bài test</label>
                        <Input
                            value={test.title}
                            onChange={(e) => setTest({ ...test, title: e.target.value })}
                            placeholder="Nhập tiêu đề bài test"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Mô tả</label>
                        <Textarea
                            value={test.description}
                            onChange={(e) => setTest({ ...test, description: e.target.value })}
                            placeholder="Nhập mô tả bài test"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Thời gian làm bài (phút)</label>
                            <Input
                                type="number"
                                value={test.timeLimit}
                                onChange={(e) => setTest({ ...test, timeLimit: Number(e.target.value) })}
                                min={1}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Điểm đạt (0-100)</label>
                            <Input
                                type="number"
                                value={test.passingScore}
                                onChange={(e) => setTest({ ...test, passingScore: Number(e.target.value) })}
                                min={0}
                                max={100}
                            />
                        </div>
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="text-lg font-semibold mb-4">Thêm câu hỏi</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Câu hỏi</label>
                                <Textarea
                                    value={currentQuestion.questionText}
                                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, questionText: e.target.value })}
                                    placeholder="Nhập câu hỏi"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Loại câu hỏi</label>
                                <select
                                    value={currentQuestion.questionType}
                                    onChange={(e) => setCurrentQuestion({
                                        ...currentQuestion,
                                        questionType: e.target.value as 'multiple-choice' | 'true-false',
                                        options: e.target.value === 'true-false' ? ['True', 'False'] : ['', '', '', '']
                                    })}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="multiple-choice">Trắc nghiệm</option>
                                    <option value="true-false">Đúng/Sai</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Các lựa chọn</label>
                                {currentQuestion.options.map((option, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <Input
                                            value={option}
                                            onChange={(e) => handleOptionChange(index, e.target.value)}
                                            placeholder={`Lựa chọn ${index + 1}`}
                                        />
                                        <input
                                            type="radio"
                                            name="correctAnswer"
                                            checked={currentQuestion.correctAnswer === option}
                                            onChange={() => setCurrentQuestion({ ...currentQuestion, correctAnswer: option })}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm">Đáp án đúng</span>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Giải thích đáp án</label>
                                <Textarea
                                    value={currentQuestion.explanation}
                                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, explanation: e.target.value })}
                                    placeholder="Nhập giải thích cho đáp án đúng"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Điểm cho câu hỏi</label>
                                <Input
                                    type="number"
                                    value={currentQuestion.points}
                                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, points: Number(e.target.value) })}
                                    min={1}
                                />
                            </div>

                            <Button
                                onClick={handleAddQuestion}
                                className="w-full"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Thêm câu hỏi
                            </Button>
                        </div>
                    </div>

                    {test.questions.length > 0 && (
                        <div className="border-t pt-4">
                            <h3 className="text-lg font-semibold mb-4">Danh sách câu hỏi</h3>
                            <div className="space-y-4">
                                {test.questions.map((q, index) => (
                                    <div key={index} className="border rounded-lg p-4">
                                        <div className="flex justify-between items-start">
                                            <div className="w-full space-y-2">
                                                <label className="block text-sm font-medium mb-1">Câu hỏi</label>
                                                <Textarea
                                                    value={q.questionText}
                                                    onChange={(e) => handleExistingQuestionChange(index, 'questionText', e.target.value)}
                                                    placeholder="Nhập câu hỏi"
                                                />

                                                <label className="block text-sm font-medium mb-1">Loại câu hỏi</label>
                                                <select
                                                    value={q.questionType}
                                                    onChange={(e) => handleExistingQuestionChange(index, 'questionType', e.target.value as 'multiple-choice' | 'true-false')}
                                                    className="w-full p-2 border rounded-md"
                                                >
                                                    <option value="multiple-choice">Trắc nghiệm</option>
                                                    <option value="true-false">Đúng/Sai</option>
                                                </select>

                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium">Các lựa chọn</label>
                                                    {q.options.map((option, optIndex) => (
                                                        <div key={optIndex} className="flex items-center gap-2">
                                                            <Input
                                                                value={option}
                                                                onChange={(e) => handleExistingOptionChange(index, optIndex, e.target.value)}
                                                                placeholder={`Lựa chọn ${optIndex + 1}`}
                                                            />
                                                            <input
                                                                type="radio"
                                                                name={`correctAnswer-${index}`}
                                                                checked={q.correctAnswer === option}
                                                                onChange={() => handleExistingCorrectAnswerChange(index, option)}
                                                                className="w-4 h-4"
                                                            />
                                                            <span className="text-sm">Đáp án đúng</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium mb-1">Giải thích đáp án</label>
                                                    <Textarea
                                                        value={q.explanation}
                                                        onChange={(e) => handleExistingQuestionChange(index, 'explanation', e.target.value)}
                                                        placeholder="Nhập giải thích cho đáp án đúng"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium mb-1">Điểm cho câu hỏi</label>
                                                    <Input
                                                        type="number"
                                                        value={q.points}
                                                        onChange={(e) => handleExistingQuestionChange(index, 'points', Number(e.target.value))}
                                                        min={1}
                                                    />
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemoveQuestion(index)}
                                            >
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end gap-2 mt-6">
                        <Button variant="outline" onClick={onClose}>
                            Hủy
                        </Button>
                        <Button onClick={handleSubmit}>
                            Cập nhật bài test
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
