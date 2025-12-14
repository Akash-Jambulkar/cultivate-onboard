import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { Heart, Play, Check, X, Sparkles, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const culturalVideos = [
  { id: 1, title: "Communication Styles", duration: "4:30", completed: true },
  { id: 2, title: "Meeting Etiquette", duration: "3:15", completed: true },
  { id: 3, title: "Collaboration Tools", duration: "5:00", completed: false },
  { id: 4, title: "Feedback Culture", duration: "4:45", completed: false },
];

const dosAndDonts = {
  dos: [
    "Speak up in meetings - your voice matters",
    "Give and receive feedback gracefully",
    "Take ownership of your work",
    "Collaborate across teams",
    "Celebrate wins, big and small",
  ],
  donts: [
    "Stay silent if you disagree",
    "Work in silos",
    "Skip documentation",
    "Ignore team rituals",
    "Hesitate to ask for help",
  ],
};

const rituals = [
  { name: "Monday Kickoff", time: "10:00 AM", description: "Weekly team alignment", icon: <Calendar className="w-5 h-5" /> },
  { name: "Demo Friday", time: "4:00 PM", description: "Share what you've built", icon: <Sparkles className="w-5 h-5" /> },
  { name: "Coffee Roulette", time: "Bi-weekly", description: "Random 1:1 connections", icon: <Users className="w-5 h-5" /> },
];

export const Culture = () => {
  return (
    <div className="animate-fade-in">
      <PageBreadcrumb items={[{ label: "Onboarding", to: "/" }, { label: "Culture & Values" }]} />

      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Culture & Values</h1>
        <p className="text-muted-foreground">Understand how we work together</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Micro-learning Videos */}
          <div className="card-interactive p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="icon-circle-primary">
                <Play className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Cultural Micro-learning</h2>
                <p className="text-sm text-muted-foreground">Short videos to understand our culture</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {culturalVideos.map((video) => (
                <div
                  key={video.id}
                  className={`p-4 rounded-xl border transition-all cursor-pointer
                    ${video.completed ? "border-success bg-success-light/30" : "border-border hover:border-primary/30"}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                      ${video.completed ? "bg-success/20 text-success" : "bg-primary/10 text-primary"}
                    `}>
                      {video.completed ? <Check className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{video.title}</p>
                      <p className="text-sm text-muted-foreground">{video.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Do's and Don'ts */}
          <div className="card-interactive p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="icon-circle-warning">
                <Heart className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Cross-functional Etiquette</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Do's */}
              <div>
                <h3 className="font-semibold text-success mb-3 flex items-center gap-2">
                  <Check className="w-5 h-5" /> Do's
                </h3>
                <ul className="space-y-2">
                  {dosAndDonts.dos.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Don'ts */}
              <div>
                <h3 className="font-semibold text-destructive mb-3 flex items-center gap-2">
                  <X className="w-5 h-5" /> Don'ts
                </h3>
                <ul className="space-y-2">
                  {dosAndDonts.donts.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <X className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Rituals & Traditions */}
          <div className="card-interactive p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-circle-success">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Rituals & Traditions</h2>
            </div>

            <div className="space-y-4">
              {rituals.map((ritual, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50">
                  <div className="icon-circle-primary">
                    {ritual.icon}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{ritual.name}</p>
                    <p className="text-sm text-primary">{ritual.time}</p>
                    <p className="text-xs text-muted-foreground">{ritual.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Values */}
          <div className="card-interactive p-6">
            <h3 className="font-semibold text-foreground mb-4">Core Values</h3>
            <div className="space-y-3">
              {["Innovation", "Integrity", "Collaboration", "Excellence"].map((value, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="font-medium text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full">
            <Play className="w-4 h-4 mr-2" />
            Watch Culture Reel
          </Button>
        </div>
      </div>
    </div>
  );
};
