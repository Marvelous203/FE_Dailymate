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
import { VideoUpload } from '@/components/ui/video-upload';
import { ImageUpload } from '@/components/ui/image-upload';
import { AudioUpload } from '@/components/ui/audio-upload';
import { toast } from 'sonner';

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
    teacherId: string;
}

export function CreateLessonModal({ isOpen, onClose, courseId, onCreate, teacherId }: CreateLessonModalProps) {
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
        createdBy: teacherId,
    });

    useEffect(() => {
        setFormData(prev => ({ ...prev, createdBy: teacherId }));
    }, [teacherId, isOpen]);

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
        // Kiểm tra tiêu đề
        if (!formData.title.trim()) {
            toast('Vui lòng nhập tiêu đề bài học');
            return;
        }

        // Tạo dữ liệu bài học mới, cho phép các trường tài nguyên để trống
        const newLessonData = {
            ...formData,
            videoUrl: formData.videoUrl || '',
            audioUrl: formData.audioUrl || '',
            imageUrl: formData.imageUrl || '',
            description: formData.description || '',
            duration: formData.duration || 0,
            order: formData.order || 0,
            content: formData.content || [],
            isPublished: formData.isPublished || false
        };

        // Gọi hàm tạo bài học
        onCreate(courseId, newLessonData);

        // Đóng modal và reset form
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
            createdBy: teacherId,
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-6">
                <DialogHeader className="mb-12 text-center">
                    <DialogTitle className="text-xl font-extrabold text-gray-900 leading-tight">Tạo bài học mới</DialogTitle>
                </DialogHeader>
                <div className="grid gap-12 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8 border-2 border-gray-300 rounded-lg bg-white shadow-xl">
                        <div className="space-y-8">
                            <div className="grid grid-cols-4 items-center gap-6">
                                <Label htmlFor="title" className="text-right font-semibold text-gray-800 text-lg">
                                    Tiêu đề <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="col-span-3 border-gray-400 focus:border-blue-600 focus:ring-blue-600 rounded-lg p-3 text-lg"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-start gap-6">
                                <Label htmlFor="description" className="text-right font-semibold pt-3 text-gray-800 text-lg">
                                    Mô tả
                                </Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="col-span-3 min-h-[180px] border-gray-400 focus:border-blue-600 focus:ring-blue-600 rounded-lg p-3 text-lg"
                                />
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div className="grid grid-cols-4 items-center gap-6">
                                <Label htmlFor="duration" className="text-right font-semibold text-gray-800 text-lg">
                                    Thời lượng
                                </Label>
                                <Input
                                    id="duration"
                                    type="number"
                                    value={formData.duration}
                                    onChange={handleNumberChange}
                                    className="col-span-3 border-gray-400 focus:border-blue-600 focus:ring-blue-600 rounded-lg p-3 text-lg"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-6">
                                <Label htmlFor="order" className="text-right font-semibold text-gray-800 text-lg">
                                    Thứ tự
                                </Label>
                                <Input
                                    id="order"
                                    type="number"
                                    value={formData.order}
                                    onChange={handleNumberChange}
                                    className="col-span-3 border-gray-400 focus:border-blue-600 focus:ring-blue-600 rounded-lg p-3 text-lg"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-6">
                                <Label htmlFor="isPublished" className="text-right font-semibold text-gray-800 text-lg">
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
                    </div>

                    <div className="col-span-full p-10 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50 shadow-xl">
                        <h3 className="text-3xl font-extrabold mb-10 text-blue-800 text-center">Tài nguyên bài học </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            <div className="space-y-5 text-center">
                                <Label htmlFor="videoUrl" className="font-bold block text-blue-700 text-xl">Video bài học </Label>
                                <VideoUpload
                                    onVideoUploaded={(url) => {
                                        setFormData(prev => ({ ...prev, videoUrl: url }));
                                    }}
                                    initialVideoUrl={formData.videoUrl}
                                />
                            </div>
                            <div className="space-y-5 text-center">
                                <Label htmlFor="audioUrl" className="font-bold block text-blue-700 text-xl">Âm thanh bài học </Label>
                                <AudioUpload
                                    onAudioUploaded={(url) => {
                                        setFormData(prev => ({ ...prev, audioUrl: url }));
                                    }}
                                    initialAudioUrl={formData.audioUrl}
                                />
                            </div>
                            <div className="space-y-5 text-center">
                                <Label htmlFor="imageUrl" className="font-bold block text-blue-700 text-xl">Hình ảnh bài học </Label>
                                <ImageUpload
                                    onImageUploaded={(url) => {
                                        setFormData(prev => ({ ...prev, imageUrl: url }));
                                    }}
                                    initialImageUrl={formData.imageUrl}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-full p-10 border-2 border-dashed border-green-300 rounded-lg bg-green-50 shadow-xl">
                        <h3 className="text-3xl font-extrabold mb-10 text-green-800 text-center">Nội dung bài học </h3>
                        {formData.content.map((section, index) => (
                            <div key={index} className="grid grid-cols-4 items-start gap-8 mb-10 pb-10 border-b-2 border-green-300 last:border-b-0 last:pb-0">
                                <Label htmlFor={`content-title-${index}`} className="text-right font-semibold pt-3 text-green-700 text-lg">
                                    Tiêu đề phần {index + 1}
                                </Label>
                                <Input
                                    id={`content-title-${index}`}
                                    value={section.title}
                                    onChange={(e) =>
                                        handleContentSectionChange(index, 'title', e.target.value)
                                    }
                                    className="col-span-3 border-green-400 focus:border-green-600 focus:ring-green-600 rounded-lg p-3 text-lg"
                                />
                                <Label htmlFor={`content-text-${index}`} className="text-right font-semibold pt-3 text-green-700 text-lg">
                                    Nội dung phần {index + 1}
                                </Label>
                                <Textarea
                                    id={`content-text-${index}`}
                                    value={section.text}
                                    onChange={(e) =>
                                        handleContentSectionChange(index, 'text', e.target.value)
                                    }
                                    className="col-span-3 min-h-[180px] border-green-400 focus:border-green-600 focus:ring-green-600 rounded-lg p-3 text-lg"
                                />
                                <div className="col-span-4 flex justify-end mt-8">
                                    <Button
                                        variant="destructive"
                                        size="lg"
                                        onClick={() => handleRemoveContentSection(index)}
                                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
                                    >
                                        Xóa phần này
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <Button type="button" onClick={handleAddContentSection} className="mt-10 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg text-xl">Thêm phần nội dung mới</Button>
                    </div>
                </div>
                <DialogFooter className="mt-12 p-6 border-t border-gray-200">
                    <Button type="submit" onClick={handleSubmit} className="w-full text-2xl py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg">Tạo bài học</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}