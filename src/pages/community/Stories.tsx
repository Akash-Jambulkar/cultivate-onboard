import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { BookOpen, Heart, MessageCircle, Star, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

const stories = [
  { id: 1, name: "Maria Garcia", role: "Product Designer", story: "My journey from intern to lead designer in just 2 years...", likes: 45, comments: 12, avatar: "MG" },
  { id: 2, name: "James Park", role: "Senior Engineer", story: "How cross-team collaboration helped me grow as an engineer...", likes: 32, comments: 8, avatar: "JP" },
];

export const Stories = () => {
  return (
    <div className="animate-fade-in">
      <PageBreadcrumb items={[{ label: "Community", to: "/" }, { label: "Employee Stories" }]} />
      <div className="mb-8">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-warning" />
            <span className="font-semibold text-foreground">Employee Spotlight of the Month</span>
          </div>
          <p className="text-muted-foreground">Share your story and inspire others!</p>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Employee Stories</h1>
      </div>

      <div className="space-y-4">
        {stories.map((story) => (
          <div key={story.id} className="card-interactive p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-bold text-primary">{story.avatar}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{story.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{story.role}</p>
                <p className="text-foreground">{story.story}</p>
                <div className="flex items-center gap-4 mt-3">
                  <Button variant="ghost" size="sm"><Heart className="w-4 h-4 mr-1" />{story.likes}</Button>
                  <Button variant="ghost" size="sm"><MessageCircle className="w-4 h-4 mr-1" />{story.comments}</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
