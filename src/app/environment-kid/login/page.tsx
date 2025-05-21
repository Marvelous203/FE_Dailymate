import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function KidLoginPage() {
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
            <h1 className="text-2xl font-bold text-[#1e1e1e]">Welcome to EduKids</h1>
            <p className="text-[#4b5563]">Fun learning zone for kids!</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <Tabs defaultValue="kid" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="kid" className="text-base">
                  I am a Kid
                </TabsTrigger>
                <TabsTrigger value="parent" className="text-base">
                  I am a Parent
                </TabsTrigger>
              </TabsList>

              <TabsContent value="kid">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <KidLoginOption name="Alex" color="bg-[#d1fae5]" href="/environment-kid/kid-learning-zone" />
                    <KidLoginOption name="Emma" color="bg-[#feccd6]" href="/environment-kid/kid-learning-zone" />
                    <KidLoginOption name="Noah" color="bg-[#d7ebf0]" href="/environment-kid/kid-learning-zone" />
                    <KidLoginOption name="Add New" color="bg-[#f3f4f6]" href="#" isAdd={true} />
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-[#6b7280]">
                      Need help?{" "}
                      <Link href="/login" className="text-[#10b981] hover:underline font-medium">
                        Ask a parent
                      </Link>
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="parent">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="parent-email">Email</Label>
                    <Input id="parent-email" type="email" placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parent-password">Password</Label>
                    <Input id="parent-password" type="password" placeholder="••••••••" />
                  </div>
                  <Button className="w-full bg-[#10b981] hover:bg-[#059669]" asChild>
                    <Link href="/environment-kid/parent-monitor">Login</Link>
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-[#6b7280]">
                    Need to access the main site?{" "}
                    <Link href="/login" className="text-[#10b981] hover:underline font-medium">
                      Go to Main Login
                    </Link>
                  </p>
                </div>
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

function KidLoginOption({ name, color, href, isAdd = false }) {
  return (
    <Link href={href}>
      <div className={`${color} rounded-lg p-4 text-center hover:opacity-90 transition-all cursor-pointer`}>
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
    </Link>
  )
}

function UserIcon(props) {
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
  )
}

function PlusCircleIcon(props) {
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
  )
}
