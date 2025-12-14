import { useState, useEffect, useMemo } from "react";
import { Target, Monitor, Gift, Gamepad2, GraduationCap, TrendingUp, Bell, Calendar, Clock, CheckCircle, FileText, Users, MessageSquare, Heart, Megaphone, ArrowRight } from "lucide-react";
import { StageCard } from "@/components/ui/StageCard";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface ModuleProgress {
  name: string;
  progress: number;
  completedItems: number;
  totalItems: number;
  route: string;
  icon: React.ReactNode;
  category: "pre" | "onboarding" | "community";
}

const notifications = [
  { id: 1, title: "Welcome to TechCorp!", message: "Your manager Sarah Chen has sent you a welcome message.", time: "1 hour ago", read: false },
  { id: 2, title: "Document Approved", message: "Your Government ID has been verified successfully.", time: "3 hours ago", read: false },
  { id: 3, title: "New Training Available", message: "Advanced Excel course is now available in your learning path.", time: "Yesterday", read: true },
];

export const Dashboard = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [notificationList, setNotificationList] = useState(notifications);

  // Calculate real progress from localStorage
  const moduleProgress = useMemo((): ModuleProgress[] => {
    // Documents progress
    const docsData = localStorage.getItem("onboarding-documents");
    const documents = docsData ? JSON.parse(docsData) : [];
    const verifiedDocs = documents.filter((d: any) => d.status === "verified" || d.status === "pending").length;
    const totalDocs = documents.length || 5;
    
    // Bank verification
    const bankData = localStorage.getItem("bank-details");
    const bank = bankData ? JSON.parse(bankData) : { verified: false };
    const bankComplete = bank.verified ? 1 : 0;

    // Roadmap progress
    const roadmapData = localStorage.getItem("role-roadmap");
    const roadmap = roadmapData ? JSON.parse(roadmapData) : [];
    const completedPhases = roadmap.filter((r: any) => r.status === "completed").length;
    const totalPhases = roadmap.length || 3;

    // Skills progress
    const skillsData = localStorage.getItem("skill-progress");
    const skills = skillsData ? JSON.parse(skillsData) : [];
    const avgSkillProgress = skills.length > 0 
      ? skills.reduce((acc: number, s: any) => acc + (s.progress || 0), 0) / skills.length 
      : 0;

    // Feedback progress
    const feedbackData = localStorage.getItem("feedback-hub");
    const feedbacks = feedbackData ? JSON.parse(feedbackData) : [];
    const feedbackComplete = feedbacks.length > 0 ? 100 : 0;

    // Stories progress
    const storiesData = localStorage.getItem("employee-stories");
    const stories = storiesData ? JSON.parse(storiesData) : [];
    const userStories = stories.filter((s: any) => !s.id.startsWith("sample-")).length;

    // Events progress
    const eventsData = localStorage.getItem("community-events");
    const events = eventsData ? JSON.parse(eventsData) : [];
    const userId = localStorage.getItem("user-id") || "";
    const attendingEvents = events.filter((e: any) => e.attendees?.includes(userId)).length;

    return [
      {
        name: "Document Submission",
        progress: Math.round(((verifiedDocs + bankComplete) / (totalDocs + 1)) * 100),
        completedItems: verifiedDocs + bankComplete,
        totalItems: totalDocs + 1,
        route: "/pre-onboarding/documents",
        icon: <FileText className="w-4 h-4" />,
        category: "pre",
      },
      {
        name: "Role & Expectations",
        progress: Math.round(((completedPhases / totalPhases) * 50) + (avgSkillProgress / 2)),
        completedItems: completedPhases,
        totalItems: totalPhases,
        route: "/pre-onboarding/role",
        icon: <Target className="w-4 h-4" />,
        category: "pre",
      },
      {
        name: "Feedback Hub",
        progress: feedbackComplete,
        completedItems: feedbacks.length,
        totalItems: 1,
        route: "/onboarding/feedback",
        icon: <MessageSquare className="w-4 h-4" />,
        category: "onboarding",
      },
      {
        name: "Employee Stories",
        progress: userStories > 0 ? 100 : 0,
        completedItems: userStories,
        totalItems: 1,
        route: "/community/stories",
        icon: <Heart className="w-4 h-4" />,
        category: "community",
      },
      {
        name: "Events & Announcements",
        progress: attendingEvents > 0 ? 100 : 0,
        completedItems: attendingEvents,
        totalItems: events.length || 1,
        route: "/community/events",
        icon: <Megaphone className="w-4 h-4" />,
        category: "community",
      },
    ];
  }, []);

  // Calculate category progress
  const categoryProgress = useMemo(() => {
    const preModules = moduleProgress.filter(m => m.category === "pre");
    const onboardingModules = moduleProgress.filter(m => m.category === "onboarding");
    const communityModules = moduleProgress.filter(m => m.category === "community");

    const calcAvg = (modules: ModuleProgress[]) => 
      modules.length > 0 ? Math.round(modules.reduce((acc, m) => acc + m.progress, 0) / modules.length) : 0;

    return {
      pre: calcAvg(preModules),
      onboarding: calcAvg(onboardingModules),
      community: calcAvg(communityModules),
    };
  }, [moduleProgress]);

  const overallProgress = useMemo(() => {
    return Math.round(moduleProgress.reduce((acc, m) => acc + m.progress, 0) / moduleProgress.length);
  }, [moduleProgress]);

  const completedModules = moduleProgress.filter(m => m.progress >= 100).length;

  const recentActivity = useMemo(() => {
    const activities: { title: string; time: string; type: "success" | "progress" | "info" }[] = [];
    
    const feedbackData = localStorage.getItem("feedback-hub");
    if (feedbackData) {
      const feedbacks = JSON.parse(feedbackData);
      if (feedbacks.length > 0) {
        activities.push({
          title: `Submitted ${feedbacks.length} feedback${feedbacks.length > 1 ? "s" : ""}`,
          time: "Recently",
          type: "success",
        });
      }
    }

    const docsData = localStorage.getItem("onboarding-documents");
    if (docsData) {
      const docs = JSON.parse(docsData);
      const uploaded = docs.filter((d: any) => d.status !== "required").length;
      if (uploaded > 0) {
        activities.push({
          title: `Uploaded ${uploaded} document${uploaded > 1 ? "s" : ""}`,
          time: "Recently",
          type: "progress",
        });
      }
    }

    const storiesData = localStorage.getItem("employee-stories");
    if (storiesData) {
      const stories = JSON.parse(storiesData);
      const userStories = stories.filter((s: any) => !s.id.startsWith("sample-")).length;
      if (userStories > 0) {
        activities.push({
          title: `Shared ${userStories} stor${userStories > 1 ? "ies" : "y"}`,
          time: "Recently",
          type: "success",
        });
      }
    }

    if (activities.length === 0) {
      activities.push({ title: "Started onboarding journey", time: "Today", type: "info" });
    }

    return activities.slice(0, 5);
  }, []);

  const upcomingTasks = useMemo(() => {
    const tasks: { title: string; priority: "high" | "medium" | "low"; route: string }[] = [];
    
    const docsData = localStorage.getItem("onboarding-documents");
    if (docsData) {
      const docs = JSON.parse(docsData);
      const required = docs.filter((d: any) => d.status === "required").length;
      if (required > 0) {
        tasks.push({
          title: `Upload ${required} required document${required > 1 ? "s" : ""}`,
          priority: "high",
          route: "/pre-onboarding/documents",
        });
      }
    }

    const feedbackData = localStorage.getItem("feedback-hub");
    if (!feedbackData || JSON.parse(feedbackData).length === 0) {
      tasks.push({
        title: "Submit your first feedback",
        priority: "medium",
        route: "/onboarding/feedback",
      });
    }

    const storiesData = localStorage.getItem("employee-stories");
    if (storiesData) {
      const stories = JSON.parse(storiesData);
      const userStories = stories.filter((s: any) => !s.id.startsWith("sample-")).length;
      if (userStories === 0) {
        tasks.push({
          title: "Share your story with the community",
          priority: "low",
          route: "/community/stories",
        });
      }
    }

    const eventsData = localStorage.getItem("community-events");
    if (eventsData) {
      const events = JSON.parse(eventsData);
      const userId = localStorage.getItem("user-id") || "";
      const notAttending = events.filter((e: any) => !e.attendees?.includes(userId)).length;
      if (notAttending > 0) {
        tasks.push({
          title: `RSVP to ${notAttending} upcoming event${notAttending > 1 ? "s" : ""}`,
          priority: "low",
          route: "/community/events",
        });
      }
    }

    return tasks.slice(0, 4);
  }, []);

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
  };

  const unreadCount = notificationList.filter(n => !n.read).length;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
              Welcome back! 👋
            </h1>
            <p className="text-muted-foreground">
              {completedModules === moduleProgress.length 
                ? "Congratulations! You've completed all onboarding modules!"
                : `You've completed ${completedModules} of ${moduleProgress.length} modules. Keep going!`}
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
          <ProgressRing progress={overallProgress} size={120} strokeWidth={8}>
            <div className="text-center">
              <span className="text-2xl font-bold text-foreground">{overallProgress}%</span>
              <p className="text-xs text-muted-foreground">Complete</p>
            </div>
          </ProgressRing>
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-xl font-semibold text-foreground mb-2">Your Onboarding Progress</h2>
            <p className="text-muted-foreground mb-4">
              {completedModules} of {moduleProgress.length} modules completed
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-info-light rounded-full">
                <div className="w-2 h-2 rounded-full bg-info" />
                <span className="text-sm text-info font-medium">Pre-Onboarding: {categoryProgress.pre}%</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-warning-light rounded-full">
                <div className="w-2 h-2 rounded-full bg-warning" />
                <span className="text-sm text-warning font-medium">Onboarding: {categoryProgress.onboarding}%</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-success-light rounded-full">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="text-sm text-success font-medium">Community: {categoryProgress.community}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Module Progress Grid */}
      <div className="mb-8">
        <h3 className="font-semibold text-foreground mb-4">Module Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {moduleProgress.map((module, index) => (
            <div
              key={index}
              onClick={() => navigate(module.route)}
              className="card-interactive p-4 cursor-pointer hover:border-primary/50 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    module.progress >= 100 ? "bg-success/10 text-success" :
                    module.progress > 0 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}>
                    {module.icon}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{module.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{module.category}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">
                    {module.completedItems} of {module.totalItems} items
                  </span>
                  <span className={`font-medium ${module.progress >= 100 ? "text-success" : "text-foreground"}`}>
                    {module.progress}%
                  </span>
                </div>
                <Progress value={module.progress} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StageCard
          title="Pre-Onboarding"
          description="Set up your workspace and learn about your role"
          icon={<Target className="w-5 h-5" />}
          progress={categoryProgress.pre}
          stage="pre"
          to="/pre-onboarding/role"
          tasks={{ completed: moduleProgress.filter(m => m.category === "pre" && m.progress >= 100).length, total: moduleProgress.filter(m => m.category === "pre").length }}
        />
        <StageCard
          title="Onboarding"
          description="Complete simulations and connect with your team"
          icon={<Gamepad2 className="w-5 h-5" />}
          progress={categoryProgress.onboarding}
          stage="onboarding"
          to="/onboarding/simulations"
          tasks={{ completed: moduleProgress.filter(m => m.category === "onboarding" && m.progress >= 100).length, total: moduleProgress.filter(m => m.category === "onboarding").length }}
        />
        <StageCard
          title="Community"
          description="Connect with colleagues and join events"
          icon={<Users className="w-5 h-5" />}
          progress={categoryProgress.community}
          stage="post"
          to="/community/stories"
          tasks={{ completed: moduleProgress.filter(m => m.category === "community" && m.progress >= 100).length, total: moduleProgress.filter(m => m.category === "community").length }}
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Tasks */}
        <div className="card-interactive p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Pending Tasks</h3>
            <span className="text-xs text-muted-foreground">{upcomingTasks.length} remaining</span>
          </div>
          {upcomingTasks.length > 0 ? (
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div
                  key={index}
                  onClick={() => navigate(task.route)}
                  className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                >
                  <div className={`w-2 h-2 rounded-full ${
                    task.priority === "high" ? "bg-destructive" :
                    task.priority === "medium" ? "bg-warning" : "bg-success"
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{task.title}</p>
                    <p className="text-xs text-muted-foreground capitalize">{task.priority} priority</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 mx-auto mb-3 text-success" />
              <p className="font-medium text-foreground">All tasks completed!</p>
              <p className="text-sm text-muted-foreground">Great job on your onboarding journey</p>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="card-interactive p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {recentActivity.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
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
            { icon: <FileText className="w-5 h-5" />, label: "Documents", to: "/pre-onboarding/documents" },
            { icon: <Target className="w-5 h-5" />, label: "Role & Goals", to: "/pre-onboarding/role" },
            { icon: <MessageSquare className="w-5 h-5" />, label: "Feedback", to: "/onboarding/feedback" },
            { icon: <Megaphone className="w-5 h-5" />, label: "Events", to: "/community/events" },
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
