
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { mockStats, mockEvaluations } from "@/utils/mockData";
import { useUser } from "@/contexts/UserContext";

const OverviewStats = () => {
  const { userRole, department } = useUser();
  
  // Calculate department-specific stats for department heads
  const departmentStats = () => {
    if (userRole === 'department_head' && department) {
      // Filter evaluations for this department
      const departmentEvals = mockEvaluations.filter(eval_ => eval_.department === department);
      
      // Calculate total evaluations for this department
      const totalEvaluations = departmentEvals.length;
      
      // Calculate average rating
      const totalRating = departmentEvals.reduce((sum, eval_) => sum + eval_.ratings.overall, 0);
      const averageRating = totalEvaluations > 0 ? totalRating / totalEvaluations : 0;
      
      // Calculate sentiment percentages
      const positive = departmentEvals.filter(eval_ => eval_.sentimentScore > 0.2).length;
      const negative = departmentEvals.filter(eval_ => eval_.sentimentScore < -0.2).length;
      const neutral = totalEvaluations - positive - negative;
      
      const positivePercentage = totalEvaluations > 0 ? Math.round((positive / totalEvaluations) * 100) : 0;
      const negativePercentage = totalEvaluations > 0 ? Math.round((negative / totalEvaluations) * 100) : 0;
      const neutralPercentage = totalEvaluations > 0 ? Math.round((neutral / totalEvaluations) * 100) : 0;
      
      // Calculate anomalies
      const anomalyCount = departmentEvals.filter(eval_ => eval_.isAnomaly).length;
      
      return {
        totalEvaluations,
        averageRating,
        positivePercentage,
        neutralPercentage,
        negativePercentage,
        anomalyCount
      };
    }
    
    // Return the mock stats for admin users
    return mockStats;
  };
  
  // Get the appropriate stats based on user role
  const stats = departmentStats();

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Evaluations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalEvaluations}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {userRole === 'admin' 
              ? 'From all courses and departments' 
              : `From ${department} department courses`}
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
          <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)} / 5.0</div>
          <Progress 
            value={stats.averageRating * 20} 
            className="h-2 mt-2" 
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Sentiment Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Positive</span>
              <span className="font-medium">{stats.positivePercentage}%</span>
            </div>
            <Progress value={stats.positivePercentage} className="h-1 bg-gray-100" />
            
            <div className="flex justify-between text-xs">
              <span>Neutral</span>
              <span className="font-medium">{stats.neutralPercentage}%</span>
            </div>
            <Progress value={stats.neutralPercentage} className="h-1 bg-gray-100" />
            
            <div className="flex justify-between text-xs">
              <span>Negative</span>
              <span className="font-medium">{stats.negativePercentage}%</span>
            </div>
            <Progress value={stats.negativePercentage} className="h-1 bg-gray-100" />
          </div>
        </CardContent>
      </Card>
      
      <Card className={stats.anomalyCount > 0 ? "bg-red-50" : ""}>
        <CardHeader className="pb-2">
          <CardTitle className={`text-sm font-medium ${stats.anomalyCount > 0 ? "text-red-700" : "text-muted-foreground"}`}>
            Detected Anomalies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${stats.anomalyCount > 0 ? "text-red-700" : ""}`}>{stats.anomalyCount}</div>
          <p className={`text-xs mt-1 ${stats.anomalyCount > 0 ? "text-red-600" : "text-muted-foreground"}`}>
            {userRole === 'admin' 
              ? 'Requires attention across departments' 
              : `Requires attention in ${department} department`}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewStats;
