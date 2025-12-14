import { useState } from "react";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { Smile, Activity, Heart, Brain, Sun, Moon, Coffee, Zap, Calendar, CheckCircle, TrendingUp, Clock } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

const moodEmojis = [
  { emoji: "😢", label: "Very Low", value: 0 },
  { emoji: "😟", label: "Low", value: 25 },
  { emoji: "😐", label: "Okay", value: 50 },
  { emoji: "😊", label: "Good", value: 75 },
  { emoji: "🤩", label: "Great!", value: 100 },
];

const weeklyEnergy = [
  { day: "Mon", value: 60, mood: "😊" },
  { day: "Tue", value: 75, mood: "😊" },
  { day: "Wed", value: 55, mood: "😐" },
  { day: "Thu", value: 80, mood: "🤩" },
  { day: "Fri", value: 70, mood: "😊" },
  { day: "Sat", value: 85, mood: "🤩" },
  { day: "Sun", value: 90, mood: "🤩" },
];

const wellnessResources = [
  { id: 1, title: "5-Minute Meditation", category: "Mental", duration: "5 min", icon: <Brain className="w-5 h-5" /> },
  { id: 2, title: "Desk Stretches", category: "Physical", duration: "10 min", icon: <Activity className="w-5 h-5" /> },
  { id: 3, title: "Breathing Exercise", category: "Mental", duration: "3 min", icon: <Heart className="w-5 h-5" /> },
  { id: 4, title: "Walking Break", category: "Physical", duration: "15 min", icon: <Sun className="w-5 h-5" /> },
  { id: 5, title: "Power Nap Guide", category: "Rest", duration: "20 min", icon: <Moon className="w-5 h-5" /> },
  { id: 6, title: "Healthy Snacking Tips", category: "Nutrition", duration: "Read", icon: <Coffee className="w-5 h-5" /> },
];

const wellnessGoals = [
  { id: 1, name: "Daily Meditation", target: 7, current: 4, unit: "days this week" },
  { id: 2, name: "Exercise Sessions", target: 3, current: 2, unit: "sessions this week" },
  { id: 3, name: "8 Hours Sleep", target: 7, current: 5, unit: "nights this week" },
  { id: 4, name: "Water Intake", target: 8, current: 6, unit: "glasses today" },
];

const moodHistory = [
  { date: "Dec 13", mood: 80, note: "Great team lunch!" },
  { date: "Dec 12", mood: 70, note: "Productive day" },
  { date: "Dec 11", mood: 55, note: "Bit tired, need more sleep" },
  { date: "Dec 10", mood: 75, note: "Good progress on project" },
  { date: "Dec 9", mood: 85, note: "Finished first week! 🎉" },
];

