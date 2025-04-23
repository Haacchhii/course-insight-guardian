
import { useEffect } from "react";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import OverviewStats from "@/components/Dashboard/OverviewStats";
import SentimentChart from "@/components/Dashboard/SentimentChart";
import AnomalyDetection from "@/components/Dashboard/AnomalyDetection";
import FeedbackTable from "@/components/Dashboard/FeedbackTable";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard | Course Insight Guardian";
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Course Evaluation Dashboard</h1>
              <p className="text-muted-foreground">
                Insights and analytics for the College of Computing, Arts, and Sciences
              </p>
            </div>
            
            <OverviewStats />
            
            <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
              <SentimentChart />
              <AnomalyDetection />
            </div>
            
            <FeedbackTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
