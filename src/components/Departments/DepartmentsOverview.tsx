
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockDepartments, mockCourses, mockInstructors } from "@/utils/mockData";
import { useUser } from "@/contexts/UserContext";

const DepartmentsOverview = () => {
  const { userRole } = useUser();
  
  const totalDepartments = mockDepartments.length;
  const totalCourses = mockCourses.length;
  const totalInstructors = mockInstructors.length;
  
  // Calculate highest rated department
  const highestRatedDept = [...mockDepartments].sort((a, b) => b.averageRating - a.averageRating)[0];

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Departments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalDepartments}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Academic departments
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCourses}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Across all departments
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Instructors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalInstructors}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Across all departments
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-green-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-green-700">
            Highest Rated Department
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-700">{highestRatedDept.name}</div>
          <p className="text-xs text-green-600 mt-1">
            Average Rating: {highestRatedDept.averageRating.toFixed(1)}/5.0
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentsOverview;
