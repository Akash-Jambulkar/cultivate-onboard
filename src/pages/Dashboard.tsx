import { useState, useEffect } from "react";
import { Target, Monitor, Gift, Gamepad2, GraduationCap, TrendingUp, Bell, Calendar, Clock, CheckCircle, Play, FileText, Users } from "lucide-react";
import { StageCard } from "@/components/ui/StageCard";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const initialTasks = [
  { id: 1, title: "Complete IT Setup Tutorial", time: "Today", priority: "high" as const, route: "/pre-onboarding/it-tutorial" },
  { id: 2, title: "Upload Bank Documents", time: "Tomorrow", priority: "medium" as const, route: "/pre-onboarding/documents" },
  { id: 3, title: "Watch CEO Welcome Video", time: "This Week", priority: "low" as const, route: "/pre-onboarding/welcome-kit" },
  { id: 4, title: "Complete HRMS Simulation", time: "This Week", priority: "medium" as const, route: "/onboarding/simulations" },
];

const initialActivity = [
  { id: 1, title: "Completed Laptop Setup Checklist", time: "2 hours ago", type: "success" as const },
  { id: 2, title: "Started HRMS Simulation", time: "Yesterday", type: "progress" as const },
  { id: 3, title: "Viewed Team Structure", time: "2 days ago", type: "info" as const },
];

const notifications = [
  { id: 1, title: "Welcome to TechCorp!", message: "Your manager Sarah Chen has sent you a welcome message.", time: "1 hour ago", read: false },
  { id: 2, title: "Document Approved", message: "Your Government ID has been verified successfully.", time: "3 hours ago", read: false },
  { id: 3, title: "New Training Available", message: "Advanced Excel course is now available in your learning path.", time: "Yesterday", read: true },
  { id: 4, title: "Team Meeting Scheduled", message: "Weekly standup scheduled for Monday 10:00 AM.", time: "2 days ago", read: true },
];

