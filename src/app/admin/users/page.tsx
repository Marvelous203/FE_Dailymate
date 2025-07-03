'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Filter, MoreHorizontal, Eye, Pencil, Trash2, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { toast } from 'sonner';
import { Dialog as DetailDialog, DialogContent as DetailDialogContent, DialogHeader as DetailDialogHeader, DialogTitle as DetailDialogTitle, DialogFooter as DetailDialogFooter, DialogClose as DetailDialogClose } from "@/components/ui/dialog";
import { Dialog as ConfirmDialog, DialogContent as ConfirmDialogContent, DialogHeader as ConfirmDialogHeader, DialogTitle as ConfirmDialogTitle, DialogFooter as ConfirmDialogFooter, DialogClose as ConfirmDialogClose } from "@/components/ui/dialog";
import { Dialog as KidDialog, DialogContent as KidDialogContent, DialogHeader as KidDialogHeader, DialogTitle as KidDialogTitle, DialogFooter as KidDialogFooter, DialogClose as KidDialogClose } from "@/components/ui/dialog";

export default function UsersPage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
    specializations: "",
    bio: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [tab, setTab] = useState("teachers");
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loadingTeachers, setLoadingTeachers] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [teacherDetail, setTeacherDetail] = useState<any>(null);
  const [courseTitles, setCourseTitles] = useState<string[]>([]);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [parents, setParents] = useState<any[]>([]);
  const [loadingParents, setLoadingParents] = useState(false);
  const [parentDetailOpen, setParentDetailOpen] = useState(false);
  const [parentDetail, setParentDetail] = useState<any>(null);
  const [loadingParentDetail, setLoadingParentDetail] = useState(false);
  const [editParentOpen, setEditParentOpen] = useState(false);
  const [editParentForm, setEditParentForm] = useState<any>(null);
  const [editParentLoading, setEditParentLoading] = useState(false);
  const [deleteParentLoading, setDeleteParentLoading] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [kids, setKids] = useState<any[]>([]);
  const [loadingKids, setLoadingKids] = useState(false);
  const [kidDialogOpen, setKidDialogOpen] = useState(false);
  const [kidsByParent, setKidsByParent] = useState<any[]>([]);
  const [loadingKidsByParent, setLoadingKidsByParent] = useState(false);
  const [parentInfo, setParentInfo] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchTeachers = async () => {
    setLoadingTeachers(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/teachers?page=1&limit=5`);
      const data = await res.json();
      setTeachers(data.data?.teachers || []);
    } catch (err) {
      toast.error("Không thể tải danh sách giáo viên");
    } finally {
      setLoadingTeachers(false);
    }
  };

  const fetchParents = async () => {
    setLoadingParents(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/parents`);
      const data = await res.json();
      setParents(data.data?.parents || []);
    } catch (err) {
      toast.error("Không thể tải danh sách phụ huynh");
    } finally {
      setLoadingParents(false);
    }
  };

  const fetchKids = async () => {
    setLoadingKids(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/kids`);
      const data = await res.json();
      setKids(data.data?.kids || []);
    } catch (err) {
      toast.error("Không thể tải danh sách trẻ em");
    } finally {
      setLoadingKids(false);
    }
  };

  useEffect(() => {
    if (tab === "teachers") fetchTeachers();
    if (tab === "parents") fetchParents();
    if (tab === "children") fetchKids();
  }, [tab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/teacher/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          specializations: form.specializations.split(",").map(s => s.trim()).filter(Boolean)
        })
      });
      const data = await res.json();
      if (res.ok) {
        setOpen(false);
        setForm({ email: "", password: "", fullName: "", phoneNumber: "", specializations: "", bio: "" });
        toast.success("Tạo tài khoản giáo viên thành công!");
        if (tab === "teachers") fetchTeachers();
      } else {
        setError(data.message || "Có lỗi xảy ra!");
      }
    } catch (err) {
      setError("Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = async (teacherId: string) => {
    setDetailOpen(true);
    setLoadingDetail(true);
    setTeacherDetail(null);
    setCourseTitles([]);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/teacher/${teacherId}`);
      const data = await res.json();
      if (data.success) {
        setTeacherDetail(data.data);
        // Lấy danh sách tên khóa học
        if (Array.isArray(data.data.coursesCreated) && data.data.coursesCreated.length > 0) {
          const titles: string[] = [];
          for (const courseId of data.data.coursesCreated) {
            try {
              const resCourse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/course/${courseId}`);
              const dataCourse = await resCourse.json();
              if (dataCourse.success) {
                titles.push(dataCourse.data.title);
              }
            } catch { }
          }
          setCourseTitles(titles);
        }
      }
    } catch (err) {
      toast.error("Không thể tải chi tiết giáo viên");
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleEditClick = (teacher: any) => {
    setEditForm({
      _id: teacher.teacherId || teacher._id,
      fullName: teacher.fullName,
      phoneNumber: teacher.phoneNumber,
      specializations: Array.isArray(teacher.specializations) ? teacher.specializations.join(", ") : teacher.specializations,
      bio: teacher.bio,
      coursesCreated: teacher.coursesCreated || [],
    });
    setEditOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/teacher/${editForm._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: editForm.fullName,
          phoneNumber: editForm.phoneNumber,
          specializations: editForm.specializations.split(",").map((s: string) => s.trim()).filter(Boolean),
          bio: editForm.bio,
          coursesCreated: editForm.coursesCreated,
        })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Cập nhật giáo viên thành công!");
        setEditOpen(false);
        if (tab === "teachers") fetchTeachers();
      } else {
        toast.error(data.message || "Có lỗi khi cập nhật!");
      }
    } catch {
      toast.error("Có lỗi khi cập nhật!");
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (teacherId: string) => {
    if (!window.confirm("Bạn có chắc muốn xóa giáo viên này?")) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/teacher/${teacherId}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Đã xóa giáo viên!");
        if (tab === "teachers") fetchTeachers();
      } else {
        toast.error(data.message || "Xóa thất bại!");
      }
    } catch {
      toast.error("Xóa thất bại!");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleViewParentDetail = async (parentId: string) => {
    setParentDetailOpen(true);
    setLoadingParentDetail(true);
    setParentDetail(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/parent/${parentId}`);
      const data = await res.json();
      if (data.success) setParentDetail(data.data);
    } catch {
      toast.error("Không thể tải chi tiết phụ huynh");
    } finally {
      setLoadingParentDetail(false);
    }
  };

  const handleEditParentClick = (parent: any) => {
    setEditParentForm({
      _id: parent.parentId || parent._id,
      fullName: parent.fullName,
      email: parent.email || "",
      gender: parent.gender || "",
      isActive: parent.isActive !== false,
    });
    setEditParentOpen(true);
  };

  const handleEditParentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditParentForm({ ...editParentForm, [e.target.name]: e.target.value });
  };

  const handleEditParentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditParentLoading(true);
    try {
      const id = editParentForm._id || editParentForm.parentId;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/parent/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: editParentForm.fullName,
          email: editParentForm.email,
          gender: editParentForm.gender,
          isActive: editParentForm.isActive !== false,
        })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Cập nhật phụ huynh thành công!");
        setEditParentOpen(false);
        if (tab === "parents") fetchParents();
      } else {
        toast.error(data.message || "Có lỗi khi cập nhật!");
      }
    } catch {
      toast.error("Có lỗi khi cập nhật!");
    } finally {
      setEditParentLoading(false);
    }
  };

  const handleDeleteParent = async (parentId: string) => {
    setDeleteParentLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/parent/${parentId}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Đã xóa phụ huynh!");
        if (tab === "parents") fetchParents();
      } else {
        toast.error(data.message || "Xóa thất bại!");
      }
    } catch {
      toast.error("Xóa thất bại!");
    } finally {
      setDeleteParentLoading(false);
      setDeleteConfirmOpen(false);
      setDeleteTargetId(null);
    }
  };

  const handleViewKidsByParent = async (parentId: string) => {
    setKidDialogOpen(true);
    setLoadingKidsByParent(true);
    setKidsByParent([]);
    setParentInfo(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/kid/parent/${parentId}`);
      const data = await res.json();
      if (data.success) {
        setKidsByParent(data.data?.kids || []);
        setParentInfo(data.data?.parentInfo || null);
      }
    } catch {
      toast.error("Không thể tải danh sách con của phụ huynh");
    } finally {
      setLoadingKidsByParent(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#1e1e1e]">Users Management</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#ef4444] hover:bg-[#dc2626]">
              <Plus className="mr-2 h-4 w-4" /> Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg w-full">
            <DialogHeader>
              <DialogTitle>Create Teacher Account</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
              <Input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
              <Input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
              <Input name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} required />
              <Input name="specializations" placeholder="Specializations (comma separated)" value={form.specializations} onChange={handleChange} required />
              <Textarea name="bio" placeholder="Bio" value={form.bio} onChange={handleChange} required />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              {success && <div className="text-green-600 text-sm">{success}</div>}
              <DialogFooter>
                <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Account"}</Button>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search users..."
            className="pl-10 bg-white border-none"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 bg-white">
          <Filter size={18} />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="teachers" className="mb-8" value={tab} onValueChange={setTab}>
        <TabsList className="bg-white">
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="parents">Parents</TabsTrigger>
          <TabsTrigger value="children">Kids</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="admins" className="mt-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Administrators</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Similar table but filtered for admins */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teachers" className="mt-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Teachers</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingTeachers ? (
                <div>Loading teachers...</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Full Name</th>
                        <th className="text-left p-3">Email</th>
                        <th className="text-left p-3">Specializations</th>
                        <th className="text-left p-3">Phone Number</th>
                        <th className="text-left p-3">Bio</th>
                        <th className="text-left p-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teachers.length === 0 ? (
                        <tr><td colSpan={6} className="text-center py-4">No teachers found</td></tr>
                      ) : (
                        teachers.map((teacher, idx) => (
                          <tr key={teacher.teacherId || idx} className="border-b hover:bg-gray-50">
                            <td className="p-3">{teacher.fullName}</td>
                            <td className="p-3">{teacher.email}</td>
                            <td className="p-3">{Array.isArray(teacher.specializations) ? teacher.specializations.join(", ") : teacher.specializations}</td>
                            <td className="p-3">{teacher.phoneNumber}</td>
                            <td className="p-3">{teacher.bio}</td>
                            <td className="p-3">
                              <Button variant="outline" size="icon" onClick={() => handleViewDetail(teacher.teacherId || teacher._id)} title="View details">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon" className="ml-2" onClick={() => handleEditClick(teacher)} title="Edit">
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="destructive" size="icon" className="ml-2" onClick={() => handleDelete(teacher.teacherId || teacher._id)} disabled={deleteLoading} title="Delete">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
          <DetailDialog open={detailOpen} onOpenChange={setDetailOpen}>
            <DetailDialogContent className="max-w-lg w-full">
              <DetailDialogHeader>
                <DetailDialogTitle>Teacher Details</DetailDialogTitle>
              </DetailDialogHeader>
              {loadingDetail ? (
                <div>Loading details...</div>
              ) : teacherDetail ? (
                <div className="space-y-2">
                  <div><b>Full Name:</b> {teacherDetail.fullName}</div>
                  <div><b>Email:</b> {teacherDetail.userId?.email}</div>
                  <div><b>Phone Number:</b> {teacherDetail.phoneNumber}</div>
                  <div><b>Specializations:</b> {Array.isArray(teacherDetail.specializations) ? teacherDetail.specializations.join(", ") : teacherDetail.specializations}</div>
                  <div><b>Bio:</b> {teacherDetail.bio}</div>
                  <div><b>Created Courses:</b>
                    <ul className="list-disc ml-6">
                      {courseTitles.length === 0 ? <li>No courses</li> : courseTitles.map((title, idx) => <li key={idx}>{title}</li>)}
                    </ul>
                  </div>
                  <div><b>Created At:</b> {teacherDetail.createdAt ? new Date(teacherDetail.createdAt).toLocaleString() : ""}</div>
                </div>
              ) : (
                <div>No data</div>
              )}
              <DetailDialogFooter>
                <DetailDialogClose asChild>
                  <Button type="button" variant="outline">Close</Button>
                </DetailDialogClose>
              </DetailDialogFooter>
            </DetailDialogContent>
          </DetailDialog>
          <DetailDialog open={editOpen} onOpenChange={setEditOpen}>
            <DetailDialogContent className="max-w-lg w-full">
              <DetailDialogHeader>
                <DetailDialogTitle>Edit Teacher Information</DetailDialogTitle>
              </DetailDialogHeader>
              {editForm ? (
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <Input name="fullName" placeholder="Full Name" value={editForm.fullName} onChange={handleEditChange} required />
                  <Input name="phoneNumber" placeholder="Phone Number" value={editForm.phoneNumber} onChange={handleEditChange} required />
                  <Input name="specializations" placeholder="Specializations (comma separated)" value={editForm.specializations} onChange={handleEditChange} required />
                  <Textarea name="bio" placeholder="Bio" value={editForm.bio} onChange={handleEditChange} required />
                  <DetailDialogFooter>
                    <Button type="submit" disabled={editLoading}>{editLoading ? "Saving..." : "Save Changes"}</Button>
                    <DetailDialogClose asChild>
                      <Button type="button" variant="outline">Cancel</Button>
                    </DetailDialogClose>
                  </DetailDialogFooter>
                </form>
              ) : (
                <div>No data</div>
              )}
            </DetailDialogContent>
          </DetailDialog>
        </TabsContent>

        <TabsContent value="parents" className="mt-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Parents</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingParents ? (
                <div>Loading parents...</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Full Name</th>
                        <th className="text-left p-3">Email</th>
                        <th className="text-left p-3">Gender</th>
                        <th className="text-left p-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parents.length === 0 ? (
                        <tr><td colSpan={4} className="text-center py-4">No parents found</td></tr>
                      ) : (
                        parents.map((parent: any, idx: number) => (
                          <tr key={parent._id || idx} className="border-b hover:bg-gray-50">
                            <td className="p-3">{parent.fullName}</td>
                            <td className="p-3">{parent.userId?.email || parent.email || "-"}</td>
                            <td className="p-3">{parent.gender || "-"}</td>
                            <td className="p-3">
                              <Button variant="outline" size="icon" onClick={() => handleViewParentDetail(parent.parentId || parent._id)} title="View details">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon" className="ml-2" onClick={() => handleViewKidsByParent(parent.parentId || parent._id)} title="View children">
                                <User className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon" className="ml-2" onClick={() => handleEditParentClick(parent)} title="Sửa">
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="destructive" size="icon" className="ml-2" onClick={() => { setDeleteTargetId(parent.parentId || parent._id); setDeleteConfirmOpen(true); }} disabled={deleteParentLoading} title="Xóa">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
          <DetailDialog open={parentDetailOpen} onOpenChange={setParentDetailOpen}>
            <DetailDialogContent className="max-w-lg w-full">
              <DetailDialogHeader>
                <DetailDialogTitle>Parent Details</DetailDialogTitle>
              </DetailDialogHeader>
              {loadingParentDetail ? (
                <div>Loading details...</div>
              ) : parentDetail && Object.keys(parentDetail).length > 0 ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-4 mb-2">
                    {parentDetail.image && (
                      <img src={parentDetail.image} alt="avatar" className="w-16 h-16 rounded-full object-cover border" />
                    )}
                    <div>
                      <div className="text-lg font-semibold">{parentDetail.fullName}</div>
                      <div className="text-sm text-gray-500">{parentDetail.userId?.email || parentDetail.email || "-"}</div>
                    </div>
                  </div>
                  <div><b>Date of Birth:</b> {parentDetail.dateOfBirth ? new Date(parentDetail.dateOfBirth).toLocaleDateString('vi-VN') : "-"}</div>
                  <div><b>Gender:</b> {parentDetail.gender === "male" ? "Male" : parentDetail.gender === "female" ? "Female" : "Other"}</div>
                  <div><b>Address:</b> {parentDetail.address || "-"}</div>
                  <div><b>Phone Number:</b> {parentDetail.phoneNumber || "-"}</div>
                  <div><b>Package Type:</b> {parentDetail.subscriptionType === "premium" ? "Premium" : "Free"}</div>
                  {parentDetail.subscriptionType === "premium" && (
                    <div><b>Package Expiry:</b> {parentDetail.subscriptionExpiry ? new Date(parentDetail.subscriptionExpiry).toLocaleDateString('vi-VN') : "-"}</div>
                  )}
                  <div><b>Status:</b> {parentDetail.isActive === false ? <span className="text-red-500">Disabled</span> : <span className="text-green-600">Active</span>}</div>
                  <div><b>Account Status:</b> {parentDetail.userId?.isActive ? "Active" : "Locked"}</div>
                  <div><b>Email Verification:</b> {parentDetail.userId?.isVerified ? "Verified" : "Unverified"}</div>
                  <div><b>Account Created At:</b> {parentDetail.userId?.createdAt ? new Date(parentDetail.userId.createdAt).toLocaleString('vi-VN') : "-"}</div> </div>
              ) : (
                <div>No data</div>
              )}
              <DetailDialogFooter>
                <DetailDialogClose asChild>
                  <Button type="button" variant="outline">Close</Button>
                </DetailDialogClose>
              </DetailDialogFooter>
            </DetailDialogContent>
          </DetailDialog>
          <DetailDialog open={editParentOpen} onOpenChange={setEditParentOpen}>
            <DetailDialogContent className="max-w-lg w-full">
              <DetailDialogHeader>
                <DetailDialogTitle>Edit parent information</DetailDialogTitle>
              </DetailDialogHeader>
              {editParentForm ? (
                <form onSubmit={handleEditParentSubmit} className="space-y-4">
                  <Input
                    name="fullName"
                    placeholder="Full Name"
                    value={editParentForm.fullName}
                    onChange={handleEditParentChange}
                    required
                  />
                  <Input
                    name="email"
                    placeholder="Email"
                    value={editParentForm.email || ""}
                    onChange={handleEditParentChange}
                    disabled
                  />
                  <select
                    name="gender"
                    value={editParentForm.gender}
                    onChange={handleEditParentChange}
                    className="w-full border rounded p-2"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <div>
                    <label className="mr-2">Status:</label>
                    <select
                      name="isActive"
                      value={editParentForm.isActive === false ? "false" : "true"}
                      onChange={e =>
                        setEditParentForm({ ...editParentForm, isActive: e.target.value === "true" })
                      }
                      className="border rounded p-2"
                    >
                      <option value="true">Active</option>
                      <option value="false">Disabled</option>
                    </select>
                  </div>
                  <DetailDialogFooter>
                    <Button type="submit" disabled={editParentLoading}>
                      {editParentLoading ? "Saving..." : "Save Changes"}
                    </Button>
                    <DetailDialogClose asChild>
                      <Button type="button" variant="outline">Cancel</Button>
                    </DetailDialogClose>
                  </DetailDialogFooter>
                </form>
              )
                : (
                  <div>Không có dữ liệu</div>
                )}
            </DetailDialogContent>
          </DetailDialog>
          <ConfirmDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
            <ConfirmDialogContent className="max-w-sm w-full">
              <ConfirmDialogHeader>
                <ConfirmDialogTitle>Are you sure you want to delete this parent?</ConfirmDialogTitle>
              </ConfirmDialogHeader>
              <div className="text-gray-600 mb-4">This action cannot be undone.</div>
              <ConfirmDialogFooter>
                <Button variant="destructive" onClick={() => deleteTargetId && handleDeleteParent(deleteTargetId)} disabled={deleteParentLoading}>
                  {deleteParentLoading ? "Đang xóa..." : "Xóa"}
                </Button>
                <ConfirmDialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </ConfirmDialogClose>
              </ConfirmDialogFooter>
            </ConfirmDialogContent>
          </ConfirmDialog>
          <KidDialog open={kidDialogOpen} onOpenChange={setKidDialogOpen}>
            <KidDialogContent className="max-w-4xl w-full" style={{ minWidth: 1200 }}>
              <KidDialogHeader>
                <KidDialogTitle>List kids</KidDialogTitle>
              </KidDialogHeader>
              {parentInfo && (
                <div className="mb-2 text-sm text-gray-600">parent: <b>{parentInfo.parentFullName}</b> ({parentInfo.parentEmail})</div>
              )}
              {loadingKidsByParent ? (
                <div>Loading...</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Avatar</th>
                        <th className="text-left p-3">Full Name</th>
                        <th className="text-left p-3">Email</th>
                        <th className="text-left p-3">Date of Birth</th>
                        <th className="text-left p-3">Gender</th>
                        <th className="text-left p-3">Score</th>
                        <th className="text-left p-3">Level</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Verification</th>
                      </tr>
                    </thead>

                    <tbody>
                      {kidsByParent.length === 0 ? (
                        <tr><td colSpan={9} className="text-center py-4">Không có trẻ em nào</td></tr>
                      ) : (
                        kidsByParent.map((kid: any, idx: number) => (
                          <tr key={kid._id || idx} className="border-b hover:bg-gray-50">
                            <td className="p-3">
                              <img src={kid.avatar && kid.avatar !== 'img/default' ? kid.avatar : '/avatar_default.png'} alt="avatar" className="w-10 h-10 rounded-full object-cover border" />
                            </td>
                            <td className="p-3">{kid.fullName}</td>
                            <td className="p-3">{kid.userId?.email || kid.email || "-"}</td>
                            <td className="p-3">{kid.dateOfBirth ? new Date(kid.dateOfBirth).toLocaleDateString('vi-VN') : "-"}</td>
                            <td className="p-3">{kid.gender === "male" ? "Nam" : kid.gender === "female" ? "Nữ" : "Khác"}</td>
                            <td className="p-3">{kid.points}</td>
                            <td className="p-3">{kid.level}</td>
                            <td className="p-3">{(kid.isActive ?? kid.userId?.isActive) ? <span className="text-green-600">Hoạt động</span> : <span className="text-red-500">Vô hiệu hóa</span>}</td>
                            <td className="p-3">{(kid.isVerified ?? kid.userId?.isVerified) ? <span className="text-green-600">Đã xác thực</span> : <span className="text-gray-500">Chưa xác thực</span>}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
              <KidDialogFooter>
                <KidDialogClose asChild>
                  <Button variant="outline">close</Button>
                </KidDialogClose>
              </KidDialogFooter>
            </KidDialogContent>
          </KidDialog>
        </TabsContent>

        <TabsContent value="children" className="mt-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Children List</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingKids ? (
                <div>Loading children list...</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Full Name</th>
                        <th className="text-left p-3">Email</th>
                        <th className="text-left p-3">Date of Birth</th>
                        <th className="text-left p-3">Gender</th>
                        <th className="text-left p-3">Points</th>
                        <th className="text-left p-3">Level</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Verification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {kids.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="text-center py-4">
                            No children found
                          </td>
                        </tr>
                      ) : (
                        kids.map((kid: any, idx: number) => (
                          <tr key={kid.kidId || idx} className="border-b hover:bg-gray-50">
                            <td className="p-3">{kid.fullName}</td>
                            <td className="p-3">{kid.email || "-"}</td>
                            <td className="p-3">
                              {kid.dateOfBirth ? new Date(kid.dateOfBirth).toLocaleDateString('vi-VN') : "-"}
                            </td>
                            <td className="p-3">
                              {kid.gender === "male"
                                ? "Male"
                                : kid.gender === "female"
                                  ? "Female"
                                  : "Other"}
                            </td>
                            <td className="p-3">{kid.points}</td>
                            <td className="p-3">{kid.level}</td>
                            <td className="p-3">
                              {(kid.isActive ?? kid.userId?.isActive) ? (
                                <span className="text-green-600">Active</span>
                              ) : (
                                <span className="text-red-500">Disabled</span>
                              )}
                            </td>
                            <td className="p-3">
                              {(kid.isVerified ?? kid.userId?.isVerified) ? (
                                <span className="text-green-600">Verified</span>
                              ) : (
                                <span className="text-gray-500">Unverified</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

        </TabsContent>

        <TabsContent value="statistics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Thống kê phụ huynh */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Parent statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <StatisticParent />
              </CardContent>
            </Card>
            {/* Thống kê kid */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>kid statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <StatisticKid />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div >
  );
}

function getRoleBadgeColor(role: string) {
  switch (role) {
    case "Admin":
      return "bg-red-100 text-red-800";
    case "Teacher":
      return "bg-purple-100 text-purple-800";
    case "Parent":
      return "bg-violet-100 text-violet-800";
    case "Child":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}


function StatisticParent() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [parentCountMonth, setParentCountMonth] = useState<number | null>(null);
  const [parentCountYear, setParentCountYear] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCount = async () => {
    setLoading(true);
    try {
      const resMonth = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/parents/count/month?month=${month}&year=${year}`);
      const dataMonth = await resMonth.json();
      setParentCountMonth(dataMonth.data?.parentCount || 0);
      const resYear = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/parents/count/year?year=${year}`);
      const dataYear = await resYear.json();
      setParentCountYear(dataYear.data?.parentCount || 0);
    } catch {
      setParentCountMonth(null);
      setParentCountYear(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCount();
  }, [month, year]);

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <select value={month} onChange={e => setMonth(Number(e.target.value))} className="border rounded p-1">
          {[...Array(12)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
        </select>
        <input type="number" value={year} onChange={e => setYear(Number(e.target.value))} className="border rounded p-1 w-20" min={2000} max={2100} />
      </div>
      {loading ? <div>loading...</div> : (
        <div>
          <div className="mb-1">
            Number of parents registered in {month}/{year}: <b>{parentCountMonth ?? '-'}</b>
          </div>
          <div>
            Number of parents registered in {year}: <b>{parentCountYear ?? '-'}</b>
          </div>
        </div>

      )}
    </div>
  );
}

function StatisticKid() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [kidCountMonth, setKidCountMonth] = useState<number | null>(null);
  const [kidCountYear, setKidCountYear] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCount = async () => {
    setLoading(true);
    try {
      const resMonth = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/kids/count/month?month=${month}&year=${year}`);
      const dataMonth = await resMonth.json();
      setKidCountMonth(dataMonth.data?.kidCount || 0);
      const resYear = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/kids/count/year?year=${year}`);
      const dataYear = await resYear.json();
      setKidCountYear(dataYear.data?.kidCount || 0);
    } catch {
      setKidCountMonth(null);
      setKidCountYear(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCount();
  }, [month, year]);

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <select value={month} onChange={e => setMonth(Number(e.target.value))} className="border rounded p-1">
          {[...Array(12)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
        </select>
        <input type="number" value={year} onChange={e => setYear(Number(e.target.value))} className="border rounded p-1 w-20" min={2000} max={2100} />
      </div>
      {loading ? <div>Loading...</div> : (
        <div>
          <div className="mb-1">
            Number of children created in {month}/{year}: <b>{kidCountMonth ?? '-'}</b>
          </div>
          <div>
            Number of children created in {year}: <b>{kidCountYear ?? '-'}</b>
          </div>
        </div>

      )}
    </div>
  );
}
