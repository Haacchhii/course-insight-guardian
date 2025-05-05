
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { mockEvaluations } from "@/utils/mockData";
import { useUser } from "@/contexts/UserContext";

const EvaluationsList = () => {
  const { userRole, department } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [semesterFilter, setSemesterFilter] = useState("all");
  
  // Filter evaluations based on user role, department, search term and semester
  const filteredEvaluations = mockEvaluations.filter(evaluation => {
    // Department filter based on user role
    const departmentMatch = userRole === 'admin' || evaluation.department === department;
    
    // Search term filter
    const searchMatch = 
      evaluation.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.comments.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Semester filter
    const semesterMatch = 
      semesterFilter === 'all' || 
      (evaluation.semester + ' ' + evaluation.year) === semesterFilter;
    
    return departmentMatch && searchMatch && semesterMatch;
  });
  
  // Sort evaluations
  const sortedEvaluations = [...filteredEvaluations].sort((a, b) => {
    if (sortBy === 'course') return a.course.localeCompare(b.course);
    if (sortBy === 'instructor') return a.instructor.localeCompare(b.instructor);
    if (sortBy === 'rating') return b.ratings.overall - a.ratings.overall;
    if (sortBy === 'sentiment') return b.sentimentScore - a.sentimentScore;
    if (sortBy === 'semester') {
      // Sort by year first (descending)
      if (a.year !== b.year) return b.year - a.year;
      // Then by semester (Second comes before First)
      return a.semester === 'Second' ? -1 : 1;
    }
    // Default: sort by date (year and semester combined)
    if (a.year !== b.year) return b.year - a.year;
    return a.semester === 'Second' ? -1 : 1; // Second semester comes before First
  });
  
  // Get unique semesters for the filter
  const semesters = Array.from(new Set(mockEvaluations.map(
    evaluation => `${evaluation.semester} ${evaluation.year}`
  ))).sort((a, b) => {
    const yearA = parseInt(a.split(' ')[1]);
    const yearB = parseInt(b.split(' ')[1]);
    // Sort by year (descending)
    if (yearA !== yearB) return yearB - yearA;
    // Then by semester (Second comes before First)
    return a.includes('Second') ? -1 : 1;
  });
  
  const getSentimentLabel = (score: number) => {
    if (score > 0.6) return { label: "Very Positive", variant: "default" };
    if (score > 0.2) return { label: "Positive", variant: "outline" };
    if (score >= -0.2) return { label: "Neutral", variant: "secondary" };
    if (score >= -0.6) return { label: "Negative", variant: "outline" };
    return { label: "Very Negative", variant: "destructive" };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Evaluations</CardTitle>
        <CardDescription>
          {userRole === 'admin' 
            ? 'Browse all student course evaluations' 
            : `Browse student evaluations for ${department} department`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-4 flex-wrap">
          <Input
            placeholder="Search evaluations..."
            className="md:max-w-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <Select value={semesterFilter} onValueChange={setSemesterFilter}>
            <SelectTrigger className="md:max-w-xs">
              <SelectValue placeholder="Filter by semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Semesters</SelectItem>
              {semesters.map(semester => (
                <SelectItem key={semester} value={semester}>{semester}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="md:max-w-xs">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Sort by Date</SelectItem>
              <SelectItem value="semester">Sort by Semester</SelectItem>
              <SelectItem value="course">Sort by Course</SelectItem>
              <SelectItem value="instructor">Sort by Instructor</SelectItem>
              <SelectItem value="rating">Sort by Rating</SelectItem>
              <SelectItem value="sentiment">Sort by Sentiment</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="hidden md:table-cell">Comment</TableHead>
                <TableHead>Sentiment</TableHead>
                <TableHead>Semester</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedEvaluations.length > 0 ? (
                sortedEvaluations.map((evaluation) => {
                  const sentiment = getSentimentLabel(evaluation.sentimentScore);
                  return (
                    <TableRow key={evaluation.id} className={evaluation.isAnomaly ? "bg-red-50" : ""}>
                      <TableCell className="font-medium">{evaluation.course}</TableCell>
                      <TableCell>{evaluation.instructor}</TableCell>
                      <TableCell>{evaluation.ratings.overall.toFixed(1)}</TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs truncate">
                        {evaluation.comments}
                      </TableCell>
                      <TableCell>
                        <Badge variant={sentiment.variant as any}>
                          {sentiment.label}
                        </Badge>
                      </TableCell>
                      <TableCell>{evaluation.semester} {evaluation.year}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No evaluations found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default EvaluationsList;
