
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Filter, Search } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import ViewQuestionSetModal from "./ViewQuestionSetModal";

// Mock data for question sets
const mockQuestionSets = [
  {
    id: "qs-001",
    title: "CS Department Mid-Year Evaluation",
    department: "Computer Science",
    semester: "Fall 2024",
    createdAt: "2024-08-15",
    status: "active",
    questionCount: 12,
    responseCount: 156,
  },
  {
    id: "qs-002",
    title: "Engineering Core Subjects Evaluation",
    department: "Engineering",
    semester: "Fall 2024",
    createdAt: "2024-08-10",
    status: "active",
    questionCount: 15,
    responseCount: 210,
  },
  {
    id: "qs-003",
    title: "Physics Department Evaluation",
    department: "Physics",
    semester: "Fall 2024",
    createdAt: "2024-08-05",
    status: "active",
    questionCount: 10,
    responseCount: 98,
  },
  {
    id: "qs-004",
    title: "Mathematics Department Previous Eval",
    department: "Mathematics",
    semester: "Spring 2024",
    createdAt: "2024-01-15",
    status: "archived",
    questionCount: 8,
    responseCount: 185,
  },
  {
    id: "qs-005",
    title: "CS Department Previous Eval",
    department: "Computer Science",
    semester: "Spring 2024",
    createdAt: "2024-01-10",
    status: "archived",
    questionCount: 12,
    responseCount: 142,
  },
];

const EvaluationQuestionsList = () => {
  const { userRole, department } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedQuestionSet, setSelectedQuestionSet] = useState<any>(null);

  // Filter question sets based on user role and filters
  const filteredQuestionSets = mockQuestionSets
    .filter(qs => {
      // Department head can only see their department's question sets
      if (userRole === 'department_head') {
        return qs.department === department;
      }
      return true; // Admin can see all
    })
    .filter(qs => {
      // Apply search filter
      if (searchTerm) {
        return qs.title.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return true;
    })
    .filter(qs => {
      // Apply department filter (admin only)
      if (selectedDepartment && userRole === 'admin') {
        return qs.department === selectedDepartment;
      }
      return true;
    })
    .filter(qs => {
      // Apply semester filter
      if (selectedSemester) {
        return qs.semester === selectedSemester;
      }
      return true;
    })
    .filter(qs => {
      // Apply status filter
      if (selectedStatus) {
        return qs.status === selectedStatus;
      }
      return true;
    });

  const handleViewQuestionSet = (questionSet: any) => {
    setSelectedQuestionSet(questionSet);
    setViewModalOpen(true);
  };

  // Extract unique departments and semesters for filters
  const departments = [...new Set(mockQuestionSets.map(qs => qs.department))];
  const semesters = [...new Set(mockQuestionSets.map(qs => qs.semester))];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Question Sets</CardTitle>
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search question sets..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            {userRole === 'admin' && (
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Semesters" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Semesters</SelectItem>
                {semesters.map((sem) => (
                  <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                {userRole === 'admin' && <TableHead>Department</TableHead>}
                <TableHead>Semester</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>Responses</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuestionSets.length > 0 ? (
                filteredQuestionSets.map((qs) => (
                  <TableRow key={qs.id}>
                    <TableCell className="font-medium">{qs.title}</TableCell>
                    {userRole === 'admin' && <TableCell>{qs.department}</TableCell>}
                    <TableCell>{qs.semester}</TableCell>
                    <TableCell>{qs.createdAt}</TableCell>
                    <TableCell>
                      <Badge variant={qs.status === 'active' ? 'default' : 'secondary'}>
                        {qs.status === 'active' ? 'Active' : 'Archived'}
                      </Badge>
                    </TableCell>
                    <TableCell>{qs.questionCount}</TableCell>
                    <TableCell>{qs.responseCount}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewQuestionSet(qs)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={userRole === 'admin' ? 8 : 7} className="h-24 text-center">
                    No question sets found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {selectedQuestionSet && (
        <ViewQuestionSetModal 
          isOpen={viewModalOpen} 
          onClose={() => setViewModalOpen(false)} 
          questionSet={selectedQuestionSet}
        />
      )}
    </Card>
  );
};

export default EvaluationQuestionsList;
