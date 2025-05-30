'use client'

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import HomeContent from "@/components/HomeContent"
import CoursesContent from "@/components/CoursesContent"
import FeaturesContent from "@/components/FeaturesContent"
import PremiumContent from "@/components/PremiumContent"
import AboutContent from "@/components/AboutContent"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eafff4] via-white to-[#f0f9ff]">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <AnimatePresence mode="wait">
        {activeTab === 'home' && <HomeContent key="home" />}
        {activeTab === 'courses' && <CoursesContent key="courses" />}
        {activeTab === 'features' && <FeaturesContent key="features" />}
        {activeTab === 'premium' && <PremiumContent key="premium" />}
        {activeTab === 'about' && <AboutContent key="about" />}
      </AnimatePresence>
      
      <Footer />
    </div>
  )
}