export const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(initialTasks);
  const [activity, setActivity] = useState(initialActivity);
  const [overallProgress, setOverallProgress] = useState(35);
  const [preProgress, setPreProgress] = useState(60);
  const [onboardingProgress, setOnboardingProgress] = useState(25);
  const [postProgress, setPostProgress] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [notificationList, setNotificationList] = useState(notifications);

  // Simulate real-time progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOverallProgress(prev => Math.min(prev + Math.random() * 0.5, 100));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleStartTask = (task: typeof initialTasks[0]) => {
    toast.success(`Starting: ${task.title}`);
    
    // Add to activity
    const newActivity = {
      id: Date.now(),
      title: `Started ${task.title}`,
      time: "Just now",
      type: "progress" as const,
    };
    setActivity(prev => [newActivity, ...prev.slice(0, 4)]);
    
    // Navigate to the task
    navigate(task.route);
  };

  const handleViewAllTasks = () => {
    toast.info("Viewing all pending tasks", {
      description: "You have 4 tasks to complete this week.",
    });
  };

  const handleViewAllActivity = () => {
    toast.info("Activity History", {
      description: "Showing your complete activity history.",
    });
  };

  const handleNotificationClick = () => {
    setShowNotifications(true);
  };

  const markNotificationRead = (id: number) => {
    setNotificationList(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleScheduleMeeting = () => {
    setShowScheduleDialog(true);
  };

  const confirmSchedule = () => {
    toast.success("Meeting Scheduled!", {
      description: "Your meeting with HR has been scheduled for Monday 2:00 PM.",
    });
    setShowScheduleDialog(false);
    
    const newActivity = {
      id: Date.now(),
      title: "Scheduled meeting with HR",
      time: "Just now",
      type: "success" as const,
    };
    setActivity(prev => [newActivity, ...prev.slice(0, 4)]);
  };

  const unreadCount = notificationList.filter(n => !n.read).length;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
              Welcome back, James! 👋
            </h1>
            <p className="text-muted-foreground">
              Day 5 of your onboarding journey. You're making great progress!
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="relative" onClick={handleNotificationClick}>
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
            <Button onClick={handleScheduleMeeting}>
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Meeting
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="card-interactive p-6 mb-8">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <ProgressRing progress={Math.round(overallProgress)} size={120} strokeWidth={8}>
            <div className="text-center">
              <span className="text-2xl font-bold text-foreground">{Math.round(overallProgress)}%</span>
              <p className="text-xs text-muted-foreground">Complete</p>
            </div>
          </ProgressRing>
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-xl font-semibold text-foreground mb-2">Your Onboarding Progress</h2>
            <p className="text-muted-foreground mb-4">
              You've completed 7 out of 20 tasks. Keep up the great work!
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-info-light rounded-full">
                <div className="w-2 h-2 rounded-full bg-info" />
                <span className="text-sm text-info font-medium">Pre-Onboarding: {preProgress}%</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-warning-light rounded-full">
                <div className="w-2 h-2 rounded-full bg-warning" />
                <span className="text-sm text-warning font-medium">Onboarding: {onboardingProgress}%</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-success-light rounded-full">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="text-sm text-success font-medium">Post-Onboarding: {postProgress}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StageCard
          title="Pre-Onboarding"
          description="Set up your workspace and learn about your role"
          icon={<Target className="w-5 h-5" />}
          progress={preProgress}
          stage="pre"
          to="/pre-onboarding/role"
          tasks={{ completed: 3, total: 5 }}
        />
        <StageCard
          title="Onboarding"
          description="Complete simulations and connect with your team"
          icon={<Gamepad2 className="w-5 h-5" />}
          progress={onboardingProgress}
          stage="onboarding"
          to="/onboarding/simulations"
          tasks={{ completed: 2, total: 8 }}
        />
        <StageCard
          title="Post-Onboarding"
          description="Continue learning and track your performance"
          icon={<GraduationCap className="w-5 h-5" />}
          progress={postProgress}
          stage="post"
          to="/post-onboarding/learning"
          tasks={{ completed: 0, total: 7 }}
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Tasks */}
        <div className="card-interactive p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Upcoming Tasks</h3>
            <Button variant="ghost" size="sm" onClick={handleViewAllTasks}>View All</Button>
          </div>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className={`w-2 h-2 rounded-full ${
                  task.priority === "high" ? "bg-destructive" :
                  task.priority === "medium" ? "bg-warning" : "bg-success"
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{task.title}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {task.time}
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleStartTask(task)}>
                  Start
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card-interactive p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Recent Activity</h3>
            <Button variant="ghost" size="sm" onClick={handleViewAllActivity}>View All</Button>
          </div>
          <div className="space-y-3">
            {activity.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3"
              >
                <div className={`icon-circle ${
                  item.type === "success" ? "bg-success/10 text-success" :
                  item.type === "progress" ? "bg-warning/10 text-warning" : "bg-info/10 text-info"
                }`}>
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-8">
        <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Monitor className="w-5 h-5" />, label: "IT Setup", to: "/pre-onboarding/it-tutorial" },
            { icon: <Gift className="w-5 h-5" />, label: "Welcome Kit", to: "/pre-onboarding/welcome-kit" },
            { icon: <Gamepad2 className="w-5 h-5" />, label: "Simulations", to: "/onboarding/simulations" },
            { icon: <TrendingUp className="w-5 h-5" />, label: "Performance", to: "/post-onboarding/performance" },
          ].map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.to)}
              className="card-interactive p-4 flex flex-col items-center gap-2 text-center group cursor-pointer"
            >
              <div className="icon-circle-primary group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <span className="text-sm font-medium text-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications Dialog */}
      <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {notificationList.map((notif) => (
              <div
                key={notif.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${notif.read ? 'bg-secondary/30' : 'bg-primary/5 border border-primary/20'}`}
                onClick={() => markNotificationRead(notif.id)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className={`text-sm font-medium ${notif.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                      {notif.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
                  </div>
                  {!notif.read && <div className="w-2 h-2 rounded-full bg-primary mt-1" />}
                </div>
                <p className="text-xs text-muted-foreground mt-2">{notif.time}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Meeting Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Schedule a Meeting
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Schedule a meeting with HR or your manager to discuss your onboarding progress.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Sarah Chen", role: "Manager", time: "Mon 10:00 AM" },
                { name: "Emily Rodriguez", role: "HR", time: "Mon 2:00 PM" },
                { name: "Mike Johnson", role: "Buddy", time: "Tue 11:00 AM" },
                { name: "David Lee", role: "Mentor", time: "Wed 3:00 PM" },
              ].map((person, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition-colors"
                  onClick={confirmSchedule}
                >
                  <p className="font-medium text-foreground text-sm">{person.name}</p>
                  <p className="text-xs text-muted-foreground">{person.role}</p>
                  <p className="text-xs text-primary mt-1">{person.time}</p>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};