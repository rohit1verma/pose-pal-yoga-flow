
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { YogaPose } from "@/types/yoga";

interface PoseInstructionsProps {
  selectedPose: YogaPose | null;
  isPracticing: boolean;
  onStartPractice: () => void;
}

const PoseInstructions = ({ selectedPose, isPracticing, onStartPractice }: PoseInstructionsProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        {selectedPose ? selectedPose.name : "Pose Instructions"}
      </h2>
      
      {selectedPose ? (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            {selectedPose.sanskritName}
          </p>
          <p>{selectedPose.description}</p>
          <div>
            <h3 className="text-sm font-semibold mb-1">Benefits:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {selectedPose.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
          <Button 
            className="mt-4 w-full bg-yoga-blue hover:bg-yoga-blue/90"
            onClick={onStartPractice}
          >
            {isPracticing ? "Practicing..." : "Start Guided Practice"}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <p>
            Select a pose from the library or position yourself in front of the camera
            to begin practice.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Our AI will detect your pose and provide real-time feedback to help you
            improve your form and alignment.
          </p>
        </div>
      )}
    </Card>
  );
};

export default PoseInstructions;
