
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCourses } from "@/utils/mockData";
import { useUser } from "@/contexts/UserContext";

const CoursesOverview = () => {
  const { userRole, department } = useUser();
  
  // Filter courses based on user role and department
  const filteredCourses = userRole === 'admin'
    ? mockCourses
    : mockCourses.filter(course => course.department === department);
  
  const totalCourses = filteredCourses.length;
  const activeCoursesCount = filteredCourses.filter(course => course.status === 'active').length;
  
  // Calculate average rating
  const totalRating = filteredCourses.reduce((sum, course) => sum + course.averageRating, 0);
  const averageRating = totalCourses > 0 ? (totalRating / totalCourses).toFixed(1) : '0.0';
  
  // Find courses with low ratings (below 2.5)
  const lowRatingCourses = filteredCourses.filter(course => course.averageRating < 2.5).length;

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCourses}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {activeCoursesCount} active courses
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
            Across all {totalCourses} courses
          </p>
        </CardContent>
      </Card>
      
      <Card className={lowRatingCourses > 0 ? "bg-red-50" : ""}>
        <CardHeader className="pb-2">
          <CardTitle className={`text-sm font-medium ${lowRatingCourses > 0 ? "text-red-700" : "text-muted-foreground"}`}>
            Low Rating Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${lowRatingCourses > 0 ? "text-red-700" : ""}`}>
            {lowRatingCourses}
          </div>
          <p className={`text-xs mt-1 ${lowRatingCourses > 0 ? "text-red-600" : "text-muted-foreground"}`}>
            Courses rated below 2.5
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Evaluations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {filteredCourses.reduce((sum, course) => sum + course.totalEvaluations, 0)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            From all {totalCourses} courses
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursesOverview;
