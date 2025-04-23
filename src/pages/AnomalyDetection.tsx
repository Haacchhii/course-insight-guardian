
import { useEffect } from "react";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import AnomalyOverview from "@/components/Anomaly/AnomalyOverview";
import AnomalyList from "@/components/Anomaly/AnomalyList";
import { useUser } from "@/contexts/UserContext";

const AnomalyDetectionPage = () => {
  const { userRole, department } = useUser();

  useEffect(() => {
    document.title = "Anomaly Detection | Course Insight Guardian";
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Anomaly Detection</h1>
              <p className="text-muted-foreground">
                {userRole === 'admin' 
                  ? 'Detecting unusual patterns in course evaluations across all departments' 
                  : `Detecting unusual patterns in course evaluations for ${department} department`}
              </p>
            </div>
            
            <AnomalyOverview />
            <AnomalyList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnomalyDetectionPage;
