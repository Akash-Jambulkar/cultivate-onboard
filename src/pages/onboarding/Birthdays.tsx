import { useState } from "react";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { Cake, MessageCircle, Gift, PartyPopper, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const birthdays = [
  { id: 1, name: "Sarah Johnson", date: "Dec 12", department: "Marketing", avatar: "SJ" },
  { id: 2, name: "Mike Chen", date: "Dec 15", department: "Engineering", avatar: "MC" },
  { id: 3, name: "Emily Davis", date: "Dec 18", department: "HR", avatar: "ED" },
  { id: 4, name: "Alex Kim", date: "Dec 22", department: "Sales", avatar: "AK" },
  { id: 5, name: "Rachel Green", date: "Dec 28", department: "Finance", avatar: "RG" },
];

export const Birthdays = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);

  const handleSendWishes = (id: number) => {
    setSelectedPerson(id);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="animate-fade-in relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-20px",
                backgroundColor: ["#3b82f6", "#f59e0b", "#22c55e", "#ec4899", "#8b5cf6"][
                  Math.floor(Math.random() * 5)
                ],
                animationDelay: `${Math.random() * 2}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      )}

      <PageBreadcrumb items={[{ label: "Onboarding", to: "/" }, { label: "Birthdays & Celebrations" }]} />

      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Birthdays & Celebrations</h1>
        <p className="text-muted-foreground">Celebrate with your colleagues</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Birthday List */}
        <div className="lg:col-span-2">
          <div className="card-interactive p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="icon-circle-warning">
                <Cake className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">December Birthdays</h2>
            </div>

            <div className="space-y-4">
              {birthdays.map((person) => (
                <div
                  key={person.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/30 transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                      <span className="font-semibold text-primary">{person.avatar}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{person.name}</p>
                      <p className="text-sm text-muted-foreground">{person.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary">{person.date}</p>
                      <p className="text-xs text-muted-foreground">Birthday</p>
                    </div>
                    <Button
                      size="sm"
                      variant={selectedPerson === person.id ? "default" : "outline"}
                      onClick={() => handleSendWishes(person.id)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Wishes
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* E-Card Preview */}
        <div className="space-y-6">
          <div className="card-interactive p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-circle-primary">
                <Gift className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Company E-Card</h2>
            </div>

            <div className="bg-gradient-to-br from-primary/10 via-warning/10 to-success/10 rounded-xl p-6 text-center">
              <PartyPopper className="w-12 h-12 mx-auto mb-3 text-warning" />
              <h3 className="text-xl font-bold text-foreground mb-2">Happy Birthday!</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Wishing you a wonderful day filled with joy and happiness.
              </p>
              <p className="text-xs text-muted-foreground">From your team at Company</p>
            </div>

            <Button className="w-full mt-4">
              <Send className="w-4 h-4 mr-2" />
              Send E-Card
            </Button>
          </div>

          <div className="card-interactive p-6">
            <h3 className="font-semibold text-foreground mb-3">Quick Message</h3>
            <textarea
              className="w-full p-3 rounded-lg border border-input bg-background text-sm resize-none"
              rows={4}
              placeholder="Write a personal birthday message..."
            />
            <Button variant="outline" className="w-full mt-3">
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
