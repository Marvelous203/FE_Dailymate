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
import { Course } from './page'; // Adjust path if necessary

interface CreateCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (newCourseData: Omit<Course, '_id' | 'createdAt' | 'updatedAt' | 'instructor'> & { instructor: string }) => void;
}

export function CreateCourseModal({ isOpen, onClose, onCreate }: CreateCourseModalProps) {
    const [formData, setFormData] = useState<Omit<Course, '_id' | 'createdAt' | 'updatedAt' | 'instructor'> & { instructor: string }>({
        title: '',
        description: '',
        category: '',
        ageGroup: '',
        thumbnailUrl: '',
        pointsEarned: 0,
        isPremium: false,
        instructor: '', // Placeholder for instructor ID
        isPublished: false,
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

    const handleSwitchChange = (id: 'isPremium' | 'isPublished', checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            [id]: checked,
        }));
    };

    const handleSubmit = () => {
        onCreate(formData);
        onClose();
        setFormData({
            title: '',
            description: '',
            category: '',
            ageGroup: '',
            thumbnailUrl: '',
            pointsEarned: 0,
            isPremium: false,
            instructor: '',
            isPublished: false,
        }); // Reset form after submission
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Tạo khóa học mới</DialogTitle>
                    <DialogDescription>
                        Điền thông tin chi tiết cho khóa học mới của bạn.
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
                        <Label htmlFor="instructor" className="text-right">
                            ID Giảng viên
                        </Label>
                        <Input
                            id="instructor"
                            value={formData.instructor}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="isPublished" className="text-right">
                            Xuất bản
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
                    <Button type="submit" onClick={handleSubmit}>Tạo khóa học</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
