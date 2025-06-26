"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  Calendar,
  Clock,
  Download,
  LineChart,
  PieChart,
  TrendingUp,
  Award,
  BookOpen,
  Target,
  Star,
} from "lucide-react";

export default function ParentAnalytics() {
  const [selectedChild, setSelectedChild] = useState(children[0]);
  const [timeRange, setTimeRange] = useState("week");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Learning Analytics
          </h1>
          <p className="text-gray-600">
            Track your children's learning progress and performance
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="quarter">Last 3 months</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Select Child</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {children.map((child) => (
                <motion.div
                  key={child.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    selectedChild.id === child.id
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedChild(child)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Image
                        src={child.avatar}
                        alt={child.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {child.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {child.age} years • {child.grade}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-none shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">
                    Total Learning Time
                  </p>
                  <p className="text-3xl font-bold">
                    {selectedChild.stats.totalTime}h
                  </p>
                  <p className="text-blue-100 text-sm mt-1">
                    +2.5h from last week
                  </p>
                </div>
                <Clock className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">
                    Completed Lessons
                  </p>
                  <p className="text-3xl font-bold">
                    {selectedChild.stats.completedLessons}
                  </p>
                  <p className="text-green-100 text-sm mt-1">
                    +5 from last week
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">
                    Average Score
                  </p>
                  <p className="text-3xl font-bold">
                    {selectedChild.stats.averageScore}%
                  </p>
                  <p className="text-purple-100 text-sm mt-1">
                    +3% from last week
                  </p>
                </div>
                <Target className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">
                    Achievements
                  </p>
                  <p className="text-3xl font-bold">
                    {selectedChild.stats.achievements}
                  </p>
                  <p className="text-orange-100 text-sm mt-1">
                    +2 from last week
                  </p>
                </div>
                <Award className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-white mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="subjects" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Subjects
            </TabsTrigger>
            <TabsTrigger value="time" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Time Spent
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="flex items-center gap-2"
            >
              <Award className="h-4 w-4" />
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">
                    Weekly Progress
                  </CardTitle>
                  <LineChart className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="h-[300px] flex items-center justify-center">
                    <p className="text-gray-500">
                      Chart visualization would go here
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">
                    Subject Performance
                  </CardTitle>
                  <PieChart className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    {subjects.map((subject) => (
                      <div key={subject.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-3 h-3 rounded-full ${subject.color}`}
                            ></div>
                            <span className="font-medium">{subject.name}</span>
                          </div>
                          <span className="text-sm font-medium">
                            {subject.score}%
                          </span>
                        </div>
                        <Progress value={subject.score || 0} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="subjects">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Subject Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {subjects.map((subject) => (
                    <div
                      key={subject.name}
                      className="p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${subject.bgColor}`}
                          >
                            {subject.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {subject.name}
                            </h3>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span className="text-sm text-gray-600">
                                {subject.score}% mastery
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-gray-900">
                            {subject.completed}/{subject.total}
                          </p>
                          <p className="text-sm text-gray-600">
                            lessons completed
                          </p>
                        </div>
                      </div>
                      <div className="relative">
                        <Progress
                          value={
                            subject.total > 0
                              ? (subject.completed / subject.total) * 100
                              : 0
                          }
                          className="h-3 bg-gray-200"
                        />
                      </div>
                      <div className="mt-3 flex justify-between items-center text-sm text-gray-600">
                        <span>Last activity: {subject.lastActivity}</span>
                        <span>
                          {Math.round(
                            (subject.completed / subject.total) * 100
                          )}
                          % complete
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="time">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">
                    Daily Learning Time
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="h-[300px] flex items-center justify-center">
                    <p className="text-gray-500">
                      Daily time chart would go here
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">
                    Time Distribution by Subject
                  </CardTitle>
                  <Clock className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    {subjects.map((subject) => (
                      <div
                        key={subject.name}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${subject.bgColor}`}
                          >
                            {subject.icon}
                          </div>
                          <span className="font-medium">{subject.name}</span>
                        </div>
                        <span className="font-medium">
                          {subject.timeSpent}h
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Achievements & Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.name}
                      className="bg-white border rounded-xl p-4 text-center"
                    >
                      <div
                        className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${achievement.bgColor}`}
                      >
                        {achievement.icon}
                      </div>
                      <h3 className="font-semibold mt-3">{achievement.name}</h3>
                      <p className="text-sm text-gray-600">
                        {achievement.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Earned: {achievement.earnedDate}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}

const children = [
  {
    id: 1,
    name: "Alex Johnson",
    age: 8,
    grade: "3rd",
    avatar: "/placeholder.svg?height=48&width=48",
    stats: {
      totalTime: 12,
      completedLessons: 45,
      averageScore: 87,
      achievements: 8,
    },
  },
  {
    id: 2,
    name: "Emma Johnson",
    age: 6,
    grade: "1st",
    avatar: "/placeholder.svg?height=48&width=48",
    stats: {
      totalTime: 8,
      completedLessons: 32,
      averageScore: 92,
      achievements: 5,
    },
  },
  {
    id: 3,
    name: "Noah Johnson",
    age: 5,
    grade: "Kindergarten",
    avatar: "/placeholder.svg?height=48&width=48",
    stats: {
      totalTime: 6,
      completedLessons: 18,
      averageScore: 85,
      achievements: 3,
    },
  },
];

const subjects = [
  {
    name: "Mathematics",
    score: 87,
    completed: 8,
    total: 12,
    lastActivity: "Today",
    color: "bg-blue-500",
    bgColor: "bg-blue-100",
    icon: <Target className="h-5 w-5 text-blue-600" />,
    timeSpent: 4.5,
  },
  {
    name: "English",
    score: 92,
    completed: 12,
    total: 15,
    lastActivity: "Yesterday",
    color: "bg-green-500",
    bgColor: "bg-green-100",
    icon: <BookOpen className="h-5 w-5 text-green-600" />,
    timeSpent: 3.2,
  },
  {
    name: "Science",
    score: 78,
    completed: 6,
    total: 10,
    lastActivity: "2 days ago",
    color: "bg-purple-500",
    bgColor: "bg-purple-100",
    icon: <TrendingUp className="h-5 w-5 text-purple-600" />,
    timeSpent: 2.8,
  },
  {
    name: "Art",
    score: 95,
    completed: 8,
    total: 8,
    lastActivity: "Last week",
    color: "bg-orange-500",
    bgColor: "bg-orange-100",
    icon: <Star className="h-5 w-5 text-orange-600" />,
    timeSpent: 1.5,
  },
];

const achievements = [
  {
    name: "Math Master",
    description: "Completed all mathematics lessons with 90%+ score",
    earnedDate: "June 15, 2023",
    bgColor: "bg-blue-100",
    icon: <Award className="h-8 w-8 text-blue-600" />,
  },
  {
    name: "Reading Star",
    description: "Read 20 books in the digital library",
    earnedDate: "May 22, 2023",
    bgColor: "bg-green-100",
    icon: <BookOpen className="h-8 w-8 text-green-600" />,
  },
  {
    name: "Science Explorer",
    description: "Completed all science experiments",
    earnedDate: "July 3, 2023",
    bgColor: "bg-purple-100",
    icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
  },
  {
    name: "Consistent Learner",
    description: "Logged in for 30 consecutive days",
    earnedDate: "June 30, 2023",
    bgColor: "bg-orange-100",
    icon: <Calendar className="h-8 w-8 text-orange-600" />,
  },
];
