import { useState } from "react";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { Gift, FileText, Play, Heart, FolderOpen, Download, ExternalLink, X, Eye, Pause, ChevronRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

const policies = [
  { 
    name: "Employee Handbook", 
    size: "2.4 MB",
    description: "Complete guide to company policies, procedures, and expectations for all employees.",
    sections: ["Introduction", "Employment Policies", "Code of Conduct", "Benefits", "Leave Policies", "Workplace Safety"],
    content: {
      "Introduction": `Welcome to TechCorp! This handbook is designed to help you understand our company culture, policies, and procedures. As a new member of our team, you play a vital role in our mission to deliver innovative technology solutions.

Our company was founded in 2010 with a vision to transform how businesses leverage technology. Today, we serve over 500 enterprise clients globally with a team of 2,000+ dedicated professionals.

This handbook covers everything you need to know about working at TechCorp, from our core values to specific workplace policies. Please read it carefully and don't hesitate to reach out to HR with any questions.`,
      "Employment Policies": `Employment Classification:
• Full-time employees work 40+ hours/week and are eligible for full benefits
• Part-time employees work less than 30 hours/week
• Contract employees have specific term agreements

Work Hours:
• Core hours are 10:00 AM - 4:00 PM
• Flexible scheduling available with manager approval
• Overtime requires pre-approval from management

Performance Reviews:
• Conducted quarterly with your direct manager
• Annual comprehensive review determines compensation adjustments
• 360-degree feedback incorporated for leadership roles`,
      "Code of Conduct": `Professional Behavior:
• Treat all colleagues with respect and dignity
• Maintain a harassment-free workplace
• Report concerns through proper channels

Confidentiality:
• Protect company and client information
• Sign NDA for sensitive projects
• Don't discuss proprietary information externally

Conflict of Interest:
• Disclose any potential conflicts to HR
• Outside employment requires written approval
• No accepting gifts over $50 from vendors`,
      "Benefits": `Health Insurance:
• Medical, dental, and vision coverage starts day 1
• Company pays 80% of premiums
• HSA with $1,000 company contribution

Retirement:
• 401(k) with 4% company match
• Vesting after 1 year of service
• Financial planning resources available

Additional Perks:
• $5,000 annual education reimbursement
• $100/month wellness stipend
• Commuter benefits up to $280/month`,
      "Leave Policies": `Paid Time Off (PTO):
• 15 days for 0-2 years of service
• 20 days for 3-5 years of service
• 25 days for 6+ years of service

Sick Leave:
• 10 days per year, no carryover
• Can be used for mental health days
• Doctor's note required after 3 consecutive days

Parental Leave:
• 12 weeks paid for primary caregiver
• 4 weeks paid for secondary caregiver
• Gradual return-to-work program available`,
      "Workplace Safety": `Emergency Procedures:
• Know your nearest exit locations
• Assembly points in parking lot zones A-D
• Emergency contact: Security x1111

Health & Safety:
• Ergonomic assessments available on request
• First aid kits on each floor
• Report hazards to facilities immediately

Remote Work Safety:
• Home office ergonomic guidelines provided
• Cybersecurity training required annually
• VPN required for all remote access`,
    }
  },
  { 
    name: "Code of Conduct", 
    size: "1.1 MB",
    description: "Standards of professional behavior and ethical guidelines for all team members.",
    sections: ["Core Values", "Professional Conduct", "Conflict of Interest", "Confidentiality", "Compliance"],
    content: {
      "Core Values": `Innovation: We embrace new ideas and creative solutions. Challenge the status quo and propose improvements.

Integrity: We act honestly and ethically in all dealings. Transparency is key to building trust with colleagues and clients.

Collaboration: We achieve more together. Share knowledge, support teammates, and celebrate collective wins.

Excellence: We strive for the highest quality in everything we do. Continuous improvement is our standard.

Customer Focus: Our clients' success is our success. Go above and beyond to deliver value.`,
      "Professional Conduct": `Workplace Behavior:
• Arrive on time for meetings and commitments
• Communicate professionally in all channels
• Dress appropriately for your role and meetings
• Keep common areas clean and organized

Digital Etiquette:
• Respond to emails within 24 business hours
• Use appropriate Slack channels for discussions
• Mute yourself when not speaking in video calls
• Be mindful of time zones for global teams

Respect & Inclusion:
• Value diverse perspectives and backgrounds
• Use inclusive language in all communications
• Speak up if you witness inappropriate behavior
• Support colleagues in their professional growth`,
      "Conflict of Interest": `Disclosure Requirements:
• Report any personal relationships with vendors or clients
• Disclose financial interests in competing companies
• Notify HR of family members working at TechCorp

Outside Activities:
• Get written approval for consulting or advisory roles
• Don't use company resources for personal projects
• Avoid activities that compete with TechCorp

Gifts & Entertainment:
• Gifts over $50 must be reported and returned
• Business meals should be reasonable and documented
• Never accept cash or cash equivalents`,
      "Confidentiality": `Protected Information:
• Client data and business strategies
• Proprietary technology and source code
• Employee personal information
• Financial data and projections

Handling Confidential Data:
• Use secure channels for sensitive communications
• Lock your computer when stepping away
• Shred physical documents with sensitive info
• Report any suspected data breaches immediately

Post-Employment:
• Return all company property on departure
• Don't retain copies of confidential information
• Respect non-compete and NDA obligations`,
      "Compliance": `Legal Requirements:
• Complete required compliance training annually
• Report any suspected illegal activity
• Cooperate with internal investigations

Anti-Discrimination:
• Equal opportunity in hiring and promotion
• No tolerance for harassment or discrimination
• Accommodations available for disabilities

Reporting Violations:
• Use the anonymous ethics hotline: 1-800-ETHICS
• Speak with your manager or HR
• Whistleblower protections in place`,
    }
  },
  { 
    name: "Leave Policy", 
    size: "856 KB",
    description: "Detailed information about leave types, accrual, and request procedures.",
    sections: ["Annual Leave", "Sick Leave", "Parental Leave", "Public Holidays", "Special Leave"],
    content: {
      "Annual Leave": `Accrual Rates:
• 0-2 years: 15 days (1.25 days/month)
• 3-5 years: 20 days (1.67 days/month)
• 6+ years: 25 days (2.08 days/month)

Request Process:
• Submit requests at least 2 weeks in advance
• Manager approval required
• Peak times may have blackout dates
• Maximum 10 consecutive days without VP approval

Carryover:
• Up to 5 days can carry over to next year
• Unused excess days will be forfeited
• No cash-out option for unused PTO`,
      "Sick Leave": `Allowance:
• 10 days per calendar year
• Pro-rated for new hires
• Does not carry over to next year

Usage Guidelines:
• Notify your manager before shift starts
• Doctor's note required after 3 consecutive days
• Can be used for mental health days
• Also covers caring for immediate family

Extended Illness:
• Short-term disability kicks in after 5 days
• 60% salary coverage for up to 12 weeks
• Return-to-work program available`,
      "Parental Leave": `Primary Caregiver:
• 12 weeks fully paid leave
• Can begin up to 2 weeks before due date
• Flexible return schedule available

Secondary Caregiver:
• 4 weeks fully paid leave
• Must be taken within 6 months of birth/adoption

Adoption & Foster:
• Same benefits as biological parents
• Additional 2 days for court/agency appointments

Return to Work:
• Gradual return schedule available (4-6 weeks)
• Lactation rooms on every floor
• Flexible work arrangements supported`,
      "Public Holidays": `Observed Holidays:
• New Year's Day
• Martin Luther King Jr. Day
• Presidents' Day
• Memorial Day
• Independence Day
• Labor Day
• Thanksgiving (2 days)
• Christmas Eve & Christmas Day
• New Year's Eve

Floating Holidays:
• 2 floating holidays per year
• Use for religious or personal observances
• Request 1 week in advance`,
      "Special Leave": `Bereavement:
• 5 days for immediate family
• 3 days for extended family
• Additional unpaid leave available

Jury Duty:
• Full pay for duration of service
• Provide jury summons to HR
• Return to work on non-service days

Military Leave:
• Up to 15 days paid per year
• Job protection per USERRA
• Benefits continuation during deployment

Volunteer Time:
• 2 paid volunteer days per year
• Pre-approved organizations only
• Coordinate with team for coverage`,
    }
  },
  { 
    name: "Remote Work Guidelines", 
    size: "1.2 MB",
    description: "Best practices and expectations for working remotely or in hybrid arrangements.",
    sections: ["Eligibility", "Work Hours", "Communication", "Equipment", "Security", "Performance"],
    content: {
      "Eligibility": `Who Can Work Remotely:
• Employees who have completed 90-day probation
• Roles that don't require physical presence
• Manager and HR approval required

Arrangement Types:
• Fully Remote: 5 days/week from home
• Hybrid: 2-3 days/week in office
• Flexible: As-needed office visits

Application Process:
• Submit request through HR portal
• Include proposed schedule and rationale
• 2-week review period for approval
• Trial period of 3 months for new arrangements`,
      "Work Hours": `Core Hours:
• All remote employees online 10 AM - 4 PM local time
• Flexible start/end times around core hours
• Communicate schedule changes in advance

Availability:
• Respond to messages within 1 hour during work hours
• Update Slack status when away from desk
• Block focus time on calendar as needed

Time Tracking:
• Log hours if required by your role
• Take regular breaks (5 min every hour recommended)
• Don't exceed 50 hours/week without approval`,
      "Communication": `Expected Response Times:
• Slack: Within 1 hour during work hours
• Email: Within 4 hours during work hours
• Urgent matters: Use phone/video call

Meeting Best Practices:
• Camera on for team meetings
• Use virtual backgrounds if needed
• Mute when not speaking
• Be in a quiet, professional environment

Staying Connected:
• Attend virtual team events
• Weekly 1:1s with manager required
• Join informal coffee chats when possible`,
      "Equipment": `Company Provided:
• Laptop with necessary software
• External monitor (one)
• Keyboard and mouse
• Headset with microphone

Stipend Available:
• $500 one-time home office setup
• $50/month internet reimbursement
• $100/month coworking space option

Your Responsibility:
• Reliable internet (min 50 Mbps recommended)
• Appropriate desk and chair
• Quiet workspace for calls`,
      "Security": `Required Practices:
• Use VPN for all work activities
• Enable full disk encryption
• Lock screen when away from computer
• No work on public WiFi without VPN

Password & Access:
• Use company password manager
• Enable MFA on all accounts
• Don't share login credentials
• Report lost/stolen devices immediately

Data Protection:
• No printing sensitive documents at home
• Secure storage for any physical documents
• Shred before disposal
• No work discussions in public spaces`,
      "Performance": `Expectations:
• Same output and quality as in-office work
• Meet all deadlines and commitments
• Proactive communication about blockers

Measurement:
• Weekly check-ins with manager
• OKR/goal tracking quarterly
• Regular feedback and recognition

Revoking Remote Privileges:
• Consistent performance issues
• Communication or availability problems
• Security policy violations
• 2-week notice given before change`,
    }
  },
  { 
    name: "Benefits Overview", 
    size: "3.1 MB",
    description: "Comprehensive overview of employee benefits including health, retirement, and perks.",
    sections: ["Health Insurance", "Dental & Vision", "Retirement Plans", "Life Insurance", "Wellness Programs", "Employee Perks"],
    content: {
      "Health Insurance": `Plan Options:
• PPO: Lower deductible, larger network, higher premium
• HDHP: Higher deductible, HSA eligible, lower premium
• HMO: Requires referrals, lowest cost

Coverage Levels:
• Employee Only
• Employee + Spouse
• Employee + Children
• Family

Cost Sharing:
• Company pays 80% of premiums
• Deductibles: $500 (PPO), $1,500 (HDHP)
• Out-of-pocket max: $3,000 individual / $6,000 family

HSA Contributions:
• Company contributes $1,000 annually
• Employee can contribute up to IRS max
• Funds roll over year to year`,
      "Dental & Vision": `Dental Coverage:
• Preventive: 100% covered (2 cleanings/year)
• Basic procedures: 80% covered
• Major procedures: 50% covered
• Orthodontia: 50% up to $2,000 lifetime max

Vision Coverage:
• Annual eye exam: $10 copay
• Frames: $150 allowance every 2 years
• Lenses: Covered in full
• Contacts: $150 allowance annually

Network:
• Delta Dental nationwide network
• VSP for vision services
• Out-of-network coverage at reduced rates`,
      "Retirement Plans": `401(k) Plan:
• Eligible from day 1
• Company matches 100% up to 4%
• Immediate vesting of company match
• Pre-tax and Roth options available

Investment Options:
• Target-date funds
• Index funds across asset classes
• Self-directed brokerage option
• Financial advisor consultations free

Planning Resources:
• Quarterly financial wellness webinars
• 1:1 retirement planning sessions
• Online tools and calculators
• Estate planning discounts`,
      "Life Insurance": `Basic Life:
• 2x annual salary at no cost
• Coverage up to $500,000
• Automatic enrollment

Supplemental Life:
• Purchase up to 5x salary
• Spouse and dependent coverage available
• Portable if you leave the company

Accidental Death & Dismemberment:
• Equal to basic life insurance amount
• 24/7 coverage worldwide
• Additional benefits for specific injuries`,
      "Wellness Programs": `Physical Wellness:
• $100/month wellness stipend
• On-site gym (HQ) or gym membership discount
• Annual biometric screenings
• Flu shots and preventive care on-site

Mental Wellness:
• EAP: 8 free counseling sessions/year
• Headspace premium subscription
• Stress management workshops
• Mental health days (no questions asked)

Financial Wellness:
• Student loan assistance: $100/month
• Financial planning consultations
• Emergency savings match program
• Credit monitoring service`,
      "Employee Perks": `Learning & Development:
• $5,000 annual education reimbursement
• LinkedIn Learning subscription
• Conference attendance budget
• Internal mentorship program

Work-Life Balance:
• Flexible work arrangements
• Summer Fridays (half-day)
• Volunteer time off: 2 days/year
• Sabbatical after 5 years

Additional Perks:
• Commuter benefits: $280/month pre-tax
• Free snacks and beverages in office
• Monthly team lunches
• Anniversary gifts and recognition`,
    }
  },
];

const companyValues = [
  { title: "Innovation", description: "We embrace creativity and new ideas to drive progress and solve complex challenges.", icon: "💡" },
  { title: "Integrity", description: "We act with honesty and transparency in all our dealings with clients and colleagues.", icon: "🤝" },
  { title: "Collaboration", description: "We achieve more together by sharing knowledge and supporting each other's growth.", icon: "🌟" },
  { title: "Excellence", description: "We strive for the highest quality in everything we do, continuously improving our craft.", icon: "🏆" },
];

const welcomeLetterContent = `Dear James,

Welcome to TechCorp! We are thrilled to have you join our team as a Software Engineer in the Platform Engineering division.

Your first day is Monday, December 16th, 2024. Please arrive at our headquarters (123 Innovation Drive, San Francisco, CA) by 9:00 AM. Our HR team will be waiting to greet you at the reception desk.

What to Expect on Your First Day:
• 9:00 AM - Security badge and access card setup at reception
• 9:30 AM - IT equipment distribution (MacBook Pro, monitors, peripherals)
• 10:30 AM - Meet and greet with your team in the Platform Engineering area
• 12:00 PM - Welcome lunch with your manager, Sarah Chen
• 1:30 PM - Onboarding orientation session with HR
• 3:30 PM - Office tour and introduction to key facilities
• 4:30 PM - Wrap-up and Q&A with your assigned buddy, Mike Johnson

What to Bring:
• Government-issued photo ID (passport or driver's license)
• Banking information for payroll setup (routing and account numbers)
• Emergency contact information (name, relationship, phone number)
• Any signed documents from your offer package
• A notepad and pen for taking notes

Your Team:
You'll be joining the Platform Engineering team, a group of 12 talented engineers working on our core infrastructure. Your direct manager is Sarah Chen (Senior Engineering Manager), and your buddy for the first 30 days is Mike Johnson (Senior Software Engineer). They're both excited to meet you and help you get settled.

Your First Projects:
During your first month, you'll be working on understanding our codebase and completing several onboarding projects designed to familiarize you with our tech stack. Your manager will discuss specific assignments during your first week.

Benefits Enrollment:
Don't forget to complete your benefits enrollment within the first 30 days. Our benefits team will send you a separate email with instructions. If you have questions, contact benefits@techcorp.com.

Parking & Commuting:
• Free parking available in the building garage - your access card will work starting day 1
• If using public transit, see HR about our commuter benefits program ($280/month pre-tax)
• Bike storage available in the basement level

We've prepared this welcome kit to help you get familiar with our company culture, policies, and the amazing benefits we offer. Take your time to review all the materials at your own pace.

Once again, welcome to the team! We can't wait to see the amazing contributions you'll make. If you have any questions before your start date, feel free to reach out to me directly.

Best regards,

Emily Rodriguez
Head of People Operations
TechCorp Inc.
emily.rodriguez@techcorp.com
(415) 555-0123`;

export const WelcomeKit = () => {
  const [selectedPolicy, setSelectedPolicy] = useState<typeof policies[0] | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [isPolicyDialogOpen, setIsPolicyDialogOpen] = useState(false);
  const [isLetterDialogOpen, setIsLetterDialogOpen] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<"ceo" | "hr" | null>(null);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleDownload = (policyName: string) => {
    toast.success(`Downloading ${policyName}...`, {
      description: "Your download will start shortly.",
    });
    setTimeout(() => {
      toast.success(`${policyName} downloaded successfully!`);
    }, 1500);
  };

  const handleViewPolicy = (policy: typeof policies[0]) => {
    setSelectedPolicy(policy);
    setSelectedSection(null);
    setIsPolicyDialogOpen(true);
  };

  const handlePlayVideo = (video: "ceo" | "hr") => {
    setPlayingVideo(video);
    setVideoProgress(0);
    setIsPaused(false);
    setIsVideoDialogOpen(true);
  };

  // Simulate video progress
  useState(() => {
    if (isVideoDialogOpen && !isPaused) {
      const interval = setInterval(() => {
        setVideoProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  });

  return (
    <div className="animate-fade-in">
      <PageBreadcrumb items={[{ label: "Pre-Onboarding", to: "/" }, { label: "Welcome Kit" }]} />

      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Welcome Kit</h1>
        <p className="text-muted-foreground">Your introduction to the company</p>
      </div>

      {/* Welcome Letter */}
      <div className="card-interactive p-8 mb-6 text-center bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-2xl flex items-center justify-center">
          <Gift className="w-8 h-8 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to the Team, James!</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          We're thrilled to have you join us. Your journey starts here, and we can't wait to see
          the amazing things you'll accomplish. This welcome kit contains everything you need
          to get started.
        </p>
        <Button onClick={() => setIsLetterDialogOpen(true)}>
          <FileText className="w-4 h-4 mr-2" />
          View Full Welcome Letter
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* CEO Message */}
        <div className="card-interactive p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="icon-circle-primary">
              <Play className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">CEO Welcome Message</h2>
          </div>

          <div 
            className="relative bg-secondary rounded-xl overflow-hidden aspect-video mb-4 cursor-pointer group"
            onClick={() => handlePlayVideo("ceo")}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:bg-primary transition-colors group-hover:scale-110 duration-200">
                <Play className="w-8 h-8 text-primary-foreground ml-1" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4">
              <p className="text-sm font-medium text-foreground">Michael Chen</p>
              <p className="text-xs text-muted-foreground">CEO & Founder</p>
            </div>
            <div className="absolute top-4 right-4 bg-background/80 px-2 py-1 rounded text-xs">
              3:45
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            A personal message from our CEO welcoming you to the team and sharing our vision.
          </p>
        </div>

        {/* HR Message */}
        <div className="card-interactive p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="icon-circle-success">
              <Play className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">HR Welcome Message</h2>
          </div>

          <div 
            className="relative bg-secondary rounded-xl overflow-hidden aspect-video mb-4 cursor-pointer group"
            onClick={() => handlePlayVideo("hr")}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-success/90 flex items-center justify-center group-hover:bg-success transition-colors group-hover:scale-110 duration-200">
                <Play className="w-8 h-8 text-success-foreground ml-1" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4">
              <p className="text-sm font-medium text-foreground">Emily Rodriguez</p>
              <p className="text-xs text-muted-foreground">Head of People</p>
            </div>
            <div className="absolute top-4 right-4 bg-background/80 px-2 py-1 rounded text-xs">
              5:20
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Learn about our people-first culture and all the benefits available to you.
          </p>
        </div>
      </div>

      {/* Company Values */}
      <div className="card-interactive p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="icon-circle-warning">
            <Heart className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Our Core Values</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {companyValues.map((value, index) => (
            <div 
              key={index} 
              className="p-4 rounded-xl bg-secondary/50 text-center hover:bg-secondary transition-colors cursor-pointer"
              onClick={() => toast.info(value.title, { description: value.description })}
            >
              <div className="text-3xl mb-2">{value.icon}</div>
              <h3 className="font-semibold text-foreground text-sm">{value.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Policy Library */}
      <div className="card-interactive p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="icon-circle-info">
              <FolderOpen className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Policy Library</h2>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              toast.success("Downloading all policies...");
              policies.forEach((p, i) => {
                setTimeout(() => handleDownload(p.name), i * 500);
              });
            }}
          >
            <Download className="w-4 h-4 mr-2" />
            Download All
          </Button>
        </div>

        <div className="space-y-3">
          {policies.map((policy, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{policy.name}</p>
                  <p className="text-xs text-muted-foreground">{policy.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground hidden sm:inline">{policy.size}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleViewPolicy(policy)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleDownload(policy.name)}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Welcome Letter Dialog */}
      <Dialog open={isLetterDialogOpen} onOpenChange={setIsLetterDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Welcome Letter
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="prose prose-sm dark:prose-invert">
              <pre className="whitespace-pre-wrap font-sans text-sm text-muted-foreground leading-relaxed">
                {welcomeLetterContent}
              </pre>
            </div>
          </ScrollArea>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsLetterDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              handleDownload("Welcome Letter");
              setIsLetterDialogOpen(false);
            }}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Policy Preview Dialog */}
      <Dialog open={isPolicyDialogOpen} onOpenChange={setIsPolicyDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              {selectedPolicy?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {!selectedSection ? (
              <>
                <p className="text-sm text-muted-foreground mb-4">{selectedPolicy?.description}</p>
                <h4 className="font-semibold text-foreground mb-3">Table of Contents:</h4>
                <div className="space-y-2">
                  {selectedPolicy?.sections.map((section, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary cursor-pointer transition-colors group"
                      onClick={() => setSelectedSection(section)}
                    >
                      <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                        {index + 1}
                      </span>
                      <span className="text-sm text-foreground flex-1">{section}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mb-4"
                  onClick={() => setSelectedSection(null)}
                >
                  ← Back to Table of Contents
                </Button>
                <h3 className="text-lg font-semibold text-foreground mb-4">{selectedSection}</h3>
                <ScrollArea className="h-[40vh] pr-4">
                  <div className="prose prose-sm dark:prose-invert">
                    <pre className="whitespace-pre-wrap font-sans text-sm text-muted-foreground leading-relaxed">
                      {selectedPolicy?.content[selectedSection as keyof typeof selectedPolicy.content]}
                    </pre>
                  </div>
                </ScrollArea>
              </>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => {
              setIsPolicyDialogOpen(false);
              setSelectedSection(null);
            }}>
              Close
            </Button>
            <Button onClick={() => {
              if (selectedPolicy) {
                handleDownload(selectedPolicy.name);
              }
            }}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Player Dialog */}
      <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {playingVideo === "ceo" ? "CEO Welcome Message" : "HR Welcome Message"}
            </DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video bg-secondary rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div 
                className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4 cursor-pointer hover:bg-primary/30 transition-colors"
                onClick={() => setIsPaused(!isPaused)}
              >
                {isPaused ? (
                  <Play className="w-10 h-10 text-primary" />
                ) : (
                  <Pause className="w-10 h-10 text-primary animate-pulse" />
                )}
              </div>
              <p className="text-foreground font-medium">
                {playingVideo === "ceo" ? "Michael Chen" : "Emily Rodriguez"}
              </p>
              <p className="text-sm text-muted-foreground">
                {playingVideo === "ceo" ? "CEO & Founder" : "Head of People"}
              </p>
              <p className="text-xs text-muted-foreground mt-4">
                {isPaused ? "Paused" : "Playing..."} (Demo mode)
              </p>
            </div>
            {/* Video progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary">
              <div 
                className="h-full bg-primary transition-all duration-200" 
                style={{ width: `${Math.min(videoProgress, 100)}%` }}
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground italic">
            {playingVideo === "ceo" 
              ? "\"Welcome to TechCorp! I'm Michael Chen, and I founded this company with a simple vision: to build technology that makes a real difference. Today, I'm excited to welcome you to our team. You're joining a group of passionate individuals who believe in innovation, collaboration, and excellence. Together, we're building something amazing, and I can't wait to see your contributions...\"" 
              : "\"Hi James! I'm Emily Rodriguez, Head of People Operations. On behalf of the entire HR team, welcome aboard! We've prepared a comprehensive onboarding experience to help you succeed. Let me walk you through all the amazing benefits we offer, from our flexible work arrangements to our wellness programs. We truly believe in putting our people first...\""}
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
};