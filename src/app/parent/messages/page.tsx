import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, X, Sparkles, Crown, Heart, Shield, Zap } from "lucide-react";

export default function PremiumPlans() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]">
      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-8">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6]/10 to-[#7c3aed]/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] rounded-2xl shadow-xl">
                <Crown className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] bg-clip-text text-transparent">
              Choose the Perfect Plan
            </h1>
            <p className="text-[#64748b] text-xl leading-relaxed">
              Unlock premium educational content and features to enhance your child's learning experience with our comprehensive platform.
            </p>
          </div>
        </div>

        {/* Pricing Toggle */}
        <div className="flex justify-center mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 inline-flex shadow-xl border border-white/20">
            <Button className="rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] shadow-lg px-8 py-3 font-semibold">
              Monthly
            </Button>
            <Button variant="ghost" className="rounded-xl px-8 py-3 font-semibold hover:bg-[#8b5cf6]/10">
              Yearly (Save 20%)
            </Button>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Basic Plan */}
          <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm relative overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-[#64748b]/5 to-[#475569]/5"></div>
            <CardHeader className="pb-4 relative">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-[#64748b] to-[#475569] rounded-xl">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">Basic</CardTitle>
              </div>
              <p className="text-[#64748b] text-lg">
                Perfect for getting started
              </p>
            </CardHeader>
            <CardContent className="relative">
              <div className="mb-8">
                <span className="text-4xl font-bold text-[#1e293b]">$9.99</span>
                <span className="text-[#64748b] text-lg">/month</span>
              </div>

              <Button className="w-full mb-8 py-3 font-semibold bg-gradient-to-r from-[#64748b] to-[#475569] hover:from-[#475569] hover:to-[#334155] shadow-lg">
                Get Started
              </Button>

              <div className="space-y-4">
                <PlanFeature included icon={<CheckCircle className="h-5 w-5" />}>Access to 10 basic courses</PlanFeature>
                <PlanFeature included icon={<CheckCircle className="h-5 w-5" />}>Basic progress tracking</PlanFeature>
                <PlanFeature included icon={<CheckCircle className="h-5 w-5" />}>1 child profile</PlanFeature>
                <PlanFeature included icon={<CheckCircle className="h-5 w-5" />}>Email support</PlanFeature>
                <PlanFeature icon={<X className="h-5 w-5" />}>Premium courses</PlanFeature>
                <PlanFeature icon={<X className="h-5 w-5" />}>Advanced analytics</PlanFeature>
                <PlanFeature icon={<X className="h-5 w-5" />}>Multiple child profiles</PlanFeature>
                <PlanFeature icon={<X className="h-5 w-5" />}>Downloadable resources</PlanFeature>
              </div>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="border-none shadow-2xl bg-white/90 backdrop-blur-sm relative overflow-hidden transform scale-110 z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/10 to-[#7c3aed]/10"></div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] rounded-full flex items-center justify-center transform rotate-12 shadow-xl">
              <span className="text-white font-bold text-sm transform -rotate-12">Most Popular</span>
            </div>
            <CardHeader className="pb-4 relative">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] rounded-xl shadow-lg">
                  <Crown className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] bg-clip-text text-transparent">Premium</CardTitle>
              </div>
              <p className="text-[#64748b] text-lg">
                Perfect for active learners
              </p>
            </CardHeader>
            <CardContent className="relative">
              <div className="mb-8">
                <span className="text-4xl font-bold bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] bg-clip-text text-transparent">$19.99</span>
                <span className="text-[#64748b] text-lg">/month</span>
              </div>

              <Button className="w-full mb-8 py-3 font-semibold bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#6d28d9] shadow-xl transform hover:scale-105 transition-all duration-300">
                Get Started
              </Button>

              <div className="space-y-4">
                <PlanFeature included icon={<CheckCircle className="h-5 w-5 text-[#8b5cf6]" />}>Access to all basic courses</PlanFeature>
                <PlanFeature included icon={<CheckCircle className="h-5 w-5 text-[#8b5cf6]" />}>Advanced progress tracking</PlanFeature>
                <PlanFeature included icon={<CheckCircle className="h-5 w-5 text-[#8b5cf6]" />}>3 child profiles</PlanFeature>
                <PlanFeature included icon={<CheckCircle className="h-5 w-5 text-[#8b5cf6]" />}>Priority email support</PlanFeature>
                <PlanFeature included icon={<CheckCircle className="h-5 w-5 text-[#8b5cf6]" />}>Premium courses</PlanFeature>
                <PlanFeature included icon={<CheckCircle className="h-5 w-5 text-[#8b5cf6]" />}>Advanced analytics</PlanFeature>
                <PlanFeature icon={<X className="h-5 w-5 text-[#64748b]" />}>Multiple child profiles (up to 5)</PlanFeature>
                <PlanFeature included icon={<CheckCircle className="h-5 w-5 text-[#8b5cf6]" />}>Downloadable resources</PlanFeature>
              </div>
            </CardContent>
          </Card>

          {/* Family Plan */}
          <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm relative overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/5 to-[#059669]/5"></div>
            <CardHeader className="pb-4 relative">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-xl">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">Family</CardTitle>
              </div>
              <p className="text-[#64748b] text-lg">
                Best value for families
              </p>
            </CardHeader>
            <CardContent className="relative">
              <div className="mb-8">
                <span className="text-4xl font-bold text-[#1e293b]">$29.99</span>
                <span className="text-[#64748b] text-lg">/month</span>
              </div>

              <Button className="w-full mb-8 py-3 font-semibold bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] shadow-lg">
                Get Started
              </Button>

              <div className="space-y-4">
                <PlanFeature included icon={<CheckCircle className="h-5 w-5 text-[#10b981]" />}>Access to all courses</PlanFeature>
                <PlanFeature included icon={<CheckCircle className="h-5 w-5 text-[#10b981]" />}>Advanced progress tracking</PlanFeature>
                <PlanFeature included icon={<CheckCircle className="h-5 w-5 text-[#10b981]" />}>5 child profiles</PlanFeature>
                <PlanFeature included icon={<CheckCircle className="h-5 w-5 text-[#10b981]" />}>24/7 priority support</PlanFeature>
                <PlanFeature included icon={<CheckCircle className="h-5 w-5 text-[#10b981]" />}>Premium courses</PlanFeature>
                <PlanFeature included icon={<CheckCircle className="h-5 w-5 text-[#10b981]" />}>Advanced analytics</PlanFeature>
                <PlanFeature included icon={<CheckCircle className="h-5 w-5 text-[#10b981]" />}>Multiple child profiles (up to 5)</PlanFeature>
                <PlanFeature included icon={<CheckCircle className="h-5 w-5 text-[#10b981]" />}>Downloadable resources</PlanFeature>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Comparison */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] bg-clip-text text-transparent">
              Compare All Features
            </h2>
            <p className="text-[#64748b] text-lg">See what's included in each plan</p>
          </div>

          <div className="overflow-x-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-[#8b5cf6]/10 to-[#7c3aed]/10 border-b border-white/20">
                    <th className="text-left p-6 font-bold text-[#1e293b]">Feature</th>
                    <th className="p-6 text-center font-bold text-[#1e293b]">Basic</th>
                    <th className="p-6 text-center font-bold bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white">Premium</th>
                    <th className="p-6 text-center font-bold text-[#1e293b]">Family</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10 hover:bg-white/50 transition-colors">
                    <td className="p-6 font-medium">Number of courses</td>
                    <td className="p-6 text-center">10</td>
                    <td className="p-6 text-center bg-gradient-to-r from-[#8b5cf6]/10 to-[#7c3aed]/10 font-bold text-[#8b5cf6]">50+</td>
                    <td className="p-6 text-center">All</td>
                  </tr>
                  <tr className="border-b border-white/10 hover:bg-white/50 transition-colors">
                    <td className="p-6 font-medium">Child profiles</td>
                    <td className="p-6 text-center">1</td>
                    <td className="p-6 text-center bg-gradient-to-r from-[#8b5cf6]/10 to-[#7c3aed]/10 font-bold text-[#8b5cf6]">3</td>
                    <td className="p-6 text-center">5</td>
                  </tr>
                  <tr className="border-b border-white/10 hover:bg-white/50 transition-colors">
                    <td className="p-6 font-medium">Progress tracking</td>
                    <td className="p-6 text-center">Basic</td>
                    <td className="p-6 text-center bg-gradient-to-r from-[#8b5cf6]/10 to-[#7c3aed]/10 font-bold text-[#8b5cf6]">Advanced</td>
                    <td className="p-6 text-center">Advanced</td>
                  </tr>
                  <tr className="border-b border-white/10 hover:bg-white/50 transition-colors">
                    <td className="p-6 font-medium">Downloadable resources</td>
                    <td className="p-6 text-center">
                      <X className="h-6 w-6 text-[#ef4444] mx-auto" />
                    </td>
                    <td className="p-6 text-center bg-gradient-to-r from-[#8b5cf6]/10 to-[#7c3aed]/10">
                      <CheckCircle className="h-6 w-6 text-[#8b5cf6] mx-auto" />
                    </td>
                    <td className="p-6 text-center">
                      <CheckCircle className="h-6 w-6 text-[#10b981] mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-white/10 hover:bg-white/50 transition-colors">
                    <td className="p-6 font-medium">Interactive activities</td>
                    <td className="p-6 text-center">Limited</td>
                    <td className="p-6 text-center bg-gradient-to-r from-[#8b5cf6]/10 to-[#7c3aed]/10 font-bold text-[#8b5cf6]">Full access</td>
                    <td className="p-6 text-center">Full access</td>
                  </tr>
                  <tr className="border-b border-white/10 hover:bg-white/50 transition-colors">
                    <td className="p-6 font-medium">Parent dashboard</td>
                    <td className="p-6 text-center">Basic</td>
                    <td className="p-6 text-center bg-gradient-to-r from-[#8b5cf6]/10 to-[#7c3aed]/10 font-bold text-[#8b5cf6]">Advanced</td>
                    <td className="p-6 text-center">Advanced</td>
                  </tr>
                  <tr className="border-b border-white/10 hover:bg-white/50 transition-colors">
                    <td className="p-6 font-medium">Customer support</td>
                    <td className="p-6 text-center">Email</td>
                    <td className="p-6 text-center bg-gradient-to-r from-[#8b5cf6]/10 to-[#7c3aed]/10 font-bold text-[#8b5cf6]">Priority email</td>
                    <td className="p-6 text-center">24/7 priority</td>
                  </tr>
                  <tr className="hover:bg-white/50 transition-colors">
                    <td className="p-6 font-medium">Certificates</td>
                    <td className="p-6 text-center">
                      <X className="h-6 w-6 text-[#ef4444] mx-auto" />
                    </td>
                    <td className="p-6 text-center bg-gradient-to-r from-[#8b5cf6]/10 to-[#7c3aed]/10">
                      <CheckCircle className="h-6 w-6 text-[#8b5cf6] mx-auto" />
                    </td>
                    <td className="p-6 text-center">
                      <CheckCircle className="h-6 w-6 text-[#10b981] mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-[#64748b] text-lg">Everything you need to know about our plans</p>
          </div>

          <div className="grid gap-6">
            {[
              {
                question: "Can I switch plans later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the start of your next billing cycle.",
                icon: <Zap className="h-6 w-6" />
              },
              {
                question: "Is there a free trial?",
                answer: "Yes, we offer a 7-day free trial for all new users. You can explore our platform and see which plan works best for your family.",
                icon: <Sparkles className="h-6 w-6" />
              },
              {
                question: "How do child profiles work?",
                answer: "Each child profile allows you to track progress separately. You can customize learning paths and monitor achievements for each child individually.",
                icon: <Heart className="h-6 w-6" />
              },
              {
                question: "Can I cancel my subscription?",
                answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your current billing period.",
                icon: <Shield className="h-6 w-6" />
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely.",
                icon: <CheckCircle className="h-6 w-6" />
              }
            ].map((faq, index) => (
              <Card key={index} className="border-none shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] rounded-xl text-white flex-shrink-0">
                      {faq.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-[#1e293b]">{faq.question}</h3>
                      <p className="text-[#64748b] leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
          <div className="relative bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] rounded-3xl p-12 text-white text-center shadow-2xl">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Sparkles className="h-12 w-12 text-white" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to start your child's learning journey?
              </h2>
              <p className="mb-8 text-white/90 text-lg leading-relaxed">
                Join thousands of parents who have enhanced their children's education with our interactive learning platform. Start your free trial today!
              </p>
              <Button className="bg-white text-[#8b5cf6] hover:bg-white/90 font-bold py-4 px-8 text-lg shadow-xl transform hover:scale-105 transition-all duration-300">
                Get Started Today
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function PlanFeature({ children, included = false, icon }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`flex-shrink-0 ${included ? 'text-current' : 'text-[#64748b]'}`}>
        {icon}
      </div>
      <span className={`${included ? 'text-[#1e293b] font-medium' : 'text-[#64748b]'}`}>
        {children}
      </span>
    </div>
  );
}