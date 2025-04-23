
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockEvaluations } from "@/utils/mockData";
import { Badge } from "@/components/ui/badge";

const FeedbackTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("all");
  
  const filteredEvaluations = mockEvaluations.filter(eval => {
    const matchesSearch = 
      eval.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eval.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eval.comments.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesDepartment = department === "all" || eval.department === department;
    
    return matchesSearch && matchesDepartment;
  });

  const getSentimentLabel = (score: number) => {
    if (score > 0.6) return { label: "Very Positive", variant: "default" };
    if (score > 0.2) return { label: "Positive", variant: "outline" };
    if (score >= -0.2) return { label: "Neutral", variant: "secondary" };
    if (score >= -0.6) return { label: "Negative", variant: "outline" };
    return { label: "Very Negative", variant: "destructive" };
  };

  return (
    <Card className="col-span-1 md:col-span-4">
      <CardHeader>
        <CardTitle>Recent Evaluations</CardTitle>
        <CardDescription>
          Browse and search through student feedback
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Input
            placeholder="Search evaluations..."
            className="md:max-w-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="md:max-w-xs">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Computer Science">Computer Science</SelectItem>
              <SelectItem value="Mathematics">Mathematics</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Humanities">Humanities</SelectItem>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvaluations.length > 0 ? (
                filteredEvaluations.map((evaluation) => {
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
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No results found.
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

export default FeedbackTable;
