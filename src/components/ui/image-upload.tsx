import { useState } from 'react';
import { Button } from './button';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { handleUploadFile } from '@/utils/upload';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

interface ImageUploadProps {
    onImageUploaded: (url: string) => void;
    initialImageUrl?: string;
}

export function ImageUpload({ onImageUploaded, initialImageUrl }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl || null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const uploadedUrl = await handleUploadFile(file, 'image');
            if (uploadedUrl) {
                setImageUrl(uploadedUrl);
                onImageUploaded(uploadedUrl);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Không thể tải lên ảnh');
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveImage = () => {
        setImageUrl(null);
        onImageUploaded('');
    };

    return (
        <div className="w-full">
            {imageUrl ? (
                <div className="relative w-full aspect-video">
                    <Image
                        src={imageUrl}
                        alt="Uploaded image"
                        fill
                        className="object-cover rounded-lg"
                    />
                    <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={handleRemoveImage}
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            ) : (
                <div className="w-full aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6">
                    <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">
                        Kéo thả hoặc click để chọn ảnh
                    </p>
                    <p className="text-xs text-gray-400">
                        PNG, JPG, GIF (tối đa 5MB)
                    </p>
                </div>
            )}
            <div className="mt-4">
                <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="hidden"
                />
                <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById('image')?.click()}
                    disabled={isUploading}
                >
                    {isUploading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                            Đang tải lên...
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Upload className="w-4 h-4" />
                            {imageUrl ? 'Thay đổi ảnh' : 'Chọn ảnh'}
                        </div>
                    )}
                </Button>
            </div>
        </div>
    );
} 