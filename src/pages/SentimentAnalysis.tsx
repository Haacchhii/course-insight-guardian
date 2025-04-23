
import { useEffect } from "react";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import SentimentOverview from "@/components/Sentiment/SentimentOverview";
import SentimentTrends from "@/components/Sentiment/SentimentTrends";
import SentimentByDepartment from "@/components/Sentiment/SentimentByDepartment";
import { useUser } from "@/contexts/UserContext";

const SentimentAnalysis = () => {
  const { userRole, department } = useUser();

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
            <div>
              <h1 className="text-2xl font-bold">Sentiment Analysis Dashboard</h1>
              <p className="text-muted-foreground">
                {userRole === 'admin' 
                  ? 'Sentiment analysis across all departments' 
                  : `Sentiment analysis for ${department} department`}
              </p>
            </div>
            
            <SentimentOverview />
            
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <SentimentTrends />
              <SentimentByDepartment />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SentimentAnalysis;
