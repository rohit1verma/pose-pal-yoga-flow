
import { YogaPose } from "@/types/yoga";
import PoseCard from "@/components/yoga/PoseCard";

interface PoseLibraryProps {
  poses: YogaPose[];
  onPoseSelect: (pose: YogaPose) => void;
}

const PoseLibrary = ({ poses, onPoseSelect }: PoseLibraryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {poses.map((pose) => (
        <PoseCard
          key={pose.id}
          name={pose.name}
          sanskritName={pose.sanskritName}
          difficulty={pose.difficulty}
          benefits={pose.benefits}
          imageUrl={pose.imageUrl}
          onPractice={() => onPoseSelect(pose)}
        />
      ))}
    </div>
  );
};

export default PoseLibrary;
