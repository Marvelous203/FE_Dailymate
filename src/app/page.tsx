import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#eafff4]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="EduKids Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-bold text-xl text-[#10b981]">EduKids</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-[#4b5563] hover:text-[#10b981]">
              Features
            </Link>
            <Link href="#how-it-works" className="text-[#4b5563] hover:text-[#10b981]">
              How It Works
            </Link>
            <Link href="#pricing" className="text-[#4b5563] hover:text-[#10b981]">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-[#4b5563] hover:text-[#10b981]">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:inline-flex" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button className="bg-[#10b981] hover:bg-[#059669]" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-[#1e1e1e]">
                Life Skills Education for Children
              </h1>
              <p className="text-lg text-[#4b5563]">
                Help your child develop essential life skills through interactive learning experiences designed by education experts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-[#10b981] hover:bg-[#059669]" asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/environment-kid/login">Kid's Area</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Children learning"
                width={500}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1e1e1e]">Key Features</h2>
            <p className="text-[#4b5563] mt-4 max-w-2xl mx-auto">
              Our platform offers a comprehensive approach to children's education with these key features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookIcon className="h-10 w-10 text-[#10b981]" />}
              title="Interactive Courses"
              description="Engaging lessons designed by education experts to make learning fun and effective."
            />
            <FeatureCard
              icon={<GamepadIcon className="h-10 w-10 text-[#8b5cf6]" />}
              title="Educational Games"
              description="Fun games that reinforce learning concepts and develop problem-solving skills."
            />
            <FeatureCard
              icon={<ChartIcon className="h-10 w-10 text-[#f59e0b]" />}
              title="Progress Tracking"
              description="Detailed insights for parents and teachers to monitor children's development."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-[#d1fae5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1e1e1e]">How It Works</h2>
            <p className="text-[#4b5563] mt-4 max-w-2xl mx-auto">
              Our platform makes it easy for children to learn and for parents and teachers to guide them
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StepCard
              number="1"
              title="Sign Up"
              description="Create an account as a parent, teacher, or administrator."
            />
            <StepCard
              number="2"
              title="Set Up Profiles"
              description="Create profiles for your children or students."
            />
            <StepCard
              number="3"
              title="Explore Content"
              description="Browse our library of courses and educational games."
            />
            <StepCard
              number="4"
              title="Track Progress"
              description="Monitor learning progress and celebrate achievements."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1e1e1e]">Simple Pricing</h2>
            <p className="text-[#4b5563] mt-4 max-w-2xl mx-auto">
              Choose the plan that works best for your family or school
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              title="Basic"
              price="Free"
              description="Perfect for trying out the platform"
              features={[
                "Access to 5 basic courses",
                "2 educational games",
                "Basic progress tracking",
                "1 child profile"
              ]}
              buttonText="Get Started"
              buttonLink="/signup"
              highlighted={false}
            />
            <PricingCard
              title="Family"
              price="$9.99/month"
              description="Great for families"
              features={[
                "Access to all courses",
                "All educational games",
                "Detailed progress tracking",
                "Up to 4 child profiles",
                "Parent dashboard"
              ]}
              buttonText="Sign Up Now"
              buttonLink="/signup"
              highlighted={true}
            />
            <PricingCard
              title="School"
              price="Contact Us"
              description="Perfect for schools and institutions"
              features={[
                "Access to all courses",
                "All educational games",
                "Advanced analytics",
                "Unlimited student profiles",
                "Teacher dashboard",
                "Custom curriculum options"
              ]}
              buttonText="Contact Sales"
              buttonLink="/contact"
              highlighted={false}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-[#ecffee]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1e1e1e]">What Parents & Teachers Say</h2>
            <p className="text-[#4b5563] mt-4 max-w-2xl mx-auto">
              Hear from parents and educators who have seen the difference EduKids makes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="My daughter has learned so much about financial literacy and social skills. The games make learning fun for her!"
              author="Sarah M."
              role="Parent of 8-year-old"
            />
            <TestimonialCard
              quote="As a teacher, I've seen remarkable improvement in my students' problem-solving abilities since we started using EduKids."
              author="Michael T."
              role="3rd Grade Teacher"
            />
            <TestimonialCard
              quote="The progress tracking helps me understand exactly where my son needs more support. It's been a game-changer for his education."
              author="Jennifer K."
              role="Parent of 10-year-old"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#10b981]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Child's Learning Journey?</h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of families and educators who trust EduKids for life skills education
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup">Sign Up Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-[#10b981]" asChild>
              <Link href="/environment-kid/login">Go to Kid's Area</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e1e1e] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="EduKids Logo"
                  width={40}
                  height={40}
                  className="rounded-full bg-white"
                />
                <span className="font-bold text-xl text-white">EduKids</span>
              </div>
              <p className="text-gray-300">
                Life skills education for children through interactive learning experiences.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-300 hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-300 hover:text-white">Pricing</Link></li>
                <li><Link href="/testimonials" className="text-gray-300 hover:text-white">Testimonials</Link></li>
                <li><Link href="/faq" className="text-gray-300 hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
                <li><Link href="/careers" className="text-gray-300 hover:text-white">Careers</Link></li>
                <li><Link href="/blog" className="text-gray-300 hover:text-white">Blog</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-gray-300 hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/cookies" className="text-gray-300 hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>© 2025 EduKids. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Component for feature cards
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-[#f9fafb] p-6 rounded-lg text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-[#1e1e1e]">{title}</h3>
      <p className="text-[#4b5563]">{description}</p>
    </div>
  )
}

// Component for step cards
function StepCard({ number, title, description }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 rounded-full bg-[#10b981] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-[#1e1e1e]">{title}</h3>
      <p className="text-[#4b5563]">{description}</p>
    </div>
  )
}

// Component for pricing cards
function PricingCard({ title, price, description, features, buttonText, buttonLink, highlighted }) {
  return (
    <div className={`rounded-lg p-6 ${highlighted ? 'bg-[#10b981] text-white ring-2 ring-[#10b981] shadow-lg' : 'bg-white border border-gray-200'}`}>
      <div className="text-center mb-6">
        <h3 className={`text-xl font-bold mb-2 ${highlighted ? 'text-white' : 'text-[#1e1e1e]'}`}>{title}</h3>
        <div className={`text-3xl font-bold mb-2 ${highlighted ? 'text-white' : 'text-[#1e1e1e]'}`}>{price}</div>
        <p className={highlighted ? 'text-white/90' : 'text-[#4b5563]'}>{description}</p>
      </div>
      
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckIcon className={`h-5 w-5 mr-2 ${highlighted ? 'text-white' : 'text-[#10b981]'}`} />
            <span className={highlighted ? 'text-white/90' : 'text-[#4b5563]'}>{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        className={`w-full ${highlighted 
          ? 'bg-white text-[#10b981] hover:bg-gray-100' 
          : 'bg-[#10b981] text-white hover:bg-[#059669]'}`} 
        asChild
      >
        <Link href={buttonLink}>{buttonText}</Link>
      </Button>
    </div>
  )
}

// Component for testimonial cards
function TestimonialCard({ quote, author, role }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <QuoteIcon className="h-8 w-8 text-[#10b981] mb-4" />
      <p className="text-[#4b5563] mb-4 italic">{quote}</p>
      <div>
        <p className="font-semibold text-[#1e1e1e]">{author}</p>
        <p className="text-[#6b7280] text-sm">{role}</p>
      </div>
    </div>
  )
}

// Icons
function BookIcon(props) {
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
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  )
}

function GamepadIcon(props) {
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
      <line x1="6" x2="10" y1="12" y2="12" />
      <line x1="8" x2="8" y1="10" y2="14" />
      <circle cx="15" cy="13" r="1" />
      <circle cx="18" cy="11" r="1" />
      <rect width="20" height="12" x="2" y="6" rx="2" />
    </svg>
  )
}

function ChartIcon(props) {
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
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  )
}

function CheckIcon(props) {
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function QuoteIcon(props) {
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
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  )
}
