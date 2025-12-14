import { useState } from "react";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { Users, ChevronDown, ChevronRight, Mail, Video, Phone, Linkedin, MessageSquare, Play, Building2, User, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  avatar?: string;
  level: number;
  parentId?: number;
  bio?: string;
  location?: string;
  startDate?: string;
  skills?: string[];
}

const teamMembers: TeamMember[] = [
  // Level 1 - CEO
  { id: 1, name: "Michael Chen", role: "CEO & Founder", department: "Executive", email: "michael@techcorp.com", phone: "+1 (555) 100-0001", level: 1, bio: "Visionary leader with 20+ years in tech. Founded TechCorp in 2015.", location: "San Francisco, CA", startDate: "Jan 2015", skills: ["Leadership", "Strategy", "Innovation"] },
  
  // Level 2 - C-Suite
  { id: 2, name: "Sarah Williams", role: "CTO", department: "Technology", email: "sarah@techcorp.com", phone: "+1 (555) 100-0002", level: 2, parentId: 1, bio: "Technology strategist with expertise in cloud architecture and AI.", location: "San Francisco, CA", startDate: "Mar 2016", skills: ["Architecture", "AI/ML", "Cloud"] },
  { id: 3, name: "David Park", role: "CFO", department: "Finance", email: "david@techcorp.com", phone: "+1 (555) 100-0003", level: 2, parentId: 1, bio: "Financial expert with background in investment banking.", location: "New York, NY", startDate: "Jun 2017", skills: ["Finance", "Strategy", "Operations"] },
  { id: 4, name: "Emily Rodriguez", role: "CHRO", department: "People", email: "emily@techcorp.com", phone: "+1 (555) 100-0004", level: 2, parentId: 1, bio: "People-first leader focused on building inclusive cultures.", location: "San Francisco, CA", startDate: "Sep 2018", skills: ["HR", "Culture", "Talent Development"] },
  
  // Level 3 - VPs/Directors
  { id: 5, name: "Alex Thompson", role: "VP of Engineering", department: "Technology", email: "alex@techcorp.com", phone: "+1 (555) 100-0005", level: 3, parentId: 2, bio: "Engineering leader with 15 years of experience.", location: "Seattle, WA", startDate: "Feb 2019", skills: ["Engineering", "Team Building", "Agile"] },
  { id: 6, name: "Jennifer Lee", role: "VP of Product", department: "Product", email: "jennifer@techcorp.com", phone: "+1 (555) 100-0006", level: 3, parentId: 2, bio: "Product visionary with a passion for user experience.", location: "San Francisco, CA", startDate: "Apr 2019", skills: ["Product Strategy", "UX", "Market Research"] },
  { id: 7, name: "Robert Brown", role: "Director of Finance", department: "Finance", email: "robert@techcorp.com", phone: "+1 (555) 100-0007", level: 3, parentId: 3, bio: "Finance professional specializing in SaaS metrics.", location: "New York, NY", startDate: "Jul 2020", skills: ["Financial Planning", "Analytics", "Budgeting"] },
  { id: 8, name: "Lisa Anderson", role: "Director of HR", department: "People", email: "lisa@techcorp.com", phone: "+1 (555) 100-0008", level: 3, parentId: 4, bio: "HR specialist focused on employee engagement.", location: "Austin, TX", startDate: "Jan 2020", skills: ["Recruitment", "Employee Relations", "Benefits"] },
  
  // Level 4 - Managers
  { id: 9, name: "James Wilson", role: "Engineering Manager", department: "Technology", email: "james@techcorp.com", phone: "+1 (555) 100-0009", level: 4, parentId: 5, bio: "Full-stack developer turned manager.", location: "Seattle, WA", startDate: "Mar 2021", skills: ["React", "Node.js", "Team Leadership"] },
  { id: 10, name: "Maria Garcia", role: "Product Manager", department: "Product", email: "maria@techcorp.com", phone: "+1 (555) 100-0010", level: 4, parentId: 6, bio: "Data-driven product manager.", location: "San Francisco, CA", startDate: "May 2021", skills: ["Roadmapping", "Analytics", "Stakeholder Management"] },
  { id: 11, name: "Chris Taylor", role: "Finance Manager", department: "Finance", email: "chris@techcorp.com", phone: "+1 (555) 100-0011", level: 4, parentId: 7, bio: "CPA with tech industry expertise.", location: "New York, NY", startDate: "Aug 2021", skills: ["Accounting", "FP&A", "Compliance"] },
  { id: 12, name: "Amanda White", role: "HR Manager", department: "People", email: "amanda@techcorp.com", phone: "+1 (555) 100-0012", level: 4, parentId: 8, bio: "People operations specialist.", location: "Austin, TX", startDate: "Oct 2021", skills: ["HRIS", "Onboarding", "Culture"] },
  
  // Level 5 - Individual Contributors (Your team)
  { id: 13, name: "John Smith", role: "Senior Software Engineer", department: "Technology", email: "john@techcorp.com", phone: "+1 (555) 100-0013", level: 5, parentId: 9, bio: "That's you! New team member.", location: "Remote", startDate: "Dec 2024", skills: ["React", "TypeScript", "Python"] },
  { id: 14, name: "Sarah Chen", role: "Software Engineer", department: "Technology", email: "sarah.chen@techcorp.com", phone: "+1 (555) 100-0014", level: 5, parentId: 9, bio: "Frontend specialist with design background.", location: "Seattle, WA", startDate: "Jun 2022", skills: ["Vue.js", "CSS", "UI Design"] },
  { id: 15, name: "Mike Johnson", role: "Software Engineer", department: "Technology", email: "mike.j@techcorp.com", phone: "+1 (555) 100-0015", level: 5, parentId: 9, bio: "Your onboarding buddy! Backend focused.", location: "Seattle, WA", startDate: "Mar 2022", skills: ["Java", "AWS", "Microservices"] },
];

