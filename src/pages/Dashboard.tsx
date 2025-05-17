
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import OverviewStats from "@/components/Dashboard/OverviewStats";
import SentimentChart from "@/components/Dashboard/SentimentChart";
import AnomalyDetection from "@/components/Dashboard/AnomalyDetection";
import FeedbackTable from "@/components/Dashboard/FeedbackTable";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { userRole, isStudent } = useUser();
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Dashboard | Course Insight Guardian";
    
    // Redirect students to their evaluation page
    if (isStudent()) {
      navigate('/student-evaluation');
    }
  }, [isStudent, navigate]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold">Course Evaluation Dashboard</h1>
                <p className="text-muted-foreground">
                  {userRole === 'admin' 
                    ? 'Insights and analytics for the College of Computing, Arts, and Sciences'
                    : `Insights and analytics for the ${userRole === 'department_head' ? 'Department of' : ''} ${userRole}`}
                </p>
              </div>

              {userRole === 'department_head' && (
                <Link to="/evaluation-questions">
                  <Button className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Manage Evaluation Questions
                  </Button>
                </Link>
              )}
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
