import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, ChevronRight } from "lucide-react";
import ParentHeader from "@/components/parent-header";

export default function JoinKidsEnvironment() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <ParentHeader />

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Join Kids Learning Environment
            </h1>
            <p className="text-[#4b5563] max-w-2xl mx-auto">
              Set up your child's profile and get them started on their learning
              journey. Our kid-friendly environment is designed to make learning
              fun and engaging.
            </p>
          </div>

          {/* Steps */}
          <div className="flex justify-between mb-12 relative">
            <div className="absolute top-4 left-0 w-full h-1 bg-[#e5e7eb]">
              <div
                className="h-full bg-[#8b5cf6]"
                style={{ width: "33%" }}
              ></div>
            </div>

            <div className="flex flex-col items-center relative z-10">
              <div className="w-8 h-8 rounded-full bg-[#8b5cf6] text-white flex items-center justify-center mb-2">
                1
              </div>
              <span className="text-sm font-medium">Create Profile</span>
            </div>

            <div className="flex flex-col items-center relative z-10">
              <div className="w-8 h-8 rounded-full bg-[#e5e7eb] text-[#6b7280] flex items-center justify-center mb-2">
                2
              </div>
              <span className="text-sm text-[#6b7280]">Customize</span>
            </div>

            <div className="flex flex-col items-center relative z-10">
              <div className="w-8 h-8 rounded-full bg-[#e5e7eb] text-[#6b7280] flex items-center justify-center mb-2">
                3
              </div>
              <span className="text-sm text-[#6b7280]">Start Learning</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Form */}
            <div className="md:col-span-3">
              <Card className="border-none shadow-sm">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">
                    Child Profile Information
                  </h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="First name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Last name"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        placeholder="Choose a fun username"
                        className="mt-1"
                      />
                      <p className="text-xs text-[#6b7280] mt-1">
                        This is what your child will use to log in. Make it
                        memorable and fun!
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a password"
                        className="mt-1"
                      />
                      <p className="text-xs text-[#6b7280] mt-1">
                        Keep it simple so your child can remember it easily.
                      </p>
                    </div>

                    <div>
                      <Label>Age Range</Label>
                      <div className="grid grid-cols-3 gap-3 mt-1">
                        <div>
                          <input
                            type="radio"
                            id="age3-5"
                            name="ageRange"
                            className="sr-only peer"
                          />
                          <label
                            htmlFor="age3-5"
                            className="flex items-center justify-center p-3 border rounded-md cursor-pointer peer-checked:bg-[#f0e5fc] peer-checked:border-[#8b5cf6] peer-checked:text-[#8b5cf6]"
                          >
                            3-5 years
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="age6-8"
                            name="ageRange"
                            className="sr-only peer"
                            defaultChecked
                          />
                          <label
                            htmlFor="age6-8"
                            className="flex items-center justify-center p-3 border rounded-md cursor-pointer peer-checked:bg-[#f0e5fc] peer-checked:border-[#8b5cf6] peer-checked:text-[#8b5cf6]"
                          >
                            6-8 years
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="age9-12"
                            name="ageRange"
                            className="sr-only peer"
                          />
                          <label
                            htmlFor="age9-12"
                            className="flex items-center justify-center p-3 border rounded-md cursor-pointer peer-checked:bg-[#f0e5fc] peer-checked:border-[#8b5cf6] peer-checked:text-[#8b5cf6]"
                          >
                            9-12 years
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Avatar</Label>
                      <div className="grid grid-cols-4 gap-3 mt-1">
                        {[1, 2, 3, 4].map((avatar) => (
                          <div key={avatar}>
                            <input
                              type="radio"
                              id={`avatar${avatar}`}
                              name="avatar"
                              className="sr-only peer"
                              defaultChecked={avatar === 1}
                            />
                            <label
                              htmlFor={`avatar${avatar}`}
                              className="flex items-center justify-center p-2 border rounded-md cursor-pointer peer-checked:border-[#8b5cf6] overflow-hidden"
                            >
                              <div className="w-16 h-16 rounded-full bg-[#d9d9d9]">
                                <Image
                                  src={`/placeholder.svg?height=64&width=64`}
                                  alt={`Avatar ${avatar}`}
                                  width={64}
                                  height={64}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-[#6b7280] mt-1">
                        Choose an avatar for your child's profile.
                      </p>
                    </div>

                    <Button className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed]">
                      Continue to Customize
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Info */}
            <div className="md:col-span-2">
              <div className="space-y-6">
                <Card className="border-none shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">
                      Why Create a Child Profile?
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-[#8b5cf6] mr-3 mt-0.5" />
                        <p className="text-[#4b5563]">
                          Personalized learning experience based on age and
                          interests
                        </p>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-[#8b5cf6] mr-3 mt-0.5" />
                        <p className="text-[#4b5563]">
                          Kid-friendly interface with age-appropriate content
                        </p>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-[#8b5cf6] mr-3 mt-0.5" />
                        <p className="text-[#4b5563]">
                          Track progress and achievements separately for each
                          child
                        </p>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-[#8b5cf6] mr-3 mt-0.5" />
                        <p className="text-[#4b5563]">
                          Safe, ad-free environment designed for children
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-[#f0e5fc]">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">What's Next?</h3>
                    <p className="text-[#4b5563] mb-4">
                      After creating your child's profile, you'll be able to:
                    </p>
                    <ul className="space-y-2 text-[#4b5563]">
                      <li className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-[#8b5cf6] text-white flex items-center justify-center mr-2 text-xs">
                          1
                        </div>
                        Customize learning preferences
                      </li>
                      <li className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-[#8b5cf6] text-white flex items-center justify-center mr-2 text-xs">
                          2
                        </div>
                        Select interests and subjects
                      </li>
                      <li className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-[#8b5cf6] text-white flex items-center justify-center mr-2 text-xs">
                          3
                        </div>
                        Set up parental controls
                      </li>
                      <li className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-[#8b5cf6] text-white flex items-center justify-center mr-2 text-xs">
                          4
                        </div>
                        Start your child's learning journey
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
