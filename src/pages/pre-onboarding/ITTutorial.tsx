import { useState } from "react";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { Laptop, Mail, Wifi, HelpCircle, Check, Circle, Play, ChevronRight, X, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

const initialChecklist = [
  { id: 1, title: "Power on laptop and complete initial setup", completed: true, details: "Press the power button and follow the Windows/Mac setup wizard. Enter your employee credentials when prompted." },
  { id: 2, title: "Connect to corporate WiFi", completed: true, details: "Select 'TechCorp-Secure' from available networks. Use your employee ID and password to authenticate." },
  { id: 3, title: "Install required software", completed: false, details: "Download and install: VS Code, Slack, Zoom, Microsoft Office 365, and company VPN client from the Software Center." },
  { id: 4, title: "Configure email client", completed: false, details: "Open Outlook, sign in with your @techcorp.com email. Enable calendar sync and set up your email signature." },
  { id: 5, title: "Set up VPN access", completed: false, details: "Open GlobalProtect VPN, enter portal: vpn.techcorp.com. Use your credentials to connect when working remotely." },
  { id: 6, title: "Enable multi-factor authentication", completed: false, details: "Download Microsoft Authenticator app on your phone. Scan the QR code from your account security settings." },
];

const tutorialSteps = [
  { 
    id: 1, 
    title: "Email Configuration", 
    duration: "5 min",
    steps: [
      "Open Microsoft Outlook from your applications",
      "Click 'Add Account' and enter your @techcorp.com email",
      "Authenticate using your employee credentials",
      "Wait for mailbox sync to complete",
      "Set up your email signature in Settings > Signatures",
      "Test by sending a test email to yourself"
    ]
  },
  { 
    id: 2, 
    title: "VPN Setup", 
    duration: "3 min",
    steps: [
      "Download GlobalProtect from Software Center",
      "Open the application after installation",
      "Enter portal address: vpn.techcorp.com",
      "Click Connect and enter your credentials",
      "Enable 'Connect on Startup' for automatic connection",
      "Verify connection status in system tray"
    ]
  },
  { 
    id: 3, 
    title: "Software Installation", 
    duration: "10 min",
    steps: [
      "Open Software Center from Start Menu",
      "Search for each required application",
      "Click Install and wait for completion",
      "Required: VS Code, Slack, Zoom, Office 365",
      "Optional: Docker, Postman, GitHub Desktop",
      "Restart laptop after all installations"
    ]
  },
];

const troubleshootingGuides = [
  { 
    icon: <Wifi className="w-6 h-6" />, 
    title: "Network Issues", 
    desc: "WiFi, VPN, connectivity",
    solutions: [
      { problem: "Can't connect to WiFi", solution: "Forget the network and reconnect. Make sure you're using your employee credentials, not personal email." },
      { problem: "VPN keeps disconnecting", solution: "Check your internet connection first. Try switching between WiFi and ethernet. Restart the VPN client." },
      { problem: "Slow network speed", solution: "Move closer to a WiFi access point. Check if VPN is causing slowdown by testing without it." },
    ]
  },
  { 
    icon: <Laptop className="w-6 h-6" />, 
    title: "Hardware Problems", 
    desc: "Laptop, peripherals, display",
    solutions: [
      { problem: "External monitor not detected", solution: "Check cable connections. Try a different port. Update display drivers via Software Center." },
      { problem: "Keyboard/Mouse not working", solution: "For wireless devices, check batteries. Try different USB ports. Restart laptop." },
      { problem: "Laptop running slow", solution: "Close unnecessary applications. Restart your laptop. Check for Windows updates." },
    ]
  },
  { 
    icon: <Mail className="w-6 h-6" />, 
    title: "Software Issues", 
    desc: "Email, apps, access",
    solutions: [
      { problem: "Outlook not syncing", solution: "Check your internet connection. Try switching between online/offline mode. Repair Office installation." },
      { problem: "Can't access application", solution: "Verify your permissions in the IT Portal. Submit an access request ticket if needed." },
      { problem: "Application crashing", solution: "Update to the latest version. Clear application cache. Reinstall if persistent." },
    ]
  },
];

const faqs = [
  { question: "How do I connect to the printer?", answer: "Go to Settings > Printers & Scanners > Add a printer. Select your floor's printer from the list. Floor 3 uses 'HP-3F-Color' and Floor 4 uses 'HP-4F-Color'. Contact IT if your floor's printer isn't listed." },
  { question: "What's the WiFi password?", answer: "Corporate WiFi (TechCorp-Secure) uses your employee credentials - no separate password needed. Guest WiFi password is 'TechCorpGuest2024' and is available at reception. Guest network has limited access." },
  { question: "How do I request software access?", answer: "Submit a request through the IT Portal at it.techcorp.com or email help@techcorp.com with the software name, business justification, and your manager's approval. Most requests are processed within 24-48 hours." },
  { question: "VPN not connecting?", answer: "First, ensure you're not already on the corporate network (VPN isn't needed in office). Try: 1) Restart the VPN client, 2) Check your internet connection, 3) Verify credentials, 4) Try 'vpn2.techcorp.com' as backup portal." },
];

export const ITTutorial = () => {
  const [checklist, setChecklist] = useState(initialChecklist);
  const [activeTutorial, setActiveTutorial] = useState<typeof tutorialSteps[0] | null>(null);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [showTroubleshooting, setShowTroubleshooting] = useState<typeof troubleshootingGuides[0] | null>(null);
  
  const completedCount = checklist.filter(item => item.completed).length;
  const progressPercent = (completedCount / checklist.length) * 100;

  const toggleChecklistItem = (id: number) => {
    setChecklist(prev => prev.map(item => {
      if (item.id === id) {
        const newCompleted = !item.completed;
        if (newCompleted) {
          toast.success(`Completed: ${item.title}`);
        }
        return { ...item, completed: newCompleted };
      }
      return item;
    }));
  };

  const startTutorial = (tutorial: typeof tutorialSteps[0]) => {
    setActiveTutorial(tutorial);
    setTutorialStep(0);
    toast.info(`Starting ${tutorial.title} tutorial`, {
      description: `Estimated time: ${tutorial.duration}`,
    });
  };

  const nextStep = () => {
    if (activeTutorial && tutorialStep < activeTutorial.steps.length - 1) {
      setTutorialStep(prev => prev + 1);
    } else {
      toast.success(`${activeTutorial?.title} tutorial completed!`);
      setActiveTutorial(null);
      setTutorialStep(0);
    }
  };

  const prevStep = () => {
    if (tutorialStep > 0) {
      setTutorialStep(prev => prev - 1);
    }
  };

  return (
    <div className="animate-fade-in">
      <PageBreadcrumb items={[{ label: "Pre-Onboarding", to: "/" }, { label: "IT Tutorials" }]} />

      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">IT Tutorials</h1>
        <p className="text-muted-foreground">Get your technical setup completed</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Laptop Setup Checklist */}
        <div className="card-interactive p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="icon-circle-primary">
                <Laptop className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Laptop Setup Checklist</h2>
                <p className="text-sm text-muted-foreground">{completedCount}/{checklist.length} completed</p>
              </div>
            </div>
          </div>

          <Progress value={progressPercent} className="mb-4" />

          <div className="space-y-2">
            {checklist.map((item) => (
              <div
                key={item.id}
                className={`flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                  item.completed ? "bg-success-light" : "bg-secondary/50 hover:bg-secondary"
                }`}
                onClick={() => toggleChecklistItem(item.id)}
              >
                {item.completed ? (
                  <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-success-foreground" />
                  </div>
                ) : (
                  <Circle className="w-6 h-6 text-muted-foreground flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <span className={`text-sm block ${item.completed ? "text-success line-through" : "text-foreground"}`}>
                    {item.title}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.details}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email + VPN Setup */}
        <div className="card-interactive p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="icon-circle-primary">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Interactive Tutorials</h2>
          </div>

          <div className="space-y-3 mb-4">
            {tutorialSteps.map((tutorial) => (
              <div
                key={tutorial.id}
                className="p-4 rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer group"
                onClick={() => startTutorial(tutorial)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Play className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{tutorial.title}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {tutorial.duration} • {tutorial.steps.length} steps
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Start
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="justify-start" onClick={() => startTutorial(tutorialSteps[0])}>
              <Mail className="w-4 h-4 mr-2" />
              Email Guide
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => startTutorial(tutorialSteps[1])}>
              <Wifi className="w-4 h-4 mr-2" />
              VPN Guide
            </Button>
          </div>
        </div>
      </div>

      {/* Troubleshooting Guide */}
      <div className="card-interactive p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="icon-circle-warning">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Troubleshooting Guide</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {troubleshootingGuides.map((item, index) => (
            <div 
              key={index} 
              className="p-4 rounded-xl border border-border hover:border-primary/30 transition-colors cursor-pointer group"
              onClick={() => setShowTroubleshooting(item)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-muted-foreground group-hover:text-primary transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="card-interactive p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="icon-circle-primary">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Tutorial Dialog */}
      <Dialog open={!!activeTutorial} onOpenChange={() => setActiveTutorial(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Play className="w-5 h-5 text-primary" />
              {activeTutorial?.title}
            </DialogTitle>
          </DialogHeader>
          
          {activeTutorial && (
            <div className="py-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">
                  Step {tutorialStep + 1} of {activeTutorial.steps.length}
                </span>
                <Progress value={((tutorialStep + 1) / activeTutorial.steps.length) * 100} className="w-32" />
              </div>

              <div className="bg-secondary/50 rounded-xl p-6 mb-4 min-h-[120px]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-foreground font-bold text-sm">{tutorialStep + 1}</span>
                  </div>
                  <div>
                    <p className="text-foreground font-medium">{activeTutorial.steps[tutorialStep]}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Click "Next" when you've completed this step
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {activeTutorial.steps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      i <= tutorialStep ? 'bg-primary' : 'bg-secondary'
                    }`}
                  />
                ))}
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={prevStep} disabled={tutorialStep === 0}>
                  Previous
                </Button>
                <Button onClick={nextStep}>
                  {tutorialStep === activeTutorial.steps.length - 1 ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Troubleshooting Dialog */}
      <Dialog open={!!showTroubleshooting} onOpenChange={() => setShowTroubleshooting(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {showTroubleshooting?.icon}
              {showTroubleshooting?.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            {showTroubleshooting?.solutions.map((sol, i) => (
              <div key={i} className="p-4 rounded-lg bg-secondary/50">
                <p className="font-medium text-foreground text-sm mb-2">{sol.problem}</p>
                <p className="text-sm text-muted-foreground">{sol.solution}</p>
              </div>
            ))}
            
            <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
              <p className="text-sm text-foreground">
                Still having issues? Contact IT Support at <span className="font-medium text-primary">help@techcorp.com</span> or call <span className="font-medium text-primary">ext. 1234</span>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};