import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Calendar, Clock, TrendingUp } from "lucide-react";
import Sidebar from "@/components/sidebar";

export default function Analytics() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">
      {/* Sidebar */}
      <Sidebar activePage="analytics" />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#1e1e1e]">Analytics</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              This Week
            </Button>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Learning Hours"
            value="48"
            change="+12%"
            icon={<Clock className="h-5 w-5 text-[#10b981]" />}
            bgColor="bg-[#ebfdf4]"
          />
          <StatCard
            title="Courses Completed"
            value="12"
            change="+3"
            icon={<BookOpen className="h-5 w-5 text-[#8b5cf6]" />}
            bgColor="bg-[#ede9fe]"
          />
          <StatCard
            title="Average Score"
            value="85%"
            change="+5%"
            icon={<TrendingUp className="h-5 w-5 text-[#0ea5e9]" />}
            bgColor="bg-[#e0f2fe]"
          />
          <StatCard
            title="Learning Streak"
            value="7 days"
            change="+2"
            icon={<Calendar className="h-5 w-5 text-[#f59e0b]" />}
            bgColor="bg-[#fff7ed]"
          />
        </div>

        <Tabs defaultValue="progress" className="mb-8">
          <TabsList className="bg-white">
            <TabsTrigger value="progress">Learning Progress</TabsTrigger>
            <TabsTrigger value="time">Time Spent</TabsTrigger>
            <TabsTrigger value="scores">Test Scores</TabsTrigger>
          </TabsList>

          <TabsContent value="progress" className="mt-6">
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  Weekly Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <div className="flex h-64 items-end gap-2 pt-6">
                    {weeklyData.map((day, i) => (
                      <div
                        key={i}
                        className="relative flex h-full w-full flex-col items-center"
                      >
                        <div
                          className="absolute bottom-0 w-full max-w-12 rounded-t bg-[#10b981]"
                          style={{ height: `${day.progress}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    {weeklyData.map((day, i) => (
                      <div key={i} className="text-xs text-[#6b7280]">
                        {day.day}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="time" className="mt-6">
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Time Spent by Subject</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeData.map((subject, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          {subject.name}
                        </span>
                        <span className="text-sm text-[#6b7280]">
                          {subject.hours} hours
                        </span>
                      </div>
                      <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                        <div
                          className={`h-full ${subject.color}`}
                          style={{ width: `${(subject.hours / 20) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scores" className="mt-6">
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Test Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scoreData.map((test, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#f9fafb] mr-4">
                        {getScoreIcon(test.score)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{test.name}</span>
                          <span
                            className={`font-medium ${getScoreColor(
                              test.score
                            )}`}
                          >
                            {test.score}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getScoreBarColor(test.score)}`}
                            style={{ width: `${test.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Learning Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityData.map((activity, i) => (
                  <div key={i} className="flex items-start">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.bgColor} mr-3`}
                    >
                      {activity.icon}
                    </div>
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-[#6b7280]">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Recommended Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendationData.map((rec, i) => (
                  <div key={i} className="flex items-start">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${rec.bgColor} mr-3`}
                    >
                      {rec.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{rec.title}</p>
                      <p className="text-sm text-[#6b7280] mb-2">
                        {rec.description}
                      </p>
                      <Button size="sm" className={rec.buttonColor}>
                        {rec.buttonText}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon, bgColor,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  bgColor: string;
}) {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#6b7280]">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <p className="text-xs text-[#10b981] mt-1">{change} this week</p>
          </div>
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${bgColor}`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getScoreIcon(score: number) {
  if (score >= 90) {
    return <span className="text-xl">🎉</span>;
  } else if (score >= 70) {
    return <span className="text-xl">👍</span>;
  } else {
    return <span className="text-xl">🔄</span>;
  }
}

function getScoreColor(score: number) {
  if (score >= 90) {
    return "text-[#10b981]";
  } else if (score >= 70) {
    return "text-[#f59e0b]";
  } else {
    return "text-[#ef4444]";
  }
}

function getScoreBarColor(score: number) {
  if (score >= 90) {
    return "bg-[#10b981]";
  } else if (score >= 70) {
    return "bg-[#f59e0b]";
  } else {
    return "bg-[#ef4444]";
  }
}

const weeklyData = [
  { day: "Mon", progress: 45 },
  { day: "Tue", progress: 60 },
  { day: "Wed", progress: 30 },
  { day: "Thu", progress: 70 },
  { day: "Fri", progress: 85 },
  { day: "Sat", progress: 50 },
  { day: "Sun", progress: 20 },
];

const timeData = [
  { name: "Mathematics", hours: 12, color: "bg-[#10b981]" },
  { name: "Science", hours: 8, color: "bg-[#8b5cf6]" },
  { name: "Language", hours: 15, color: "bg-[#0ea5e9]" },
  { name: "Art", hours: 5, color: "bg-[#f59e0b]" },
  { name: "Music", hours: 3, color: "bg-[#ec4899]" },
];

const scoreData = [
  { name: "Mathematics Quiz", score: 95 },
  { name: "Science Test", score: 85 },
  { name: "English Vocabulary", score: 75 },
  { name: "Geography Quiz", score: 65 },
];

const activityData = [
  {
    title: "Completed Mathematics Lesson 5",
    time: "Today, 10:30 AM",
    bgColor: "bg-[#ebfdf4]",
    icon: <BookOpen className="h-5 w-5 text-[#10b981]" />,
  },
  {
    title: "Scored 95% on Science Quiz",
    time: "Yesterday, 3:15 PM",
    bgColor: "bg-[#ede9fe]",
    icon: <TrendingUp className="h-5 w-5 text-[#8b5cf6]" />,
  },
  {
    title: "Spent 2 hours on English",
    time: "Yesterday, 1:20 PM",
    bgColor: "bg-[#e0f2fe]",
    icon: <Clock className="h-5 w-5 text-[#0ea5e9]" />,
  },
  {
    title: "Started Art & Craft course",
    time: "2 days ago",
    bgColor: "bg-[#fff7ed]",
    icon: <BookOpen className="h-5 w-5 text-[#f59e0b]" />,
  },
];

const recommendationData = [
  {
    title: "Complete Mathematics Course",
    description: "You're 65% through. Keep going!",
    bgColor: "bg-[#ebfdf4]",
    icon: <BookOpen className="h-5 w-5 text-[#10b981]" />,
    buttonText: "Continue",
    buttonColor: "bg-[#10b981] hover:bg-[#059669]",
  },
  {
    title: "Try a New Science Experiment",
    description: "Based on your interests",
    bgColor: "bg-[#ede9fe]",
    icon: <BookOpen className="h-5 w-5 text-[#8b5cf6]" />,
    buttonText: "Explore",
    buttonColor: "bg-[#8b5cf6] hover:bg-[#7c3aed]",
  },
  {
    title: "Practice English Vocabulary",
    description: "Improve your recent test score",
    bgColor: "bg-[#e0f2fe]",
    icon: <BookOpen className="h-5 w-5 text-[#0ea5e9]" />,
    buttonText: "Practice",
    buttonColor: "bg-[#0ea5e9] hover:bg-[#0284c7]",
  },
];
