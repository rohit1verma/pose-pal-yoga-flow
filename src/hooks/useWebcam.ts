
import { useState, useRef, useEffect } from "react";

export const useWebcam = (activePoseName?: string) => {
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [isPoseDetectionActive, setIsPoseDetectionActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [poseScore, setPoseScore] = useState<number | null>(null);
  
  // Initialize pose detection when an active pose is set
  useEffect(() => {
    if (activePoseName && !isPoseDetectionActive && isWebcamActive) {
      setIsPoseDetectionActive(true);
      
      // Simulate pose detection with random scoring
      const interval = setInterval(() => {
        setPoseScore(Math.floor(Math.random() * 100));
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [activePoseName, isWebcamActive, isPoseDetectionActive]);
  
  // Handle webcam initialization
  const handleWebcamInit = (success: boolean) => {
    setIsWebcamActive(success);
    setIsLoading(false);
    
    // If there's an active pose, automatically start detection
    if (activePoseName && success) {
      setIsPoseDetectionActive(true);
    }
  };

  // Toggle pose detection
  const togglePoseDetection = () => {
    if (!isWebcamActive) {
      setIsLoading(true);
      return;
    }
    
    const newDetectionState = !isPoseDetectionActive;
    setIsPoseDetectionActive(newDetectionState);
    
    if (newDetectionState) {
      // Simulate pose detection with random scoring
      const interval = setInterval(() => {
        setPoseScore(Math.floor(Math.random() * 100));
      }, 2000);
      
      return () => clearInterval(interval);
    } else {
      // Stop pose detection
      setPoseScore(null);
    }
  };
  
  // Stop webcam
  const stopWebcam = (videoElement: HTMLVideoElement | null) => {
    if (videoElement && videoElement.srcObject) {
      const stream = videoElement.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoElement.srcObject = null;
      setIsWebcamActive(false);
      setIsPoseDetectionActive(false);
    }
  };

  return {
    isWebcamActive,
    isPoseDetectionActive,
    isLoading,
    poseScore,
    setIsLoading,
    handleWebcamInit,
    togglePoseDetection,
    stopWebcam
  };
};
