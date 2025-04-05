import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, X } from "lucide-react";
import ParentHeader from "@/components/parent-header";

export default function PremiumPlans() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <ParentHeader />

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Choose the Perfect Plan for Your Child
          </h1>
          <p className="text-[#4b5563] text-lg">
            Unlock premium educational content and features to enhance your
            child's learning experience.
          </p>
        </div>

        {/* Pricing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-1 inline-flex">
            <Button className="rounded-full bg-[#8b5cf6]">Monthly</Button>
            <Button variant="ghost" className="rounded-full">
              Yearly (Save 20%)
            </Button>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Basic Plan */}
          <Card className="border-none shadow-sm relative overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Basic</CardTitle>
              <p className="text-[#6b7280]">
                Get started with essential features
              </p>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-3xl font-bold">$9.99</span>
                <span className="text-[#6b7280]">/month</span>
              </div>

              <Button className="w-full mb-6">Get Started</Button>

              <div className="space-y-3">
                <PlanFeature included>Access to 10 basic courses</PlanFeature>
                <PlanFeature included>Basic progress tracking</PlanFeature>
                <PlanFeature included>1 child profile</PlanFeature>
                <PlanFeature included>Email support</PlanFeature>
                <PlanFeature>Premium courses</PlanFeature>
                <PlanFeature>Advanced analytics</PlanFeature>
                <PlanFeature>Multiple child profiles</PlanFeature>
                <PlanFeature>Downloadable resources</PlanFeature>
              </div>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="border-none shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#8b5cf6] text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
              Most Popular
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Premium</CardTitle>
              <p className="text-[#6b7280]">Perfect for active learners</p>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-3xl font-bold">$19.99</span>
                <span className="text-[#6b7280]">/month</span>
              </div>

              <Button className="w-full mb-6 bg-[#8b5cf6] hover:bg-[#7c3aed]">
                Get Started
              </Button>

              <div className="space-y-3">
                <PlanFeature included>Access to all basic courses</PlanFeature>
                <PlanFeature included>Advanced progress tracking</PlanFeature>
                <PlanFeature included>3 child profiles</PlanFeature>
                <PlanFeature included>Priority email support</PlanFeature>
                <PlanFeature included>Premium courses</PlanFeature>
                <PlanFeature included>Advanced analytics</PlanFeature>
                <PlanFeature>Multiple child profiles (up to 5)</PlanFeature>
                <PlanFeature included>Downloadable resources</PlanFeature>
              </div>
            </CardContent>
          </Card>

          {/* Family Plan */}
          <Card className="border-none shadow-sm relative overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Family</CardTitle>
              <p className="text-[#6b7280]">Best value for families</p>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-3xl font-bold">$29.99</span>
                <span className="text-[#6b7280]">/month</span>
              </div>

              <Button className="w-full mb-6">Get Started</Button>

              <div className="space-y-3">
                <PlanFeature included>Access to all courses</PlanFeature>
                <PlanFeature included>Advanced progress tracking</PlanFeature>
                <PlanFeature included>5 child profiles</PlanFeature>
                <PlanFeature included>24/7 priority support</PlanFeature>
                <PlanFeature included>Premium courses</PlanFeature>
                <PlanFeature included>Advanced analytics</PlanFeature>
                <PlanFeature included>
                  Multiple child profiles (up to 5)
                </PlanFeature>
                <PlanFeature included>Downloadable resources</PlanFeature>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Comparison */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            Compare All Features
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Feature</th>
                  <th className="p-4 text-center">Basic</th>
                  <th className="p-4 text-center bg-[#f0e5fc]">Premium</th>
                  <th className="p-4 text-center">Family</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">Number of courses</td>
                  <td className="p-4 text-center">10</td>
                  <td className="p-4 text-center bg-[#f0e5fc]">50+</td>
                  <td className="p-4 text-center">All</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Child profiles</td>
                  <td className="p-4 text-center">1</td>
                  <td className="p-4 text-center bg-[#f0e5fc]">3</td>
                  <td className="p-4 text-center">5</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Progress tracking</td>
                  <td className="p-4 text-center">Basic</td>
                  <td className="p-4 text-center bg-[#f0e5fc]">Advanced</td>
                  <td className="p-4 text-center">Advanced</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Downloadable resources</td>
                  <td className="p-4 text-center">
                    <X className="h-5 w-5 text-[#ef4444] mx-auto" />
                  </td>
                  <td className="p-4 text-center bg-[#f0e5fc]">
                    <CheckCircle className="h-5 w-5 text-[#8b5cf6] mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <CheckCircle className="h-5 w-5 text-[#10b981] mx-auto" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Interactive activities</td>
                  <td className="p-4 text-center">Limited</td>
                  <td className="p-4 text-center bg-[#f0e5fc]">Full access</td>
                  <td className="p-4 text-center">Full access</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Parent dashboard</td>
                  <td className="p-4 text-center">Basic</td>
                  <td className="p-4 text-center bg-[#f0e5fc]">Advanced</td>
                  <td className="p-4 text-center">Advanced</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Customer support</td>
                  <td className="p-4 text-center">Email</td>
                  <td className="p-4 text-center bg-[#f0e5fc]">
                    Priority email
                  </td>
                  <td className="p-4 text-center">24/7 priority</td>
                </tr>
                <tr>
                  <td className="p-4">Certificates</td>
                  <td className="p-4 text-center">
                    <X className="h-5 w-5 text-[#ef4444] mx-auto" />
                  </td>
                  <td className="p-4 text-center bg-[#f0e5fc]">
                    <CheckCircle className="h-5 w-5 text-[#8b5cf6] mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <CheckCircle className="h-5 w-5 text-[#10b981] mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Can I switch plans later?
              </h3>
              <p className="text-[#4b5563]">
                Yes, you can upgrade or downgrade your plan at any time. Changes
                will be applied at the start of your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Is there a free trial?
              </h3>
              <p className="text-[#4b5563]">
                Yes, we offer a 7-day free trial for all new users. You can
                explore our platform and see which plan works best for your
                family.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                How do child profiles work?
              </h3>
              <p className="text-[#4b5563]">
                Each child profile allows you to track progress separately. You
                can customize learning paths and monitor achievements for each
                child individually.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Can I cancel my subscription?
              </h3>
              <p className="text-[#4b5563]">
                Yes, you can cancel your subscription at any time. You'll
                continue to have access until the end of your current billing
                period.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-[#4b5563]">
                We accept all major credit cards, PayPal, and Apple Pay. All
                payments are processed securely.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to start your child's learning journey?
          </h2>
          <p className="mb-6 text-white/80 max-w-2xl mx-auto">
            Join thousands of parents who have enhanced their children's
            education with our interactive learning platform.
          </p>
          <Button className="bg-white text-[#8b5cf6] hover:bg-white/90">
            Get Started Today
          </Button>
        </div>
      </main>
    </div>
  );
}

function PlanFeature({ children, included = false }) {
  return (
    <div className="flex items-center">
      {included ? (
        <CheckCircle className="h-5 w-5 text-[#8b5cf6] mr-3 flex-shrink-0" />
      ) : (
        <X className="h-5 w-5 text-[#6b7280] mr-3 flex-shrink-0" />
      )}
      <span className={included ? "" : "text-[#6b7280]"}>{children}</span>
    </div>
  );
}
