
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockInstructors } from "@/utils/mockData";
import { useUser } from "@/contexts/UserContext";

const InstructorsOverview = () => {
  const { userRole, department } = useUser();
  
  // Filter instructors based on user role and department
  const filteredInstructors = userRole === 'admin'
    ? mockInstructors
    : mockInstructors.filter(instructor => instructor.department === department);
  
  const totalInstructors = filteredInstructors.length;
  
  // Calculate average instructor rating
  const totalRating = filteredInstructors.reduce((sum, instructor) => sum + instructor.averageRating, 0);
  const averageRating = totalInstructors > 0 ? (totalRating / totalInstructors).toFixed(1) : '0.0';
  
  // Find top performers (rating >= 4.5)
  const topPerformers = filteredInstructors.filter(instructor => instructor.averageRating >= 4.5).length;
  
  // Find instructors needing improvement (rating < 2.5)
  const needsImprovement = filteredInstructors.filter(instructor => instructor.averageRating < 2.5).length;

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Instructors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalInstructors}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {userRole === 'admin' ? 'Across all departments' : `In ${department} department`}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Average Rating
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageRating}/5.0</div>
          <p className="text-xs text-muted-foreground mt-1">
            Overall instructor performance
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-green-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-green-700">
            Top Performers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-700">{topPerformers}</div>
          <p className="text-xs text-green-600 mt-1">
            Instructors rated 4.5 or higher
          </p>
        </CardContent>
      </Card>
      
      <Card className={needsImprovement > 0 ? "bg-red-50" : ""}>
        <CardHeader className="pb-2">
          <CardTitle className={`text-sm font-medium ${needsImprovement > 0 ? "text-red-700" : "text-muted-foreground"}`}>
            Needs Improvement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${needsImprovement > 0 ? "text-red-700" : ""}`}>
            {needsImprovement}
          </div>
          <p className={`text-xs mt-1 ${needsImprovement > 0 ? "text-red-600" : "text-muted-foreground"}`}>
            Instructors rated below 2.5
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorsOverview;
