"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Course } from "./page"; // Adjust path if necessary
import { Upload, Image as ImageIcon } from "lucide-react";
import { handleUploadFile } from "@/utils/upload";
import Image from "next/image";

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (
    newCourseData: Omit<
      Course,
      "_id" | "createdAt" | "updatedAt" | "instructor"
    > & { instructor: string }
  ) => void;
}

// Định nghĩa các options
const CATEGORIES = [
  { value: "Mathematics", label: "Toán học" },
  { value: "Science", label: "Khoa học" },
  { value: "Language", label: "Ngôn ngữ" },
  { value: "Art", label: "Nghệ thuật" },
  { value: "Music", label: "Âm nhạc" },
  { value: "Physical Education", label: "Thể dục" },
  { value: "Social Studies", label: "Xã hội học" },
  { value: "Technology", label: "Công nghệ" },
];

const AGE_GROUPS = [
  { value: "5-10", label: "5-10 tuổi" },
  { value: "10-15", label: "10-15 tuổi" },
];

const POINTS_OPTIONS = [
  { value: 10, label: "10 điểm" },
  { value: 20, label: "20 điểm" },
  { value: 30, label: "30 điểm" },
  { value: 50, label: "50 điểm" },
  { value: 75, label: "75 điểm" },
  { value: 100, label: "100 điểm" },
];

export default function CreateCourseModal({
  isOpen,
  onClose,
  onCreate,
}: CreateCourseModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    ageGroup: "",
    thumbnailUrl: "",
    pointsEarned: 0,
    isPremium: false,
    instructor: "",
    isPublished: false,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    console.log("=== DEBUG CREATE COURSE ===");
    console.log("isOpen:", isOpen);

    if (isOpen) {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          console.log("User data from localStorage:", userData);
          console.log("RoleData:", userData.roleData);

          // Kiểm tra roleData trước, nếu không có thì dùng user.id
          if (
            userData.roleData &&
            userData.roleData._id &&
            userData.role === "teacher"
          ) {
            setFormData((prev) => ({
              ...prev,
              instructor: userData.roleData._id,
            }));
            console.log(
              "Đã set instructor ID từ roleData._id:",
              userData.roleData._id
            );
          } else if (userData.id && userData.role === "teacher") {
            // Fallback: sử dụng user.id nếu không có roleData
            setFormData((prev) => ({
              ...prev,
              instructor: userData.id,
            }));
            console.log(
              "Đã set instructor ID từ user.id (fallback):",
              userData.id
            );
          } else {
            console.log(
              "User không phải teacher hoặc thiếu thông tin cần thiết"
            );
          }
        } catch (error) {
          console.error("Lỗi parse user data:", error);
        }
      }
    }
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const handleSwitchChange = (
    id: "isPremium" | "isPublished",
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const imageUrl = await handleUploadFile(file, "image");
      if (imageUrl) {
        setFormData((prev) => ({
          ...prev,
          thumbnailUrl: imageUrl,
        }));
        setPreviewImage(imageUrl);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = () => {
    onCreate(formData);
    onClose();
    setFormData({
      title: "",
      description: "",
      category: "",
      ageGroup: "",
      thumbnailUrl: "",
      pointsEarned: 0,
      isPremium: false,
      instructor: "",
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
            <Label className="text-right">Danh mục</Label>
            <Select
              onValueChange={(value) => handleSelectChange("category", value)}
              value={formData.category}
            >
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
            <Label className="text-right">Độ tuổi</Label>
            <Select
              onValueChange={(value) => handleSelectChange("ageGroup", value)}
              value={formData.ageGroup}
            >
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
            <Label htmlFor="thumbnail" className="text-right">
              Hình ảnh
            </Label>
            <div className="col-span-3">
              <div className="flex flex-col items-center gap-4">
                {previewImage ? (
                  <div className="relative w-full aspect-video">
                    <Image
                      src={previewImage}
                      alt="Course thumbnail"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setPreviewImage(null);
                        setFormData((prev) => ({ ...prev, thumbnailUrl: "" }));
                      }}
                    >
                      Xóa
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
                <div className="w-full">
                  <Input
                    id="thumbnail"
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
                    onClick={() =>
                      document.getElementById("thumbnail")?.click()
                    }
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
                        Chọn ảnh
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Điểm kiếm được</Label>
            <Select
              onValueChange={(value) =>
                handleSelectChange("pointsEarned", Number(value))
              }
              value={formData.pointsEarned.toString()}
            >
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
                onCheckedChange={(checked) =>
                  handleSwitchChange("isPremium", checked)
                }
              />
              <span className="text-sm text-gray-600">
                {formData.isPremium ? "Khóa học Premium" : "Khóa học miễn phí"}
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
                onCheckedChange={(checked) =>
                  handleSwitchChange("isPublished", checked)
                }
              />
              <span className="text-sm text-gray-600">
                {formData.isPublished ? "Xuất bản ngay" : "Lưu nháp"}
              </span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={
              !formData.title ||
              !formData.category ||
              !formData.ageGroup ||
              !formData.thumbnailUrl
            }
          >
            Tạo khóa học
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
