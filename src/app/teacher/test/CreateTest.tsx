import { useState } from 'react';
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

interface CreateTestProps {
    isOpen: boolean;
    onClose: () => void;
    lessonId: string;
}

export function CreateTest({ isOpen, onClose, lessonId }: CreateTestProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [timeLimit, setTimeLimit] = useState(30);
    const [passingScore, setPassingScore] = useState(70);
    const [attempts, setAttempts] = useState(3);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<Question>({
        questionText: '',
        questionType: 'multiple-choice',
        options: ['', '', '', ''],
        correctAnswer: '',
        explanation: '',
        points: 10
    });

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

        setQuestions([...questions, currentQuestion]);
        setCurrentQuestion({
            questionText: '',
            questionType: 'multiple-choice',
            options: ['', '', '', ''],
            correctAnswer: '',
            explanation: '',
            points: 10
        });
    };

    const handleRemoveQuestion = (index: number) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...currentQuestion.options];
        newOptions[index] = value;
        setCurrentQuestion({ ...currentQuestion, options: newOptions });
    };

    const handleSubmit = async () => {
        if (!title.trim()) {
            toast.error('Vui lòng nhập tiêu đề bài test');
            return;
        }

        if (questions.length === 0) {
            toast.error('Vui lòng thêm ít nhất một câu hỏi');
            return;
        }

        try {
            const testData = {
                lessonId,
                title,
                description,
                timeLimit,
                passingScore,
                attempts,
                questions,
                createdBy: "6843bd2fc9c53e526c15e0be" // TODO: Lấy từ context hoặc props
            };

            const response = await fetch('http://localhost:8386/api/test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testData),
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Tạo bài test thành công');
                onClose();
            } else {
                toast.error(data.message || 'Không thể tạo bài test');
            }
        } catch (error) {
            console.error('Error creating test:', error);
            toast.error('Không thể tạo bài test');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Tạo bài test</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Tiêu đề bài test</label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Nhập tiêu đề bài test"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Mô tả</label>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Nhập mô tả bài test"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Thời gian làm bài (phút)</label>
                            <Input
                                type="number"
                                value={timeLimit}
                                onChange={(e) => setTimeLimit(Number(e.target.value))}
                                min={1}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Điểm đạt (0-100)</label>
                            <Input
                                type="number"
                                value={passingScore}
                                onChange={(e) => setPassingScore(Number(e.target.value))}
                                min={0}
                                max={100}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Số lần làm lại</label>
                            <Input
                                type="number"
                                value={attempts}
                                onChange={(e) => setAttempts(Number(e.target.value))}
                                min={1}
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

                    {questions.length > 0 && (
                        <div className="border-t pt-4">
                            <h3 className="text-lg font-semibold mb-4">Danh sách câu hỏi</h3>
                            <div className="space-y-4">
                                {questions.map((q, index) => (
                                    <div key={index} className="border rounded-lg p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-medium">{q.questionText}</p>
                                                <p className="text-sm text-gray-500 mt-1">Loại: {q.questionType === 'multiple-choice' ? 'Trắc nghiệm' : 'Đúng/Sai'}</p>
                                                <ul className="mt-2 space-y-1">
                                                    {q.options.map((option, optIndex) => (
                                                        <li key={optIndex} className="text-sm">
                                                            {option === q.correctAnswer ? '✓ ' : '○ '}
                                                            {option}
                                                        </li>
                                                    ))}
                                                </ul>
                                                <p className="text-sm text-gray-500 mt-2">Giải thích: {q.explanation}</p>
                                                <p className="text-sm text-gray-500">Điểm: {q.points}</p>
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
                            Tạo bài test
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
