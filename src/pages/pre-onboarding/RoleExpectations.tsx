import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { Target, Users, TrendingUp, Award, Play, ExternalLink, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const roadmapItems = [
  { day: "30", title: "Learning Phase", items: ["Complete all onboarding modules", "Meet team members", "Understand processes"], status: "current" },
  { day: "60", title: "Integration Phase", items: ["Start contributing to projects", "Build team relationships", "Identify improvement areas"], status: "upcoming" },
  { day: "90", title: "Impact Phase", items: ["Lead small initiatives", "Demonstrate value", "Set long-term goals"], status: "upcoming" },
];

const skillGaps = [
  { name: "Company Systems", progress: 40, videos: 3 },
  { name: "Industry Knowledge", progress: 20, videos: 5 },
  { name: "Team Collaboration", progress: 60, videos: 2 },
  { name: "Technical Skills", progress: 30, videos: 4 },
];

const careerPath = [
  { year: "Year 1", role: "Associate", description: "Build foundation and expertise" },
  { year: "Year 2", role: "Senior Associate", description: "Lead projects and mentor others" },
  { year: "Year 3", role: "Manager", description: "Strategic leadership and team management" },
];

export const RoleExpectations = () => {
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
          {roadmapItems.map((item, index) => (
            <div
              key={index}
              className={`p-5 rounded-xl border-2 transition-all ${
                item.status === "current"
                  ? "border-primary bg-primary-light"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-3xl font-bold ${item.status === "current" ? "text-primary" : "text-muted-foreground"}`}>
                  {item.day}
                </span>
                <span className="text-sm text-muted-foreground">days</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <ul className="space-y-1.5">
                {item.items.map((listItem, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-primary" />
                    {listItem}
                  </li>
                ))}
              </ul>
              {item.status === "current" && (
                <Button size="sm" className="mt-4 w-full">Edit Targets</Button>
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
                <div key={i} className="text-center">
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
            {skillGaps.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  <span className="text-xs text-muted-foreground">{skill.videos} videos</span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={skill.progress} className="flex-1" />
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
              <div className="p-5 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors">
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
    </div>
  );
};
