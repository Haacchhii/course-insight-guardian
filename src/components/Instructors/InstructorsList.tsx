
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockInstructors } from "@/utils/mockData";
import { useUser } from "@/contexts/UserContext";

const InstructorsList = () => {
  const { userRole, department } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  
  // Filter instructors based on user role, department, and search term
  const filteredInstructors = mockInstructors.filter(instructor => {
    // Department filter based on user role
    const departmentMatch = userRole === 'admin' || instructor.department === department;
    
    // Search term filter
    const searchMatch = 
      instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return departmentMatch && searchMatch;
  });
  
  // Sort instructors
  const sortedInstructors = [...filteredInstructors].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'department') return a.department.localeCompare(b.department);
    if (sortBy === 'rating') return b.averageRating - a.averageRating;
    return 0;
  });
  
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
        <CardTitle>Instructors</CardTitle>
        <CardDescription>
          {userRole === 'admin' 
            ? 'View and manage all instructors across departments' 
            : `View and manage instructors in ${department} department`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Input
            placeholder="Search instructors..."
            className="md:max-w-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="md:max-w-xs">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="department">Sort by Department</SelectItem>
              <SelectItem value="rating">Sort by Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedInstructors.length > 0 ? (
                sortedInstructors.map((instructor) => (
                  <TableRow 
                    key={instructor.id}
                    className={instructor.averageRating < 2.0 ? "bg-red-50" : ""}
                  >
                    <TableCell className="font-medium">{instructor.name}</TableCell>
                    <TableCell>{instructor.title}</TableCell>
                    <TableCell>{instructor.department}</TableCell>
                    <TableCell>{instructor.courses.length}</TableCell>
                    <TableCell className={getRatingColorClass(instructor.averageRating)}>
                      {instructor.averageRating.toFixed(1)}/5.0
                    </TableCell>
                    <TableCell>{instructor.email}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No instructors found.
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

export default InstructorsList;
