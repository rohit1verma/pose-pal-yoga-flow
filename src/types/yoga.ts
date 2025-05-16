
export interface YogaPose {
  id: number;
  name: string;
  sanskritName: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  benefits: string[];
  imageUrl: string;
  description: string;
  category?: "standing" | "seated" | "balancing" | "backbend" | "forward bend" | "resting";
}

export type PoseDetectionResult = {
  score: number;
  feedback?: string[];
};
