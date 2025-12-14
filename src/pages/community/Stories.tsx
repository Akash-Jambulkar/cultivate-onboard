import { useState } from "react";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { BookOpen, Heart, MessageCircle, Star, PenSquare, Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Story } from "@/types/onboarding";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const sampleStories: Story[] = [
  { 
    id: "sample-1", 
    authorName: "Maria Garcia", 
    authorRole: "Product Designer", 
    authorInitials: "MG",
    content: "My journey from intern to lead designer in just 2 years has been incredible. The mentorship program here really helped me grow both professionally and personally. I started with basic UI tasks and now I'm leading design sprints for major product launches. The key was staying curious and always asking for feedback.", 
    likes: 45, 
    likedBy: [],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  { 
    id: "sample-2", 
    authorName: "James Park", 
    authorRole: "Senior Engineer", 
    authorInitials: "JP",
    content: "How cross-team collaboration helped me grow as an engineer is a story I love telling. When I joined, I was focused only on my team's projects. But then I started attending design reviews, product meetings, and even sales calls. Understanding the full picture made me a better engineer and helped me build features that truly matter to users.", 
    likes: 32, 
    likedBy: [],
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const Stories = () => {
  const { toast } = useToast();
  const [stories, setStories] = useLocalStorage<Story[]>("employee-stories", sampleStories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newStory, setNewStory] = useState({
    authorName: "",
    authorRole: "",
    content: "",
  });
  const [currentUserId] = useState(() => localStorage.getItem("user-id") || `user-${Date.now()}`);

  // Save user ID for like tracking
  useState(() => {
    if (!localStorage.getItem("user-id")) {
      localStorage.setItem("user-id", currentUserId);
    }
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSubmitStory = () => {
    if (!newStory.authorName.trim() || !newStory.content.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in your name and story",
        variant: "destructive",
      });
      return;
    }

    if (newStory.content.length < 50) {
      toast({
        title: "Story too short",
        description: "Please write at least 50 characters to share your story",
        variant: "destructive",
      });
      return;
    }

    const story: Story = {
      id: Date.now().toString(),
      authorName: newStory.authorName.trim(),
      authorRole: newStory.authorRole.trim() || "Team Member",
      authorInitials: getInitials(newStory.authorName.trim()),
      content: newStory.content.trim(),
      likes: 0,
      likedBy: [],
      createdAt: new Date().toISOString(),
    };

    setStories((prev) => [story, ...prev]);
    setNewStory({ authorName: "", authorRole: "", content: "" });
    setIsDialogOpen(false);

    toast({
      title: "Story shared!",
      description: "Thank you for sharing your experience with the community",
    });
  };

  const handleLike = (storyId: string) => {
    setStories((prev) =>
      prev.map((story) => {
        if (story.id === storyId) {
          const hasLiked = story.likedBy.includes(currentUserId);
          return {
            ...story,
            likes: hasLiked ? story.likes - 1 : story.likes + 1,
            likedBy: hasLiked
              ? story.likedBy.filter((id) => id !== currentUserId)
              : [...story.likedBy, currentUserId],
          };
        }
        return story;
      })
    );
  };

  const handleDeleteStory = (storyId: string) => {
    setStories((prev) => prev.filter((s) => s.id !== storyId));
    toast({
      title: "Story deleted",
      description: "Your story has been removed",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="animate-fade-in">
      <PageBreadcrumb items={[{ label: "Community", to: "/" }, { label: "Employee Stories" }]} />
      
      <div className="mb-8">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-warning" />
                <span className="font-semibold text-foreground">Employee Spotlight</span>
              </div>
              <p className="text-muted-foreground">Share your story and inspire others!</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PenSquare className="w-4 h-4 mr-2" />
                  Share Your Story
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Share Your Story</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Your Name *</label>
                    <input
                      type="text"
                      value={newStory.authorName}
                      onChange={(e) => setNewStory((prev) => ({ ...prev, authorName: e.target.value }))}
                      placeholder="Enter your full name"
                      maxLength={50}
                      className="w-full mt-1 p-3 rounded-xl border border-input bg-background text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Your Role</label>
                    <input
                      type="text"
                      value={newStory.authorRole}
                      onChange={(e) => setNewStory((prev) => ({ ...prev, authorRole: e.target.value }))}
                      placeholder="e.g., Software Engineer, Product Manager"
                      maxLength={50}
                      className="w-full mt-1 p-3 rounded-xl border border-input bg-background text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Your Story *</label>
                    <textarea
                      value={newStory.content}
                      onChange={(e) => setNewStory((prev) => ({ ...prev, content: e.target.value }))}
                      placeholder="Share your experience, growth journey, or lessons learned..."
                      rows={6}
                      maxLength={2000}
                      className="w-full mt-1 p-3 rounded-xl border border-input bg-background text-sm resize-none"
                    />
                    <p className="text-xs text-muted-foreground mt-1 text-right">
                      {newStory.content.length}/2000 characters (min 50)
                    </p>
                  </div>
                  <Button className="w-full" onClick={handleSubmitStory}>
                    <Send className="w-4 h-4 mr-2" />
                    Share Story
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Employee Stories</h1>
        <p className="text-muted-foreground">{stories.length} stories shared by our community</p>
      </div>

      <div className="space-y-4">
        {stories.map((story) => {
          const hasLiked = story.likedBy.includes(currentUserId);
          const isOwnStory = !story.id.startsWith("sample-");
          
          return (
            <div key={story.id} className="card-interactive p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-primary">{story.authorInitials}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{story.authorName}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{story.authorRole}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{formatDate(story.createdAt)}</span>
                      {isOwnStory && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => handleDeleteStory(story.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="text-foreground whitespace-pre-wrap">{story.content}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <Button 
                      variant={hasLiked ? "default" : "ghost"} 
                      size="sm"
                      onClick={() => handleLike(story.id)}
                      className={hasLiked ? "bg-destructive/10 text-destructive hover:bg-destructive/20" : ""}
                    >
                      <Heart className={`w-4 h-4 mr-1 ${hasLiked ? "fill-current" : ""}`} />
                      {story.likes}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {stories.length === 0 && (
          <div className="card-interactive p-12 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold text-foreground mb-2">No stories yet</h3>
            <p className="text-muted-foreground mb-4">Be the first to share your experience!</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <PenSquare className="w-4 h-4 mr-2" />
              Share Your Story
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
