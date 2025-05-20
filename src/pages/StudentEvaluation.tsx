
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample student courses with more detailed information
const sampleCourses = [
  { id: "1", code: "CS101", name: "Introduction to Programming", description: "Learn the basics of programming", status: "active", semester: "1st-2024" },
  { id: "2", code: "CS202", name: "Data Structures", description: "Study of data structures and algorithms", status: "active", semester: "1st-2024" },
  { id: "3", code: "MA101", name: "Calculus I", description: "Basic calculus and mathematical concepts", status: "active", semester: "1st-2024" },
  { id: "4", code: "CS301", name: "Database Systems", description: "Database design and implementation", status: "active", semester: "1st-2024" },
  { id: "5", code: "CS350", name: "Artificial Intelligence", description: "Introduction to AI concepts", status: "pending", semester: "2nd-2024" },
  { id: "6", code: "EN101", name: "Technical Communication", description: "Effective communication for technical fields", status: "active", semester: "1st-2024" },
  { id: "7", code: "HU101", name: "Introduction to Philosophy", description: "Basic philosophical concepts", status: "active", semester: "1st-2024" },
  { id: "8", code: "BA101", name: "Principles of Management", description: "Introduction to management concepts", status: "inactive", semester: "2nd-2024" }
];

// Sample evaluation questions
const evaluationQuestions = {
  content: "How would you rate the quality of course materials?",
  delivery: "How effective was the teaching approach?",
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
  const [searchTerm, setSearchTerm] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("1st-2024");
  
  useEffect(() => {
    document.title = "Course Evaluation | LPUB Batangas";
  }, []);

  // Define available semesters
  const semesters = [
    { value: "all", label: "All Semesters" },
    { value: "1st-2024", label: "1st Semester 2024" },
    { value: "2nd-2024", label: "2nd Semester 2024" },
    { value: "summer-2024", label: "Summer 2024" },
    { value: "1st-2025", label: "1st Semester 2025" },
  ];

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the system",
    });
    navigate("/");
  };

  // Filter courses based on search term and semester
  const filteredCourses = sampleCourses.filter(course => {
    const searchMatch = 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const semesterMatch = semesterFilter === "all" || course.semester === semesterFilter;
    
    return searchMatch && semesterMatch;
  });

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

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId);
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
              Select a course to evaluate and provide your feedback
            </p>
          </div>
          
          {!selectedCourse ? (
            <Card>
              <CardHeader>
                <CardTitle>My Courses</CardTitle>
                <CardDescription>Select a course to evaluate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-4 flex-wrap">
                  <Input
                    placeholder="Search courses..."
                    className="md:max-w-xs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Select value={semesterFilter} onValueChange={setSemesterFilter}>
                    <SelectTrigger className="md:max-w-xs">
                      <SelectValue placeholder="Filter by semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {semesters.map((semester) => (
                        <SelectItem key={semester.value} value={semester.value}>
                          {semester.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Subject Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => (
                          <TableRow key={course.id}>
                            <TableCell className="font-medium">{course.code}</TableCell>
                            <TableCell>{course.name}</TableCell>
                            <TableCell>{course.description}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                course.status === 'active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : course.status === 'pending' 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : 'bg-gray-100 text-gray-800'
                              }`}>
                                {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="outline"
                                size="sm"
                                onClick={() => handleCourseSelect(course.id)}
                                disabled={course.status !== 'active'}
                              >
                                Evaluate
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            No courses found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {sampleCourses.find(c => c.id === selectedCourse)?.code}{" "}
                    {sampleCourses.find(c => c.id === selectedCourse)?.name}
                  </CardTitle>
                  <CardDescription>
                    {sampleCourses.find(c => c.id === selectedCourse)?.description}
                  </CardDescription>
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
                      placeholder="Enter your comments here... For example: The course materials were very informative but could use more practical examples."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setSelectedCourse("")}>
                    Back to Courses
                  </Button>
                  <Button type="submit">Submit Evaluation</Button>
                </CardFooter>
              </Card>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentEvaluationPage;
