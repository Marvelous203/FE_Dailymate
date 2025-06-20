"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Award,
    BookOpen,
    Calendar,
    Edit,
    Mail,
    MapPin,
    Phone,
    User,
    Shield,
    CreditCard,
    X,
    Save,
    Trash2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { AddChild } from "@/components/addchild";
import { updateParent, getKidsByParentId, updateKid, deleteKid, getParentById, getKidById } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { handleUploadFile } from '../../../utils/upload';

// TypeScript interfaces
interface ParentData {
    data?: {
        _id: string;
        fullName?: string;
        phoneNumber?: string;
        address?: string;
        dateOfBirth?: string;
        gender?: string;
        image?: string;
        subscriptionType?: string;
        subscriptionExpiry?: string;
        createdAt?: string;
        userId?: {
            email?: string;
        };
    };
    _id?: string;
    roleData?: {
        fullName?: string;
        phoneNumber?: string;
        address?: string;
        dateOfBirth?: string;
        gender?: string;
    };
    image?: string;
}

interface KidData {
    _id: string;
    fullName?: string;
    name?: string;
    dateOfBirth?: string;
    gender?: string;
    avatar?: string;
    image?: string;
    age?: number;
    points?: number;
    level?: number;
    streak?: {
        current: number;
        longest: number;
    };
}

interface ChildListItem {
    id: string;
    name: string;
    fullName?: string;
    dateOfBirth: string;
    gender: string;
    avatar: string;
    courses: number;
    points?: number;
    level?: number;
    streak?: {
        current?: number;
    };
}

interface ParentForm {
    fullName: string;
    phoneNumber: string;
    address: string;
    dateOfBirth: string;
    gender: string;
    image: string;
}

interface KidForm {
    fullName: string;
    dateOfBirth: string;
    gender: string;
    avatar: string;
    image: string;
    age?: number;
}

interface UpdateData {
    fullName?: string;
    phoneNumber?: string;
    address?: string;
    dateOfBirth?: string;
    gender?: string;
    image?: string;
    avatar?: string;
    age?: number;
}

