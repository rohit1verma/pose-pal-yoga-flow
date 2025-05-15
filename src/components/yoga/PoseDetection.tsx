import { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Settings } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface PoseDetectionProps {
  activePoseName?: string;
}

const PoseDetection = ({ activePoseName }: PoseDetectionProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
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
  
  // Initialize webcam
  const initializeWebcam = async () => {
    if (!videoRef.current) return;
    
    try {
      setIsLoading(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          facingMode: "user"
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsWebcamActive(true);
        toast({
          title: "Camera activated",
          description: "Your webcam has been successfully initialized."
        });
        
        // If there's an active pose, automatically start detection
        if (activePoseName) {
          setIsPoseDetectionActive(true);
        }
      }
    } catch (error) {
      console.error("Error initializing webcam:", error);
      toast({
        variant: "destructive",
        title: "Camera error",
        description: "Unable to access your camera. Please check permissions."
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Stop webcam
  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsWebcamActive(false);
      setIsPoseDetectionActive(false);
    }
  };
  
  // Toggle pose detection
  const togglePoseDetection = () => {
    if (!isWebcamActive) {
      initializeWebcam();
      return;
    }
    
    setIsPoseDetectionActive(!isPoseDetectionActive);
    
    if (!isPoseDetectionActive) {
      // Start pose detection
      toast({
        title: "Pose detection started",
        description: activePoseName 
          ? `We're now analyzing your ${activePoseName} pose.`
          : "We're now analyzing your yoga poses."
      });
      
      // Simulate pose detection with random scoring (will be replaced with TensorFlow.js)
      const interval = setInterval(() => {
        setPoseScore(Math.floor(Math.random() * 100));
      }, 2000);
      
      return () => clearInterval(interval);
    } else {
      // Stop pose detection
      setPoseScore(null);
    }
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);
  
  // Draw on canvas when pose detection is active
  useEffect(() => {
    if (isPoseDetectionActive && canvasRef.current && videoRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;
      
      // This is a placeholder for the actual TensorFlow pose detection
      // We'll draw simple circles to simulate detected keypoints
      const drawFrame = () => {
        if (!canvasRef.current || !videoRef.current || !isPoseDetectionActive) return;
        
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        // Draw simple keypoints (this will be replaced with actual pose detection)
        ctx.fillStyle = '#4A90E2';
        ctx.beginPath();
        ctx.arc(320, 120, 10, 0, 2 * Math.PI); // Head
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(320, 200, 10, 0, 2 * Math.PI); // Torso
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(280, 180, 10, 0, 2 * Math.PI); // Left shoulder
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(360, 180, 10, 0, 2 * Math.PI); // Right shoulder
        ctx.fill();
        
        // Draw lines connecting keypoints
        ctx.strokeStyle = '#4A90E2';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(320, 120); // Head to torso
        ctx.lineTo(320, 200);
        ctx.moveTo(320, 200); // Torso to left shoulder
        ctx.lineTo(280, 180);
        ctx.moveTo(320, 200); // Torso to right shoulder
        ctx.lineTo(360, 180);
        ctx.stroke();
        
        if (isPoseDetectionActive) {
          requestAnimationFrame(drawFrame);
        }
      };
      
      requestAnimationFrame(drawFrame);
    }
  }, [isPoseDetectionActive]);
  
  return (
    <Card className="overflow-hidden">
      {/* Display active pose banner when applicable */}
      {activePoseName && (
        <div className="bg-yoga-blue text-white p-3 font-semibold text-center">
          Currently Practicing: {activePoseName}
        </div>
      )}
      
      <div className="webcam-container" style={{ height: '480px' }}>
        <video 
          ref={videoRef}
          className="webcam-video rounded-t-lg"
          autoPlay
          playsInline
          muted
        />
        <canvas 
          ref={canvasRef}
          className="pose-canvas rounded-t-lg"
          width={640}
          height={480}
        />
        
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
      
      <div className="p-6 bg-white dark:bg-gray-900 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button
            onClick={togglePoseDetection}
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
    </Card>
  );
};

export default PoseDetection;
