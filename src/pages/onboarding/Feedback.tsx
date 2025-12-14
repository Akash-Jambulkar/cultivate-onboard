import { useState } from "react";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { MessageSquare, User, Users, EyeOff, Brain, Send, ThumbsUp, ThumbsDown, Meh, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { FeedbackItem } from "@/types/onboarding";
import { useToast } from "@/hooks/use-toast";

export const Feedback = () => {
  const { toast } = useToast();
  const [feedbackList, setFeedbackList] = useLocalStorage<FeedbackItem[]>("feedback-hub", []);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [selectedSentiment, setSelectedSentiment] = useState<"positive" | "neutral" | "negative" | null>(null);
  const [authorName, setAuthorName] = useState("");

  const feedbackTypes = [
    { id: "manager", icon: <User className="w-5 h-5" />, title: "Manager Feedback", description: "Share feedback about your direct manager" },
    { id: "hr", icon: <Users className="w-5 h-5" />, title: "HR Feedback", description: "Feedback about HR processes and policies" },
    { id: "anonymous", icon: <EyeOff className="w-5 h-5" />, title: "Anonymous Feedback", description: "Submit feedback without identification" },
  ];

  const handleSubmit = () => {
    if (!feedbackText.trim()) {
      toast({
        title: "Feedback required",
        description: "Please write your feedback before submitting",
        variant: "destructive",
      });
      return;
    }

    if (!selectedSentiment) {
      toast({
        title: "Rating required",
        description: "Please select how your experience was",
        variant: "destructive",
      });
      return;
    }

    if (!isAnonymous && !authorName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name or enable anonymous mode",
        variant: "destructive",
      });
      return;
    }

    const newFeedback: FeedbackItem = {
      id: Date.now().toString(),
      type: selectedType as "manager" | "hr" | "anonymous",
      content: feedbackText.trim(),
      sentiment: selectedSentiment,
      isAnonymous: isAnonymous || selectedType === "anonymous",
      createdAt: new Date().toISOString(),
      authorName: isAnonymous || selectedType === "anonymous" ? undefined : authorName.trim(),
    };

    setFeedbackList((prev) => [newFeedback, ...prev]);
    
    toast({
      title: "Feedback submitted",
      description: "Thank you for sharing your thoughts!",
    });

    // Reset form
    setFeedbackText("");
    setSelectedSentiment(null);
    setSelectedType(null);
    setAuthorName("");
  };

  const handleDeleteFeedback = (id: string) => {
    setFeedbackList((prev) => prev.filter((f) => f.id !== id));
    toast({
      title: "Feedback deleted",
      description: "Your feedback has been removed",
    });
  };

  // Calculate sentiment stats
  const sentimentStats = {
    positive: feedbackList.filter((f) => f.sentiment === "positive").length,
    neutral: feedbackList.filter((f) => f.sentiment === "neutral").length,
    negative: feedbackList.filter((f) => f.sentiment === "negative").length,
  };
  
  const total = feedbackList.length || 1;
  const sentimentData = {
    positive: Math.round((sentimentStats.positive / total) * 100),
    neutral: Math.round((sentimentStats.neutral / total) * 100),
    negative: Math.round((sentimentStats.negative / total) * 100),
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
                  {!isAnonymous && type.id !== "anonymous" && (
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="Your name"
                      maxLength={50}
                      className="w-full p-3 rounded-xl border border-input bg-background text-sm"
                    />
                  )}
                  
                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="w-full p-4 rounded-xl border border-input bg-background text-sm resize-none"
                    rows={4}
                    placeholder="Write your feedback here..."
                    maxLength={1000}
                  />
                  
                  <p className="text-xs text-muted-foreground text-right">
                    {feedbackText.length}/1000 characters
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">How was your experience?</span>
                      <div className="flex gap-2">
                        <Button 
                          variant={selectedSentiment === "positive" ? "default" : "outline"} 
                          size="sm" 
                          className="rounded-full"
                          onClick={(e) => { e.stopPropagation(); setSelectedSentiment("positive"); }}
                        >
                          <ThumbsUp className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant={selectedSentiment === "neutral" ? "default" : "outline"} 
                          size="sm" 
                          className="rounded-full"
                          onClick={(e) => { e.stopPropagation(); setSelectedSentiment("neutral"); }}
                        >
                          <Meh className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant={selectedSentiment === "negative" ? "default" : "outline"} 
                          size="sm" 
                          className="rounded-full"
                          onClick={(e) => { e.stopPropagation(); setSelectedSentiment("negative"); }}
                        >
                          <ThumbsDown className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Button onClick={(e) => { e.stopPropagation(); handleSubmit(); }}>
                      <Send className="w-4 h-4 mr-2" />
                      Submit
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Previous Feedback */}
          {feedbackList.length > 0 && (
            <div className="card-interactive p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Your Submitted Feedback ({feedbackList.length})
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {feedbackList.map((feedback) => (
                  <div key={feedback.id} className="p-4 rounded-xl bg-secondary/50 border border-border">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary capitalize">
                            {feedback.type}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            feedback.sentiment === "positive" ? "bg-success-light text-success" :
                            feedback.sentiment === "negative" ? "bg-destructive/10 text-destructive" :
                            "bg-warning-light text-warning"
                          }`}>
                            {feedback.sentiment === "positive" ? "👍" : feedback.sentiment === "negative" ? "👎" : "😐"}
                          </span>
                          {feedback.isAnonymous && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <EyeOff className="w-3 h-3" /> Anonymous
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-foreground">{feedback.content}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(feedback.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => handleDeleteFeedback(feedback.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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

          {/* Sentiment Analysis */}
          <div className="card-interactive p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-circle-primary">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground">Feedback Summary</h3>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Based on {feedbackList.length} submitted feedback{feedbackList.length !== 1 ? "s" : ""}
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
                  <div className="h-full bg-success rounded-full transition-all" style={{ width: `${sentimentData.positive}%` }} />
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
                  <div className="h-full bg-warning rounded-full transition-all" style={{ width: `${sentimentData.neutral}%` }} />
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
                  <div className="h-full bg-destructive rounded-full transition-all" style={{ width: `${sentimentData.negative}%` }} />
                </div>
              </div>
            </div>

            {feedbackList.length === 0 && (
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Submit feedback to see analytics
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
