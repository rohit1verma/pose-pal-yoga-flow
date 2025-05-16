
import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useWebcam } from "@/hooks/useWebcam";
import WebcamView from "@/components/yoga/detection/WebcamView";
import PoseControls from "@/components/yoga/detection/PoseControls";
import ActivePoseBanner from "@/components/yoga/detection/ActivePoseBanner";
import { yogaPoses } from "@/data/yogaPoses";

interface PoseDetectionProps {
  activePoseName?: string;
}

const PoseDetection = ({ activePoseName }: PoseDetectionProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { 
    isWebcamActive, 
    isPoseDetectionActive, 
    isLoading, 
    poseScore,
    setIsLoading,
    handleWebcamInit,
    togglePoseDetection,
    stopWebcam
  } = useWebcam(activePoseName);
  
  // Find active pose details
  const activePose = activePoseName 
    ? yogaPoses.find(pose => pose.name === activePoseName) 
    : undefined;
  
  // Toggle pose detection
  const handleTogglePoseDetection = () => {
    if (!isWebcamActive) {
      setIsLoading(true);
      return;
    }
    
    togglePoseDetection();
    
    if (!isPoseDetectionActive) {
      // Start pose detection
      toast({
        title: "Pose detection started",
        description: activePoseName 
          ? `We're now analyzing your ${activePoseName} pose.`
          : "We're now analyzing your yoga poses."
      });
    }
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopWebcam(videoRef.current);
    };
  }, []);
  
  return (
    <Card className="overflow-hidden">
      {/* Display active pose banner when applicable */}
      {activePoseName && activePose && (
        <ActivePoseBanner 
          activePoseName={activePoseName} 
          difficulty={activePose.difficulty}
          sanskritName={activePose.sanskritName}
        />
      )}
      
      <WebcamView
        activePoseName={activePoseName}
        isWebcamActive={isWebcamActive}
        isPoseDetectionActive={isPoseDetectionActive}
        isLoading={isLoading}
        onWebcamInit={handleWebcamInit}
      />
      
      <PoseControls
        isWebcamActive={isWebcamActive}
        isPoseDetectionActive={isPoseDetectionActive}
        isLoading={isLoading}
        poseScore={poseScore}
        onTogglePoseDetection={handleTogglePoseDetection}
      />
    </Card>
  );
};

export default PoseDetection;
