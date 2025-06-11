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
    content: string;
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
        content: '',
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

    const handleSubmit = () => {
        onCreate(courseId, formData);
        onClose();
        setFormData({
            title: '',
            description: '',
            content: '',
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
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Tạo bài học mới</DialogTitle>
                    <DialogDescription>
                        Điền thông tin chi tiết cho bài học mới của bạn.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
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
                        <Label htmlFor="description" className="text-right">
                            Mô tả
                        </Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="content" className="text-right">
                            Nội dung
                        </Label>
                        <Textarea
                            id="content"
                            value={formData.content}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="videoUrl" className="text-right">
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
                        <Label htmlFor="audioUrl" className="text-right">
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
                        <Label htmlFor="imageUrl" className="text-right">
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
                        <Label htmlFor="duration" className="text-right">
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
                        <Label htmlFor="order" className="text-right">
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
                        <Label htmlFor="isPublished" className="text-right">
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
                        <Label htmlFor="createdBy" className="text-right">
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