export default function ParentProfile() {
    const [childrenList, setChildrenList] = useState<ChildListItem[]>([]);
    const [parentData, setParentData] = useState<ParentData | null>(null);
    const [kidsData, setKidsData] = useState<KidData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [editingParent, setEditingParent] = useState<boolean>(false);
    const [editingKid, setEditingKid] = useState<string | null>(null);
    const [parentForm, setParentForm] = useState<ParentForm>({
        fullName: '',
        phoneNumber: '',
        address: '',
        dateOfBirth: '',
        gender: '',
        image: ''
    });
    const [kidForm, setKidForm] = useState<KidForm>({
        fullName: '',
        dateOfBirth: '',
        gender: '',
        avatar: '',
        image: ''
    });
// Thêm state cho việc upload
const [uploading, setUploading] = useState(false);
const [selectedImage, setSelectedImage] = useState<File | null>(null);
const [previewImage, setPreviewImage] = useState<string>('');

// Thêm state cho việc upload kid avatar
const [kidUploading, setKidUploading] = useState(false);
const [selectedKidImage, setSelectedKidImage] = useState<File | null>(null);
const [previewKidImage, setPreviewKidImage] = useState<string>('');

    // Load dữ liệu từ localStorage và API khi component mount
    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        try {
            const storedParentData = localStorage.getItem('parentData');
            console.log('Stored parent data:', storedParentData); // Thêm log này
            
            if (storedParentData) {
                const parent = JSON.parse(storedParentData);
                console.log('Parsed parent:', parent); // Thêm log này
                
                const parentId = parent.data._id;
                console.log('Parent ID:', parentId); // Thêm log này
                
                if (parentId) {
                    try {
                        const apiParentData = await getParentById(parentId);
                        console.log('API parent data:', apiParentData); // Thêm log này
                        if (apiParentData.success) {
                            // Cập nhật với dữ liệu từ API
                            const updatedParentData = {
                                ...parent,
                                ...apiParentData.data
                            };
                            setParentData(updatedParentData as ParentData);
                            
                            // Cập nhật localStorage với dữ liệu mới
                            localStorage.setItem('parentData', JSON.stringify(updatedParentData));
                            
                            // Trong loadInitialData function, cập nhật setParentForm
                            setParentForm({
                                fullName: updatedParentData.data?.fullName || updatedParentData.roleData?.fullName || '',
                                phoneNumber: updatedParentData.data?.phoneNumber || updatedParentData?.roleData?.phoneNumber || '',
                                address: updatedParentData.data?.address || updatedParentData?.roleData?.address || '',
                                dateOfBirth: updatedParentData.data?.dateOfBirth || updatedParentData?.roleData?.dateOfBirth || '',
                                gender: updatedParentData.data?.gender || updatedParentData?.roleData?.gender || '',
                                image: updatedParentData.data?.image || updatedParentData.image || ''
                            });
                        } else {
                            // Fallback to localStorage data if API fails
                            setParentData(parent);
                            setParentForm({
                                fullName: parent.roleData?.fullName || '',
                                phoneNumber: parent.roleData?.phoneNumber || '',
                                address: parent.roleData?.address || '',
                                dateOfBirth: parent.roleData?.dateOfBirth || '',
                                gender: parent.roleData?.gender || '',
                                image: parent.data?.image || parent.image || ''
                            });
                        }
                    } catch (apiError) {
                        console.error('API call failed, using localStorage data:', apiError);
                        // Fallback to localStorage data
                        setParentData(parent);
                        setParentForm({
                            fullName: parent.roleData?.fullName || '',
                            phoneNumber: parent.roleData?.phoneNumber || '',
                            address: parent.roleData?.address || '',
                            dateOfBirth: parent.roleData?.dateOfBirth || '',
                            gender: parent.roleData?.gender || '',
                            image: parent.data?.image || parent.image || ''
                        });
                    }
                    
                    // Gọi API để lấy danh sách kids
                    await loadKidsData(parentId);
                } else {
                    // Không có parentId, chỉ dùng localStorage
                    setParentData(parent);
                    setParentForm({
                        fullName: parent.roleData?.fullName || '',
                        phoneNumber: parent.roleData?.phoneNumber || '',
                        address: parent.roleData?.address || '',
                        dateOfBirth: parent.roleData?.dateOfBirth || '',
                        gender: parent.roleData?.gender || '',
                        image: parent.data?.image || parent.image || ''
                    });
                }
            }
        } catch (error) {
            console.error('Error loading initial data:', error);
            toast.error('Có lỗi khi tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    const loadKidsData = async (parentId: string) => {
        try {
            console.log('Loading kids data for parent:', parentId);
            const kidsResponse = await getKidsByParentId(parentId);
            console.log('Kids response:', kidsResponse);
            
            if (kidsResponse.success && kidsResponse.data) {
                // Kiểm tra nếu data có kids array
                const kidsArray = kidsResponse.data.kids || kidsResponse.data;
                
                if (Array.isArray(kidsArray)) {
                    setKidsData(kidsArray);
                    
                    const updatedChildren = kidsArray.map((kid: KidData): ChildListItem => ({
                        id: kid._id,
                        name: kid.fullName || kid.name || 'Unknown',
                        fullName: kid.fullName,
                        dateOfBirth: kid.dateOfBirth || '',
                        gender: kid.gender || '',
                        avatar: kid.avatar || '/avatar_default.png',
                        courses: 0,
                        points: kid.points || 0,
                        level: kid.level || 0,
                        streak: kid.streak 
                    }));
                    setChildrenList(updatedChildren);
                }
            }
        } catch (error) {
            console.error('Error loading kids data:', error);
            toast.error('Có lỗi khi tải danh sách con');
        }
    };

    const handleUpdateParent = async () => {
        try {
            const parentId = parentData?.data?._id || parentData?._id;
            if (!parentId) {
                toast.error('Không tìm thấy ID phụ huynh');
                return;
            }

            // Chỉ gửi những trường đã thay đổi
            const updateData: UpdateData = {};
            
            if (parentForm.fullName !== (parentData?.data?.fullName || parentData?.roleData?.fullName || '')) {
                updateData.fullName = parentForm.fullName;
            }
            if (parentForm.phoneNumber !== (parentData?.data?.phoneNumber || parentData?.roleData?.phoneNumber || '')) {
                updateData.phoneNumber = parentForm.phoneNumber;
            }
            if (parentForm.address !== (parentData?.data?.address || parentData?.roleData?.address || '')) {
                updateData.address = parentForm.address;
            }
            if (parentForm.dateOfBirth !== (parentData?.data?.dateOfBirth || parentData?.roleData?.dateOfBirth || '')) {
                updateData.dateOfBirth = parentForm.dateOfBirth;
            }
            if (parentForm.gender !== (parentData?.data?.gender || parentData?.roleData?.gender || '')) {
                updateData.gender = parentForm.gender;
            }
            if (parentForm.image !== (parentData?.data?.image || parentData?.image || '')) {
                updateData.image = parentForm.image;
            }

            if (Object.keys(updateData).length === 0) {
                toast.info('Không có thay đổi nào để cập nhật');
                setEditingParent(false);
                return;
            }

            const response = await updateParent(parentId, updateData);
            if (response.success) {
                // Cập nhật localStorage
                const updatedParentData = {
                    ...parentData,
                    data: {
                        ...parentData.data,
                        ...updateData
                    }
                };
                localStorage.setItem('parentData', JSON.stringify(updatedParentData));
                setParentData(updatedParentData as ParentData);
                setEditingParent(false);
                toast.success('Cập nhật thông tin thành công!');
            }
        } catch (error) {
            console.error('Error updating parent:', error);
            const errorMessage = error instanceof Error ? error.message : 'Có lỗi khi cập nhật thông tin';
            toast.error(errorMessage);
        }
    };

    const handleUpdateKid = async () => {
        try {
            if (!editingKid) {
                console.error('No kid being edited');
                return;
            }
    
            console.log('Editing kid ID:', editingKid);
            console.log('Current kidForm:', kidForm);
    
            // Bước 1: Get thông tin kid hiện tại từ server
            console.log('Getting current kid data from server...');
            const currentKidResponse = await getKidById(editingKid);
            
            if (!currentKidResponse.success) {
                toast.error('Không thể lấy thông tin con hiện tại');
                return;
            }
            
            const currentKidData = currentKidResponse.data;
            console.log('Current kid data from server:', currentKidData);
    
            // Bước 2: So sánh và chỉ gửi những field đã thay đổi
            const updateData: UpdateData = {};
            
            if (kidForm.fullName !== currentKidData.fullName) {
                updateData.fullName = kidForm.fullName;
            }
            
            if (kidForm.dateOfBirth !== currentKidData.dateOfBirth) {
                updateData.dateOfBirth = kidForm.dateOfBirth;
            }
            
            if (kidForm.gender !== currentKidData.gender) {
                updateData.gender = kidForm.gender;
            }
            
            if (kidForm.avatar !== currentKidData.avatar) {
                updateData.avatar = kidForm.avatar;
            }
            
            if (kidForm.age !== currentKidData.age) {
                updateData.age = kidForm.age;
            }
    
            // Kiểm tra xem có thay đổi gì không
            if (Object.keys(updateData).length === 0) {
                toast.info('Không có thay đổi nào để cập nhật');
                setEditingKid(null);
                return;
            }
    
            console.log('Data to update:', updateData);
    
            // Validate dữ liệu trước khi gửi
            if (updateData.fullName !== undefined && (!updateData.fullName || updateData.fullName.trim() === '')) {
                toast.error('Tên không được để trống');
                return;
            }
    
            if (updateData.gender !== undefined && !updateData.gender) {
                toast.error('Vui lòng chọn giới tính');
                return;
            }
    
            // Validate dateOfBirth nếu có thay đổi
            if (updateData.dateOfBirth !== undefined && updateData.dateOfBirth) {
                const birthDate = new Date(updateData.dateOfBirth);
                const today = new Date();
                
                if (birthDate > today) {
                    toast.error('Ngày sinh không thể là tương lai');
                    return;
                }
                
                const age = today.getFullYear() - birthDate.getFullYear();
                if (age > 18 || age < 0) {
                    toast.error('Tuổi phải từ 0 đến 18');
                    return;
                }
            }
    
            // Bước 3: Gửi request cập nhật
            const response = await updateKid(editingKid, updateData);
            console.log('Update response:', response);
            
            if (response.success) {
                // Reload kids data
                const parentId = parentData?.data?._id || parentData?._id;
                if (parentId) {
                    await loadKidsData(parentId);
                }
                setEditingKid(null);
                toast.success('Cập nhật thông tin con thành công!');
            } else {
                // Log chi tiết lỗi từ server
                console.error('Server returned error:', response);
                toast.error(response.message || 'Server trả về lỗi');
            }
        } catch (error) {
            console.error('Error updating kid:', error);
            
            // Log chi tiết hơn về lỗi
            if (error instanceof Error && 'response' in error) {
                const axiosError = error as any;
                console.error('Error response:', axiosError.response);
                console.error('Error status:', axiosError.response.status);
                console.error('Error data:', axiosError.response.data);
            }
            
            toast.error(error instanceof Error ? error.message : 'Có lỗi khi cập nhật thông tin con');
        }
    };

    const handleDeleteKid = async (kidId: string) => {
        if (!confirm('Bạn có chắc chắn muốn xóa thông tin con này?')) {
            return;
        }

        try {
            const response = await deleteKid(kidId);
            if (response.success) {
                // Reload kids data
                const parentId = parentData?.data?._id || parentData?._id;
                if (parentId) {
                    await loadKidsData(parentId);
                }
                toast.success('Xóa thông tin con thành công!');
            }
        } catch (error) {
            console.error('Error deleting kid:', error);
            toast.error(error instanceof Error ? error.message : 'Có lỗi khi xóa thông tin con');
        }
    };

    const handleAddChild = async (child: {
        name: string;
        dateOfBirth: string;
        gender: string;
    }) => {
        // Reload kids data after adding new child
        const parentId = parentData?.data?._id || parentData?._id;
        if (parentId) {
            await loadKidsData(parentId);
        }
    };
    const calculateAge = (dateOfBirth: string) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    };
    const startEditingKid = async (kid: ChildListItem) => {
        try {
            console.log('Starting to edit kid:', kid);
            setEditingKid(kid.id);
            
            // Get fresh data từ server
            const freshKidResponse = await getKidById(kid.id);
            
            if (freshKidResponse.success) {
                const freshKidData = freshKidResponse.data;
                console.log('Fresh kid data:', freshKidData);
                
                // Format date nếu cần thiết
                let formattedDate = '';
                if (freshKidData.dateOfBirth) {
                    const date = new Date(freshKidData.dateOfBirth);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    formattedDate = `${year}-${month}-${day}`;
                }
                
                setKidForm({
                    fullName: freshKidData.fullName || freshKidData.name || '',
                    dateOfBirth: formattedDate,
                    gender: freshKidData.gender || '',
                    avatar: freshKidData.avatar || '',
                    image: freshKidData.image || ''
                });
            } else {
                // Fallback to local data nếu không get được từ server
                console.warn('Cannot get fresh data, using local data');
                // ... code cũ ...
        }
        
        // Reset kid upload states
        setSelectedKidImage(null);
        setPreviewKidImage('');
    } catch (error) {
        console.error('Error getting fresh kid data:', error);
        toast.error('Không thể lấy dữ liệu mới nhất');
    }
};
// Thêm function xử lý chọn ảnh
const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        // Kiểm tra định dạng file
        if (!file.type.startsWith('image/')) {
            toast.error('Vui lòng chọn file ảnh');
            return;
        }
        
        // Kiểm tra kích thước file (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Kích thước ảnh tối đa là 5MB');
            return;
        }
        
        setSelectedImage(file);
        
        // Tạo preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    }
};

