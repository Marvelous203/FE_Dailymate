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
        age: string;
        gender: string;
        avatar: string;
    }) => void;
}

export function AddChild({ onAddChild }: AddChildProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [newChild, setNewChild] = useState({
        name: "",
        age: "",
        gender: "",
        avatar: "",
    });

    const handleAddChild = () => {
        onAddChild(newChild);
        setIsOpen(false);
        setNewChild({ name: "", age: "", gender: "", avatar: "" });
    };

    return (
        <>
            <Button
                className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white transition-all duration-300 shadow-md hover:shadow-lg rounded-lg"
                onClick={() => setIsOpen(true)}
            >
                <User className="mr-2 h-4 w-4" />
                Add Child
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px] rounded-xl border-none shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-[#1e1e1e]">Add New Child</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-[#4b5563] font-medium">Name</Label>
                            <Input
                                id="name"
                                value={newChild.name}
                                onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
                                placeholder="Enter child's name"
                                className="border-gray-200 focus:border-[#8b5cf6] focus:ring-[#8b5cf6] transition-all duration-300"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="age" className="text-[#4b5563] font-medium">Age</Label>
                            <Input
                                id="age"
                                type="number"
                                value={newChild.age}
                                onChange={(e) => setNewChild({ ...newChild, age: e.target.value })}
                                placeholder="Enter age"
                                className="border-gray-200 focus:border-[#8b5cf6] focus:ring-[#8b5cf6] transition-all duration-300"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="gender" className="text-[#4b5563] font-medium">Gender</Label>
                            <Select
                                value={newChild.gender}
                                onValueChange={(value) => setNewChild({ ...newChild, gender: value })}
                            >
                                <SelectTrigger className="border-gray-200 focus:border-[#8b5cf6] focus:ring-[#8b5cf6] transition-all duration-300">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="avatar" className="text-[#4b5563] font-medium">Avatar</Label>
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-full overflow-hidden bg-[#f0e5fc] border-2 border-[#8b5cf6] p-0.5">
                                    <div className="w-full h-full rounded-full bg-white">
                                        <Image
                                            src={newChild.avatar || "/placeholder.svg?height=80&width=80"}
                                            alt="Avatar"
                                            width={80}
                                            height={80}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <Button 
                                    variant="outline" 
                                    className="flex-1 border-gray-200 hover:bg-[#f0e5fc] hover:text-[#8b5cf6] hover:border-[#8b5cf6] transition-all duration-300"
                                >
                                    Choose Image
                                </Button>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-gray-100 transition-all duration-300"
                        >
                            Cancel
                        </Button>
                        <Button
                            className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white transition-all duration-300"
                            onClick={handleAddChild}
                        >
                            Add
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}