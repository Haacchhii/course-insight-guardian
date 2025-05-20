
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockDepartments } from "@/utils/mockData";

const DepartmentsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("all");
  
  // Define available semesters
  const semesters = [
    { value: "all", label: "All Semesters" },
    { value: "1st-2024", label: "1st Semester 2024" },
    { value: "2nd-2024", label: "2nd Semester 2024" },
    { value: "summer-2024", label: "Summer 2024" },
    { value: "1st-2025", label: "1st Semester 2025" },
  ];
  
  // Filter departments based on search term and semester
  const filteredDepartments = mockDepartments.filter(department => {
    const searchMatch = 
      department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.headName.toLowerCase().includes(searchTerm.toLowerCase());
    
    // In a real app, we would filter by semester here
    return searchMatch;
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
        <CardTitle>Departments</CardTitle>
        <CardDescription>
          View and manage all academic departments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-4 flex-wrap">
          <Input
            placeholder="Search departments..."
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
                <TableHead>Department Name</TableHead>
                <TableHead>Department Chair</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Average Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDepartments.length > 0 ? (
                filteredDepartments.map((department) => (
                  <TableRow key={department.id}>
                    <TableCell className="font-medium">{department.code}</TableCell>
                    <TableCell>{department.name}</TableCell>
                    <TableCell>{department.headName}</TableCell>
                    <TableCell>{department.totalCourses}</TableCell>
                    <TableCell className={getRatingColorClass(department.averageRating)}>
                      {department.averageRating.toFixed(1)}/5.0
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No departments found.
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

export default DepartmentsList;
