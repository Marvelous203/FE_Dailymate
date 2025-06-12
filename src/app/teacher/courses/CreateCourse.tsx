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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Course } from './page'; // Adjust path if necessary

interface CreateCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (newCourseData: Omit<Course, '_id' | 'createdAt' | 'updatedAt' | 'instructor'> & { instructor: string }) => void;
}

// Định nghĩa các options
const CATEGORIES = [
    { value: 'Mathematics', label: 'Toán học' },
    { value: 'Science', label: 'Khoa học' },
    { value: 'Language', label: 'Ngôn ngữ' },
    { value: 'Art', label: 'Nghệ thuật' },
    { value: 'Music', label: 'Âm nhạc' },
    { value: 'Physical Education', label: 'Thể dục' },
    { value: 'Social Studies', label: 'Xã hội học' },
    { value: 'Technology', label: 'Công nghệ' }
];

const AGE_GROUPS = [
    { value: '5-10', label: '5-10 tuổi' },
    { value: '10-15', label: '10-15 tuổi' }
];

const POINTS_OPTIONS = [
    { value: 10, label: '10 điểm' },
    { value: 20, label: '20 điểm' },
    { value: 30, label: '30 điểm' },
    { value: 50, label: '50 điểm' },
    { value: 75, label: '75 điểm' },
    { value: 100, label: '100 điểm' }
];

export default function CreateCourseModal({ isOpen, onClose, onCreate }: CreateCourseModalProps) {
    const [formData, setFormData] = useState({
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
        console.log('=== DEBUG CREATE COURSE ===');
        console.log('isOpen:', isOpen);

        if (isOpen) {
            const storedUser = localStorage.getItem('user');

            if (storedUser) {
                try {
                    const userData = JSON.parse(storedUser);
                    console.log('User data from localStorage:', userData);
                    console.log('RoleData:', userData.roleData);

                    // Kiểm tra roleData trước, nếu không có thì dùng user.id
                    if (userData.roleData && userData.roleData._id && userData.role === 'teacher') {
                        setFormData(prev => ({
                            ...prev,
                            instructor: userData.roleData._id
                        }));
                        console.log('Đã set instructor ID từ roleData._id:', userData.roleData._id);
                    } else if (userData.id && userData.role === 'teacher') {
                        // Fallback: sử dụng user.id nếu không có roleData
                        setFormData(prev => ({
                            ...prev,
                            instructor: userData.id
                        }));
                        console.log('Đã set instructor ID từ user.id (fallback):', userData.id);
                    } else {
                        console.log('User không phải teacher hoặc thiếu thông tin cần thiết');
                    }
                } catch (error) {
                    console.error('Lỗi parse user data:', error);
                }
            }
        }
    }, [isOpen]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSelectChange = (field: string, value: string | number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
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
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
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
                            placeholder="Nhập tiêu đề khóa học"
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
                            placeholder="Nhập mô tả khóa học"
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">
                            Danh mục
                        </Label>
                        <Select onValueChange={(value) => handleSelectChange('category', value)} value={formData.category}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Chọn danh mục" />
                            </SelectTrigger>
                            <SelectContent>
                                {CATEGORIES.map((category) => (
                                    <SelectItem key={category.value} value={category.value}>
                                        {category.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">
                            Độ tuổi
                        </Label>
                        <Select onValueChange={(value) => handleSelectChange('ageGroup', value)} value={formData.ageGroup}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Chọn độ tuổi" />
                            </SelectTrigger>
                            <SelectContent>
                                {AGE_GROUPS.map((ageGroup) => (
                                    <SelectItem key={ageGroup.value} value={ageGroup.value}>
                                        {ageGroup.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
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
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">
                            Điểm kiếm được
                        </Label>
                        <Select onValueChange={(value) => handleSelectChange('pointsEarned', Number(value))} value={formData.pointsEarned.toString()}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Chọn điểm" />
                            </SelectTrigger>
                            <SelectContent>
                                {POINTS_OPTIONS.map((point) => (
                                    <SelectItem key={point.value} value={point.value.toString()}>
                                        {point.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="isPremium" className="text-right">
                            Premium
                        </Label>
                        <div className="col-span-3 flex items-center space-x-2">
                            <Switch
                                id="isPremium"
                                checked={formData.isPremium}
                                onCheckedChange={(checked) => handleSwitchChange('isPremium', checked)}
                            />
                            <span className="text-sm text-gray-600">
                                {formData.isPremium ? 'Khóa học Premium' : 'Khóa học miễn phí'}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="isPublished" className="text-right">
                            Xuất bản
                        </Label>
                        <div className="col-span-3 flex items-center space-x-2">
                            <Switch
                                id="isPublished"
                                checked={formData.isPublished}
                                onCheckedChange={(checked) => handleSwitchChange('isPublished', checked)}
                            />
                            <span className="text-sm text-gray-600">
                                {formData.isPublished ? 'Xuất bản ngay' : 'Lưu nháp'}
                            </span>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Hủy
                    </Button>
                    <Button type="submit" onClick={handleSubmit} disabled={!formData.title || !formData.category || !formData.ageGroup}>
                        Tạo khóa học
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

