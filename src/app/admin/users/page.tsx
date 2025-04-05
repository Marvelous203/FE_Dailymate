import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Filter, MoreHorizontal } from "lucide-react";

export default function UsersPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#1e1e1e]">Users Management</h1>
        <Button className="bg-[#ef4444] hover:bg-[#dc2626]">
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
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

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="bg-white">
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="admins">Administrators</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="parents">Parents</TabsTrigger>
          <TabsTrigger value="children">Children</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>User List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Name</th>
                      <th className="text-left p-3">Email</th>
                      <th className="text-left p-3">Role</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3">Joined</th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3">{user.name}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${getRoleBadgeColor(
                              user.role
                            )}`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              user.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="p-3">{user.joined}</td>
                        <td className="p-3">
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-500">
                  Showing 1-10 of 100 users
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs would have similar content but filtered by role */}
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
      </Tabs>
    </div>
  );
}

function getRoleBadgeColor(role) {
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

const users = [
  {
    name: "John Smith",
    email: "john.smith@example.com",
    role: "Admin",
    status: "Active",
    joined: "Jan 10, 2023",
  },
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "Teacher",
    status: "Active",
    joined: "Feb 15, 2023",
  },
  {
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "Parent",
    status: "Active",
    joined: "Mar 5, 2023",
  },
  {
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "Teacher",
    status: "Inactive",
    joined: "Apr 20, 2023",
  },
  {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "Child",
    status: "Active",
    joined: "May 12, 2023",
  },
  {
    name: "Jessica Wilson",
    email: "jessica.wilson@example.com",
    role: "Parent",
    status: "Active",
    joined: "Jun 8, 2023",
  },
  {
    name: "David Miller",
    email: "david.miller@example.com",
    role: "Admin",
    status: "Active",
    joined: "Jul 15, 2023",
  },
];
