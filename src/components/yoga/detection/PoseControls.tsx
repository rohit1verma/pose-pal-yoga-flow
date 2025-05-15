
import { Button } from "@/components/ui/button";
import { Play, Pause, Settings } from "lucide-react";

interface PoseControlsProps {
  isWebcamActive: boolean;
  isPoseDetectionActive: boolean;
  isLoading: boolean;
  poseScore: number | null;
  onTogglePoseDetection: () => void;
}

const PoseControls = ({ 
  isWebcamActive, 
  isPoseDetectionActive, 
  isLoading,
  poseScore,
  onTogglePoseDetection 
}: PoseControlsProps) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Button
          onClick={onTogglePoseDetection}
          variant="outline"
          disabled={isLoading}
          className="flex items-center"
        >
          {isPoseDetectionActive ? (
            <>
              <Pause className="mr-2 h-4 w-4" />
              Pause Detection
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              {isWebcamActive ? 'Start Detection' : 'Enable Camera'}
            </>
          )}
        </Button>
        
        <Button
          variant="ghost"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
      
      {poseScore !== null && (
        <div className="flex items-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">Pose accuracy:</div>
          <div className="ml-2 text-lg font-bold text-yoga-green">{poseScore}%</div>
        </div>
      )}
    </div>
  );
};

export default PoseControls;
