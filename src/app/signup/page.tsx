import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUp() {
  return (
    <main className="min-h-screen bg-[#ecffee] flex flex-col items-center justify-between">
      <div className="w-full max-w-md mx-auto pt-16 px-4 flex flex-col items-center">
        <div className="w-full text-center mb-8">
          <h1 className="text-2xl font-bold text-[#1e1e1e]">Sign Up</h1>
          <p className="text-[#4b5563] mt-2">Create your account</p>
        </div>

        <div className="w-full space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Full Name"
              className="w-full border border-[#d9d9d9] bg-white rounded-md px-4 py-2"
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Email"
              className="w-full border border-[#d9d9d9] bg-white rounded-md px-4 py-2"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              className="w-full border border-[#d9d9d9] bg-white rounded-md px-4 py-2"
            />
          </div>

          <Button className="w-full bg-[#10b981] hover:bg-[#059669] text-white py-2 rounded-md">
            Create Account
          </Button>

          <div className="text-center mt-4">
            <p className="text-[#4b5563] text-sm">
              Already have an account?{" "}
              <Link href="/" className="text-[#10b981] font-medium">
                Sign in
              </Link>
            </p>
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
