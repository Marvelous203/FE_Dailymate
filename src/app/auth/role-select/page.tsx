import Image from "next/image"
import Link from "next/link"

const RoleSelectPage = () => {  // Changed to arrow function component
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
            <h1 className="text-2xl font-bold text-[#1e1e1e]">Select Your Role</h1>
            <p className="text-[#4b5563]">Choose how you want to access DailyMates</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <RoleCard
              title="Parent"
              icon={<UserIcon className="h-10 w-10 text-[#10b981]" />}
              description="Manage your child's learning journey"
              href="/parent/dashboard"
              color="bg-[#d1fae5]"
              hoverColor="hover:bg-[#a7f3d0]"
              textColor="text-[#059669]"
            />

            <RoleCard
              title="Teacher"
              icon={<BookOpenIcon className="h-10 w-10 text-[#4dacc4]" />}
              description="Manage courses and students"
              href="/teacher"
              color="bg-[#d7ebf0]"
              hoverColor="hover:bg-[#8abade]"
              textColor="text-[#4dacc4]"
            />

            <RoleCard
              title="Admin"
              icon={<SettingsIcon className="h-10 w-10 text-[#f15f6c]" />}
              description="System administration"
              href="/admin-dashboard"
              color="bg-[#feccd6]"
              hoverColor="hover:bg-[#f87171]"
              textColor="text-[#f15f6c]"
            />
          </div>
        </div>
      </div>

      <footer className="py-4 text-center text-[#6b7280] text-sm">
        <p>© 2025 DailyMates. All rights reserved.</p>
      </footer>
    </div>
  )
}

function RoleCard({ title, icon, description, href, color, hoverColor, textColor }) {
  return (
    <Link href={href}>
      <div className={`${color} ${hoverColor} rounded-lg p-6 text-center transition-all cursor-pointer`}>
        <div className="flex justify-center mb-4">{icon}</div>
        <h2 className={`font-bold text-lg ${textColor}`}>{title}</h2>
        <p className="text-[#4b5563] text-sm mt-2">{description}</p>
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

function BookOpenIcon(props) {
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
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

function SettingsIcon(props) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export default RoleSelectPage
