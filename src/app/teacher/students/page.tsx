'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Kid {
  kidId: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  isActive: boolean;
  isVerified: boolean;
  avatar?: string;
}

export default function TeacherStudentsPage() {
  const [kids, setKids] = useState<Kid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchKids() {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8386/api/kids");
        const data = await res.json();
        if (data?.data?.kids) {
          setKids(data.data.kids);
        } else {
          setKids([]);
        }
      } catch (error) {
        setKids([]);
      } finally {
        setLoading(false);
      }
    }
    fetchKids();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1e1e1e] mb-6">Student List</h1>
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Students</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : kids.length === 0 ? (
            <div>No students found.</div>
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
                    <th className="text-left p-3">Active</th>
                    <th className="text-left p-3">Verified</th>
                  </tr>
                </thead>
                <tbody>
                  {kids.map((kid) => (
                    <tr key={kid.kidId} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-[#d9d9d9]">
                          <Image
                            src={
                              kid.avatar
                                ? kid.avatar.startsWith('http')
                                  ? kid.avatar
                                  : `/${kid.avatar}`
                                : "/avatar_default.png"
                            }
                            alt={kid.fullName}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="p-3 font-medium">{kid.fullName}</td>
                      <td className="p-3">{kid.email}</td>
                      <td className="p-3">{kid.dateOfBirth ? kid.dateOfBirth.slice(0, 10) : ""}</td>
                      <td className="p-3 capitalize">{kid.gender}</td>
                      <td className="p-3">{kid.isActive ? "Yes" : "No"}</td>
                      <td className="p-3">{kid.isVerified ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
