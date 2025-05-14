
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  ChartPie,
  ChartBar,
  Search, 
  Settings,
  List, 
  Book,
  University
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, isActive }: SidebarItemProps) => {
  return (
    <Link to={href} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 pl-2",
          isActive ? "bg-accent text-primary font-medium" : "text-muted-foreground"
        )}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </Button>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const { userRole, isStudent } = useUser();
  
  // Students don't see the sidebar
  if (isStudent()) {
    return null;
  }

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 border-r bg-white">
      <div className="pt-6 px-3">
        <div className="flex flex-col gap-1 px-2">
          <h2 className="text-lg font-semibold text-university-700">LPUB Batangas</h2>
          <p className="text-xs text-muted-foreground">Course Evaluation System</p>
        </div>
      </div>
      <div className="flex-1 overflow-auto py-2 px-3">
        <div className="flex flex-col gap-1">
          <div className="py-2">
            <p className="px-2 text-xs font-semibold text-muted-foreground mb-2">Dashboard</p>
            <SidebarItem
              icon={LayoutDashboard}
              label="Overview"
              href="/dashboard"
              isActive={pathName === "/dashboard"}
            />
            <SidebarItem
              icon={ChartPie}
              label="Sentiment Analysis"
              href="/sentiment"
              isActive={pathName === "/sentiment"}
            />
            <SidebarItem
              icon={ChartBar}
              label="Anomaly Detection"
              href="/anomalies"
              isActive={pathName === "/anomalies"}
            />
          </div>
          <div className="py-2">
            <p className="px-2 text-xs font-semibold text-muted-foreground mb-2">Administration</p>
            <SidebarItem
              icon={Book}
              label="Courses"
              href="/courses"
              isActive={pathName === "/courses"}
            />
            <SidebarItem
              icon={University}
              label="Departments"
              href="/departments"
              isActive={pathName === "/departments"}
            />
            <SidebarItem
              icon={Book}
              label="Evaluations"
              href="/evaluations"
              isActive={pathName === "/evaluations"}
            />
          </div>
        </div>
      </div>
      <div className="border-t p-3">
        <div className="flex flex-col gap-1">
          <SidebarItem
            icon={Settings}
            label="Settings"
            href="/settings"
            isActive={pathName === "/settings"}
          />
          <SidebarItem
            icon={Search}
            label="Search"
            href="/search"
            isActive={pathName === "/search"}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
