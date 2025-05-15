
import { useState } from "react";
import { CalendarIcon, TimerIcon, Play } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StatCard from "@/components/dashboard/StatCard";
import ProgressChart from "@/components/dashboard/ProgressChart";

// Sample data for charts - will be connected to real user data later
const weeklyProgressData = [
  { date: "Mon", score: 65, accuracy: 70 },
  { date: "Tue", score: 68, accuracy: 75 },
  { date: "Wed", score: 75, accuracy: 78 },
  { date: "Thu", score: 72, accuracy: 76 },
  { date: "Fri", score: 80, accuracy: 82 },
  { date: "Sat", score: 85, accuracy: 85 },
  { date: "Sun", score: 88, accuracy: 87 }
];

const monthlyProgressData = [
  { date: "Week 1", score: 65 },
  { date: "Week 2", score: 70 },
  { date: "Week 3", score: 75 },
  { date: "Week 4", score: 82 },
];

// Sample practice sessions
const recentSessions = [
  {
    id: 1,
    date: "2025-05-14",
    duration: "25 mins",
    poses: 8,
    score: 85,
  },
  {
    id: 2,
    date: "2025-05-12",
    duration: "15 mins",
    poses: 5,
    score: 78,
  },
  {
    id: 3,
    date: "2025-05-10",
    duration: "30 mins",
    poses: 12,
    score: 82,
  },
];

const DashboardPage = () => {
  const [timeRange, setTimeRange] = useState("weekly");
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Your Progress</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Track your yoga journey and see how you're improving
              </p>
            </div>
            
            <Button className="mt-4 md:mt-0 bg-yoga-blue hover:bg-yoga-blue/90">
              <Play className="mr-2 h-4 w-4" />
              New Practice Session
            </Button>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard 
              title="Total Sessions" 
              value="24" 
              icon={<Play className="h-4 w-4" />} 
            />
            <StatCard 
              title="Practice Time" 
              value="12.5 hrs" 
              icon={<TimerIcon className="h-4 w-4" />}
              change={{ value: 15, isPositive: true }}
              description="vs. last month"
            />
            <StatCard 
              title="Avg. Score" 
              value="82%" 
              icon={<CalendarIcon className="h-4 w-4" />}
              change={{ value: 8, isPositive: true }}
              description="vs. last month"
            />
            <StatCard 
              title="Streak" 
              value="5 days" 
              icon={<CalendarIcon className="h-4 w-4" />}
            />
          </div>
          
          {/* Progress Charts */}
          <div className="mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Progress Overview</CardTitle>
                    <CardDescription>Track how your practice is improving over time</CardDescription>
                  </div>
                  <Tabs value={timeRange} onValueChange={setTimeRange} className="w-[260px]">
                    <TabsList className="grid grid-cols-2">
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                {timeRange === "weekly" ? (
                  <ProgressChart 
                    data={weeklyProgressData} 
                    title="Weekly Progress" 
                  />
                ) : (
                  <ProgressChart 
                    data={monthlyProgressData} 
                    title="Monthly Progress" 
                  />
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Sessions */}
          <div>
            <h2 className="text-xl font-bold mb-4">Recent Practice Sessions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentSessions.map((session) => (
                <Card key={session.id} className="card-hover">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</CardTitle>
                    <CardDescription>{session.duration} • {session.poses} poses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Session Score</p>
                        <p className="text-2xl font-bold text-yoga-blue">{session.score}%</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;
