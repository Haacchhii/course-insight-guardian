
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockEvaluations } from "@/utils/mockData";
import { useMemo } from "react";
import { Course } from "@/utils/mockData";

interface CourseDetailModalProps {
  course: Course | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CourseDetailModal = ({ course, open, onOpenChange }: CourseDetailModalProps) => {
  const evaluations = useMemo(() => {
    if (!course) return [];
    return mockEvaluations.filter(eval => eval.course.includes(course.code));
  }, [course]);

  // Calculate sentiment stats for the course
  const sentimentStats = useMemo(() => {
    if (!evaluations.length) return { positive: 0, neutral: 0, negative: 0 };
    
    const positive = evaluations.filter(e => e.sentimentScore > 0.3).length;
    const neutral = evaluations.filter(e => e.sentimentScore >= -0.3 && e.sentimentScore <= 0.3).length;
    const negative = evaluations.filter(e => e.sentimentScore < -0.3).length;
    const total = evaluations.length || 1; // Avoid division by zero
    
    return {
      positive: Math.round((positive / total) * 100),
      neutral: Math.round((neutral / total) * 100),
      negative: Math.round((negative / total) * 100)
    };
  }, [evaluations]);

  // Get evaluations by semester
  const evaluationsBySemester = useMemo(() => {
    const semesters = {} as Record<string, typeof evaluations>;
    
    evaluations.forEach(eval => {
      const semesterKey = `${eval.semester} ${eval.year}`;
      if (!semesters[semesterKey]) {
        semesters[semesterKey] = [];
      }
      semesters[semesterKey].push(eval);
    });
    
    return semesters;
  }, [evaluations]);
  
  const semesterKeys = Object.keys(evaluationsBySemester).sort((a, b) => {
    const yearA = parseInt(a.split(' ')[1]);
    const yearB = parseInt(b.split(' ')[1]);
    if (yearA !== yearB) return yearB - yearA;
    return a.includes('Second') ? -1 : 1;
  });

  if (!course) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{course.code}: {course.title}</DialogTitle>
          <DialogDescription>
            {course.department} Department • {course.credits} Credits
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Course Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className={`text-3xl font-bold 
                  ${course.averageRating >= 4.0 ? 'text-green-600' : 
                    course.averageRating >= 3.0 ? 'text-blue-600' : 
                    course.averageRating >= 2.0 ? 'text-yellow-600' : 
                    'text-red-600'}`}>
                  {course.averageRating.toFixed(1)}
                </span>
                <span className="text-xl text-muted-foreground">/5.0</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Based on {course.totalEvaluations} evaluations
              </p>
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
                  <span className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                    Positive
                  </span>
                  <span className="font-medium">{sentimentStats.positive}%</span>
                </div>
                <Progress value={sentimentStats.positive} className="h-1 bg-gray-100" />
                
                <div className="flex justify-between text-xs">
                  <span className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-gray-400 mr-1"></span>
                    Neutral
                  </span>
                  <span className="font-medium">{sentimentStats.neutral}%</span>
                </div>
                <Progress value={sentimentStats.neutral} className="h-1 bg-gray-100" />
                
                <div className="flex justify-between text-xs">
                  <span className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-red-500 mr-1"></span>
                    Negative
                  </span>
                  <span className="font-medium">{sentimentStats.negative}%</span>
                </div>
                <Progress value={sentimentStats.negative} className="h-1 bg-gray-100" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue={semesterKeys.length > 0 ? semesterKeys[0] : "overview"}>
          <TabsList className="w-full overflow-x-auto flex-nowrap">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {semesterKeys.map(semester => (
              <TabsTrigger key={semester} value={semester}>
                {semester}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="overview" className="mt-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Course Description</h3>
                <p className="text-sm text-muted-foreground">{course.description}</p>
              </div>

              <div>
                <h3 className="font-medium mb-1">Instructors</h3>
                <p className="text-sm">{course.instructors.join(", ")}</p>
              </div>

              <div>
                <h3 className="font-medium mb-1">Status</h3>
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                  ${course.status === 'active' ? 'bg-green-100 text-green-800' : 
                    course.status === 'inactive' ? 'bg-gray-100 text-gray-800' : 
                    'bg-yellow-100 text-yellow-800'}`}>
                  {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Semester-specific tabs */}
          {semesterKeys.map(semester => {
            const semesterEvaluations = evaluationsBySemester[semester];
            const averageRating = semesterEvaluations.reduce(
              (sum, eval_) => sum + eval_.ratings.overall, 0
            ) / semesterEvaluations.length;
            
            return (
              <TabsContent key={semester} value={semester} className="mt-4">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Semester Rating: {averageRating.toFixed(1)}/5.0</CardTitle>
                      <CardDescription>
                        Based on {semesterEvaluations.length} evaluations for {semester}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Rating breakdown */}
                        <div>
                          <h4 className="text-sm font-medium mb-2">Rating Categories</h4>
                          <div className="space-y-2">
                            {['content', 'delivery', 'assessment', 'support'].map(category => {
                              const categoryAvg = semesterEvaluations.reduce(
                                (sum, eval_) => sum + eval_.ratings[category as keyof typeof eval_.ratings], 0
                              ) / semesterEvaluations.length;
                              
                              return (
                                <div key={category} className="flex justify-between items-center">
                                  <span className="text-sm capitalize">{category}</span>
                                  <div className="flex items-center space-x-2">
                                    <Progress 
                                      value={(categoryAvg / 5) * 100} 
                                      className="h-2 w-24 md:w-40" 
                                    />
                                    <span className="text-sm font-medium">{categoryAvg.toFixed(1)}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Comments */}
                        <div>
                          <h4 className="text-sm font-medium mb-2">Student Comments</h4>
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {semesterEvaluations.map((eval_, idx) => (
                              <Card key={idx} className={`p-3 ${eval_.sentimentScore > 0.3 ? 'bg-green-50' : eval_.sentimentScore < -0.3 ? 'bg-red-50' : 'bg-gray-50'}`}>
                                <p className="text-sm">{eval_.comments}</p>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDetailModal;
