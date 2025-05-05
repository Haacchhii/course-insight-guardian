
import { useMemo, useState } from "react";
import { mockEvaluations } from "@/utils/mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface CourseDetailModalProps {
  course: { id: string; code: string; name: string; department: string } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CourseDetailModal = ({ course, open, onOpenChange }: CourseDetailModalProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const evaluations = useMemo(() => {
    if (!course) return [];
    return mockEvaluations.filter(evaluation => evaluation.course.includes(course.code));
  }, [course]);
  
  const sentimentData = useMemo(() => {
    if (!course || evaluations.length === 0) return [];
    
    // Group evaluations by semester and year
    const semesterData: { name: string; positive: number; neutral: number; negative: number }[] = [];
    
    const semesters = {} as Record<string, typeof evaluations>;
    
    evaluations.forEach(evaluation => {
      const semesterKey = `${evaluation.semester} ${evaluation.year}`;
      if (!semesters[semesterKey]) {
        semesters[semesterKey] = [];
      }
      semesters[semesterKey].push(evaluation);
    });
    
    // Calculate sentiment for each semester
    Object.entries(semesters).forEach(([semesterKey, semesterEvaluations]) => {
      const totalEvals = semesterEvaluations.length;
      
      if (totalEvals === 0) return;
      
      const positive = semesterEvaluations.filter(e => e.ratings.overall >= 4).length;
      const neutral = semesterEvaluations.filter(e => e.ratings.overall >= 3 && e.ratings.overall < 4).length;
      const negative = semesterEvaluations.filter(e => e.ratings.overall < 3).length;
      
      semesterData.push({
        name: semesterKey,
        positive: (positive / totalEvals) * 100,
        neutral: (neutral / totalEvals) * 100,
        negative: (negative / totalEvals) * 100,
      });
    });
    
    return semesterData;
  }, [course, evaluations]);
  
  const averageRatings = useMemo(() => {
    if (!evaluations.length) return { overall: 0, content: 0, delivery: 0, assessment: 0 };
    
    const totals = evaluations.reduce(
      (acc, curr) => {
        return {
          overall: acc.overall + curr.ratings.overall,
          content: acc.content + curr.ratings.content,
          delivery: acc.delivery + curr.ratings.delivery,
          assessment: acc.assessment + curr.ratings.assessment,
        };
      },
      { overall: 0, content: 0, delivery: 0, assessment: 0 }
    );
    
    const count = evaluations.length;
    
    return {
      overall: parseFloat((totals.overall / count).toFixed(2)),
      content: parseFloat((totals.content / count).toFixed(2)),
      delivery: parseFloat((totals.delivery / count).toFixed(2)),
      assessment: parseFloat((totals.assessment / count).toFixed(2)),
    };
  }, [evaluations]);
  
  const ratingBreakdown = useMemo(() => {
    return [
      { name: 'Content', value: averageRatings.content },
      { name: 'Delivery', value: averageRatings.delivery },
      { name: 'Assessment', value: averageRatings.assessment },
    ];
  }, [averageRatings]);
  
  const recentComments = useMemo(() => {
    return evaluations
      .filter(evaluation => evaluation.comments && evaluation.comments.trim().length > 0)
      .sort((a, b) => b.year - a.year || (b.semester === 'Second' ? 1 : -1))
      .slice(0, 5);
  }, [evaluations]);

  if (!course) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {course.code}: {course.name}
          </DialogTitle>
          <CardDescription>Department: {course.department}</CardDescription>
        </DialogHeader>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
            <TabsTrigger value="comments">Student Comments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Overall Rating</CardTitle>
                  <CardDescription>Average across all evaluations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <div className="text-5xl font-bold text-university-700">
                      {averageRatings.overall}
                      <span className="text-lg text-muted-foreground">/5.0</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Evaluations</CardTitle>
                  <CardDescription>Total number of evaluations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <div className="text-5xl font-bold text-university-700">
                      {evaluations.length}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Rating Breakdown</CardTitle>
                <CardDescription>Average ratings by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ratingBreakdown} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 5]} />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip formatter={(value) => [`${value}/5.0`, 'Rating']} />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sentiment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Trends</CardTitle>
                <CardDescription>Sentiment analysis across semesters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sentimentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip 
                        formatter={(value) => {
                          const numValue = typeof value === 'string' ? parseFloat(value) : value;
                          return [`${numValue.toFixed(1)}%`, 'Percentage'];
                        }} 
                      />
                      <Line type="monotone" dataKey="positive" stroke="#22c55e" name="Positive" />
                      <Line type="monotone" dataKey="neutral" stroke="#f59e0b" name="Neutral" />
                      <Line type="monotone" dataKey="negative" stroke="#ef4444" name="Negative" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="comments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Comments</CardTitle>
                <CardDescription>Student feedback from course evaluations</CardDescription>
              </CardHeader>
              <CardContent>
                {recentComments.length > 0 ? (
                  <div className="space-y-4">
                    {recentComments.map((comment, idx) => (
                      <div key={idx} className="border-b pb-3 last:border-b-0">
                        <p className="italic text-muted-foreground">"{comment.comments}"</p>
                        <div className="flex justify-between mt-2">
                          <span className="text-sm font-medium">
                            Rating: {comment.ratings.overall}/5
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {comment.semester} {comment.year}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No comments available for this course.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDetailModal;
