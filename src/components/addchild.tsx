"use client";

import { useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface AddChildProps {
    onAddChild: (child: {
        name: string;
        dateOfBirth: string;
        gender: string;
    }) => Promise<void>;
}

export function AddChild({ onAddChild }: AddChildProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [newChild, setNewChild] = useState({
        name: "",
        dateOfBirth: "",
        gender: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAddChild = async () => {
        if (!newChild.name || !newChild.dateOfBirth || !newChild.gender) {
            setError('Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }

        setIsLoading(true);
        setError(null);
        
        try {
            await onAddChild({
                name: newChild.name,
                dateOfBirth: newChild.dateOfBirth,
                gender: newChild.gender
            });
            
            // Reset form and close dialog on success
            setIsOpen(false);
            setNewChild({ name: "", dateOfBirth: "", gender: "" });
        } catch (error) {
            console.error('Error adding child:', error);
            setError(error instanceof Error ? error.message : 'Không thể thêm con. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setError(null);
        setNewChild({ name: "", dateOfBirth: "", gender: "" });
    };

    return (
        <>
            <Button
                className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white transition-all duration-300 shadow-md hover:shadow-lg rounded-lg"
                onClick={() => setIsOpen(true)}
            >
                <User className="mr-2 h-4 w-4" />
                Thêm con
            </Button>

            <Dialog open={isOpen} onOpenChange={handleClose}>
                <DialogContent className="sm:max-w-[425px] rounded-xl border-none shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-[#1e1e1e]">Thêm con mới</DialogTitle>
                    </DialogHeader>
                    
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                            {error}
                        </div>
                    )}
                    
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-[#4b5563] font-medium">Họ và tên *</Label>
                            <Input
                                id="name"
                                value={newChild.name}
                                onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
                                placeholder="Nhập họ và tên của con"
                                className="border-gray-200 focus:border-[#8b5cf6] focus:ring-[#8b5cf6] transition-all duration-300"
                                required
                                disabled={isLoading}
                            />
                        </div>
                        
                        <div className="grid gap-2">
                            <Label htmlFor="dateOfBirth" className="text-[#4b5563] font-medium">Ngày sinh *</Label>
                            <Input
                                id="dateOfBirth"
                                type="date"
                                value={newChild.dateOfBirth}
                                onChange={(e) => setNewChild({ ...newChild, dateOfBirth: e.target.value })}
                                className="border-gray-200 focus:border-[#8b5cf6] focus:ring-[#8b5cf6] transition-all duration-300"
                                required
                                disabled={isLoading}
                                max={new Date().toISOString().split('T')[0]} // Prevent future dates
                            />
                        </div>
                        
                        <div className="grid gap-2">
                            <Label htmlFor="gender" className="text-[#4b5563] font-medium">Giới tính *</Label>
                            <Select
                                value={newChild.gender}
                                onValueChange={(value) => setNewChild({ ...newChild, gender: value })}
                                required
                                disabled={isLoading}
                            >
                                <SelectTrigger className="border-gray-200 focus:border-[#8b5cf6] focus:ring-[#8b5cf6] transition-all duration-300">
                                    <SelectValue placeholder="Chọn giới tính" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Nam</SelectItem>
                                    <SelectItem value="female">Nữ</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={isLoading}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="button"
                            onClick={handleAddChild}
                            disabled={isLoading || !newChild.name || !newChild.dateOfBirth || !newChild.gender}
                            className="bg-[#8b5cf6] hover:bg-[#7c3aed]"
                        >
                            {isLoading ? 'Đang thêm...' : 'Thêm con'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}