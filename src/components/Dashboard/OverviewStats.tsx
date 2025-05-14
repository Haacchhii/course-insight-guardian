
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { mockStats } from "@/utils/mockData";
import { useUser } from "@/contexts/UserContext";

const OverviewStats = () => {
  const { userRole, department } = useUser();
  
  // Adjust stats based on role (in a real app, this would fetch filtered data)
  const adjustedStats = {
    ...mockStats,
    // Reduce numbers for department heads to simulate filtered data
    ...(userRole === 'department_head' ? {
      totalEvaluations: Math.round(mockStats.totalEvaluations * 0.3),
      anomalyCount: Math.round(mockStats.anomalyCount * 0.25),
    } : {})
  };

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Evaluations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{adjustedStats.totalEvaluations}</div>
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
          <div className="text-2xl font-bold">{mockStats.averageRating.toFixed(1)} / 5.0</div>
          <Progress 
            value={mockStats.averageRating * 20} 
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
              <span className="font-medium">{mockStats.positivePercentage}%</span>
            </div>
            <Progress value={mockStats.positivePercentage} className="h-1 bg-gray-100" />
            
            <div className="flex justify-between text-xs">
              <span>Neutral</span>
              <span className="font-medium">{mockStats.neutralPercentage}%</span>
            </div>
            <Progress value={mockStats.neutralPercentage} className="h-1 bg-gray-100" />
            
            <div className="flex justify-between text-xs">
              <span>Negative</span>
              <span className="font-medium">{mockStats.negativePercentage}%</span>
            </div>
            <Progress value={mockStats.negativePercentage} className="h-1 bg-gray-100" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-red-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-red-700">
            Detected Anomalies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-700">{adjustedStats.anomalyCount}</div>
          <p className="text-xs text-red-600 mt-1">
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
