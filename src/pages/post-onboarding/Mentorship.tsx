import { useState } from "react";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { UserCheck, Star, Calendar, MessageSquare, Clock, CheckCircle, Users, Award, Video, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const mentors = [
  { 
    id: 1, 
    name: "David Lee", 
    role: "Senior Software Engineer", 
    department: "Platform Engineering",
    skills: ["React", "Node.js", "System Design", "TypeScript"], 
    rating: 4.9, 
    avatar: "DL",
    experience: "8 years",
    mentees: 12,
    bio: "Passionate about building scalable systems and helping junior developers grow. I specialize in frontend architecture and full-stack development.",
    availability: "Tuesdays & Thursdays, 2-4 PM",
    sessionLength: "45 min",
    status: "available",
  },
  { 
    id: 2, 
    name: "Jennifer Wu", 
    role: "Tech Lead", 
    department: "Core Services",
    skills: ["Architecture", "Leadership", "AWS", "Microservices"], 
    rating: 4.8, 
    avatar: "JW",
    experience: "10 years",
    mentees: 18,
    bio: "I love discussing system architecture and helping engineers transition into leadership roles. Currently leading our core services team.",
    availability: "Mondays & Wednesdays, 10-12 PM",
    sessionLength: "60 min",
    status: "available",
  },
  { 
    id: 3, 
    name: "Robert Chen", 
    role: "Staff Engineer", 
    department: "Infrastructure",
    skills: ["System Design", "Mentoring", "Go", "Kubernetes"], 
    rating: 5.0, 
    avatar: "RC",
    experience: "12 years",
    mentees: 25,
    bio: "I've been mentoring engineers for over a decade. My focus is on helping you think about problems at scale and develop strong technical foundations.",
    availability: "Fridays, 1-5 PM",
    sessionLength: "30 min",
    status: "busy",
  },
  { 
    id: 4, 
    name: "Sarah Mitchell", 
    role: "Engineering Manager", 
    department: "Platform Engineering",
    skills: ["People Management", "Career Growth", "Communication", "Strategy"], 
    rating: 4.9, 
    avatar: "SM",
    experience: "15 years",
    mentees: 30,
    bio: "I transitioned from IC to management and love helping others navigate their career paths, whether they want to go into management or stay technical.",
    availability: "Tuesdays, 3-5 PM",
    sessionLength: "60 min",
    status: "available",
  },
];

const upcomingSessions = [
  { id: 1, mentor: "David Lee", date: "Mon, Dec 16", time: "2:00 PM", topic: "Code Review Best Practices", status: "confirmed" },
  { id: 2, mentor: "Jennifer Wu", date: "Wed, Dec 18", time: "10:00 AM", topic: "Career Growth Discussion", status: "pending" },
];

const pastSessions = [
  { id: 1, mentor: "David Lee", date: "Dec 10", topic: "React Performance Optimization", notes: "Discussed memoization, useCallback, and rendering optimization techniques." },
  { id: 2, mentor: "Robert Chen", date: "Dec 5", topic: "System Design Introduction", notes: "Covered basic system design principles and common patterns." },
];

export const Mentorship = () => {
  const [selectedMentor, setSelectedMentor] = useState<typeof mentors[0] | null>(null);
  const [showMentorDialog, setShowMentorDialog] = useState(false);
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [requestedMentors, setRequestedMentors] = useState<number[]>([]);

  const handleViewMentor = (mentor: typeof mentors[0]) => {
    setSelectedMentor(mentor);
    setShowMentorDialog(true);
  };

  const handleRequestMentor = (mentor: typeof mentors[0]) => {
    setSelectedMentor(mentor);
    setRequestMessage("");
    setShowRequestDialog(true);
  };

  const submitRequest = () => {
    if (!selectedMentor) return;
    
    setRequestedMentors(prev => [...prev, selectedMentor.id]);
    toast.success(`Request sent to ${selectedMentor.name}!`, {
      description: "You'll receive a confirmation once they accept.",
    });
    setShowRequestDialog(false);
    setShowMentorDialog(false);
  };

  const handleJoinSession = (session: typeof upcomingSessions[0]) => {
    toast.success(`Joining session with ${session.mentor}`, {
      description: "Opening video call...",
    });
  };

  return (
    <div className="animate-fade-in">
      <PageBreadcrumb items={[{ label: "Post-Onboarding", to: "/" }, { label: "Mentorship" }]} />
      
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Mentorship Program</h1>
        <p className="text-muted-foreground">Connect with experienced mentors to accelerate your growth</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="card-interactive p-4 text-center">
          <div className="icon-circle-primary mx-auto mb-2">
            <Users className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-foreground">{mentors.length}</p>
          <p className="text-sm text-muted-foreground">Available Mentors</p>
        </div>
        <div className="card-interactive p-4 text-center">
          <div className="icon-circle-success mx-auto mb-2">
            <Calendar className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-foreground">{upcomingSessions.length}</p>
          <p className="text-sm text-muted-foreground">Upcoming Sessions</p>
        </div>
        <div className="card-interactive p-4 text-center">
          <div className="icon-circle-warning mx-auto mb-2">
            <CheckCircle className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-foreground">{pastSessions.length}</p>
          <p className="text-sm text-muted-foreground">Completed Sessions</p>
        </div>
        <div className="card-interactive p-4 text-center">
          <div className="icon-circle-info mx-auto mb-2">
            <Award className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-foreground">2</p>
          <p className="text-sm text-muted-foreground">Hours This Month</p>
        </div>
      </div>

      {/* Upcoming Sessions */}
      {upcomingSessions.length > 0 && (
        <div className="card-interactive p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="icon-circle-primary">
              <Calendar className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Upcoming Sessions</h2>
          </div>
          <div className="space-y-3">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Video className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{session.topic}</p>
                    <p className="text-sm text-muted-foreground">
                      with {session.mentor} • {session.date} at {session.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    session.status === 'confirmed' ? 'bg-success-light text-success' : 'bg-warning-light text-warning'
                  }`}>
                    {session.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                  </span>
                  <Button size="sm" onClick={() => handleJoinSession(session)}>
                    Join
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Mentors */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Find a Mentor</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="card-interactive p-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-primary">{mentor.avatar}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{mentor.name}</h3>
                    <span className={`w-2 h-2 rounded-full ${mentor.status === 'available' ? 'bg-success' : 'bg-warning'}`} />
                  </div>
                  <p className="text-sm text-muted-foreground">{mentor.role}</p>
                  <p className="text-xs text-muted-foreground">{mentor.department}</p>
                  
                  <div className="flex items-center gap-3 mt-2 text-sm">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning fill-warning" />
                      {mentor.rating}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {mentor.mentees} mentees
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {mentor.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                        {skill}
                      </span>
                    ))}
                    {mentor.skills.length > 3 && (
                      <span className="text-xs text-muted-foreground">+{mentor.skills.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewMentor(mentor)}>
                  View Profile
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1"
                  disabled={requestedMentors.includes(mentor.id) || mentor.status === 'busy'}
                  onClick={() => handleRequestMentor(mentor)}
                >
                  {requestedMentors.includes(mentor.id) ? 'Requested' : 'Request Mentor'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Sessions */}
      <div className="card-interactive p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="icon-circle-success">
            <CheckCircle className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Past Sessions</h2>
        </div>
        <div className="space-y-3">
          {pastSessions.map((session) => (
            <div key={session.id} className="p-4 rounded-lg bg-secondary/30">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium text-foreground">{session.topic}</p>
                  <p className="text-sm text-muted-foreground">with {session.mentor} • {session.date}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">"{session.notes}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mentor Profile Dialog */}
      <Dialog open={showMentorDialog} onOpenChange={setShowMentorDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Mentor Profile</DialogTitle>
          </DialogHeader>
          
          {selectedMentor && (
            <div className="py-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">{selectedMentor.avatar}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">{selectedMentor.name}</h3>
                  <p className="text-muted-foreground">{selectedMentor.role}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-4 h-4 text-warning fill-warning" />
                    <span className="text-sm font-medium">{selectedMentor.rating}</span>
                    <span className="text-sm text-muted-foreground">• {selectedMentor.experience} experience</span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">{selectedMentor.bio}</p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">Availability: {selectedMentor.availability}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">Session Length: {selectedMentor.sessionLength}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{selectedMentor.mentees} mentees coached</span>
                </div>
              </div>

              <h4 className="font-medium text-foreground mb-2">Expertise:</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedMentor.skills.map((skill) => (
                  <span key={skill} className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>

              <Button 
                className="w-full"
                disabled={requestedMentors.includes(selectedMentor.id)}
                onClick={() => handleRequestMentor(selectedMentor)}
              >
                {requestedMentors.includes(selectedMentor.id) ? 'Request Pending' : 'Request as Mentor'}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Request Dialog */}
      <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Request Mentorship
            </DialogTitle>
          </DialogHeader>
          
          {selectedMentor && (
            <div className="py-4">
              <p className="text-muted-foreground mb-4">
                Send a message to {selectedMentor.name} explaining what you'd like to learn.
              </p>
              <Textarea
                placeholder="Hi! I'm new to the team and would love your guidance on..."
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                className="mb-4"
                rows={4}
              />
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowRequestDialog(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={submitRequest}>
                  <Send className="w-4 h-4 mr-2" />
                  Send Request
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};