'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DeleteCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    courseTitle: string;
}

export function DeleteCourseModal({ isOpen, onClose, onConfirm, courseTitle }: DeleteCourseModalProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Bạn có chắc chắn muốn xóa khóa học này?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Hành động này không thể hoàn tác. Thao tác này sẽ xóa vĩnh viễn khóa học <span className="font-bold">{"`"}{courseTitle}{"`"}</span> khỏi máy chủ của bạn.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm} className="bg-red-500 hover:bg-red-600">
                        Xóa
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
