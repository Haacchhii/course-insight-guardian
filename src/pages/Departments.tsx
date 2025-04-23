
import { useEffect } from "react";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import DepartmentsList from "@/components/Departments/DepartmentsList";
import DepartmentsOverview from "@/components/Departments/DepartmentsOverview";
import { useUser } from "@/contexts/UserContext";

const DepartmentsPage = () => {
  const { userRole } = useUser();
  
  // Only admins should access this page
  useEffect(() => {
    document.title = "Departments | Course Insight Guardian";
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Departments Management</h1>
              <p className="text-muted-foreground">
                {userRole === 'admin' 
                  ? 'Manage and monitor all academic departments' 
                  : 'View department information'}
              </p>
            </div>
            
            <DepartmentsOverview />
            <DepartmentsList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DepartmentsPage;
