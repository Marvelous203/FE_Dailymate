'use client';

import { useState, useEffect } from 'react';
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
import { Course, CourseUpdatePayload } from './page'; // Adjust path if necessary

interface EditCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    course: Course | null;
    onSave: (courseId: string, updatedData: CourseUpdatePayload) => void;
}

export function EditCourseModal({ isOpen, onClose, course, onSave }: EditCourseModalProps) {
    const [formData, setFormData] = useState<CourseUpdatePayload>({
        title: '',
        description: '',
        category: '',
        ageGroup: '',
        thumbnailUrl: '',
        pointsEarned: 0,
        isPremium: false,
        instructor: '',
        isPublished: false,
    });

    useEffect(() => {
        if (course) {
            setFormData({
                title: course.title || '',
                description: course.description || '',
                category: course.category || '',
                ageGroup: course.ageGroup || '',
                thumbnailUrl: course.thumbnailUrl || '',
                pointsEarned: course.pointsEarned || 0,
                isPremium: course.isPremium || false,
                instructor: course.instructor?._id || '',
                isPublished: course.isPublished || false,
            });
        }
    }, [course]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev: CourseUpdatePayload) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev: CourseUpdatePayload) => ({
            ...prev,
            [id]: Number(value),
        }));
    };

    const handleSwitchChange = (id: keyof CourseUpdatePayload, checked: boolean) => {
        setFormData((prev: CourseUpdatePayload) => ({
            ...prev,
            [id]: checked,
        }));
    };

    const handleSubmit = () => {
        if (course) {
            onSave(course._id, formData);
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa khóa học</DialogTitle>
                    <DialogDescription>
                        Thực hiện chỉnh sửa khóa học tại đây. Nhấp lưu khi hoàn tất.
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
                        <Label htmlFor="category" className="text-right">
                            Danh mục
                        </Label>
                        <Input
                            id="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="ageGroup" className="text-right">
                            Độ tuổi
                        </Label>
                        <Input
                            id="ageGroup"
                            value={formData.ageGroup}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="thumbnailUrl" className="text-right">
                            URL hình ảnh
                        </Label>
                        <Input
                            id="thumbnailUrl"
                            value={formData.thumbnailUrl}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="pointsEarned" className="text-right">
                            Điểm kiếm được
                        </Label>
                        <Input
                            id="pointsEarned"
                            type="number"
                            value={formData.pointsEarned}
                            onChange={handleNumberChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="isPremium" className="text-right">
                            Premium
                        </Label>
                        <Switch
                            id="isPremium"
                            checked={formData.isPremium}
                            onCheckedChange={(checked) => handleSwitchChange('isPremium', checked)}
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
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>Lưu thay đổi</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
