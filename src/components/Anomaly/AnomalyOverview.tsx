
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockEvaluations } from "@/utils/mockData";
import { useUser } from "@/contexts/UserContext";

const AnomalyOverview = () => {
  const { userRole, department } = useUser();
  
  // Filter evaluations based on user role and department
  const filteredEvaluations = userRole === 'admin'
    ? mockEvaluations
    : mockEvaluations.filter(evaluation => evaluation.department === department);
  
  const totalEvaluations = filteredEvaluations.length;
  const anomaliesCount = filteredEvaluations.filter(evaluation => evaluation.isAnomaly).length;
  const anomalyPercentage = totalEvaluations > 0 
    ? Math.round((anomaliesCount / totalEvaluations) * 100) 
    : 0;
  
  // Calculate department distribution of anomalies
  const departmentAnomalies = mockEvaluations
    .filter(evaluation => evaluation.isAnomaly)
    .reduce((acc, evaluation) => {
      acc[evaluation.department] = (acc[evaluation.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Anomalies Detected
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{anomaliesCount}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {anomalyPercentage}% of all evaluations
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Anomaly Detection Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Algorithm:</span> DBSCAN Clustering
            </p>
            <p className="text-sm">
              <span className="font-medium">Features:</span> Rating pattern, sentiment score
            </p>
            <p className="text-sm">
              <span className="font-medium">Epsilon:</span> 0.5
            </p>
            <p className="text-sm">
              <span className="font-medium">Min Points:</span> 3
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Department Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(departmentAnomalies).map(([dept, count]) => (
              <div key={dept} className="flex justify-between items-center text-sm">
                <span>{dept}</span>
                <span className="font-medium">{count} anomalies</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnomalyOverview;
