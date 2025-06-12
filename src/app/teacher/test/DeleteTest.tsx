import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";

interface DeleteTestProps {
    isOpen: boolean;
    onClose: () => void;
    testId: string;
    onSuccess?: () => void;
}

export function DeleteTest({ isOpen, onClose, testId, onSuccess }: DeleteTestProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            const response = await fetch(`http://localhost:8386/api/test/${testId}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Xóa bài test thành công');
                onSuccess?.();
                onClose();
            } else {
                toast.error(data.message || 'Không thể xóa bài test');
            }
        } catch (error) {
            console.error('Error deleting test:', error);
            toast.error('Không thể xóa bài test');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Xóa bài test</DialogTitle>
                    <DialogDescription>
                        Bạn có chắc chắn muốn xóa bài test này không? Hành động này không thể hoàn tác.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isDeleting}
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Đang xóa...' : 'Xóa bài test'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
