
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import PoseCanvas from "./PoseCanvas";

interface WebcamViewProps {
  activePoseName?: string;
  isWebcamActive: boolean;
  isPoseDetectionActive: boolean;
  isLoading: boolean;
  onWebcamInit: (success: boolean) => void;
}

const WebcamView = ({ 
  activePoseName, 
  isWebcamActive, 
  isPoseDetectionActive, 
  isLoading,
  onWebcamInit
}: WebcamViewProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Initialize webcam
  const initializeWebcam = async () => {
    if (!videoRef.current) return;
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          facingMode: "user"
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        onWebcamInit(true);
        toast({
          title: "Camera activated",
          description: "Your webcam has been successfully initialized."
        });
      }
    } catch (error) {
      console.error("Error initializing webcam:", error);
      toast({
        variant: "destructive",
        title: "Camera error",
        description: "Unable to access your camera. Please check permissions."
      });
      onWebcamInit(false);
    }
  };
  
  return (
    <div className="webcam-container" style={{ height: '480px' }}>
      <video 
        ref={videoRef}
        className="webcam-video rounded-t-lg"
        autoPlay
        playsInline
        muted
      />
      
      {isPoseDetectionActive && (
        <PoseCanvas 
          videoRef={videoRef} 
          isPoseDetectionActive={isPoseDetectionActive} 
          activePoseName={activePoseName} 
        />
      )}
      
      {!isWebcamActive && !isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-t-lg">
          <div className="text-center p-6">
            <h3 className="text-xl font-bold mb-2">Camera Access Required</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Please enable your camera to start practicing yoga with AI guidance.
            </p>
            <Button 
              onClick={initializeWebcam}
              className="bg-yoga-blue hover:bg-yoga-blue/80"
            >
              Enable Camera
            </Button>
          </div>
        </div>
      )}
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 rounded-t-lg">
          <div className="text-center">
            <div className="animate-pulse text-yoga-blue">
              <svg className="animate-spin h-12 w-12 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Initializing camera...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebcamView;
