
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Bell, 
  User,
  Settings,
  ChevronDown,
  LogOut
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/contexts/UserContext";
import { mockDepartments } from "@/utils/mockData";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const { userRole, department, setUserRole, setDepartment, user, logout, isStudent } = useUser();
  const { toast } = useToast();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the system",
    });
    navigate("/");
  };
  
  // Role switcher
  const handleRoleChange = (role: 'admin' | 'department_head' | 'student', deptName: string | null = null) => {
    setUserRole(role);
    setDepartment(deptName);
    
    // Redirect student to the student evaluation page
    if (role === 'student') {
      navigate("/student-evaluation");
    }
  };

  // Students have a simplified header, so return null for the full navbar
  if (isStudent()) {
    return null;
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-white px-4 md:px-6">
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center">
          <img 
            src="/lpub-logo.png" 
            alt="LPUB Logo" 
            className="h-10 w-10 mr-2" 
            onError={(e) => {
              e.currentTarget.src = "https://placeholder.svg";
              e.currentTarget.onerror = null;
            }}
          />
          <h1 className="font-semibold text-xl text-university-800">Course Insight Guardian</h1>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              {userRole === 'admin' ? 'Administrator' : `${department} Head`}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleRoleChange('admin')}>
              Administrator
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Department Heads</DropdownMenuLabel>
            {mockDepartments.map(dept => (
              <DropdownMenuItem 
                key={dept.id} 
                onClick={() => handleRoleChange('department_head', dept.name)}
              >
                {dept.name} Department Head
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Other Roles</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleRoleChange('student', 'Computer Science')}>
              Student View
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium">
                  {user?.name || (userRole === 'admin' ? 'Admin User' : department)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user?.email || (userRole === 'admin' ? 'Administrator' : 'Department Head')}
                </p>
              </div>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-500">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