export const Wellness = () => {
  const [moodValue, setMoodValue] = useState([70]);
  const [showMoodDialog, setShowMoodDialog] = useState(false);
  const [moodNote, setMoodNote] = useState("");
  const [showResourceDialog, setShowResourceDialog] = useState(false);
  const [selectedResource, setSelectedResource] = useState<typeof wellnessResources[0] | null>(null);
  const [completedResources, setCompletedResources] = useState<number[]>([]);
  const [loggedMoods, setLoggedMoods] = useState(moodHistory);

  const currentMoodEmoji = moodEmojis.reduce((prev, curr) => 
    Math.abs(curr.value - moodValue[0]) < Math.abs(prev.value - moodValue[0]) ? curr : prev
  );

  const handleLogMood = () => {
    const newMood = {
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mood: moodValue[0],
      note: moodNote || currentMoodEmoji.label,
    };
    
    setLoggedMoods(prev => [newMood, ...prev.slice(0, 4)]);
    toast.success("Mood logged!", {
      description: `You're feeling ${currentMoodEmoji.label.toLowerCase()} today.`,
    });
    setShowMoodDialog(false);
    setMoodNote("");
  };

  const handleStartResource = (resource: typeof wellnessResources[0]) => {
    setSelectedResource(resource);
    setShowResourceDialog(true);
  };

  const completeResource = () => {
    if (!selectedResource) return;
    
    setCompletedResources(prev => [...prev, selectedResource.id]);
    toast.success("Activity completed!", {
      description: `Great job completing ${selectedResource.title}!`,
    });
    setShowResourceDialog(false);
  };

  const averageMood = Math.round(loggedMoods.reduce((sum, m) => sum + m.mood, 0) / loggedMoods.length);

  return (
    <div className="animate-fade-in">
      <PageBreadcrumb items={[{ label: "Post-Onboarding", to: "/" }, { label: "Wellness Center" }]} />
      
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Wellness Center</h1>
        <p className="text-muted-foreground">Take care of your mental and physical health</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="card-interactive p-4 text-center">
          <div className="icon-circle-primary mx-auto mb-2">
            <Smile className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-foreground">{averageMood}%</p>
          <p className="text-sm text-muted-foreground">Avg Mood</p>
        </div>
        <div className="card-interactive p-4 text-center">
          <div className="icon-circle-success mx-auto mb-2">
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-foreground">+12%</p>
          <p className="text-sm text-muted-foreground">This Week</p>
        </div>
        <div className="card-interactive p-4 text-center">
          <div className="icon-circle-warning mx-auto mb-2">
            <Zap className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-foreground">{completedResources.length}</p>
          <p className="text-sm text-muted-foreground">Activities Done</p>
        </div>
        <div className="card-interactive p-4 text-center">
          <div className="icon-circle-info mx-auto mb-2">
            <Calendar className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-foreground">5</p>
          <p className="text-sm text-muted-foreground">Day Streak</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Mood Meter */}
        <div className="card-interactive p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="icon-circle-primary">
              <Smile className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Mood Meter</h2>
          </div>
          
          <p className="text-muted-foreground mb-4">How are you feeling today?</p>
          
          <div className="text-center mb-6">
            <span className="text-6xl">{currentMoodEmoji.emoji}</span>
            <p className="text-lg font-medium text-foreground mt-2">{currentMoodEmoji.label}</p>
          </div>
          
          <div className="flex justify-between text-2xl mb-2 px-2">
            {moodEmojis.map((m) => (
              <span 
                key={m.value} 
                className={`cursor-pointer transition-transform ${moodValue[0] >= m.value - 12.5 && moodValue[0] <= m.value + 12.5 ? 'scale-125' : 'opacity-50'}`}
                onClick={() => setMoodValue([m.value])}
              >
                {m.emoji}
              </span>
            ))}
          </div>
          
          <Slider 
            value={moodValue} 
            onValueChange={setMoodValue}
            max={100} 
            step={1} 
            className="mb-6" 
          />
          
          <Button className="w-full" onClick={() => setShowMoodDialog(true)}>
            Log Mood
          </Button>
        </div>

        {/* Energy Levels */}
        <div className="card-interactive p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="icon-circle-success">
              <Activity className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Weekly Energy</h2>
          </div>
          
          <div className="h-40 bg-gradient-to-t from-success/20 to-success/5 rounded-xl flex items-end justify-around p-4">
            {weeklyEnergy.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-lg">{day.mood}</span>
                <div 
                  className="w-8 bg-success rounded-t transition-all hover:bg-success/80"
                  style={{ height: `${day.value}%` }}
                />
                <span className="text-xs text-muted-foreground">{day.day}</span>
              </div>
            ))}
          </div>
          
          <p className="text-sm text-muted-foreground text-center mt-4">
            Your energy is trending <span className="text-success font-medium">upward</span> this week!
          </p>
        </div>
      </div>

      {/* Wellness Goals */}
      <div className="card-interactive p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="icon-circle-warning">
            <Heart className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Weekly Wellness Goals</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wellnessGoals.map((goal) => (
            <div key={goal.id} className="p-4 rounded-lg bg-secondary/30">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground text-sm">{goal.name}</span>
                <span className="text-sm text-primary font-medium">{goal.current}/{goal.target}</span>
              </div>
              <Progress value={(goal.current / goal.target) * 100} className="mb-1" />
              <span className="text-xs text-muted-foreground">{goal.unit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Wellness Resources */}
      <div className="card-interactive p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="icon-circle-info">
            <Brain className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Quick Wellness Activities</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wellnessResources.map((resource) => (
            <div 
              key={resource.id}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                completedResources.includes(resource.id) 
                  ? 'border-success bg-success-light' 
                  : 'border-border hover:border-primary/30 bg-card'
              }`}
              onClick={() => !completedResources.includes(resource.id) && handleStartResource(resource)}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${completedResources.includes(resource.id) ? 'bg-success/20 text-success' : 'bg-primary/10 text-primary'}`}>
                  {completedResources.includes(resource.id) ? <CheckCircle className="w-5 h-5" /> : resource.icon}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{resource.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{resource.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {resource.duration}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mood History */}
      <div className="card-interactive p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="icon-circle-primary">
            <Calendar className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Mood History</h2>
        </div>
        
        <div className="space-y-3">
          {loggedMoods.map((entry, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30">
              <span className="text-2xl">
                {moodEmojis.reduce((prev, curr) => 
                  Math.abs(curr.value - entry.mood) < Math.abs(prev.value - entry.mood) ? curr : prev
                ).emoji}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground text-sm">{entry.date}</span>
                  <span className="text-sm text-primary">{entry.mood}%</span>
                </div>
                <p className="text-xs text-muted-foreground">{entry.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Log Mood Dialog */}
      <Dialog open={showMoodDialog} onOpenChange={setShowMoodDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Smile className="w-5 h-5 text-primary" />
              Log Your Mood
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="text-center mb-6">
              <span className="text-5xl">{currentMoodEmoji.emoji}</span>
              <p className="text-lg font-medium text-foreground mt-2">{currentMoodEmoji.label}</p>
              <p className="text-sm text-muted-foreground">Mood score: {moodValue[0]}%</p>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Add a note (optional)
              </label>
              <textarea
                className="w-full p-3 rounded-lg border border-input bg-background text-sm resize-none"
                rows={3}
                placeholder="What's contributing to your mood today?"
                value={moodNote}
                onChange={(e) => setMoodNote(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowMoodDialog(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleLogMood}>
                Log Mood
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Resource Dialog */}
      <Dialog open={showResourceDialog} onOpenChange={setShowResourceDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedResource?.icon}
              {selectedResource?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedResource && (
            <div className="py-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                  {selectedResource.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedResource.duration}
                </span>
              </div>

              <div className="bg-secondary/50 rounded-xl p-6 text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                  {selectedResource.icon}
                </div>
                <p className="text-foreground font-medium">Activity in progress...</p>
                <p className="text-sm text-muted-foreground mt-1">Take your time and focus on your wellbeing</p>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {selectedResource.category === "Mental" && "Find a quiet space, close your eyes, and focus on your breathing. Let your thoughts come and go without judgment."}
                {selectedResource.category === "Physical" && "Stand up, stretch your arms above your head, roll your shoulders, and do some gentle neck rotations. Take deep breaths."}
                {selectedResource.category === "Rest" && "Find a comfortable position, set a timer, and allow yourself to fully relax. It's okay to take a break!"}
                {selectedResource.category === "Nutrition" && "Stay hydrated, choose whole foods when possible, and remember that small changes add up over time."}
              </p>

              <Button className="w-full" onClick={completeResource}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark as Complete
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};