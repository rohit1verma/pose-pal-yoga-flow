
import { YogaPose } from "@/types/yoga";
import PoseDetection from "@/components/yoga/PoseDetection";

interface PracticeAreaProps {
  selectedPose: YogaPose | null;
  isPracticing: boolean;
}

const PracticeArea = ({ selectedPose, isPracticing }: PracticeAreaProps) => {
  return (
    <div className="lg:col-span-2 pose-detection-area">
      {isPracticing && selectedPose && (
        <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">
            {selectedPose.name} 
            <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-2 italic">
              {selectedPose.sanskritName}
            </span>
          </h3>
          <p className="mb-2">{selectedPose.description}</p>
          <ul className="list-disc list-inside text-sm space-y-1">
            {selectedPose.benefits.map((benefit, idx) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
      <PoseDetection 
        activePoseName={isPracticing && selectedPose ? selectedPose.name : undefined}
      />
    </div>
  );
};

export default PracticeArea;
