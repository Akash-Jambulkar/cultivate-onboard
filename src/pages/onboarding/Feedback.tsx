import { useState } from "react";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { MessageSquare, User, Users, EyeOff, Brain, Send, ThumbsUp, ThumbsDown, Meh } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const Feedback = () => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const feedbackTypes = [
    { id: "manager", icon: <User className="w-5 h-5" />, title: "Manager Feedback", description: "Share feedback about your direct manager" },
    { id: "hr", icon: <Users className="w-5 h-5" />, title: "HR Feedback", description: "Feedback about HR processes and policies" },
    { id: "anonymous", icon: <EyeOff className="w-5 h-5" />, title: "Anonymous Feedback", description: "Submit feedback without identification" },
  ];

  const sentimentData = {
    positive: 72,
    neutral: 18,
    negative: 10,
  };

  return (
    <div className="animate-fade-in">
      <PageBreadcrumb items={[{ label: "Onboarding", to: "/" }, { label: "Feedback Hub" }]} />

      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Feedback Hub</h1>
        <p className="text-muted-foreground">Share your thoughts and help us improve</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feedback Types */}
        <div className="lg:col-span-2 space-y-4">
          {feedbackTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`card-interactive p-6 cursor-pointer ${
                selectedType === type.id ? "border-primary ring-2 ring-primary/20" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="icon-circle-primary">
                  {type.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{type.title}</h3>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </div>
              </div>

              {selectedType === type.id && (
                <div className="mt-4 space-y-4 animate-fade-in">
                  <textarea
                    className="w-full p-4 rounded-xl border border-input bg-background text-sm resize-none"
                    rows={4}
                    placeholder="Write your feedback here..."
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">How was your experience?</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-full">
                          <ThumbsUp className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-full">
                          <Meh className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-full">
                          <ThumbsDown className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Button>
                      <Send className="w-4 h-4 mr-2" />
                      Submit
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Anonymous Toggle */}
          <div className="card-interactive p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <EyeOff className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Anonymous Mode</p>
                  <p className="text-sm text-muted-foreground">Hide your identity</p>
                </div>
              </div>
              <Switch checked={isAnonymous} onCheckedChange={setIsAnonymous} />
            </div>
          </div>

          {/* AI Sentiment Analysis */}
          <div className="card-interactive p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-circle-primary">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground">AI Sentiment Analysis</h3>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Based on recent feedback from new hires
            </p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-success flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" /> Positive
                  </span>
                  <span className="font-medium">{sentimentData.positive}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full" style={{ width: `${sentimentData.positive}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-warning flex items-center gap-1">
                    <Meh className="w-4 h-4" /> Neutral
                  </span>
                  <span className="font-medium">{sentimentData.neutral}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-warning rounded-full" style={{ width: `${sentimentData.neutral}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-destructive flex items-center gap-1">
                    <ThumbsDown className="w-4 h-4" /> Negative
                  </span>
                  <span className="font-medium">{sentimentData.negative}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-destructive rounded-full" style={{ width: `${sentimentData.negative}%` }} />
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              Overall: Employee satisfaction is high with positive onboarding experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
