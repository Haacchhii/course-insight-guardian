
import { useEffect } from "react";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import SentimentOverview from "@/components/Sentiment/SentimentOverview";
import SentimentByDepartment from "@/components/Sentiment/SentimentByDepartment";
import { useUser } from "@/contexts/UserContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { mockEvaluations } from "@/utils/mockData";

const SentimentAnalysis = () => {
  const { userRole, department } = useUser();
  const [semesterFilter, setSemesterFilter] = useState("all");

  // Get unique semesters for the filter
  const semesters = Array.from(new Set(mockEvaluations.map(
    evaluation => `${evaluation.semester} ${evaluation.year}`
  ))).sort((a, b) => {
    const yearA = parseInt(a.split(' ')[1]);
    const yearB = parseInt(b.split(' ')[1]);
    if (yearA !== yearB) return yearB - yearA;
    return a.includes('Second') ? -1 : 1;
  });

  useEffect(() => {
    document.title = "Sentiment Analysis | Course Insight Guardian";
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
              <div>
                <h1 className="text-2xl font-bold">Sentiment Analysis Dashboard</h1>
                <p className="text-muted-foreground">
                  {userRole === 'admin' 
                    ? 'Sentiment analysis across all departments' 
                    : `Sentiment analysis for ${department} department`}
                </p>
              </div>
              
              <Select value={semesterFilter} onValueChange={setSemesterFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Semesters</SelectItem>
                  {semesters.map(semester => (
                    <SelectItem key={semester} value={semester}>{semester}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <SentimentOverview semesterFilter={semesterFilter} />
            
            <div className="grid gap-4">
              <SentimentByDepartment semesterFilter={semesterFilter} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SentimentAnalysis;
