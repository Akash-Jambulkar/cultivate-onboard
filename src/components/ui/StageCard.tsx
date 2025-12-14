import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface StageCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  stage: "pre" | "onboarding" | "post";
  to: string;
  tasks: { completed: number; total: number };
}

const stageColors = {
  pre: {
    bg: "bg-info-light",
    text: "text-info",
    border: "border-info/20",
    progress: "bg-info",
  },
  onboarding: {
    bg: "bg-warning-light",
    text: "text-warning",
    border: "border-warning/20",
    progress: "bg-warning",
  },
  post: {
    bg: "bg-success-light",
    text: "text-success",
    border: "border-success/20",
    progress: "bg-success",
  },
};

export const StageCard = ({
  title,
  description,
  icon,
  progress,
  stage,
  to,
  tasks,
}: StageCardProps) => {
  const colors = stageColors[stage];

  return (
    <Link to={to} className="block">
      <div className="card-interactive p-6 h-full group">
        <div className="flex items-start justify-between mb-4">
          <div className={cn("icon-circle", colors.bg, colors.text)}>
            {icon}
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
        </div>

        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {tasks.completed}/{tasks.total} tasks
            </span>
            <span className={cn("font-medium", colors.text)}>{progress}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-500", colors.progress)}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};
