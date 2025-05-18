
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BarChart, Clock } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const EvaluationQuestionsOverview = () => {
  const { userRole, department } = useUser();

  // Mock data for overview statistics
  const totalQuestionSets = userRole === 'admin' ? 45 : 12;
  const activeSets = userRole === 'admin' ? 15 : 4;
  const totalResponses = userRole === 'admin' ? 2450 : 620;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Question Sets</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalQuestionSets}</div>
          <p className="text-xs text-muted-foreground">
            {userRole === 'admin' 
              ? 'Across all departments' 
              : `For ${department} department`}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active This Semester</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeSets}</div>
          <p className="text-xs text-muted-foreground">Question sets in use</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalResponses}</div>
          <p className="text-xs text-muted-foreground">All time responses</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EvaluationQuestionsOverview;
