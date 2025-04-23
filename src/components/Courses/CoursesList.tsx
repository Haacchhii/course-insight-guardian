
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { mockCourses } from "@/utils/mockData";
import { useUser } from "@/contexts/UserContext";

const CoursesList = () => {
  const { userRole, department } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Filter courses based on user role, department, search term, and status filter
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
    
    return departmentMatch && searchMatch && statusMatch;
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

  return (
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
        <div className="flex flex-col md:flex-row gap-4 mb-4">
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
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Course Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Instructors</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => {
                  const statusBadge = getStatusBadge(course.status);
                  return (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.code}</TableCell>
                      <TableCell>{course.title}</TableCell>
                      <TableCell>{course.department}</TableCell>
                      <TableCell>{course.instructors.join(", ")}</TableCell>
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
  );
};

export default CoursesList;
