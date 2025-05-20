
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
    return mockEvaluations.filter(evaluation => evaluation.course.includes(course.code) || evaluation.course.toLowerCase().includes(course.name.toLowerCase()));
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
    
    return semesterData.sort((a, b) => {
      const yearA = parseInt(a.name.split(' ')[1]);
      const yearB = parseInt(b.name.split(' ')[1]);
      if (yearA !== yearB) return yearA - yearB;
      return a.name.includes('First') ? -1 : 1;
    });
  }, [course, evaluations]);
  
  const averageRatings = useMemo(() => {
    if (!evaluations.length) return { overall: 0, content: 0, delivery: 0, assessment: 0, support: 0 };
    
    const totals = evaluations.reduce(
      (acc, curr) => {
        return {
          overall: acc.overall + curr.ratings.overall,
          content: acc.content + curr.ratings.content,
          delivery: acc.delivery + curr.ratings.delivery,
          assessment: acc.assessment + curr.ratings.assessment,
          support: acc.support + curr.ratings.support,
        };
      },
      { overall: 0, content: 0, delivery: 0, assessment: 0, support: 0 }
    );
    
    const count = evaluations.length;
    
    return {
      overall: parseFloat((totals.overall / count).toFixed(2)),
      content: parseFloat((totals.content / count).toFixed(2)),
      delivery: parseFloat((totals.delivery / count).toFixed(2)),
      assessment: parseFloat((totals.assessment / count).toFixed(2)),
      support: parseFloat((totals.support / count).toFixed(2)),
    };
  }, [evaluations]);
  
  const ratingBreakdown = useMemo(() => {
    return [
      { name: 'Content Quality', value: averageRatings.content },
      { name: 'Delivery Method', value: averageRatings.delivery },
      { name: 'Assessment Fairness', value: averageRatings.assessment },
      { name: 'Support Provided', value: averageRatings.support },
    ];
  }, [averageRatings]);
  
  const recentComments = useMemo(() => {
    return evaluations
      .filter(evaluation => evaluation.comments && evaluation.comments.trim().length > 0)
      .sort((a, b) => b.year - a.year || (b.semester === 'Second' ? 1 : -1))
      .slice(0, 5);
  }, [evaluations]);

  // Generate sample sentiment comments if none exist (for demo purposes)
  const sampleComments = useMemo(() => {
    const defaultComments = [
      {
        comments: "The course materials were well organized and the instructor explained concepts clearly. I particularly enjoyed the practical exercises.",
        ratings: { overall: 4.5 },
        semester: "First",
        year: 2023
      },
      {
        comments: "Good course content but the pace was a bit fast. More examples would have been helpful.",
        ratings: { overall: 3.8 },
        semester: "Second",
        year: 2023
      },
      {
        comments: "The instructor was very knowledgeable and responsive to questions. The assignments were challenging but fair.",
        ratings: { overall: 4.2 },
        semester: "First",
        year: 2023
      }
    ];
    
    return recentComments.length > 0 ? recentComments : defaultComments;
  }, [recentComments]);

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
                      {evaluations.length || "No data"}
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
                      <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sentiment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Criteria Comparison</CardTitle>
                <CardDescription>Breakdown of evaluation criteria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                      <span>Content: {averageRatings.content}/5.0</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                      <span>Delivery: {averageRatings.delivery}/5.0</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
                      <span>Assessment: {averageRatings.assessment}/5.0</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
                      <span>Support: {averageRatings.support}/5.0</span>
                    </div>
                  </div>
                  
                  <div className="h-64 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sentimentData.length > 0 ? sentimentData : [{ name: 'No Data', positive: 0, neutral: 0, negative: 0 }]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip 
                          formatter={(value) => {
                            const numValue = typeof value === 'number' 
                              ? value 
                              : typeof value === 'string' 
                                ? parseFloat(value) 
                                : 0;
                            
                            return [`${numValue.toFixed(1)}%`, 'Percentage'];
                          }} 
                        />
                        <Bar dataKey="positive" stackId="a" fill="#22c55e" name="Positive" />
                        <Bar dataKey="neutral" stackId="a" fill="#f59e0b" name="Neutral" />
                        <Bar dataKey="negative" stackId="a" fill="#ef4444" name="Negative" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="comments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Comments</CardTitle>
                <CardDescription>Feedback from course evaluations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleComments.map((comment, idx) => (
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDetailModal;
