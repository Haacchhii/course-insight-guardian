
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockEvaluations } from "@/utils/mockData";
import { useUser } from "@/contexts/UserContext";

const AnomalyList = () => {
  const { userRole, department } = useUser();
  const [semesterFilter, setSemesterFilter] = useState("all");
  
  // Get unique semesters for the filter
  const semesters = Array.from(new Set(mockEvaluations
    .filter(evaluation => evaluation.isAnomaly)
    .map(evaluation => `${evaluation.semester} ${evaluation.year}`)
  )).sort((a, b) => {
    const yearA = parseInt(a.split(' ')[1]);
    const yearB = parseInt(b.split(' ')[1]);
    // Sort by year (descending)
    if (yearA !== yearB) return yearB - yearA;
    // Then by semester (Second comes before First)
    return a.includes('Second') ? -1 : 1;
  });
  
  // Filter anomalies based on user role, department, and semester
  const anomalies = mockEvaluations.filter(evaluation => 
    evaluation.isAnomaly && 
    (userRole === 'admin' || evaluation.department === department) &&
    (semesterFilter === 'all' || (evaluation.semester + ' ' + evaluation.year) === semesterFilter)
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Detected Anomalies</CardTitle>
          <CardDescription>
            Unusual feedback patterns detected by DBSCAN clustering
          </CardDescription>
        </div>
        <Select value={semesterFilter} onValueChange={setSemesterFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Semesters</SelectItem>
            {semesters.map(semester => (
              <SelectItem key={semester} value={semester}>{semester}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {anomalies.length > 0 ? (
          <div className="space-y-4">
            {anomalies.map((anomaly) => (
              <div key={anomaly.id} className="rounded-lg border p-4 bg-red-50">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{anomaly.course}</div>
                  <Badge variant="destructive">Anomaly Detected</Badge>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Instructor: {anomaly.instructor}
                </div>
                <div className="text-sm mt-2 font-medium text-red-700">
                  Overall Rating: {anomaly.ratings.overall.toFixed(1)}/5.0
                </div>
                <div className="mt-2 text-sm">
                  <p className="italic">"{anomaly.comments}"</p>
                </div>
                <div className="mt-4 text-xs text-muted-foreground">
                  <span>Sentiment Score: {anomaly.sentimentScore.toFixed(2)}</span>
                  <span className="mx-2">•</span>
                  <span>{anomaly.department} Department</span>
                  <span className="mx-2">•</span>
                  <span>{anomaly.semester} Semester {anomaly.year}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-40 items-center justify-center text-center">
            <p className="text-muted-foreground">No anomalies detected in current evaluations.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnomalyList;
