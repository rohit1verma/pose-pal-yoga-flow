
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface PoseCardProps {
  name: string;
  sanskritName: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  benefits: string[];
  imageUrl: string;
  onPractice?: () => void;
}

const difficultyColors: Record<string, string> = {
  beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  intermediate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  advanced: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
};

const PoseCard = ({ name, sanskritName, difficulty, benefits, imageUrl, onPractice }: PoseCardProps) => {
  return (
    <Card className="overflow-hidden card-hover">
      <div className="aspect-w-16 aspect-h-9 relative">
        <img 
          src={imageUrl} 
          alt={name} 
          className="object-cover w-full h-48"
        />
        <div className="absolute top-2 right-2">
          <Badge className={difficultyColors[difficulty]}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex flex-col">
          <span>{name}</span>
          <span className="text-sm font-normal text-gray-600 dark:text-gray-400 italic">
            {sanskritName}
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="flex flex-wrap gap-1 mb-2">
          {benefits.map((benefit, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {benefit}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={onPractice} 
          className="w-full bg-yoga-blue hover:bg-yoga-blue/80"
        >
          <Play className="mr-2 h-4 w-4" />
          Practice Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PoseCard;
