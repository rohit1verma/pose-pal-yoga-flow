
export interface YogaPose {
  id: number;
  name: string;
  sanskritName: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  benefits: string[];
  imageUrl: string;
  description: string;
}
