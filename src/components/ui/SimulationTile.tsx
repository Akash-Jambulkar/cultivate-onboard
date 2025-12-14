import { cn } from "@/lib/utils";
import { Play, Check, Lock } from "lucide-react";
import { Button } from "./button";

interface SimulationTileProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "locked" | "available" | "completed";
  level: number;
  onStart?: () => void;
}

export const SimulationTile = ({
  title,
  description,
  icon,
  status,
  level,
  onStart,
}: SimulationTileProps) => {
  const isLocked = status === "locked";
  const isCompleted = status === "completed";

  return (
    <div
      className={cn(
        "simulation-tile",
        isLocked && "opacity-60 cursor-not-allowed",
        isCompleted && "border-success/30 bg-success-light/30"
      )}
    >
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "icon-circle",
            isCompleted ? "bg-success/10 text-success" : "bg-primary/10 text-primary"
          )}
        >
          {icon}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">Level {level}</span>
          {isCompleted && (
            <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center">
              <Check className="w-3 h-3 text-success-foreground" />
            </div>
          )}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-foreground mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <Button
        variant={isCompleted ? "outline" : "default"}
        size="sm"
        className="w-full mt-2"
        disabled={isLocked}
        onClick={onStart}
      >
        {isLocked ? (
          <>
            <Lock className="w-4 h-4 mr-2" />
            Locked
          </>
        ) : isCompleted ? (
          <>
            <Play className="w-4 h-4 mr-2" />
            Replay
          </>
        ) : (
          <>
            <Play className="w-4 h-4 mr-2" />
            Start Simulation
          </>
        )}
      </Button>
    </div>
  );
};
