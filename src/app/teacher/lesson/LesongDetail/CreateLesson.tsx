'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

export interface NewLessonData {
    title: string;
    description: string;
    content: { title: string; text: string }[];
    videoUrl: string;
    audioUrl: string;
    imageUrl: string;
    duration: number;
    order: number;
    isPublished: boolean;
    createdBy: string;
}

interface CreateLessonModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseId: string; // To associate the lesson with a course
    onCreate: (courseId: string, newLessonData: NewLessonData) => void;
}

export function CreateLessonModal({ isOpen, onClose, courseId, onCreate }: CreateLessonModalProps) {
    const [formData, setFormData] = useState<NewLessonData>({
        title: '',
        description: '',
        content: [],
        videoUrl: '',
        audioUrl: '',
        imageUrl: '',
        duration: 0,
        order: 0,
        isPublished: false,
        createdBy: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: Number(value),
        }));
    };

    const handleSwitchChange = (id: 'isPublished', checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            [id]: checked,
        }));
    };

    const handleAddContentSection = () => {
        setFormData((prev) => ({
            ...prev,
            content: [...prev.content, { title: '', text: '' }],
        }));
    };

    const handleRemoveContentSection = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            content: prev.content.filter((_, i) => i !== index),
        }));
    };

    const handleContentSectionChange = (index: number, field: 'title' | 'text', value: string) => {
        setFormData((prev) => ({
            ...prev,
            content: prev.content.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            ),
        }));
    };

    const handleSubmit = () => {
        onCreate(courseId, formData);
        onClose();
        setFormData({
            title: '',
            description: '',
            content: [],
            videoUrl: '',
            audioUrl: '',
            imageUrl: '',
            duration: 0,
            order: 0,
            isPublished: false,
            createdBy: '',
        }); // Reset form after submission
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-6">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-2xl font-bold">Tạo bài học mới</DialogTitle>
                    <DialogDescription className="text-gray-600">
                        Điền thông tin chi tiết cho bài học mới của bạn.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right font-medium">
                            Tiêu đề
                        </Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right font-medium">
                            Mô tả
                        </Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="col-span-4 mt-2 p-4 border rounded-md bg-gray-50">
                        <h3 className="text-lg font-semibold mb-4">Nội dung bài học</h3>
                        {formData.content.map((section, index) => (
                            <div key={index} className="grid grid-cols-4 items-center gap-4 mb-4 pb-4 border-b last:border-b-0">
                                <Label htmlFor={`content-title-${index}`} className="text-right font-medium">
                                    Tiêu đề phần {index + 1}
                                </Label>
                                <Input
                                    id={`content-title-${index}`}
                                    value={section.title}
                                    onChange={(e) =>
                                        handleContentSectionChange(index, 'title', e.target.value)
                                    }
                                    className="col-span-3"
                                />
                                <Label htmlFor={`content-text-${index}`} className="text-right font-medium mt-2">
                                    Nội dung phần {index + 1}
                                </Label>
                                <Textarea
                                    id={`content-text-${index}`}
                                    value={section.text}
                                    onChange={(e) =>
                                        handleContentSectionChange(index, 'text', e.target.value)
                                    }
                                    className="col-span-3"
                                />
                                <div className="col-span-4 flex justify-end mt-2">
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleRemoveContentSection(index)}
                                    >
                                        Xóa phần này
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <Button type="button" onClick={handleAddContentSection} className="mt-4">
                            Thêm phần nội dung mới
                        </Button>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="videoUrl" className="text-right font-medium">
                            URL Video
                        </Label>
                        <Input
                            id="videoUrl"
                            value={formData.videoUrl}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="audioUrl" className="text-right font-medium">
                            URL Âm thanh
                        </Label>
                        <Input
                            id="audioUrl"
                            value={formData.audioUrl}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="imageUrl" className="text-right font-medium">
                            URL Hình ảnh
                        </Label>
                        <Input
                            id="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="duration" className="text-right font-medium">
                            Thời lượng (phút)
                        </Label>
                        <Input
                            id="duration"
                            type="number"
                            value={formData.duration}
                            onChange={handleNumberChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="order" className="text-right font-medium">
                            Thứ tự
                        </Label>
                        <Input
                            id="order"
                            type="number"
                            value={formData.order}
                            onChange={handleNumberChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="isPublished" className="text-right font-medium">
                            Đã xuất bản
                        </Label>
                        <Switch
                            id="isPublished"
                            checked={formData.isPublished}
                            onCheckedChange={(checked) => handleSwitchChange('isPublished', checked)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="createdBy" className="text-right font-medium">
                            Tạo bởi (ID)
                        </Label>
                        <Input
                            id="createdBy"
                            value={formData.createdBy}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>Tạo bài học</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}