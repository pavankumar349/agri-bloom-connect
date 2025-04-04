
import { Sidebar } from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full">
      {/* Desktop sidebar (always visible) */}
      {!isMobile && <Sidebar />}

      {/* Mobile sidebar (toggleable) */}
      {isMobile && (
        <>
          <div
            className={cn(
              "fixed inset-0 bg-black/50 z-40 transition-opacity",
              isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            onClick={() => setIsSidebarOpen(false)}
          />
          <div
            className={cn(
              "fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out",
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <Sidebar />
          </div>
        </>
      )}

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile navbar */}
        {isMobile && (
          <div className="h-14 border-b border-border flex items-center px-4">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">A</span>
              </div>
              <span className="font-display font-semibold text-lg">Agrislove</span>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
