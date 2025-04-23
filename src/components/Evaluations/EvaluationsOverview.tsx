
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockEvaluations } from "@/utils/mockData";
import { useUser } from "@/contexts/UserContext";

const EvaluationsOverview = () => {
  const { userRole, department } = useUser();
  
  // Filter evaluations based on user role and department
  const filteredEvals = userRole === 'admin'
    ? mockEvaluations
    : mockEvaluations.filter(eval => eval.department === department);
  
  const totalEvals = filteredEvals.length;
  
  // Calculate overall average rating
  const overallRatingSum = filteredEvals.reduce((sum, eval_) => sum + eval_.ratings.overall, 0);
  const overallAverageRating = totalEvals > 0 ? (overallRatingSum / totalEvals).toFixed(1) : '0.0';
  
  // Calculate category averages
  const categories = ['content', 'delivery', 'assessment', 'support'] as const;
  const categoryAverages = categories.reduce((acc, category) => {
    const sum = filteredEvals.reduce((sum, eval_) => sum + eval_.ratings[category], 0);
    acc[category] = totalEvals > 0 ? (sum / totalEvals).toFixed(1) : '0.0';
    return acc;
  }, {} as Record<string, string>);
  
  // Get positive sentiment percentage
  const positiveSentiment = filteredEvals.filter(eval_ => eval_.sentimentScore > 0).length;
  const positiveSentimentPercentage = totalEvals > 0 
    ? Math.round((positiveSentiment / totalEvals) * 100) 
    : 0;

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Evaluations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalEvals}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {userRole === 'admin' ? 'Across all departments' : `In ${department} department`}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Overall Average Rating
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{overallAverageRating}/5.0</div>
          <p className="text-xs text-muted-foreground mt-1">
            {positiveSentimentPercentage}% positive sentiment
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Rating Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Content Quality:</span>
              <span className="font-medium">{categoryAverages.content}/5.0</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Method:</span>
              <span className="font-medium">{categoryAverages.delivery}/5.0</span>
            </div>
            <div className="flex justify-between">
              <span>Assessment Fairness:</span>
              <span className="font-medium">{categoryAverages.assessment}/5.0</span>
            </div>
            <div className="flex justify-between">
              <span>Support Provided:</span>
              <span className="font-medium">{categoryAverages.support}/5.0</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EvaluationsOverview;