// Thêm function upload ảnh
const handleImageUpload = async () => {
    if (!selectedImage) return;
    
    setUploading(true);
    try {
        const imageUrl = await handleUploadFile(selectedImage, 'image');
        if (imageUrl) {
            setParentForm({...parentForm, image: imageUrl});
            setPreviewImage('');
            setSelectedImage(null);
            toast.success('Upload ảnh thành công!');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Có lỗi khi upload ảnh');
    } finally {
        setUploading(false);
    }
};

// Function xử lý chọn ảnh cho kid
const handleKidImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        // Kiểm tra định dạng file
        if (!file.type.startsWith('image/')) {
            toast.error('Vui lòng chọn file ảnh');
            return;
        }
        
        // Kiểm tra kích thước file (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Kích thước ảnh tối đa là 5MB');
            return;
        }
        
        setSelectedKidImage(file);
        
        // Tạo preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewKidImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    }
};

// Function upload ảnh cho kid
const handleKidImageUpload = async () => {
    if (!selectedKidImage) return;

    try {
        setKidUploading(true);
        const imageUrl = await handleUploadFile(selectedKidImage, 'image');
        
        setKidForm(prev => ({
            ...prev,
            avatar: imageUrl // Update avatar field, not image field
        }));
        
        setSelectedKidImage(null);
        setPreviewKidImage('');
        toast.success('Upload ảnh thành công!');
    } catch (error) {
        console.error('Error uploading kid image:', error);
        toast.error('Có lỗi khi upload ảnh');
    } finally {
        setKidUploading(false);
    }
};

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#10b981] mx-auto mb-4"></div>
                    <p>Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5f5f5]">
            <Toaster />
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-[#1e1e1e]">Hồ sợ của tôi</h1>
                    <Button 
                        variant="outline" 
                        className="flex items-center gap-2"
                        onClick={() => setEditingParent(!editingParent)}
                    >
                        {editingParent ? <X size={16} /> : <Edit size={16} />}
                        {editingParent ? 'Hủy' : 'Chỉnh sửa hồ sơ'}
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <Card className="border-none shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 rounded-full overflow-hidden bg-[#d9d9d9] mb-4">
                                    <Image
                                        src={parentData?.data?.image || parentData?.image || "/placeholder.svg?height=96&width=96"}
                                        alt="Profile"
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                
                                {editingParent ? (
                                    <div className="w-full space-y-4">
                                        {/* Thêm phần upload ảnh */}
                                        <div>
                                            <Label htmlFor="image">Ảnh đại diện</Label>
                                            <div className="space-y-2">
                                                <input
                                                    id="image"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageSelect}
                                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                />
                                                {previewImage && (
                                                    <div className="flex items-center gap-2">
                                                        <img src={previewImage} alt="Preview" className="w-16 h-16 rounded-full object-cover" />
                                                        <Button 
                                                            onClick={handleImageUpload} 
                                                            disabled={uploading}
                                                            size="sm"
                                                        >
                                                            {uploading ? 'Đang upload...' : 'Upload ảnh'}
                                                        </Button>
                                                    </div>
                                                )}
                                                {parentForm.image && (
                                                    <div className="text-sm text-green-600">
                                                        ✓ Ảnh đã được chọn
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <Label htmlFor="fullName">Họ và tên</Label>
                                            <Input
                                                id="fullName"
                                                value={parentForm.fullName}
                                                onChange={(e) => setParentForm({...parentForm, fullName: e.target.value})}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="phoneNumber">Số điện thoại</Label>
                                            <Input
                                                id="phoneNumber"
                                                value={parentForm.phoneNumber}
                                                onChange={(e) => setParentForm({...parentForm, phoneNumber: e.target.value})}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="address">Địa chỉ</Label>
                                            <Input
                                                id="address"
                                                value={parentForm.address}
                                                onChange={(e) => setParentForm({...parentForm, address: e.target.value})}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                                            <Input
                                                id="dateOfBirth"
                                                type="date"
                                                value={parentForm.dateOfBirth}
                                                onChange={(e) => setParentForm({...parentForm, dateOfBirth: e.target.value})}
                                            />
                                        </div>
                                        <Button onClick={handleUpdateParent} className="w-full">
                                            <Save size={16} className="mr-2" />
                                            Lưu thay đổi
                                        </Button>
                                    </div>
                                ) : (
<>
    <h2 className="text-xl font-semibold">
        {parentData?.data?.fullName || 'Chưa có tên'}
    </h2>
    <p className="text-[#6b7280] mb-4">Phụ huynh</p>

    <div className="w-full space-y-4 mt-4">
        <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-[#6b7280]" />
            <span>{parentData?.data?.userId?.email || 'Chưa có email'}</span>
        </div>
        <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-[#6b7280]" />
            <span>{parentData?.data?.phoneNumber || 'Chưa có số điện thoại'}</span>
        </div>
        <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-[#6b7280]" />
            <span>{parentData?.data?.address || 'Chưa có địa chỉ'}</span>
        </div>
        <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-[#6b7280]" />
            <span>
                Tham gia: {parentData?.data?.createdAt ? 
                    new Date(parentData.data.createdAt).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'long'
                    }) : 'Chưa xác định'
                }
            </span>
        </div>
        <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-[#6b7280]" />
            <span>Giới tính: {parentData?.data?.gender === 'male' ? 'Nam' : parentData?.data?.gender === 'female' ? 'Nữ' : 'Chưa xác định'}</span>
        </div>
        <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-[#6b7280]" />
            <span>Gói: {parentData?.data?.subscriptionType || 'free'}</span>
        </div>
    </div>
</>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Tabs defaultValue="children" className="w-full">
                            <TabsList className="bg-white">
                                <TabsTrigger value="children">Con của tôi</TabsTrigger>
                                <TabsTrigger value="subscription">Gói đăng ký</TabsTrigger>
                                <TabsTrigger value="security">Bảo mật</TabsTrigger>
                            </TabsList>

                            <TabsContent value="children" className="mt-6">
                                <Card className="border-none shadow-sm">
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-semibold">
                                                Danh sách con ({childrenList.length})
                                            </h3>
                                            <AddChild onAddChild={handleAddChild} />
                                        </div>
                                        
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {childrenList.length > 0 ? childrenList.map((child, index) => (
                                                <div
                                                    key={child.id || index}
                                                    className="bg-white border rounded-lg p-4"
                                                >
                                                    {editingKid === child.id ? (
                                                        <div className="space-y-4">
                                                            <div>
                                                                <Label htmlFor="kidFullName">Họ và tên</Label>
                                                                <Input
                                                                    id="kidFullName"
                                                                    value={kidForm.fullName}
                                                                    onChange={(e) => setKidForm({...kidForm, fullName: e.target.value})}
                                                                />
                                                            </div>
                                                            <div>
                                                                <Label htmlFor="kidDateOfBirth">Ngày sinh</Label>
                                                                <Input
                                                                    id="kidDateOfBirth"
                                                                    type="date"
                                                                    value={kidForm.dateOfBirth}
                                                                    onChange={(e) => setKidForm({...kidForm, dateOfBirth: e.target.value})}
                                                                />
                                                            </div>
                                                            <div>
                                                                <Label htmlFor="kidGender">Giới tính</Label>
                                                                <select
                                                                    id="kidGender"
                                                                    value={kidForm.gender}
                                                                    onChange={(e) => setKidForm({...kidForm, gender: e.target.value})}
                                                                    className="w-full p-2 border rounded"
                                                                >
                                                                    <option value="">Chọn giới tính</option>
                                                                    <option value="male">Nam</option>
                                                                    <option value="female">Nữ</option>
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <Label htmlFor="kidAvatar">Avatar</Label>
                                                                <div className="space-y-2">
                                                                    <input
                                                                        id="kidAvatarFile"
                                                                        type="file"
                                                                        accept="image/*"
                                                                        onChange={handleKidImageSelect}
                                                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                                    />
                                                                    {previewKidImage && (
                                                                        <div className="flex items-center gap-2">
                                                                            <img src={previewKidImage} alt="Preview" className="w-16 h-16 rounded-full object-cover" />
                                                                            <Button 
                                                                                onClick={handleKidImageUpload} 
                                                                                disabled={kidUploading}
                                                                                size="sm"
                                                                            >
                                                                                {kidUploading ? 'Đang upload...' : 'Upload ảnh'}
                                                                            </Button>
                                                                        </div>
                                                                    )}
                                                                    {kidForm.avatar && (
                                                                        <div className="text-sm text-green-600">
                                                                            ✓ Ảnh đã được chọn
                                                                        </div>
                                                                    )}
                                                                    <Input
                                                                        id="kidAvatar"
                                                                        value={kidForm.avatar}
                                                                        onChange={(e) => setKidForm({...kidForm, avatar: e.target.value})}
                                                                        placeholder="Hoặc nhập URL avatar"
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <Button onClick={handleUpdateKid} className="flex items-center gap-2">
                                                                    <Save size={16} />
                                                                    Lưu
                                                                </Button>
                                                                <Button 
                                                                    variant="outline" 
                                                                    onClick={() => setEditingKid(null)}
                                                                    className="flex items-center gap-2"
                                                                >
                                                                    <X size={16} />
                                                                    Hủy
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        // Hiển thị thông tin kid ở chế độ xem
<div>
    <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-[#d9d9d9]">
            <Image
                src={child.avatar && child.avatar !== 'img/default' && child.avatar !== '' ? child.avatar : "/avatar_default.png"}
                alt={child.fullName || child.name || 'Avatar của học sinh'}
                width={96}
                height={96}
                className="w-full h-full object-cover"
            />
        </div>
        <div className="flex-1">
            <h3 className="font-semibold">{child.fullName || child.name || 'Chưa có tên'}</h3>
            <p className="text-sm text-gray-600">Tuổi: {child.dateOfBirth ? calculateAge(new Date(child.dateOfBirth).toISOString().split('T')[0]) : 0}</p>

            <p className="text-sm text-gray-600">Giới tính: {child.gender === 'male' ? 'Nam' : child.gender === 'female' ? 'Nữ' : 'Chưa xác định'}</p>
        </div>
    </div>
    
    {/* Hiển thị các thông tin khác mà parent có thể xem nhưng không chỉnh sửa */}
    <div className="mt-2 text-sm text-gray-500 space-y-1">
        <p>Điểm: {child.points || 0} </p>
        <p>Cấp độ: {child.level || 1} </p>
        <p>Streak: {child.streak?.current || 0}</p>
    </div>
    
    {/* Thêm các button chỉnh sửa và xóa */}
    <div className="flex gap-2 mt-4">
        <Button 
            variant="outline" 
            size="sm"
            onClick={() => startEditingKid(child)}
            className="flex items-center gap-2"
        >
            <Edit size={14} />
            Chỉnh sửa
        </Button>
        <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleDeleteKid(child.id)}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:border-red-300"
        >
            <Trash2 size={14} />
            Xóa
        </Button>
    </div>
</div>
                                                    )}
                                                </div>
                                            )) : (
                                                <div className="col-span-2 text-center py-8 text-gray-500">
                                                    <p>Chưa có thông tin con. Hãy thêm con để bắt đầu!</p>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="subscription" className="mt-6">
                                <Card className="border-none shadow-sm">
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-semibold mb-4">
                                            Gói đăng ký hiện tại
                                        </h3>
                                        <div className="bg-[#8b5cf6] text-white rounded-lg p-6">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                                    <CreditCard className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-lg">
                                                        {parentData?.data?.subscriptionType === 'free' ? 'Gói Miễn phí' : 
                                                         parentData?.data?.subscriptionType === 'premium' ? 'Gói Premium' : 
                                                         'Gói Cơ bản'}
                                                    </h4>
                                                    <p className="text-white/80">
                                                        {parentData?.data?.subscriptionExpiry ? 
                                                            `Còn hạn đến: ${new Date(parentData.data.subscriptionExpiry).toLocaleDateString('vi-VN')}` :
                                                            'Không giới hạn thời gian'
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <Shield className="h-4 w-4" />
                                                    <span>Truy cập không giới hạn</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4" />
                                                    <span>Quản lý tối đa 3 con</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Award className="h-4 w-4" />
                                                    <span>Chứng chỉ hoàn thành</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="security" className="mt-6">
                                <Card className="border-none shadow-sm">
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-semibold mb-4">
                                            Bảo mật tài khoản
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                                <div>
                                                    <h4 className="font-medium">Đổi mật khẩu</h4>
                                                    <p className="text-sm text-[#6b7280]">Cập nhật mật khẩu của bạn</p>
                                                </div>
                                                <Button variant="outline">Thay đổi</Button>
                                            </div>
                                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                                <div>
                                                    <h4 className="font-medium">Xác thực hai yếu tố</h4>
                                                    <p className="text-sm text-[#6b7280]">Bảo vệ tài khoản của bạn</p>
                                                </div>
                                                <Button variant="outline">Bật</Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}



