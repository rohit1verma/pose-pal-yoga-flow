
import { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

interface PoseCanvasProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isPoseDetectionActive: boolean;
  activePoseName?: string;
}

const PoseCanvas = ({ videoRef, isPoseDetectionActive, activePoseName }: PoseCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [model, setModel] = useState<tf.GraphModel | null>(null);
  const [modelLoading, setModelLoading] = useState(false);
  
  // Load the TensorFlow model
  useEffect(() => {
    const loadModel = async () => {
      if (!model && isPoseDetectionActive) {
        try {
          setModelLoading(true);
          // Initialize TensorFlow.js
          await tf.ready();
          // Use a simple MobileNetV3 model for pose classification
          // In a real implementation, you would load the specific yoga pose model
          const loadedModel = await tf.loadGraphModel('https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/classification/5/default/1', { fromTFHub: true });
          setModel(loadedModel);
          setModelLoading(false);
        } catch (error) {
          console.error("Error loading model:", error);
          setModelLoading(false);
        }
      }
    };
    
    loadModel();
    
    // Cleanup
    return () => {
      if (model) {
        // No explicit cleanup needed for the model
      }
    };
  }, [isPoseDetectionActive, model]);
  
  // Draw on canvas when pose detection is active
  useEffect(() => {
    let animationFrameId: number;
    
    if (isPoseDetectionActive && canvasRef.current && videoRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;
      
      const drawFrame = async () => {
        if (!canvasRef.current || !videoRef.current || !isPoseDetectionActive) return;
        
        // Clear previous drawings
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        if (model && videoRef.current.readyState === 4) {
          try {
            // Draw the video on the canvas
            ctx.drawImage(
              videoRef.current, 
              0, 0, 
              canvasRef.current.width, 
              canvasRef.current.height
            );
            
            // For demonstration, we'll draw placeholder keypoints
            // In a real implementation, you would use the model to detect keypoints
            drawPlaceholderKeypoints(ctx);
          } catch (error) {
            console.error("Error during pose detection:", error);
          }
        } else if (modelLoading) {
          // Draw loading indicator
          ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
          ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          ctx.fillStyle = '#ffffff';
          ctx.font = '20px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(
            'Loading pose detection model...', 
            canvasRef.current.width / 2, 
            canvasRef.current.height / 2
          );
        } else {
          // Draw placeholder keypoints while model is loading
          drawPlaceholderKeypoints(ctx);
        }
        
        if (isPoseDetectionActive) {
          animationFrameId = requestAnimationFrame(drawFrame);
        }
      };
      
      // Helper function to draw placeholder keypoints
      const drawPlaceholderKeypoints = (ctx: CanvasRenderingContext2D) => {
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
        
        // Add pose name if active
        if (activePoseName) {
          ctx.font = '16px Arial';
          ctx.fillStyle = '#4A90E2';
          ctx.textAlign = 'center';
          ctx.fillText(
            `Detecting: ${activePoseName}`, 
            canvasRef.current!.width / 2, 
            30
          );
        }
      };
      
      animationFrameId = requestAnimationFrame(drawFrame);
    }
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPoseDetectionActive, videoRef, model, modelLoading, activePoseName]);

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
