
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Bell, 
  User,
  Settings
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate("/");
  };

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
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Settings className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-muted-foreground">Department Head</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
