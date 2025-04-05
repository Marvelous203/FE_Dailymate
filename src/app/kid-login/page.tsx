import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function KidLogin() {
  return (
    <main className="min-h-screen bg-[#ecffee] flex flex-col items-center justify-between">
      <div className="w-full max-w-md mx-auto pt-16 px-4 flex flex-col items-center">
        <div className="w-full text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-[#10b981] rounded-full flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=60&width=60"
                alt="Kid mascot"
                width={60}
                height={60}
                className="rounded-full"
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-[#1e1e1e]">Kids Login</h1>
          <p className="text-[#4b5563] mt-2">Let&apos;s start learning!</p>
        </div>

        <div className="w-full space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Username"
              className="w-full border border-[#d9d9d9] bg-white rounded-md px-4 py-2 text-lg text-center"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              className="w-full border border-[#d9d9d9] bg-white rounded-md px-4 py-2 text-lg text-center"
            />
          </div>

          <Button className="w-full bg-[#10b981] hover:bg-[#059669] text-white py-2 rounded-md text-lg">
            <Link href="/kid/dashboard" className="w-full">
              Login
            </Link>
          </Button>

          <div className="text-center mt-4">
            <Link href="/" className="text-[#10b981] text-sm font-medium">
              Parent Login
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center mt-auto">
        <div className="relative w-full h-32">
          <Image
            src="/placeholder.svg?height=120&width=120"
            alt="Mascot character"
            width={120}
            height={120}
            className="absolute bottom-0 left-8"
          />
          <div className="absolute bottom-0 w-full h-16 bg-[#83d98c] rounded-t-3xl"></div>
        </div>
      </div>
    </main>
  );
}
