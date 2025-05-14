
import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Sample student courses
const sampleCourses = [
  "CS101 - Introduction to Programming",
  "CS202 - Data Structures",
  "MA101 - Calculus I",
  "CS301 - Database Systems",
  "CS350 - Artificial Intelligence",
  "EN101 - Technical Communication",
  "HU101 - Introduction to Philosophy",
  "BA101 - Principles of Management"
];

// Sample evaluation questions
const evaluationQuestions = {
  content: "How would you rate the quality of course materials?",
  delivery: "How effective was the instructor's teaching approach?",
  assessment: "How fair and appropriate were the assessments?",
  support: "How would you rate the support provided during the course?",
  overall: "How would you rate the overall course experience?"
};

const StudentEvaluationPage = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [ratings, setRatings] = useState({
    content: 0,
    delivery: 0,
    assessment: 0,
    support: 0,
    overall: 0,
  });
  const [comment, setComment] = useState("");
  
  useEffect(() => {
    document.title = "Course Evaluation | LPUB Batangas";
  }, []);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the system",
    });
    navigate("/");
  };

  const handleRatingChange = (category: keyof typeof ratings, value: number) => {
    setRatings(prev => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!selectedCourse) {
      toast({
        title: "Course selection required",
        description: "Please select a course to evaluate",
        variant: "destructive",
      });
      return;
    }
    
    if (Object.values(ratings).some(rating => rating === 0)) {
      toast({
        title: "All ratings required",
        description: "Please provide ratings for all categories",
        variant: "destructive",
      });
      return;
    }
    
    // Submit evaluation (in a real app, this would call an API)
    toast({
      title: "Evaluation submitted",
      description: "Thank you for your feedback!",
    });
    
    // Reset form
    setSelectedCourse("");
    setRatings({
      content: 0,
      delivery: 0,
      assessment: 0,
      support: 0,
      overall: 0,
    });
    setComment("");
  };

  // Get student courses (use sample courses if user.courses is not available)
  const studentCourses = user?.courses || sampleCourses;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-white px-4 md:px-6">
        <div className="flex items-center gap-2">
          <img 
            src="/lpub-logo.png" 
            alt="LPUB Logo" 
            className="h-10 w-10 mr-2" 
            onError={(e) => {
              e.currentTarget.src = "https://placeholder.svg";
              e.currentTarget.onerror = null;
            }}
          />
          <h1 className="font-semibold text-xl text-university-800">Course Evaluation System</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <p className="text-sm font-medium">{user?.name || "Student Name"}</p>
            <p className="text-xs text-muted-foreground">{user?.program || "Computer Science"}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto p-4 md:p-6 max-w-4xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Course Evaluation</h1>
            <p className="text-muted-foreground">
              Provide your feedback to help improve course quality
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Course</CardTitle>
                <CardDescription>Choose the course you want to evaluate</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {studentCourses.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
            
            {selectedCourse && (
              <Card>
                <CardHeader>
                  <CardTitle>{selectedCourse} Evaluation</CardTitle>
                  <CardDescription>Rate the following aspects on a scale of 1 to 5</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {/* Content Quality */}
                    <div>
                      <Label>Content Quality</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        {evaluationQuestions.content}
                      </p>
                      <RadioGroup 
                        className="flex space-x-4" 
                        value={ratings.content.toString()} 
                        onValueChange={(val) => handleRatingChange('content', parseInt(val))}
                      >
                        {[1, 2, 3, 4, 5].map((value) => (
                          <div key={value} className="flex flex-col items-center">
                            <RadioGroupItem value={value.toString()} id={`content-${value}`} />
                            <label htmlFor={`content-${value}`} className="text-sm mt-1">{value}</label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    
                    {/* Delivery Method */}
                    <div>
                      <Label>Delivery Method</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        {evaluationQuestions.delivery}
                      </p>
                      <RadioGroup 
                        className="flex space-x-4" 
                        value={ratings.delivery.toString()} 
                        onValueChange={(val) => handleRatingChange('delivery', parseInt(val))}
                      >
                        {[1, 2, 3, 4, 5].map((value) => (
                          <div key={value} className="flex flex-col items-center">
                            <RadioGroupItem value={value.toString()} id={`delivery-${value}`} />
                            <label htmlFor={`delivery-${value}`} className="text-sm mt-1">{value}</label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    
                    {/* Assessment Fairness */}
                    <div>
                      <Label>Assessment Fairness</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        {evaluationQuestions.assessment}
                      </p>
                      <RadioGroup 
                        className="flex space-x-4" 
                        value={ratings.assessment.toString()} 
                        onValueChange={(val) => handleRatingChange('assessment', parseInt(val))}
                      >
                        {[1, 2, 3, 4, 5].map((value) => (
                          <div key={value} className="flex flex-col items-center">
                            <RadioGroupItem value={value.toString()} id={`assessment-${value}`} />
                            <label htmlFor={`assessment-${value}`} className="text-sm mt-1">{value}</label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    
                    {/* Support Provided */}
                    <div>
                      <Label>Support Provided</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        {evaluationQuestions.support}
                      </p>
                      <RadioGroup 
                        className="flex space-x-4" 
                        value={ratings.support.toString()} 
                        onValueChange={(val) => handleRatingChange('support', parseInt(val))}
                      >
                        {[1, 2, 3, 4, 5].map((value) => (
                          <div key={value} className="flex flex-col items-center">
                            <RadioGroupItem value={value.toString()} id={`support-${value}`} />
                            <label htmlFor={`support-${value}`} className="text-sm mt-1">{value}</label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    
                    {/* Overall Rating */}
                    <div>
                      <Label>Overall Rating</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        {evaluationQuestions.overall}
                      </p>
                      <RadioGroup 
                        className="flex space-x-4" 
                        value={ratings.overall.toString()} 
                        onValueChange={(val) => handleRatingChange('overall', parseInt(val))}
                      >
                        {[1, 2, 3, 4, 5].map((value) => (
                          <div key={value} className="flex flex-col items-center">
                            <RadioGroupItem value={value.toString()} id={`overall-${value}`} />
                            <label htmlFor={`overall-${value}`} className="text-sm mt-1">{value}</label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="comments">Comments and Suggestions</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Please provide any additional feedback or suggestions for improvement
                    </p>
                    <Textarea
                      id="comments"
                      placeholder="Enter your comments here... For example: The instructor was very knowledgeable but could improve on providing timely feedback on assignments."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="submit">Submit Evaluation</Button>
                </CardFooter>
              </Card>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};

export default StudentEvaluationPage;
