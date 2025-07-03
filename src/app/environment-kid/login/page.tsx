"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  loginUser,
  fetchUserDataAfterLogin,
  fetchKidDataAfterLogin,
} from "@/lib/api";

export default function KidLoginPage() {
  const [parentEmail, setParentEmail] = useState("");
  const [parentPassword, setParentPassword] = useState("");
  const [kidsInfo, setKidsInfo] = useState<{
    data: { kids: Array<{ _id: string; fullName: string }> };
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showParentModal, setShowParentModal] = useState(false);
  const [isParentLoggedIn, setIsParentLoggedIn] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();

  // Check parent login status and load kids data on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const parentData = localStorage.getItem("parentData");
      const storedKidsInfo = localStorage.getItem("kidsInfo");

      if (parentData) {
        setIsParentLoggedIn(true);

        if (storedKidsInfo) {
          try {
            const parsedKidsInfo = JSON.parse(storedKidsInfo);
            setKidsInfo(parsedKidsInfo);
          } catch (error) {
            console.error("Error parsing kids info:", error);
            setKidsInfo(null);
          }
        }
      } else {
        setIsParentLoggedIn(false);
        setKidsInfo(null);
      }

      setInitialLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Handle parent login
  const handleParentLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Login parent
      const loginResponse = await loginUser(parentEmail, parentPassword);

      if (loginResponse.success && loginResponse.user.role === "parent") {
        // Fetch complete user data including kids
        const userCompleteData = await fetchUserDataAfterLogin(
          loginResponse.user.roleData._id
        );

        // Store data in localStorage
        localStorage.setItem(
          "parentData",
          JSON.stringify(userCompleteData.parent)
        );
        localStorage.setItem(
          "kidsInfo",
          JSON.stringify(userCompleteData.kidsInfo)
        );

        // Update local state - chỉ cần kidsInfo
        setKidsInfo(userCompleteData.kidsInfo);
        setIsParentLoggedIn(true);
        setShowParentModal(false);

        // Clear form
        setParentEmail("");
        setParentPassword("");
      } else {
        setError("Invalid credentials or not a parent account");
      }
    } catch (error) {
      console.error("Parent login error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle kid login (no password required)
  const handleKidLogin = async (kidId: string, kidName: string) => {
    setLoading(true);
    setError("");

    try {
      // Clear previous kid's data before switching
      const { kidLocalStorage, validateKidDataIntegrity } = await import(
        "@/utils/kidProgress"
      );

      // Get previously logged in kid data to clear their specific data
      const oldKidData = localStorage.getItem("kidData");
      if (oldKidData) {
        try {
          const parsedOldData = JSON.parse(oldKidData);
          const oldKidId = parsedOldData?.data?._id || parsedOldData?.data?.id;
          if (oldKidId && oldKidId !== kidId) {
            console.log(`🧹 Clearing old kid data for: ${oldKidId}`);
            kidLocalStorage.clearKidData(oldKidId);
          }
        } catch (e) {
          console.warn("Error parsing old kid data:", e);
        }
      }

      // Fetch kid data
      const kidCompleteData = await fetchKidDataAfterLogin(kidId);

      // Store kid data in localStorage
      localStorage.setItem("kidData", JSON.stringify(kidCompleteData));

      // Validate data integrity for new kid and migrate old keys if needed
      validateKidDataIntegrity(kidId);
      kidLocalStorage.migrateOldKeys(kidId);

      console.log(`✅ Kid login successful for: ${kidName} (${kidId})`);

      // Redirect to kid learning zone with kid ID
      router.push(`/environment-kid/kid-learning-zone/${kidId}`);
    } catch (error) {
      console.error("Kid login error:", error);
      setError(`Failed to login as ${kidName}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  // Handle add new kid
  const handleAddNewKid = () => {
    if (isParentLoggedIn) {
      router.push("/environment-kid/dashboard");
    } else {
      setShowParentModal(true);
      setError("");
    }
  };

  // Handle parent logout
  const handleParentLogout = async () => {
    try {
      // Gọi API logout
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      // Clear local storage
      localStorage.removeItem("parentData");
      localStorage.removeItem("kidsInfo");
      setIsParentLoggedIn(false);
      setKidsInfo(null);
    } catch (error) {
      console.error("Logout error:", error);
      // Vẫn clear local storage ngay cả khi API call thất bại
      localStorage.removeItem("parentData");
      localStorage.removeItem("kidsInfo");
      setIsParentLoggedIn(false);
      setKidsInfo(null);
    }
  };

  // Close modal
  const closeModal = () => {
    setShowParentModal(false);
    setError("");
    setParentEmail("");
    setParentPassword("");
  };

  // Show parent login button
  const showParentLoginButton = () => {
    setShowParentModal(true);
    setError("");
  };

  // Di chuyển function này ra ngoài return statement
  const getKidsList = () => {
    if (!kidsInfo || !kidsInfo.data || !kidsInfo.data.kids) {
      return [];
    }
    return kidsInfo.data.kids;
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-[#eafff4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#10b981] mx-auto mb-4"></div>
          <p className="text-[#6b7280]">Loading...</p>
        </div>
      </div>
    );
  }

  function getKidColor(index: number) {
    const colors = [
      "bg-[#d1fae5]", // green
      "bg-[#feccd6]", // pink
      "bg-[#d7ebf0]", // blue
      "bg-[#fef3c7]", // yellow
      "bg-[#e0e7ff]", // indigo
      "bg-[#f3e8ff]", // purple
    ];
    return colors[index % colors.length];
  }

  function KidLoginOption({
    name,
    color,
    onClick,
    isAdd = false,
    disabled = false,
  }: {
    name: string;
    color: string;
    onClick: () => void;
    isAdd?: boolean;
    disabled?: boolean;
  }) {
    return (
      <div
        onClick={disabled ? undefined : onClick}
        className={`${color} rounded-lg p-4 text-center transition-all cursor-pointer ${
          disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
        }`}
      >
        <div className="flex justify-center mb-2">
          {isAdd ? (
            <PlusCircleIcon className="h-16 w-16 text-[#9ca3af]" />
          ) : (
            <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center">
              <UserIcon className="h-8 w-8 text-[#6b7280]" />
            </div>
          )}
        </div>
        <p className="font-medium text-[#1e1e1e]">{name}</p>
      </div>
    );
  }

  function UserIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    );
  }

  function PlusCircleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
      </svg>
    );
  }

  function XIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="M6 6l12 12" />
      </svg>
    );
  }

  return (
    <div className="min-h-screen bg-[#eafff4] flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/placeholder.svg?height=100&width=100"
                alt="Kid Logo"
                width={100}
                height={100}
                className="rounded-full bg-white p-2"
              />
            </div>
            <h1 className="text-2xl font-bold text-[#1e1e1e]">
              🌟 Kids Learning Environment
            </h1>
            <p className="text-[#4b5563]">
              Dedicated safe space for children to learn and play!
            </p>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>ℹ️ This is a separate login</strong> for the kids
                environment only. Parents must login here first to manage kids.
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Parent Status Bar */}
            {isParentLoggedIn && (
              <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg flex justify-between items-center">
                <span className="text-green-700 text-sm font-medium">
                  ✓ Parent logged in
                </span>
                <button
                  onClick={handleParentLogout}
                  className="text-green-600 hover:text-green-800 text-sm underline"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Kids Selection Area */}
            <div className="space-y-6">
              {!isParentLoggedIn ? (
                // Show parent login button when not logged in
                <div className="text-center py-8">
                  <div className="mb-6">
                    <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <UserIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-[#6b7280] mb-4">
                      Please login as a parent first to see kids.
                    </p>
                  </div>

                  <Button
                    onClick={showParentLoginButton}
                    className="bg-[#10b981] hover:bg-[#059669] text-white px-8 py-3"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Parent Login"}
                  </Button>

                  <div className="mt-6">
                    <p className="text-sm text-[#6b7280]">
                      Need to access the main site?{" "}
                      <Link
                        href="/login"
                        className="text-[#10b981] hover:underline font-medium"
                      >
                        Go to Main Login
                      </Link>
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      You must login here to access the kids learning
                      environment.
                    </p>
                  </div>
                </div>
              ) : (
                // Show kids grid when parent is logged in
                <>
                  {(() => {
                    const kidsList = getKidsList();

                    return (
                      <div className="grid grid-cols-2 gap-4">
                        {kidsList.length > 0 ? (
                          kidsList.map((kid, index) => (
                            <KidLoginOption
                              key={kid._id || index}
                              name={kid.fullName || `Kid ${index + 1}`}
                              color={getKidColor(index)}
                              onClick={() =>
                                handleKidLogin(kid._id, kid.fullName)
                              }
                              disabled={loading}
                            />
                          ))
                        ) : (
                          <div className="col-span-2 text-center py-4 text-gray-500">
                            No kids found.
                          </div>
                        )}

                        <KidLoginOption
                          name="Add New"
                          color="bg-[#f3f4f6]"
                          onClick={handleAddNewKid}
                          isAdd={true}
                          disabled={loading}
                        />
                      </div>
                    );
                  })()}

                  <div className="text-center">
                    <p className="text-sm text-[#6b7280]">
                      Need help?{" "}
                      <Link
                        href="/login"
                        className="text-[#10b981] hover:underline font-medium"
                      >
                        Ask a parent
                      </Link>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Parent Login Modal */}
      {showParentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#1e1e1e]">Parent Login</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
                disabled={loading}
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>

            <p className="text-[#6b7280] mb-6">
              Please login to access kids and parent features.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleParentLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="modal-parent-email">Email</Label>
                <Input
                  id="modal-parent-email"
                  type="email"
                  placeholder="your@email.com"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-parent-password">Password</Label>
                <Input
                  id="modal-parent-password"
                  type="password"
                  placeholder="••••••••"
                  value={parentPassword}
                  onChange={(e) => setParentPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeModal}
                  className="flex-1"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#10b981] hover:bg-[#059669]"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="py-4 text-center text-[#6b7280] text-sm">
        <p>© 2025 DailyMates. All rights reserved.</p>
      </footer>
    </div>
  );
}
