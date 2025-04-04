
import { Calendar, Home, MessageCircle, Image, Users, BookOpen, LogIn } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  isActive: boolean;
}

const SidebarItem = ({ icon: Icon, label, to, isActive }: SidebarItemProps) => {
  return (
    <Link to={to} className="w-full">
      <Button 
        variant="ghost" 
        className={cn(
          "w-full justify-start gap-2 mb-1 font-normal", 
          isActive 
            ? "bg-sidebar-accent text-sidebar-accent-foreground" 
            : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
        )}
      >
        <Icon size={18} />
        <span>{label}</span>
      </Button>
    </Link>
  );
};

export function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isAuthenticated } = useAuth();

  const navItems = [
    { icon: Home, label: "Dashboard", to: "/" },
    { icon: MessageCircle, label: "AI Assistant", to: "/assistant" },
    { icon: Image, label: "Disease Detection", to: "/disease-detection" },
    { icon: Users, label: "Community", to: "/community" },
    { icon: BookOpen, label: "Growing Guide", to: "/guide" },
  ];

  const authItems = isAuthenticated 
    ? [{ icon: Users, label: "Profile", to: "/profile" }]
    : [{ icon: LogIn, label: "Login", to: "/login" }];

  return (
    <div 
      className={cn(
        "h-screen transition-all duration-300 bg-sidebar flex flex-col border-r border-border",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
            <span className="font-display font-semibold text-lg">Agrislove</span>
          </div>
        )}
        {isCollapsed && (
          <div className="mx-auto h-8 w-8 bg-primary rounded-sm flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">A</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon"
          className="h-7 w-7"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <ChevronIcon collapsed={isCollapsed} />
        </Button>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {navItems.map((item) => 
            isCollapsed ? (
              <Button 
                key={item.to}
                variant="ghost" 
                size="icon"
                asChild
                className={cn(
                  "w-full h-10 mb-1", 
                  location.pathname === item.to 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                <Link to={item.to}>
                  <item.icon size={18} />
                </Link>
              </Button>
            ) : (
              <SidebarItem 
                key={item.to} 
                {...item} 
                isActive={location.pathname === item.to} 
              />
            )
          )}
        </div>
        
        <div className="mt-6 pt-6 border-t border-border">
          {authItems.map((item) => 
            isCollapsed ? (
              <Button 
                key={item.to}
                variant="ghost" 
                size="icon"
                asChild
                className={cn(
                  "w-full h-10 mb-1", 
                  location.pathname === item.to 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                <Link to={item.to}>
                  <item.icon size={18} />
                </Link>
              </Button>
            ) : (
              <SidebarItem 
                key={item.to} 
                {...item} 
                isActive={location.pathname === item.to} 
              />
            )
          )}
        </div>
      </nav>
      
      <div className="p-4 border-t border-border">
        {!isCollapsed && (
          <div className="text-xs text-sidebar-foreground/70 text-center">
            <p>Agrislove © 2025</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ChevronIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`}
    >
      {collapsed ? (
        <polyline points="9 18 15 12 9 6" />
      ) : (
        <polyline points="15 6 9 12 15 18" />
      )}
    </svg>
  );
}
