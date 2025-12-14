import { useState } from "react";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { SimulationTile } from "@/components/ui/SimulationTile";
import { BadgeCard } from "@/components/ui/BadgeCard";
import { DollarSign, Calendar, User, Ticket, Key, Package, CalendarDays, Clock, CheckSquare, AlertTriangle, Shield, Award, Trophy, Star, ExternalLink, ArrowRight, ArrowLeft, CheckCircle, MapPin, Upload, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface SimulationData {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "locked" | "available" | "completed";
}

type SimulationsState = {
  level1: SimulationData[];
  level2: SimulationData[];
  level3: SimulationData[];
  level4: SimulationData[];
};

const initialSimulations: SimulationsState = {
  level1: [
    { id: 1, title: "Payslip", description: "Learn to read and understand your payslip", icon: <DollarSign className="w-5 h-5" />, status: "completed" },
    { id: 2, title: "Attendance", description: "Mark attendance and view history", icon: <Calendar className="w-5 h-5" />, status: "available" },
    { id: 3, title: "Update Profile", description: "Update your personal information", icon: <User className="w-5 h-5" />, status: "available" },
  ],
  level2: [
    { id: 4, title: "Raise Ticket", description: "Submit IT support requests", icon: <Ticket className="w-5 h-5" />, status: "available" },
    { id: 5, title: "Password Reset", description: "Reset your system passwords", icon: <Key className="w-5 h-5" />, status: "locked" },
    { id: 6, title: "Asset Request", description: "Request equipment and resources", icon: <Package className="w-5 h-5" />, status: "locked" },
  ],
  level3: [
    { id: 7, title: "Leave Request", description: "Apply for time off", icon: <CalendarDays className="w-5 h-5" />, status: "locked" },
    { id: 8, title: "Timesheet", description: "Log your work hours", icon: <Clock className="w-5 h-5" />, status: "locked" },
    { id: 9, title: "Approvals Workflow", description: "Manage pending approvals", icon: <CheckSquare className="w-5 h-5" />, status: "locked" },
  ],
  level4: [
    { id: 10, title: "Whistleblower Case", description: "Report misconduct safely", icon: <AlertTriangle className="w-5 h-5" />, status: "locked" },
    { id: 11, title: "Compliance Quiz", description: "Test your policy knowledge", icon: <Shield className="w-5 h-5" />, status: "locked" },
  ],
};

const badges = [
  { id: 1, title: "HRMS Hero", description: "Complete all HRMS simulations", icon: <Award className="w-8 h-8" />, earned: true, earnedDate: "Dec 10" },
  { id: 2, title: "IT Ninja", description: "Master IT support workflows", icon: <Trophy className="w-8 h-8" />, earned: false },
  { id: 3, title: "Policy Pro", description: "Ace the compliance quiz", icon: <Star className="w-8 h-8" />, earned: false },
];

// Payslip Simulation Component
const PayslipSimulation = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const payslipData = {
    grossSalary: 8500,
    tax: 1700,
    insurance: 350,
    retirement: 425,
    netPay: 6025,
  };

  const steps = [
    {
      title: "Understanding Your Payslip",
      content: "Click on each section of the payslip below to learn what it means.",
      interactive: true,
    },
    {
      title: "Calculate Your Net Pay",
      content: "Based on what you learned, select the correct net pay amount.",
      quiz: true,
    },
    {
      title: "Congratulations!",
      content: "You now understand how to read your payslip. You can access it anytime from the HRMS portal.",
      final: true,
    },
  ];

  return (
    <div className="space-y-6">
      <Progress value={((step + 1) / steps.length) * 100} className="h-2" />
      
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground">{steps[step].title}</h3>
        <p className="text-muted-foreground text-sm mt-1">{steps[step].content}</p>
      </div>

      {step === 0 && (
        <div className="bg-secondary/30 rounded-xl p-4 space-y-3">
          <div className="text-center font-semibold text-foreground border-b border-border pb-2">
            Monthly Payslip - December 2024
          </div>
          
          {[
            { label: "Gross Salary", value: payslipData.grossSalary, key: "gross", color: "text-success" },
            { label: "Income Tax", value: -payslipData.tax, key: "tax", color: "text-destructive" },
            { label: "Health Insurance", value: -payslipData.insurance, key: "insurance", color: "text-destructive" },
            { label: "Retirement (401k)", value: -payslipData.retirement, key: "retirement", color: "text-destructive" },
          ].map((item) => (
            <div
              key={item.key}
              onClick={() => setSelectedItem(item.key)}
              className={cn(
                "flex justify-between items-center p-3 rounded-lg cursor-pointer transition-all",
                selectedItem === item.key 
                  ? "bg-primary/10 border-2 border-primary" 
                  : "bg-background hover:bg-primary/5"
              )}
            >
              <span className="text-foreground">{item.label}</span>
              <span className={cn("font-mono font-semibold", item.color)}>
                {item.value > 0 ? "+" : ""}{item.value.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </span>
            </div>
          ))}

          <div className="flex justify-between items-center p-3 rounded-lg bg-primary/20 border-2 border-primary">
            <span className="font-semibold text-foreground">Net Pay</span>
            <span className="font-mono font-bold text-primary">
              ${payslipData.netPay.toLocaleString()}
            </span>
          </div>

          {selectedItem && (
            <div className="p-3 bg-info/10 rounded-lg border border-info/20 animate-fade-in">
              <p className="text-sm text-foreground">
                {selectedItem === "gross" && "💰 Your gross salary is the total amount you earn before any deductions."}
                {selectedItem === "tax" && "📋 Income tax is automatically withheld based on your W-4 elections."}
                {selectedItem === "insurance" && "🏥 Health insurance premium for your selected medical plan."}
                {selectedItem === "retirement" && "🎯 Your 401k contribution (5% of gross). Company matches up to 4%!"}
              </p>
            </div>
          )}
        </div>
      )}

      {step === 1 && (
        <RadioGroup className="space-y-3" onValueChange={(v) => setSelectedItem(v)}>
          {["$5,500", "$6,025", "$6,500", "$7,000"].map((amount) => (
            <div key={amount} className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 cursor-pointer">
              <RadioGroupItem value={amount} id={amount} />
              <Label htmlFor={amount} className="cursor-pointer flex-1">{amount}</Label>
            </div>
          ))}
        </RadioGroup>
      )}

      {step === 2 && (
        <div className="text-center py-6">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-success/20 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <p className="text-success font-semibold">+50 XP Earned!</p>
        </div>
      )}

      <div className="flex justify-between gap-3">
        <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Previous
        </Button>
        <Button 
          onClick={() => {
            if (step === 1 && selectedItem !== "$6,025") {
              toast.error("Incorrect! Try again.", { description: "Hint: Add up all the deductions." });
              return;
            }
            if (step === steps.length - 1) {
              onComplete();
            } else {
              setStep(step + 1);
              setSelectedItem(null);
            }
          }}
          disabled={step === 1 && !selectedItem}
        >
          {step === steps.length - 1 ? "Complete" : "Next"} <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

// Attendance Simulation Component
const AttendanceSimulation = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div className="space-y-6">
      <Progress value={((step + 1) / 3) * 100} className="h-2" />

      {step === 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground text-center">Mark Your Attendance</h3>
          <p className="text-muted-foreground text-sm text-center">Click the button below to check in for today.</p>
          
          <div className="bg-secondary/30 rounded-xl p-6 text-center">
            <div className="text-3xl font-mono font-bold text-foreground mb-2">{currentTime}</div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Office - Floor 3</span>
            </div>
            
            {!checkedIn ? (
              <Button 
                size="lg" 
                className="w-full"
                onClick={() => {
                  setCheckedIn(true);
                  toast.success("Checked in successfully!", { description: `Time: ${currentTime}` });
                }}
              >
                <Clock className="w-5 h-5 mr-2" /> Check In
              </Button>
            ) : (
              <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                <p className="text-success font-semibold">Checked In at {currentTime}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground text-center">Check Out</h3>
          <p className="text-muted-foreground text-sm text-center">At the end of your workday, don't forget to check out.</p>
          
          <div className="bg-secondary/30 rounded-xl p-6 text-center">
            <div className="text-3xl font-mono font-bold text-foreground mb-4">{currentTime}</div>
            
            {!checkedOut ? (
              <Button 
                size="lg" 
                variant="outline"
                className="w-full"
                onClick={() => {
                  setCheckedOut(true);
                  toast.success("Checked out successfully!", { description: "Total hours: 8h 15m" });
                }}
              >
                <Clock className="w-5 h-5 mr-2" /> Check Out
              </Button>
            ) : (
              <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                <p className="text-success font-semibold">Checked Out</p>
                <p className="text-sm text-muted-foreground">Total: 8h 15m</p>
              </div>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground text-center">Attendance History</h3>
          <div className="bg-secondary/30 rounded-xl divide-y divide-border overflow-hidden">
            {["Mon 12/9", "Tue 12/10", "Wed 12/11", "Thu 12/12", "Fri 12/13"].map((day, i) => (
              <div key={day} className="flex items-center justify-between p-3">
                <span className="text-foreground">{day}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">9:00 AM - 5:15 PM</span>
                  <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">8h 15m</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-success/20 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <p className="text-success font-semibold">+50 XP Earned!</p>
          </div>
        </div>
      )}

      <div className="flex justify-between gap-3">
        <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Previous
        </Button>
        <Button 
          onClick={() => step === 2 ? onComplete() : setStep(step + 1)}
          disabled={(step === 0 && !checkedIn) || (step === 1 && !checkedOut)}
        >
          {step === 2 ? "Complete" : "Next"} <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

// Profile Update Simulation
const ProfileSimulation = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ phone: "", address: "", emergency: "" });

  return (
    <div className="space-y-6">
      <Progress value={((step + 1) / 3) * 100} className="h-2" />

      {step === 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground text-center">Update Contact Info</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                placeholder="+1 (555) 000-0000" 
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="address">Home Address</Label>
              <Textarea 
                id="address" 
                placeholder="123 Main St, City, State ZIP" 
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground text-center">Emergency Contact</h3>
          <p className="text-muted-foreground text-sm text-center">Add an emergency contact for safety purposes.</p>
          <div>
            <Label htmlFor="emergency">Emergency Contact Name & Phone</Label>
            <Input 
              id="emergency" 
              placeholder="Jane Doe - +1 (555) 123-4567" 
              value={formData.emergency}
              onChange={(e) => setFormData({ ...formData, emergency: e.target.value })}
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="text-center py-6">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-success/20 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Profile Updated!</h3>
          <p className="text-muted-foreground text-sm">Your information has been saved.</p>
          <p className="text-success font-semibold mt-4">+50 XP Earned!</p>
        </div>
      )}

      <div className="flex justify-between gap-3">
        <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Previous
        </Button>
        <Button 
          onClick={() => {
            if (step === 0 && (!formData.phone || !formData.address)) {
              toast.error("Please fill in all fields");
              return;
            }
            if (step === 1 && !formData.emergency) {
              toast.error("Please add an emergency contact");
              return;
            }
            if (step === 2) {
              onComplete();
            } else {
              setStep(step + 1);
            }
          }}
        >
          {step === 2 ? "Complete" : "Next"} <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

// IT Ticket Simulation
const TicketSimulation = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  const [ticketData, setTicketData] = useState({ issue: "", priority: "", screenshot: false });

  return (
    <div className="space-y-6">
      <Progress value={((step + 1) / 4) * 100} className="h-2" />

      {step === 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground text-center">Describe Your Issue</h3>
          <div>
            <Label htmlFor="issue">What's the problem?</Label>
            <Textarea 
              id="issue" 
              placeholder="My laptop won't connect to the VPN..." 
              className="min-h-[100px]"
              value={ticketData.issue}
              onChange={(e) => setTicketData({ ...ticketData, issue: e.target.value })}
            />
          </div>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              setTicketData({ ...ticketData, screenshot: true });
              toast.success("Screenshot attached!");
            }}
          >
            <Upload className="w-4 h-4 mr-2" />
            {ticketData.screenshot ? "✓ Screenshot Attached" : "Attach Screenshot"}
          </Button>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground text-center">Set Priority</h3>
          <RadioGroup value={ticketData.priority} onValueChange={(v) => setTicketData({ ...ticketData, priority: v })}>
            {[
              { value: "low", label: "Low", desc: "Minor issue, no urgency", color: "bg-info/10 border-info/20" },
              { value: "medium", label: "Medium", desc: "Affecting work but not critical", color: "bg-warning/10 border-warning/20" },
              { value: "high", label: "High", desc: "Significantly blocking work", color: "bg-destructive/10 border-destructive/20" },
              { value: "critical", label: "Critical", desc: "Complete work stoppage", color: "bg-destructive/20 border-destructive/40" },
            ].map((p) => (
              <div key={p.value} className={cn("flex items-start space-x-3 p-4 rounded-lg border cursor-pointer", p.color)}>
                <RadioGroupItem value={p.value} id={p.value} className="mt-1" />
                <Label htmlFor={p.value} className="cursor-pointer flex-1">
                  <span className="font-semibold">{p.label}</span>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground text-center">Review & Submit</h3>
          <div className="bg-secondary/30 rounded-xl p-4 space-y-3">
            <div>
              <span className="text-xs text-muted-foreground">Issue:</span>
              <p className="text-foreground">{ticketData.issue || "VPN connection issue"}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Priority:</span>
              <p className="text-foreground capitalize">{ticketData.priority || "Medium"}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Attachment:</span>
              <p className="text-foreground">{ticketData.screenshot ? "Screenshot.png" : "None"}</p>
            </div>
          </div>
          <Button 
            className="w-full" 
            onClick={() => {
              toast.success("Ticket #IT-2024-1234 Created!", { description: "IT will respond within 4 hours." });
              setStep(3);
            }}
          >
            <Send className="w-4 h-4 mr-2" /> Submit Ticket
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className="text-center py-6">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-success/20 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Ticket Submitted!</h3>
          <p className="text-muted-foreground text-sm">Ticket #IT-2024-1234</p>
          <p className="text-success font-semibold mt-4">+50 XP Earned!</p>
        </div>
      )}

      <div className="flex justify-between gap-3">
        <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0 || step === 3}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Previous
        </Button>
        <Button 
          onClick={() => {
            if (step === 0 && !ticketData.issue) {
              toast.error("Please describe your issue");
              return;
            }
            if (step === 1 && !ticketData.priority) {
              toast.error("Please select a priority level");
              return;
            }
            if (step === 3) {
              onComplete();
            } else if (step < 2) {
              setStep(step + 1);
            }
          }}
          disabled={step === 2}
        >
          {step === 3 ? "Complete" : "Next"} <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export const Simulations = () => {
  const [simulations, setSimulations] = useState(initialSimulations);
  const [activeSimulation, setActiveSimulation] = useState<SimulationData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleStartSimulation = (sim: SimulationData) => {
    if (sim.status === "locked") {
      toast.error("Complete previous simulations to unlock this one");
      return;
    }
    setActiveSimulation(sim);
    setIsDialogOpen(true);
  };

  const handleCompleteSimulation = () => {
    if (!activeSimulation) return;
    
    const updateSimulations = (levelSims: SimulationData[]) =>
      levelSims.map(sim => 
        sim.id === activeSimulation.id ? { ...sim, status: "completed" as const } : sim
      );

    setSimulations(prev => ({
      level1: updateSimulations(prev.level1),
      level2: updateSimulations(prev.level2),
      level3: updateSimulations(prev.level3),
      level4: updateSimulations(prev.level4),
    }));

    setIsDialogOpen(false);
    toast.success(`${activeSimulation.title} simulation completed!`, {
      description: "Great job! You've earned XP points.",
    });
  };

  const handleOpenGameWindow = () => {
    toast.info("Opening Simulation Game...", {
      description: "The full simulation game experience would open in a new window.",
    });
  };

  const renderSimulationContent = () => {
    if (!activeSimulation) return null;
    
    switch (activeSimulation.id) {
      case 1:
        return <PayslipSimulation onComplete={handleCompleteSimulation} />;
      case 2:
        return <AttendanceSimulation onComplete={handleCompleteSimulation} />;
      case 3:
        return <ProfileSimulation onComplete={handleCompleteSimulation} />;
      case 4:
        return <TicketSimulation onComplete={handleCompleteSimulation} />;
      default:
        return (
          <div className="text-center py-8">
            <p className="text-muted-foreground">This simulation is coming soon!</p>
            <Button className="mt-4" onClick={handleCompleteSimulation}>
              Mark as Complete
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="animate-fade-in">
      <PageBreadcrumb items={[{ label: "Onboarding", to: "/" }, { label: "Simulations Center" }]} />

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Simulations Center</h1>
          <p className="text-muted-foreground">Learn company systems through interactive simulations</p>
        </div>
        <Button variant="outline" onClick={handleOpenGameWindow}>
          <ExternalLink className="w-4 h-4 mr-2" />
          Open Simulation Game
        </Button>
      </div>

      {/* Badges */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Gamification Badges</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <BadgeCard key={badge.id} {...badge} />
          ))}
        </div>
      </div>

      {/* Level 1 - HRMS */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-info-light text-info text-sm font-semibold">Level 1</span>
          <h2 className="text-lg font-semibold text-foreground">HRMS Simulation</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {simulations.level1.map((sim) => (
            <SimulationTile
              key={sim.id}
              title={sim.title}
              description={sim.description}
              icon={sim.icon}
              status={sim.status}
              level={1}
              onStart={() => handleStartSimulation(sim)}
            />
          ))}
        </div>
      </div>

      {/* Level 2 - IT */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-warning-light text-warning text-sm font-semibold">Level 2</span>
          <h2 className="text-lg font-semibold text-foreground">IT Simulation</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {simulations.level2.map((sim) => (
            <SimulationTile
              key={sim.id}
              title={sim.title}
              description={sim.description}
              icon={sim.icon}
              status={sim.status}
              level={2}
              onStart={() => handleStartSimulation(sim)}
            />
          ))}
        </div>
      </div>

      {/* Level 3 - Leave & Time */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-success-light text-success text-sm font-semibold">Level 3</span>
          <h2 className="text-lg font-semibold text-foreground">Leave & Time Management</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {simulations.level3.map((sim) => (
            <SimulationTile
              key={sim.id}
              title={sim.title}
              description={sim.description}
              icon={sim.icon}
              status={sim.status}
              level={3}
              onStart={() => handleStartSimulation(sim)}
            />
          ))}
        </div>
      </div>

      {/* Level 4 - Compliance */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-semibold">Level 4</span>
          <h2 className="text-lg font-semibold text-foreground">Compliance & Ethics</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {simulations.level4.map((sim) => (
            <SimulationTile
              key={sim.id}
              title={sim.title}
              description={sim.description}
              icon={sim.icon}
              status={sim.status}
              level={4}
              onStart={() => handleStartSimulation(sim)}
            />
          ))}
        </div>
      </div>

      {/* Simulation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="icon-circle-primary">
                {activeSimulation?.icon}
              </div>
              <div>
                <DialogTitle>{activeSimulation?.title} Simulation</DialogTitle>
                <DialogDescription>Complete all steps to earn XP</DialogDescription>
              </div>
            </div>
          </DialogHeader>
          {renderSimulationContent()}
        </DialogContent>
      </Dialog>
    </div>
  );
};
