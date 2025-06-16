import { useState } from 'react';
import { Button } from './button';
import { Upload, Video, X } from 'lucide-react';
import { handleUploadFile } from '@/utils/upload';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

interface VideoUploadProps {
    onVideoUploaded: (url: string) => void;
    initialVideoUrl?: string;
}

export function VideoUpload({ onVideoUploaded, initialVideoUrl }: VideoUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [videoUrl, setVideoUrl] = useState<string | null>(initialVideoUrl || null);

    const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const uploadedUrl = await handleUploadFile(file, 'video');
            if (uploadedUrl) {
                setVideoUrl(uploadedUrl);
                onVideoUploaded(uploadedUrl);
            }
        } catch (error) {
            console.error('Error uploading video:', error);
            toast.error('Không thể tải lên video');
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveVideo = () => {
        setVideoUrl(null);
        onVideoUploaded('');
    };

    return (
        <div className="w-full">
            {videoUrl ? (
                <div className="relative w-full aspect-video">
                    <video
                        src={videoUrl}
                        controls
                        className="w-full h-full rounded-lg object-cover"
                    />
                    <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={handleRemoveVideo}
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            ) : (
                <div className="w-full aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6">
                    <Video className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">
                        Kéo thả hoặc click để chọn video
                    </p>
                    <p className="text-xs text-gray-400">
                        MP4, MOV (tối đa 100MB)
                    </p>
                </div>
            )}
            <div className="mt-4">
                <Input
                    id="video"
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    disabled={isUploading}
                    className="hidden"
                />
                <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById('video')?.click()}
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
                            {videoUrl ? 'Thay đổi video' : 'Chọn video'}
                        </div>
                    )}
                </Button>
            </div>
        </div>
    );
} 