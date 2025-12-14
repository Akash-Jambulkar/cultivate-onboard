import { useState } from "react";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { TrendingUp, Target, Award, Users, Calendar, CheckCircle, Clock, Star, ChevronRight, Edit, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const initialGoals = [
  { 
    id: 1,
    name: "Complete Onboarding", 
    progress: 100, 
    target: "100%",
    category: "30-Day",
    description: "Finish all onboarding modules and get up to speed with the team.",
    milestones: [
      { name: "Complete IT Setup", done: true },
      { name: "Meet team members", done: true },
      { name: "Finish training modules", done: true },
    ]
  },
  { 
    id: 2,
    name: "First Project Contribution", 
    progress: 75, 
    target: "1 PR merged",
    category: "30-Day",
    description: "Make your first meaningful code contribution to the codebase.",
    milestones: [
      { name: "Set up development environment", done: true },
      { name: "Understand codebase structure", done: true },
      { name: "Submit first PR", done: true },
      { name: "Get PR approved and merged", done: false },
    ]
  },
  { 
    id: 3,
    name: "Team Integration", 
    progress: 60, 
    target: "Meet all team members",
    category: "60-Day",
    description: "Build relationships with all team members and understand their roles.",
    milestones: [
      { name: "Attend team meetings", done: true },
      { name: "1:1 with manager", done: true },
      { name: "Meet cross-functional partners", done: true },
      { name: "Coffee chats with all teammates", done: false },
      { name: "Understand team dynamics", done: false },
    ]
  },
  { 
    id: 4,
    name: "Training Completion", 
    progress: 40, 
    target: "5 courses",
    category: "90-Day",
    description: "Complete required training courses and certifications.",
    milestones: [
      { name: "Data Analysis with Python", done: true },
      { name: "Advanced Excel", done: false },
      { name: "Project Management", done: false },
      { name: "Communication Skills", done: false },
      { name: "Cloud Architecture", done: false },
    ]
  },
];

const stats = [
  { label: "Goals Met", value: "1/4", icon: <Target className="w-5 h-5" />, color: "text-primary", subtext: "On track" },
  { label: "Achievements", value: "7", icon: <Award className="w-5 h-5" />, color: "text-success", subtext: "This quarter" },
  { label: "Peer Feedback", value: "92%", icon: <Users className="w-5 h-5" />, color: "text-warning", subtext: "Positive" },
  { label: "Growth", value: "+15%", icon: <TrendingUp className="w-5 h-5" />, color: "text-info", subtext: "vs. expected" },
];

const achievements = [
  { id: 1, name: "Quick Starter", description: "Completed onboarding in record time", date: "Dec 10", icon: "🚀" },
  { id: 2, name: "Team Player", description: "Helped a teammate with a blocker", date: "Dec 12", icon: "🤝" },
  { id: 3, name: "First Code", description: "Submitted your first pull request", date: "Dec 13", icon: "💻" },
];

const feedbackHistory = [
  { from: "Sarah Chen", role: "Manager", date: "Dec 12", type: "positive", comment: "Great job on ramping up quickly! Your questions in meetings show genuine curiosity." },
  { from: "Mike Johnson", role: "Buddy", date: "Dec 10", type: "positive", comment: "Really impressed with how fast you picked up our codebase. Keep it up!" },
];

export const Performance = () => {
  const [goals, setGoals] = useState(initialGoals);
  const [selectedGoal, setSelectedGoal] = useState<typeof initialGoals[0] | null>(null);
  const [showGoalDialog, setShowGoalDialog] = useState(false);
  const [showAddGoalDialog, setShowAddGoalDialog] = useState(false);
  const [newGoalName, setNewGoalName] = useState("");
  const [newGoalDescription, setNewGoalDescription] = useState("");

  const handleGoalClick = (goal: typeof initialGoals[0]) => {
    setSelectedGoal(goal);
    setShowGoalDialog(true);
  };

  const toggleMilestone = (goalId: number, milestoneIndex: number) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const updatedMilestones = [...goal.milestones];
        updatedMilestones[milestoneIndex] = { 
          ...updatedMilestones[milestoneIndex], 
          done: !updatedMilestones[milestoneIndex].done 
        };
        const completedCount = updatedMilestones.filter(m => m.done).length;
        const newProgress = Math.round((completedCount / updatedMilestones.length) * 100);
        return { ...goal, milestones: updatedMilestones, progress: newProgress };
      }
      return goal;
    }));

    setSelectedGoal(prev => {
      if (!prev || prev.id !== goalId) return prev;
      const updatedMilestones = [...prev.milestones];
      updatedMilestones[milestoneIndex] = { 
        ...updatedMilestones[milestoneIndex], 
        done: !updatedMilestones[milestoneIndex].done 
      };
      const completedCount = updatedMilestones.filter(m => m.done).length;
      const newProgress = Math.round((completedCount / updatedMilestones.length) * 100);
      return { ...prev, milestones: updatedMilestones, progress: newProgress };
    });

    toast.success("Milestone updated!");
  };

  const addNewGoal = () => {
    if (!newGoalName.trim()) return;
    
    const newGoal = {
      id: Date.now(),
      name: newGoalName,
      progress: 0,
      target: "Custom goal",
      category: "90-Day",
      description: newGoalDescription || "No description provided.",
      milestones: [{ name: "Get started", done: false }],
    };
    
    setGoals(prev => [...prev, newGoal]);
    toast.success("Goal added!", { description: newGoalName });
    setShowAddGoalDialog(false);
    setNewGoalName("");
    setNewGoalDescription("");
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "30-Day": return "bg-success-light text-success";
      case "60-Day": return "bg-warning-light text-warning";
      case "90-Day": return "bg-info-light text-info";
      default: return "bg-secondary text-muted-foreground";
    }
  };

  return (
    <div className="animate-fade-in">
      <PageBreadcrumb items={[{ label: "Post-Onboarding", to: "/" }, { label: "Performance Dashboard" }]} />
      
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">30-60-90 Day Performance</h1>
        <p className="text-muted-foreground">Track your progress and achievements</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <div key={i} className="card-interactive p-5 text-center">
            <div className={`icon-circle mx-auto mb-2 bg-secondary ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.subtext}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Goals */}
        <div className="lg:col-span-2 card-interactive p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="icon-circle-primary">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Goals Overview</h2>
            </div>
            <Button size="sm" variant="outline" onClick={() => setShowAddGoalDialog(true)}>
              <Plus className="w-4 h-4 mr-1" />
              Add Goal
            </Button>
          </div>
          
          <div className="space-y-4">
            {goals.map((goal) => (
              <div 
                key={goal.id}
                className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-colors"
                onClick={() => handleGoalClick(goal)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCategoryColor(goal.category)}`}>
                      {goal.category}
                    </span>
                    <span className="font-medium text-foreground">{goal.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-primary">{goal.progress}%</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                <Progress value={goal.progress} />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">Target: {goal.target}</span>
                  <span className="text-xs text-muted-foreground">
                    {goal.milestones.filter(m => m.done).length}/{goal.milestones.length} milestones
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="card-interactive p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="icon-circle-warning">
              <Award className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Recent Achievements</h2>
          </div>
          
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="p-3 rounded-lg bg-secondary/50">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <p className="font-medium text-foreground text-sm">{achievement.name}</p>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback History */}
      <div className="card-interactive p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="icon-circle-success">
            <Star className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Recent Feedback</h2>
        </div>
        
        <div className="space-y-4">
          {feedbackHistory.map((feedback, i) => (
            <div key={i} className="p-4 rounded-lg bg-secondary/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">
                      {feedback.from.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{feedback.from}</p>
                    <p className="text-xs text-muted-foreground">{feedback.role}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{feedback.date}</span>
              </div>
              <p className="text-sm text-muted-foreground italic">"{feedback.comment}"</p>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-4">
          Request Feedback
        </Button>
      </div>

      {/* Goal Detail Dialog */}
      <Dialog open={showGoalDialog} onOpenChange={setShowGoalDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              {selectedGoal?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedGoal && (
            <div className="py-4">
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCategoryColor(selectedGoal.category)}`}>
                  {selectedGoal.category}
                </span>
                <span className="text-sm text-muted-foreground">Target: {selectedGoal.target}</span>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4">{selectedGoal.description}</p>
              
              <Progress value={selectedGoal.progress} className="mb-2" />
              <p className="text-sm text-muted-foreground mb-4">{selectedGoal.progress}% complete</p>

              <h4 className="font-medium text-foreground mb-3">Milestones:</h4>
              <div className="space-y-2">
                {selectedGoal.milestones.map((milestone, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      milestone.done ? 'bg-success-light' : 'bg-secondary/50 hover:bg-secondary'
                    }`}
                    onClick={() => toggleMilestone(selectedGoal.id, index)}
                  >
                    {milestone.done ? (
                      <CheckCircle className="w-5 h-5 text-success" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                    )}
                    <span className={`text-sm ${milestone.done ? 'text-success line-through' : 'text-foreground'}`}>
                      {milestone.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Goal Dialog */}
      <Dialog open={showAddGoalDialog} onOpenChange={setShowAddGoalDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Add New Goal
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Goal Name</label>
              <Input
                placeholder="e.g., Learn GraphQL"
                value={newGoalName}
                onChange={(e) => setNewGoalName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Description (optional)</label>
              <Textarea
                placeholder="Describe your goal..."
                value={newGoalDescription}
                onChange={(e) => setNewGoalDescription(e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowAddGoalDialog(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={addNewGoal}>
                Add Goal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};