
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BarChart, Clock } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useMemo } from "react";

const EvaluationQuestionsOverview = () => {
  const { userRole, department } = useUser();
  
  // Calculate statistics based on user role
  const stats = useMemo(() => {
    // Mock data for overview statistics - in a real app, this would come from an API
    if (userRole === 'admin') {
      return {
        totalQuestionSets: 45,
        activeSets: 15,
        totalResponses: 2450,
        description: 'Across all departments'
      };
    } else if (userRole === 'department_head') {
      return {
        totalQuestionSets: 12,
        activeSets: 4,
        totalResponses: 620,
        description: `For ${department} department`
      };
    }
    
    // Default fallback (should not happen with proper routing)
    return {
      totalQuestionSets: 0,
      activeSets: 0,
      totalResponses: 0,
      description: ''
    };
  }, [userRole, department]);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Question Sets</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalQuestionSets}</div>
          <p className="text-xs text-muted-foreground">
            {stats.description}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active This Semester</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeSets}</div>
          <p className="text-xs text-muted-foreground">Question sets in use</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalResponses}</div>
          <p className="text-xs text-muted-foreground">All time responses</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EvaluationQuestionsOverview;
