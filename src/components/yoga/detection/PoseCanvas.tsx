
import { useRef, useEffect } from "react";

interface PoseCanvasProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isPoseDetectionActive: boolean;
}

const PoseCanvas = ({ videoRef, isPoseDetectionActive }: PoseCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
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
  }, [isPoseDetectionActive, videoRef]);

  return (
    <canvas 
      ref={canvasRef}
      className="pose-canvas rounded-t-lg"
      width={640}
      height={480}
    />
  );
};

export default PoseCanvas;
