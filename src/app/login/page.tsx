import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#eafff4] flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/placeholder.svg?height=80&width=80"
                alt="Logo"
                width={80}
                height={80}
                className="rounded-full bg-white p-2"
              />
            </div>
            <h1 className="text-2xl font-bold text-[#1e1e1e]">Welcome to EduKids</h1>
            <p className="text-[#4b5563]">Life skills education for children</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/forgot-password" className="text-sm text-[#10b981] hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input id="password" type="password" placeholder="••••••••" />
                  </div>
                  <Button className="w-full bg-[#10b981] hover:bg-[#059669]" asChild>
                    <Link href="/auth/role-select">Login</Link>
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-[#6b7280]">
                    Looking for the children&apos;s area?{" "}
                    <Link href="/environment-kid/login" className="text-[#10b981] hover:underline font-medium">
                      Go to Kid&apos;s Login
                    </Link>
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="signup">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" type="text" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" placeholder="••••••••" />
                  </div>
                  <Button className="w-full bg-[#10b981] hover:bg-[#059669]">Sign Up</Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <footer className="py-4 text-center text-[#6b7280] text-sm">
        <p>© 2025 EduKids. All rights reserved.</p>
      </footer>
    </div>
  )
}
