
import { useEffect } from "react";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import EvaluationsList from "@/components/Evaluations/EvaluationsList";
import EvaluationsOverview from "@/components/Evaluations/EvaluationsOverview";
import { useUser } from "@/contexts/UserContext";

const EvaluationsPage = () => {
  const { userRole, department } = useUser();

  useEffect(() => {
    document.title = "Evaluations | Course Insight Guardian";
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Course Evaluations</h1>
              <p className="text-muted-foreground">
                {userRole === 'admin' 
                  ? 'View and analyze all course evaluations' 
                  : `View and analyze evaluations for ${department} department`}
              </p>
            </div>
            
            <EvaluationsOverview />
            <EvaluationsList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default EvaluationsPage;
