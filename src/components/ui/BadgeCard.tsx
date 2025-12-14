import { cn } from "@/lib/utils";

interface BadgeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  earnedDate?: string;
}

export const BadgeCard = ({
  title,
  description,
  icon,
  earned,
  earnedDate,
}: BadgeCardProps) => {
  return (
    <div
      className={cn(
        "card-interactive p-4 text-center",
        !earned && "opacity-50 grayscale"
      )}
    >
      <div
        className={cn(
          "w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center",
          earned ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
        )}
      >
        {icon}
      </div>
      <h4 className="font-semibold text-foreground text-sm mb-1">{title}</h4>
      <p className="text-xs text-muted-foreground mb-2">{description}</p>
      {earned && earnedDate && (
        <span className="text-xs text-success font-medium">Earned {earnedDate}</span>
      )}
      {!earned && (
        <span className="text-xs text-muted-foreground">Not earned yet</span>
      )}
    </div>
  );
};
