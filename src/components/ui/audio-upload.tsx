import { useState } from 'react';
import { Button } from './button';
import { Upload, Music, X } from 'lucide-react';
import { handleUploadFile } from '@/utils/upload';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

interface AudioUploadProps {
    onAudioUploaded: (url: string) => void;
    initialAudioUrl?: string;
}

export function AudioUpload({ onAudioUploaded, initialAudioUrl }: AudioUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(initialAudioUrl || null);

    const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const uploadedUrl = await handleUploadFile(file, 'audio');
            if (uploadedUrl) {
                setAudioUrl(uploadedUrl);
                onAudioUploaded(uploadedUrl);
            }
        } catch (error) {
            console.error('Error uploading audio:', error);
            toast.error('Không thể tải lên âm thanh');
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveAudio = () => {
        setAudioUrl(null);
        onAudioUploaded('');
    };

    return (
        <div className="w-full">
            {audioUrl ? (
                <div className="relative w-full">
                    <audio
                        src={audioUrl}
                        controls
                        className="w-full rounded-lg"
                    />
                    <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={handleRemoveAudio}
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            ) : (
                <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6">
                    <Music className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">
                        Kéo thả hoặc click để chọn âm thanh
                    </p>
                    <p className="text-xs text-gray-400">
                        MP3, WAV, OGG (tối đa 50MB)
                    </p>
                </div>
            )}
            <div className="mt-4">
                <Input
                    id="audio"
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioUpload}
                    disabled={isUploading}
                    className="hidden"
                />
                <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById('audio')?.click()}
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
                            {audioUrl ? 'Thay đổi âm thanh' : 'Chọn âm thanh'}
                        </div>
                    )}
                </Button>
            </div>
        </div>
    );
} 