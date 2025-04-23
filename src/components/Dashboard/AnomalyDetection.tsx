
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockEvaluations } from "@/utils/mockData";

const AnomalyDetection = () => {
  const anomalies = mockEvaluations.filter(evaluation => evaluation.isAnomaly);

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Anomaly Detection</CardTitle>
        <CardDescription>
          Unusual feedback patterns detected by DBSCAN clustering
        </CardDescription>
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

export default AnomalyDetection;
