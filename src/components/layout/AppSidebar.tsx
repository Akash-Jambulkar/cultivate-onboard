import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Target,
  Monitor,
  FileText,
  Gift,
  Gamepad2,
  Cake,
  MessageSquare,
  Users,
  Heart,
  GraduationCap,
  UserCheck,
  TrendingUp,
  Smile,
  Compass,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => (
  <NavLink
    to={to}
    className={cn(
      "nav-item",
      isActive && "nav-item-active"
    )}
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

interface NavGroupProps {
  title: string;
  color: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const NavGroup = ({ title, color, children, defaultOpen = false }: NavGroupProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className={cn("w-2 h-2 rounded-full", color)} />
          <span>{title}</span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="pl-2 space-y-0.5">{children}</div>
      </div>
    </div>
  );
};

export const AppSidebar = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">EX</span>
          </div>
          <div>
            <h1 className="font-semibold text-foreground">ExpHub</h1>
            <p className="text-xs text-muted-foreground">Employee Experience</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {/* Dashboard */}
        <NavItem
          to="/"
          icon={<LayoutDashboard className="w-5 h-5" />}
          label="Dashboard"
          isActive={isActive("/")}
        />

        {/* Pre-Onboarding */}
        <NavGroup title="Pre-Onboarding" color="bg-info" defaultOpen>
          <NavItem
            to="/pre-onboarding/role"
            icon={<Target className="w-5 h-5" />}
            label="Role & Expectations"
            isActive={isActive("/pre-onboarding/role")}
          />
          <NavItem
            to="/pre-onboarding/it-tutorial"
            icon={<Monitor className="w-5 h-5" />}
            label="IT Tutorials"
            isActive={isActive("/pre-onboarding/it-tutorial")}
          />
          <NavItem
            to="/pre-onboarding/documents"
            icon={<FileText className="w-5 h-5" />}
            label="Document Submission"
            isActive={isActive("/pre-onboarding/documents")}
          />
          <NavItem
            to="/pre-onboarding/welcome-kit"
            icon={<Gift className="w-5 h-5" />}
            label="Welcome Kit"
            isActive={isActive("/pre-onboarding/welcome-kit")}
          />
        </NavGroup>

        {/* Onboarding */}
        <NavGroup title="Onboarding" color="bg-warning">
          <NavItem
            to="/onboarding/simulations"
            icon={<Gamepad2 className="w-5 h-5" />}
            label="Simulations"
            isActive={isActive("/onboarding/simulations")}
          />
          <NavItem
            to="/onboarding/birthdays"
            icon={<Cake className="w-5 h-5" />}
            label="Birthdays"
            isActive={isActive("/onboarding/birthdays")}
          />
          <NavItem
            to="/onboarding/feedback"
            icon={<MessageSquare className="w-5 h-5" />}
            label="Feedback Hub"
            isActive={isActive("/onboarding/feedback")}
          />
          <NavItem
            to="/onboarding/team"
            icon={<Users className="w-5 h-5" />}
            label="Team Structure"
            isActive={isActive("/onboarding/team")}
          />
          <NavItem
            to="/onboarding/culture"
            icon={<Heart className="w-5 h-5" />}
            label="Culture & Values"
            isActive={isActive("/onboarding/culture")}
          />
        </NavGroup>

        {/* Post-Onboarding */}
        <NavGroup title="Post-Onboarding" color="bg-success">
          <NavItem
            to="/post-onboarding/learning"
            icon={<GraduationCap className="w-5 h-5" />}
            label="Continuous Learning"
            isActive={isActive("/post-onboarding/learning")}
          />
          <NavItem
            to="/post-onboarding/mentorship"
            icon={<UserCheck className="w-5 h-5" />}
            label="Mentorship"
            isActive={isActive("/post-onboarding/mentorship")}
          />
          <NavItem
            to="/post-onboarding/performance"
            icon={<TrendingUp className="w-5 h-5" />}
            label="Performance Dashboard"
            isActive={isActive("/post-onboarding/performance")}
          />
          <NavItem
            to="/post-onboarding/wellness"
            icon={<Smile className="w-5 h-5" />}
            label="Wellness Center"
            isActive={isActive("/post-onboarding/wellness")}
          />
          <NavItem
            to="/post-onboarding/career"
            icon={<Compass className="w-5 h-5" />}
            label="Career Navigator"
            isActive={isActive("/post-onboarding/career")}
          />
        </NavGroup>

        {/* Community */}
        <NavGroup title="Community" color="bg-stage-community">
          <NavItem
            to="/community/stories"
            icon={<BookOpen className="w-5 h-5" />}
            label="Employee Stories"
            isActive={isActive("/community/stories")}
          />
          <NavItem
            to="/community/events"
            icon={<Calendar className="w-5 h-5" />}
            label="Events & Announcements"
            isActive={isActive("/community/events")}
          />
        </NavGroup>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
            <span className="text-accent-foreground font-medium">JC</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">James Chen</p>
            <p className="text-xs text-muted-foreground truncate">Software Engineer • Day 5</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
};
