import { useState } from "react";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { Compass, ChevronRight, GraduationCap, Clock, Target, Star, Award, Users, TrendingUp, CheckCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

const careerPaths = [
  { 
    role: "Senior Software Engineer", 
    timeline: "1-2 years", 
    skills: ["System Design", "Code Review", "Mentoring Junior Devs", "Technical Documentation"], 
    training: 3,
    salary: "$140K - $180K",
    description: "Lead technical projects and mentor junior team members while delivering high-quality code.",
    requirements: [
      { name: "Complete 3 technical courses", completed: true },
      { name: "Lead 2 project deliveries", completed: true },
      { name: "Mentor 1 junior developer", completed: false },
      { name: "Achieve 'Exceeds Expectations' rating", completed: false },
    ],
    courses: ["Advanced System Design", "Technical Leadership", "Effective Code Reviews"],
    progress: 50,
  },
  { 
    role: "Tech Lead", 
    timeline: "2-3 years", 
    skills: ["Architecture", "Team Leadership", "Technical Strategy", "Cross-team Collaboration"], 
    training: 5,
    salary: "$160K - $200K",
    description: "Own technical direction for a team, make architectural decisions, and drive engineering excellence.",
    requirements: [
      { name: "2+ years as Senior Engineer", completed: false },
      { name: "Lead architecture for major project", completed: false },
      { name: "Complete leadership training", completed: false },
      { name: "Strong peer recommendations", completed: false },
    ],
    courses: ["Software Architecture Patterns", "Leading Engineering Teams", "Strategic Technical Planning", "Stakeholder Management", "Building High-Performance Teams"],
    progress: 0,
  },
  { 
    role: "Engineering Manager", 
    timeline: "3-5 years", 
    skills: ["People Management", "Resource Planning", "Hiring", "Performance Management", "Budget Ownership"], 
    training: 4,
    salary: "$180K - $250K",
    description: "Lead and grow a team of engineers, owning their career development and team performance.",
    requirements: [
      { name: "3+ years of technical experience", completed: false },
      { name: "Complete management certification", completed: false },
      { name: "Successfully mentor 3+ engineers", completed: false },
      { name: "Demonstrate people leadership skills", completed: false },
    ],
    courses: ["People Management 101", "Hiring & Interviewing", "Performance Conversations", "Engineering Team Dynamics"],
    progress: 0,
  },
  { 
    role: "Staff Engineer", 
    timeline: "4-6 years", 
    skills: ["Technical Vision", "Cross-org Influence", "System Thinking", "Technical Roadmaps"], 
    training: 4,
    salary: "$200K - $280K",
    description: "Drive technical direction across multiple teams, solve the hardest problems, and shape company-wide engineering practices.",
    requirements: [
      { name: "4+ years as Senior/Tech Lead", completed: false },
      { name: "Significant cross-org impact", completed: false },
      { name: "Published technical content", completed: false },
      { name: "Industry recognition", completed: false },
    ],
    courses: ["Technical Strategy & Vision", "Influencing Without Authority", "System Design at Scale", "Technical Writing Excellence"],
    progress: 0,
  },
];

const currentPosition = {
  title: "Software Engineer",
  level: "L3",
  department: "Platform Engineering",
  manager: "Sarah Chen",
  startDate: "December 2024",
  nextReview: "March 2025",
};

const competencies = [
  { name: "Technical Skills", current: 3, target: 4, description: "Coding, architecture, debugging" },
  { name: "Communication", current: 3, target: 4, description: "Written, verbal, presentations" },
  { name: "Leadership", current: 2, target: 3, description: "Mentoring, decision making" },
  { name: "Impact", current: 2, target: 3, description: "Scope and influence of work" },
  { name: "Collaboration", current: 4, target: 4, description: "Teamwork, cross-functional work" },
];

export const Career = () => {
  const [selectedPath, setSelectedPath] = useState<typeof careerPaths[0] | null>(null);
  const [showPathDialog, setShowPathDialog] = useState(false);
  const [interestedPaths, setInterestedPaths] = useState<string[]>([]);

  const handleExplore = (path: typeof careerPaths[0]) => {
    setSelectedPath(path);
    setShowPathDialog(true);
  };

  const toggleInterest = (role: string) => {
    setInterestedPaths(prev => {
      if (prev.includes(role)) {
        toast.info(`Removed ${role} from your interests`);
        return prev.filter(p => p !== role);
      } else {
        toast.success(`Added ${role} to your career interests!`, {
          description: "Your manager will be notified of your interests.",
        });
        return [...prev, role];
      }
    });
  };

  return (
    <div className="animate-fade-in">
      <PageBreadcrumb items={[{ label: "Post-Onboarding", to: "/" }, { label: "Career Navigator" }]} />
      
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Career Navigator</h1>
        <p className="text-muted-foreground">Plan your growth path at TechCorp</p>
      </div>

      {/* Current Position */}
      <div className="card-interactive p-6 mb-6 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="icon-circle-primary">
            <Star className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Your Current Position</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Role</p>
            <p className="font-semibold text-foreground">{currentPosition.title}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Level</p>
            <p className="font-semibold text-foreground">{currentPosition.level}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Department</p>
            <p className="font-semibold text-foreground">{currentPosition.department}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Manager</p>
            <p className="font-semibold text-foreground">{currentPosition.manager}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Start Date</p>
            <p className="font-semibold text-foreground">{currentPosition.startDate}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Next Review</p>
            <p className="font-semibold text-primary">{currentPosition.nextReview}</p>
          </div>
        </div>
      </div>

      {/* Competency Levels */}
      <div className="card-interactive p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="icon-circle-warning">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Competency Levels</h2>
        </div>
        <div className="space-y-4">
          {competencies.map((comp, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <div>
                  <span className="font-medium text-foreground text-sm">{comp.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">({comp.description})</span>
                </div>
                <span className="text-sm font-medium">
                  <span className={comp.current >= comp.target ? "text-success" : "text-primary"}>{comp.current}</span>
                  <span className="text-muted-foreground">/{comp.target}</span>
                </span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`h-2 flex-1 rounded-full ${
                      level <= comp.current
                        ? level <= comp.target ? 'bg-primary' : 'bg-success'
                        : level <= comp.target
                          ? 'bg-primary/20'
                          : 'bg-secondary'
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Career Paths */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Available Career Paths</h2>
        <div className="space-y-4">
          {careerPaths.map((path, i) => (
            <div 
              key={i} 
              className={`card-interactive p-6 ${path.progress > 0 ? 'border-2 border-primary/30' : ''}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`icon-circle ${path.progress > 0 ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{path.role}</h3>
                      {path.progress > 0 && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          In Progress
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {path.timeline}
                      </span>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-4 h-4" />
                        {path.training} courses
                      </span>
                      <span className="text-success font-medium">{path.salary}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleInterest(path.role)}
                  >
                    {interestedPaths.includes(path.role) ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-1 text-success" />
                        Interested
                      </>
                    ) : (
                      "I'm Interested"
                    )}
                  </Button>
                  <Button size="sm" onClick={() => handleExplore(path)}>
                    Explore
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>

              {path.progress > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Progress to promotion</span>
                    <span className="text-sm font-medium text-primary">{path.progress}%</span>
                  </div>
                  <Progress value={path.progress} />
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-4">
                {path.skills.map((skill) => (
                  <span key={skill} className="text-xs bg-secondary px-2 py-1 rounded-full text-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Path Detail Dialog */}
      <Dialog open={showPathDialog} onOpenChange={setShowPathDialog}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-primary" />
              Path to {selectedPath?.role}
            </DialogTitle>
          </DialogHeader>
          
          {selectedPath && (
            <div className="py-4">
              <p className="text-muted-foreground mb-4">{selectedPath.description}</p>
              
              <div className="flex items-center gap-4 text-sm mb-6 p-3 bg-secondary/50 rounded-lg">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  {selectedPath.timeline}
                </span>
                <span className="text-success font-semibold">{selectedPath.salary}</span>
              </div>

              <h4 className="font-semibold text-foreground mb-3">Requirements:</h4>
              <div className="space-y-2 mb-6">
                {selectedPath.requirements.map((req, i) => (
                  <div 
                    key={i}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      req.completed ? 'bg-success-light' : 'bg-secondary/50'
                    }`}
                  >
                    {req.completed ? (
                      <CheckCircle className="w-5 h-5 text-success" />
                    ) : (
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    )}
                    <span className={`text-sm ${req.completed ? 'text-success' : 'text-foreground'}`}>
                      {req.name}
                    </span>
                  </div>
                ))}
              </div>

              <h4 className="font-semibold text-foreground mb-3">Required Training:</h4>
              <div className="space-y-2 mb-6">
                {selectedPath.courses.map((course, i) => (
                  <div 
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary cursor-pointer transition-colors"
                    onClick={() => toast.info(`Opening course: ${course}`)}
                  >
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">{course}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    toast.success("Meeting scheduled!", {
                      description: "Your manager will discuss this career path with you.",
                    });
                    setShowPathDialog(false);
                  }}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Discuss with Manager
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => {
                    toggleInterest(selectedPath.role);
                    setShowPathDialog(false);
                  }}
                >
                  {interestedPaths.includes(selectedPath.role) ? "Remove Interest" : "Mark Interested"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};