const teamVideos = [
  { id: 1, title: "Meet the Engineering Team", duration: "4:30", thumbnail: "Team introduction video" },
  { id: 2, title: "Product Team Overview", duration: "3:15", thumbnail: "Product team walkthrough" },
  { id: 3, title: "Company All-Hands Highlights", duration: "8:00", thumbnail: "Recent all-hands meeting" },
];

const departments = [
  { name: "Executive", color: "bg-primary", count: 1 },
  { name: "Technology", color: "bg-info", count: 6 },
  { name: "Finance", color: "bg-success", count: 3 },
  { name: "People", color: "bg-warning", count: 3 },
  { name: "Product", color: "bg-destructive", count: 2 },
];

export const TeamStructure = () => {
  const [expandedLevels, setExpandedLevels] = useState<number[]>([1, 2, 3, 4, 5]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<typeof teamVideos[0] | null>(null);
  const [viewMode, setViewMode] = useState<"hierarchy" | "list">("hierarchy");

  const toggleLevel = (level: number) => {
    setExpandedLevels(prev =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const handleEmail = (member: TeamMember) => {
    window.location.href = `mailto:${member.email}`;
    toast.success(`Opening email to ${member.name}`);
  };

  const handleCall = (member: TeamMember) => {
    toast.info(`Calling ${member.name}`, {
      description: member.phone,
    });
  };

  const handleVideoCall = (member: TeamMember) => {
    toast.success(`Starting video call with ${member.name}`, {
      description: "Connecting to video conference...",
    });
  };

  const handleLinkedIn = (member: TeamMember) => {
    toast.info(`Opening LinkedIn profile for ${member.name}`);
  };

  const handleMessage = (member: TeamMember) => {
    toast.success(`Opening chat with ${member.name}`);
  };

  const handleViewProfile = (member: TeamMember) => {
    setSelectedMember(member);
    setIsProfileOpen(true);
  };

  const handlePlayVideo = (video: typeof teamVideos[0]) => {
    setSelectedVideo(video);
    setIsVideoOpen(true);
  };

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 1: return "Executive Leadership";
      case 2: return "C-Suite";
      case 3: return "Directors & VPs";
      case 4: return "Managers";
      case 5: return "Team Members";
      default: return `Level ${level}`;
    }
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return "bg-primary/10 text-primary border-primary/20";
      case 2: return "bg-info/10 text-info border-info/20";
      case 3: return "bg-warning/10 text-warning border-warning/20";
      case 4: return "bg-success/10 text-success border-success/20";
      case 5: return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getMembersByLevel = (level: number) => {
    return teamMembers.filter(m => m.level === level);
  };

  return (
    <div className="animate-fade-in">
      <PageBreadcrumb items={[{ label: "Onboarding", to: "/" }, { label: "Team Structure" }]} />

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Team Structure</h1>
          <p className="text-muted-foreground">Get to know your colleagues and company hierarchy</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={viewMode === "hierarchy" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("hierarchy")}
          >
            <Building2 className="w-4 h-4 mr-2" />
            Hierarchy
          </Button>
          <Button 
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <Users className="w-4 h-4 mr-2" />
            List View
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Department Summary */}
          <div className="card-interactive p-4 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-circle-primary">
                <Briefcase className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Departments</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {departments.map((dept) => (
                <div 
                  key={dept.name}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary cursor-pointer transition-colors"
                  onClick={() => toast.info(`${dept.name} Department`, { description: `${dept.count} team members` })}
                >
                  <div className={cn("w-3 h-3 rounded-full", dept.color)} />
                  <span className="text-sm font-medium text-foreground">{dept.name}</span>
                  <span className="text-xs text-muted-foreground">({dept.count})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Organization Chart */}
          <div className="card-interactive p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="icon-circle-info">
                <Users className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Organization Chart</h2>
            </div>

            {viewMode === "hierarchy" ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((level) => {
                  const members = getMembersByLevel(level);
                  const isExpanded = expandedLevels.includes(level);
                  
                  return (
                    <div key={level} className="border border-border rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleLevel(level)}
                        className="w-full flex items-center justify-between p-4 bg-secondary/30 hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                          )}
                          <span className={cn("px-3 py-1 rounded-full text-xs font-semibold border", getLevelColor(level))}>
                            Level {level}
                          </span>
                          <span className="font-medium text-foreground">{getLevelLabel(level)}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{members.length} members</span>
                      </button>
                      
                      {isExpanded && (
                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                          {members.map((member) => (
                            <div
                              key={member.id}
                              className={cn(
                                "flex items-center justify-between p-4 rounded-xl bg-background border border-border hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer",
                                member.name === "John Smith" && "ring-2 ring-primary bg-primary/5"
                              )}
                              onClick={() => handleViewProfile(member)}
                            >
                              <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage src={member.avatar} />
                                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                    {getInitials(member.name)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-semibold text-foreground flex items-center gap-2">
                                    {member.name}
                                    {member.name === "John Smith" && (
                                      <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">You</span>
                                    )}
                                    {member.name === "Mike Johnson" && (
                                      <span className="text-xs bg-success text-success-foreground px-2 py-0.5 rounded-full">Buddy</span>
                                    )}
                                  </p>
                                  <p className="text-sm text-muted-foreground">{member.role}</p>
                                </div>
                              </div>
                              <div className="flex gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8"
                                  onClick={(e) => { e.stopPropagation(); handleEmail(member); }}
                                >
                                  <Mail className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8"
                                  onClick={(e) => { e.stopPropagation(); handleVideoCall(member); }}
                                >
                                  <Video className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-3">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer",
                      member.name === "John Smith" && "ring-2 ring-primary bg-primary/5"
                    )}
                    onClick={() => handleViewProfile(member)}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground flex items-center gap-2">
                          {member.name}
                          {member.name === "John Smith" && (
                            <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">You</span>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={cn("px-2 py-1 rounded text-xs font-medium", getLevelColor(member.level))}>
                        {member.department}
                      </span>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={(e) => { e.stopPropagation(); handleEmail(member); }}
                        >
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={(e) => { e.stopPropagation(); handleMessage(member); }}
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Your Direct Reports */}
          <div className="card-interactive p-4">
            <h3 className="font-semibold text-foreground mb-4">Your Reporting Line</h3>
            <div className="space-y-3">
              {[
                teamMembers.find(m => m.id === 9), // James Wilson (Manager)
                teamMembers.find(m => m.id === 5), // Alex Thompson (VP)
                teamMembers.find(m => m.id === 2), // Sarah Williams (CTO)
              ].filter(Boolean).map((member, index) => (
                <div 
                  key={member!.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors"
                  onClick={() => handleViewProfile(member!)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {getInitials(member!.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{member!.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{member!.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Videos */}
          <div className="card-interactive p-4">
            <h3 className="font-semibold text-foreground mb-4">Team Videos</h3>
            <div className="space-y-3">
              {teamVideos.map((video) => (
                <div 
                  key={video.id} 
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors"
                  onClick={() => handlePlayVideo(video)}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Play className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{video.title}</p>
                    <p className="text-xs text-muted-foreground">{video.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card-interactive p-4">
            <h3 className="font-semibold text-foreground mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Team Size</span>
                <span className="font-semibold text-foreground">{teamMembers.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Departments</span>
                <span className="font-semibold text-foreground">{departments.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Your Team</span>
                <span className="font-semibold text-foreground">3 members</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Team Member Profile</DialogTitle>
          </DialogHeader>
          {selectedMember && (
            <div className="py-4">
              <div className="flex flex-col items-center text-center mb-6">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                    {getInitials(selectedMember.name)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold text-foreground">{selectedMember.name}</h3>
                <p className="text-muted-foreground">{selectedMember.role}</p>
                <span className={cn("px-3 py-1 rounded-full text-xs font-medium mt-2", getLevelColor(selectedMember.level))}>
                  {selectedMember.department}
                </span>
              </div>

              {selectedMember.bio && (
                <p className="text-sm text-muted-foreground text-center mb-4">{selectedMember.bio}</p>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{selectedMember.email}</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{selectedMember.phone}</span>
                </div>
                {selectedMember.location && (
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{selectedMember.location}</span>
                  </div>
                )}
              </div>

              {selectedMember.skills && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.skills.map((skill, i) => (
                      <span key={i} className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-4 gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEmail(selectedMember)}>
                  <Mail className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleCall(selectedMember)}>
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleVideoCall(selectedMember)}>
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleMessage(selectedMember)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Video Dialog */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
            <DialogDescription>Duration: {selectedVideo?.duration}</DialogDescription>
          </DialogHeader>
          <div className="relative aspect-video bg-secondary rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4 animate-pulse">
                <Play className="w-10 h-10 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Video playing... (Demo mode)</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary">
              <div className="h-full bg-primary w-1/4 animate-pulse" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
