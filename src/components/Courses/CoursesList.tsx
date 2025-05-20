
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { mockCourses } from "@/utils/mockData";
import { useUser } from "@/contexts/UserContext";
import CourseDetailModal from "./CourseDetailModal";
import { Course } from "@/utils/mockData";

// Define the interface that matches what CourseDetailModal expects
interface CourseDetail {
  id: string;
  code: string;
  name: string;
  department: string;
}

const CoursesList = () => {
  const { userRole, department } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [semesterFilter, setSemesterFilter] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState<CourseDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Define available semesters
  const semesters = [
    { value: "all", label: "All Semesters" },
    { value: "1st-2024", label: "1st Semester 2024" },
    { value: "2nd-2024", label: "2nd Semester 2024" },
    { value: "summer-2024", label: "Summer 2024" },
    { value: "1st-2025", label: "1st Semester 2025" },
  ];
  
  // Filter courses based on user role, department, search term, status filter, and semester
  const filteredCourses = mockCourses.filter(course => {
    // Department filter based on user role
    const departmentMatch = userRole === 'admin' || course.department === department;
    
    // Search term filter
    const searchMatch = 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const statusMatch = statusFilter === 'all' || course.status === statusFilter;
    
    // Semester filter (assuming courses have a semester property - we would add this to the data model)
    const semesterMatch = semesterFilter === 'all' || course.semester === semesterFilter;
    
    return departmentMatch && searchMatch && statusMatch && semesterMatch;
  });
  
  // Get status badge variant
  const getStatusBadge = (status: "active" | "inactive" | "pending") => {
    switch (status) {
      case "active": return { variant: "default", label: "Active" };
      case "inactive": return { variant: "secondary", label: "Inactive" };
      case "pending": return { variant: "outline", label: "Pending" };
      default: return { variant: "default", label: status };
    }
  };
  
  // Get rating color class
  const getRatingColorClass = (rating: number) => {
    if (rating >= 4.0) return "text-green-600";
    if (rating >= 3.0) return "text-blue-600";
    if (rating >= 2.0) return "text-yellow-600";
    return "text-red-600";
  };

  // Handle row click to open the detail modal
  const handleRowClick = (course: Course) => {
    setSelectedCourse({
      id: course.id,
      code: course.code,
      name: course.title, // Map title to name for compatibility with modal
      department: course.department
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Courses</CardTitle>
          <CardDescription>
            {userRole === 'admin' 
              ? 'View and manage all courses across departments' 
              : `View and manage courses in ${department} department`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4 flex-wrap">
            <Input
              placeholder="Search courses..."
              className="md:max-w-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="md:max-w-xs">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
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
                  <TableHead>Course Title</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => {
                    const statusBadge = getStatusBadge(course.status);
                    return (
                      <TableRow 
                        key={course.id} 
                        onClick={() => handleRowClick(course)}
                        className="cursor-pointer hover:bg-slate-50"
                      >
                        <TableCell className="font-medium">{course.code}</TableCell>
                        <TableCell>{course.title}</TableCell>
                        <TableCell>{course.department}</TableCell>
                        <TableCell>{course.semester || "1st Semester 2024"}</TableCell>
                        <TableCell className={getRatingColorClass(course.averageRating)}>
                          {course.averageRating.toFixed(1)}/5.0
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusBadge.variant as any}>
                            {statusBadge.label}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No courses found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <CourseDetailModal
        course={selectedCourse}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
};

export default CoursesList;
