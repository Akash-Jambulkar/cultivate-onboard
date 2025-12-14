import { useState } from "react";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { Target, Users, TrendingUp, Award, Play, ExternalLink, ChevronRight, Check, Edit2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RoadmapItem {
  day: string;
  title: string;
  items: string[];
  status: "current" | "upcoming" | "completed";
}

interface SkillProgress {
  name: string;
  progress: number;
  videos: number;
  completed: boolean;
}

const initialRoadmap: RoadmapItem[] = [
  { day: "30", title: "Learning Phase", items: ["Complete all onboarding modules", "Meet team members", "Understand processes"], status: "current" },
  { day: "60", title: "Integration Phase", items: ["Start contributing to projects", "Build team relationships", "Identify improvement areas"], status: "upcoming" },
  { day: "90", title: "Impact Phase", items: ["Lead small initiatives", "Demonstrate value", "Set long-term goals"], status: "upcoming" },
];

const initialSkills: SkillProgress[] = [
  { name: "Company Systems", progress: 40, videos: 3, completed: false },
  { name: "Industry Knowledge", progress: 20, videos: 5, completed: false },
  { name: "Team Collaboration", progress: 60, videos: 2, completed: false },
  { name: "Technical Skills", progress: 30, videos: 4, completed: false },
];

const careerPath = [
  { year: "Year 1", role: "Associate", description: "Build foundation and expertise" },
  { year: "Year 2", role: "Senior Associate", description: "Lead projects and mentor others" },
  { year: "Year 3", role: "Manager", description: "Strategic leadership and team management" },
];

const videoResources = [
  { id: 1, title: "Getting Started with Company Tools", duration: "12:30", skill: "Company Systems" },
  { id: 2, title: "Advanced System Features", duration: "18:45", skill: "Company Systems" },
  { id: 3, title: "Industry Trends 2024", duration: "22:10", skill: "Industry Knowledge" },
  { id: 4, title: "Effective Team Communication", duration: "15:20", skill: "Team Collaboration" },
  { id: 5, title: "Technical Best Practices", duration: "25:00", skill: "Technical Skills" },
];

export const RoleExpectations = () => {
  const { toast } = useToast();
  const [roadmap, setRoadmap] = useLocalStorage<RoadmapItem[]>("role-roadmap", initialRoadmap);
  const [skills, setSkills] = useLocalStorage<SkillProgress[]>("skill-progress", initialSkills);
  const [editingRoadmap, setEditingRoadmap] = useState<number | null>(null);
  const [editItems, setEditItems] = useState<string[]>([]);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const handleEditRoadmap = (index: number) => {
    setEditingRoadmap(index);
    setEditItems([...roadmap[index].items]);
  };

  const handleSaveRoadmap = (index: number) => {
    const filteredItems = editItems.filter((item) => item.trim() !== "");
    if (filteredItems.length === 0) {
      toast({
        title: "At least one item required",
        description: "Please add at least one goal for this phase",
        variant: "destructive",
      });
      return;
    }

    setRoadmap((prev) =>
      prev.map((item, i) => (i === index ? { ...item, items: filteredItems } : item))
    );
    setEditingRoadmap(null);
    toast({ title: "Roadmap updated", description: "Your goals have been saved" });
  };

  const handleCompletePhase = (index: number) => {
    setRoadmap((prev) =>
      prev.map((item, i) => {
        if (i === index) return { ...item, status: "completed" as const };
        if (i === index + 1) return { ...item, status: "current" as const };
        return item;
      })
    );
    toast({ title: "Phase completed!", description: "Great work on reaching this milestone!" });
  };

  const handleWatchVideo = (skillName: string) => {
    setSelectedSkill(skillName);
    setVideoDialogOpen(true);
  };

  const handleCompleteVideo = (skillName: string) => {
    setSkills((prev) =>
      prev.map((skill) => {
        if (skill.name === skillName) {
          const newProgress = Math.min(skill.progress + 20, 100);
          return {
            ...skill,
            progress: newProgress,
            completed: newProgress >= 100,
          };
        }
        return skill;
      })
    );
    toast({ title: "Progress updated!", description: `+20% progress on ${skillName}` });
  };

  const filteredVideos = selectedSkill
    ? videoResources.filter((v) => v.skill === selectedSkill)
    : videoResources;

  return (
    <div className="animate-fade-in">
      <PageBreadcrumb items={[{ label: "Pre-Onboarding", to: "/" }, { label: "Role & Expectations" }]} />

      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Role & Expectations</h1>
        <p className="text-muted-foreground">Understand your role, goals, and growth path at the company</p>
      </div>

      {/* 30-60-90 Day Roadmap */}
      <div className="card-interactive p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="icon-circle-primary">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">30-60-90 Day Roadmap</h2>
            <p className="text-sm text-muted-foreground">Your structured path to success</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roadmap.map((item, index) => (
            <div
              key={index}
              className={`p-5 rounded-xl border-2 transition-all ${
                item.status === "completed"
                  ? "border-success bg-success-light"
                  : item.status === "current"
                  ? "border-primary bg-primary-light"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-3xl font-bold ${
                    item.status === "completed" ? "text-success" :
                    item.status === "current" ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {item.day}
                  </span>
                  <span className="text-sm text-muted-foreground">days</span>
                </div>
                {item.status === "completed" && (
                  <Check className="w-6 h-6 text-success" />
                )}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              
              {editingRoadmap === index ? (
                <div className="space-y-2">
                  {editItems.map((editItem, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editItem}
                        onChange={(e) => {
                          const newItems = [...editItems];
                          newItems[i] = e.target.value;
                          setEditItems(newItems);
                        }}
                        className="flex-1 px-2 py-1 rounded border border-input bg-background text-sm"
                        maxLength={100}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => setEditItems(editItems.filter((_, idx) => idx !== i))}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setEditItems([...editItems, ""])}
                  >
                    Add Goal
                  </Button>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" className="flex-1" onClick={() => handleSaveRoadmap(index)}>
                      Save
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setEditingRoadmap(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <ul className="space-y-1.5">
                    {item.items.map((listItem, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <ChevronRight className={`w-4 h-4 mt-0.5 ${
                          item.status === "completed" ? "text-success" : "text-primary"
                        }`} />
                        {listItem}
                      </li>
                    ))}
                  </ul>
                  {item.status === "current" && (
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="flex-1" onClick={() => handleCompletePhase(index)}>
                        <Check className="w-4 h-4 mr-1" />
                        Complete
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditRoadmap(index)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  {item.status === "upcoming" && (
                    <Button variant="ghost" size="sm" className="mt-4 w-full" onClick={() => handleEditRoadmap(index)}>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Goals
                    </Button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Team Map */}
        <div className="card-interactive p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="icon-circle-primary">
                <Users className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Team Map</h2>
            </div>
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Full Org
            </Button>
          </div>

          <div className="bg-secondary/50 rounded-xl p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto mb-3 flex items-center justify-center">
              <span className="text-xl font-bold text-primary">SM</span>
            </div>
            <p className="font-semibold text-foreground">Sarah Mitchell</p>
            <p className="text-sm text-muted-foreground mb-4">Director of Engineering</p>

            <div className="flex justify-center gap-4">
              {["MK", "JD", "AR"].map((initials, i) => (
                <div key={i} className="text-center cursor-pointer hover:opacity-80 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-accent mx-auto mb-1 flex items-center justify-center">
                    <span className="text-sm font-medium text-accent-foreground">{initials}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Team Member</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skill Gaps */}
        <div className="card-interactive p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="icon-circle-warning">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Skill Gaps & Specialization</h2>
          </div>

          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1.5">
                  <span className={`text-sm font-medium ${skill.completed ? "text-success" : "text-foreground"}`}>
                    {skill.name}
                    {skill.completed && " ✓"}
                  </span>
                  <span className="text-xs text-muted-foreground">{skill.videos} videos</span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={skill.progress} className="flex-1" />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => handleWatchVideo(skill.name)}
                    disabled={skill.completed}
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Career Path Preview */}
      <div className="card-interactive p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="icon-circle-success">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Career Path Preview</h2>
            <p className="text-sm text-muted-foreground">Your 1-3 year growth trajectory</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {careerPath.map((stage, index) => (
            <div key={index} className="flex-1 relative">
              <div className="p-5 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors cursor-pointer">
                <span className="text-xs font-semibold text-primary uppercase">{stage.year}</span>
                <h3 className="text-lg font-semibold text-foreground mt-1">{stage.role}</h3>
                <p className="text-sm text-muted-foreground mt-1">{stage.description}</p>
              </div>
              {index < careerPath.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Video Dialog */}
      <Dialog open={videoDialogOpen} onOpenChange={setVideoDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedSkill ? `${selectedSkill} - Training Videos` : "Training Videos"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Play className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{video.title}</p>
                    <p className="text-sm text-muted-foreground">{video.duration}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    handleCompleteVideo(video.skill);
                    setVideoDialogOpen(false);
                  }}
                >
                  Watch & Complete
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
