
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/UserContext";
import { mockDepartments } from "@/utils/mockData";
import { PlusCircle, Trash2 } from "lucide-react";

interface NewCourse {
  title: string;
  code: string;
  department: string;
  instructors: string;
  status: "active" | "inactive" | "pending";
}

const CourseManagement = () => {
  const { userRole, department } = useUser();
  const { toast } = useToast();
  
  const [isAdding, setIsAdding] = useState(false);
  const [newCourse, setNewCourse] = useState<NewCourse>({
    title: "",
    code: "",
    department: userRole === 'department_head' ? department || "" : "",
    instructors: "",
    status: "pending"
  });
  
  const handleChange = (field: keyof NewCourse, value: string) => {
    setNewCourse(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!newCourse.title || !newCourse.code || !newCourse.department) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send data to an API
    toast({
      title: "Course added successfully",
      description: `${newCourse.code}: ${newCourse.title} has been added`,
    });
    
    // Reset form
    setNewCourse({
      title: "",
      code: "",
      department: userRole === 'department_head' ? department || "" : "",
      instructors: "",
      status: "pending"
    });
    
    setIsAdding(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Management</CardTitle>
        <CardDescription>
          {userRole === 'admin' 
            ? 'Add or remove courses across departments' 
            : `Add or remove courses for ${department} department`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isAdding ? (
          <Button onClick={() => setIsAdding(true)} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Course
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Course Code*</Label>
                <Input
                  id="code"
                  placeholder="e.g., CS101"
                  value={newCourse.code}
                  onChange={(e) => handleChange('code', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Course Title*</Label>
                <Input
                  id="title"
                  placeholder="e.g., Introduction to Computer Science"
                  value={newCourse.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Department*</Label>
                {userRole === 'admin' ? (
                  <Select 
                    value={newCourse.department} 
                    onValueChange={(value) => handleChange('department', value)}
                    required
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDepartments.map(dept => (
                        <SelectItem key={dept.id} value={dept.name}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id="department"
                    value={newCourse.department}
                    readOnly
                    disabled
                  />
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instructors">Instructors</Label>
                <Input
                  id="instructors"
                  placeholder="Comma-separated list of instructors"
                  value={newCourse.instructors}
                  onChange={(e) => handleChange('instructors', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={newCourse.status} 
                  onValueChange={(value: "active" | "inactive" | "pending") => handleChange('status', value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Course</Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseManagement;
