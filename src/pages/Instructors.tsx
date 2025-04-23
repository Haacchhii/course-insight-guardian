
import { useEffect } from "react";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import InstructorsList from "@/components/Instructors/InstructorsList";
import InstructorsOverview from "@/components/Instructors/InstructorsOverview";
import { useUser } from "@/contexts/UserContext";

const InstructorsPage = () => {
  const { userRole, department } = useUser();

  useEffect(() => {
    document.title = "Instructors | Course Insight Guardian";
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Instructors Management</h1>
              <p className="text-muted-foreground">
                {userRole === 'admin' 
                  ? 'Manage and monitor all instructors across departments' 
                  : `Manage and monitor instructors in ${department} department`}
              </p>
            </div>
            
            <InstructorsOverview />
            <InstructorsList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default InstructorsPage;
