
import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Search, Check, Archive } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import ViewQuestionSetModal from "./ViewQuestionSetModal";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

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
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedSemester, setSelectedSemester] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedQuestionSet, setSelectedQuestionSet] = useState<any>(null);
  const [questionSets, setQuestionSets] = useState(mockQuestionSets);
  const { toast } = useToast();

  const handleViewQuestionSet = (questionSet: any) => {
    setSelectedQuestionSet(questionSet);
    setViewModalOpen(true);
  };

  const handleStatusChange = useCallback((questionSetId: string, newStatus: 'active' | 'archived') => {
    setQuestionSets(prevSets => 
      prevSets.map(qs => 
        qs.id === questionSetId 
          ? { ...qs, status: newStatus } 
          : qs
      )
    );
    
    toast({
      title: "Status Updated",
      description: `Question set status changed to ${newStatus}`,
    });
  }, [toast]);

  // Filter question sets based on user role and filters
  const filteredQuestionSets = questionSets
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
      if (selectedDepartment !== "all" && userRole === 'admin') {
        return qs.department === selectedDepartment;
      }
      return true;
    })
    .filter(qs => {
      // Apply semester filter
      if (selectedSemester !== "all") {
        return qs.semester === selectedSemester;
      }
      return true;
    })
    .filter(qs => {
      // Apply status filter
      if (selectedStatus !== "all") {
        return qs.status === selectedStatus;
      }
      return true;
    });

  // Extract unique departments and semesters for filters
  const departments = [...new Set(questionSets.map(qs => qs.department))];
  const semesters = [...new Set(questionSets.map(qs => qs.semester))];

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
                  <SelectItem value="all">All Departments</SelectItem>
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
                <SelectItem value="all">All Semesters</SelectItem>
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
                <SelectItem value="all">All Status</SelectItem>
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Badge 
                            variant={qs.status === 'active' ? 'default' : 'secondary'} 
                            className="cursor-pointer hover:opacity-80"
                          >
                            {qs.status === 'active' ? 'Active' : 'Archived'}
                          </Badge>
                        </DropdownMenuTrigger>
                        {/* Only show dropdown for admin and department head */}
                        {(userRole === 'admin' || userRole === 'department_head') && (
                          <DropdownMenuContent align="start">
                            <DropdownMenuItem 
                              onClick={() => handleStatusChange(qs.id, 'active')}
                              disabled={qs.status === 'active'}
                              className="flex items-center"
                            >
                              <Check className="mr-2 h-4 w-4" />
                              <span>Mark Active</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleStatusChange(qs.id, 'archived')}
                              disabled={qs.status === 'archived'}
                              className="flex items-center"
                            >
                              <Archive className="mr-2 h-4 w-4" />
                              <span>Archive</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        )}
                      </DropdownMenu>
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
