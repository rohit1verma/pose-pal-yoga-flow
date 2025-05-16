
import { Badge } from "@/components/ui/badge";

interface ActivePoseBannerProps {
  activePoseName: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  sanskritName?: string;
}

const difficultyColors: Record<string, string> = {
  beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  intermediate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  advanced: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
};

const ActivePoseBanner = ({ activePoseName, difficulty, sanskritName }: ActivePoseBannerProps) => {
  return (
    <div className="bg-yoga-blue text-white p-3 font-semibold flex items-center justify-between">
      <div className="flex flex-col">
        <span>Currently Practicing: {activePoseName}</span>
        {sanskritName && (
          <span className="text-sm font-normal text-blue-100 italic">
            {sanskritName}
          </span>
        )}
      </div>
      
      {difficulty && (
        <Badge className={difficultyColors[difficulty]}>
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </Badge>
      )}
    </div>
  );
};

export default ActivePoseBanner;
