
import { useEffect } from "react";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import CoursesList from "@/components/Courses/CoursesList";
import CoursesOverview from "@/components/Courses/CoursesOverview";
import CourseManagement from "@/components/Courses/CourseManagement";
import { useUser } from "@/contexts/UserContext";

const CoursesPage = () => {
  const { userRole, department } = useUser();

  useEffect(() => {
    document.title = "Courses | Course Insight Guardian";
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Courses Management</h1>
              <p className="text-muted-foreground">
                {userRole === 'admin' 
                  ? 'Manage and monitor all courses across departments' 
                  : `Manage and monitor courses in ${department} department`}
              </p>
            </div>
            
            <CoursesOverview />
            <CourseManagement />
            <CoursesList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CoursesPage;
