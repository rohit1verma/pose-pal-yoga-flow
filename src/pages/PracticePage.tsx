
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PoseDetection from "@/components/yoga/PoseDetection";
import PoseCard from "@/components/yoga/PoseCard";

// Define a type for the yoga poses
interface YogaPose {
  id: number;
  name: string;
  sanskritName: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  benefits: string[];
  imageUrl: string;
  description: string;
}

// Sample poses data - will be expanded later
const yogaPoses: YogaPose[] = [
  {
    id: 1,
    name: "Mountain Pose",
    sanskritName: "Tadasana",
    difficulty: "beginner",
    benefits: ["Improves posture", "Strengthens thighs", "Steadies breathing"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1770&auto=format&fit=crop",
    description: "The foundation of all standing poses, Mountain Pose helps improve posture, balance, and calm focus."
  },
  {
    id: 2,
    name: "Tree Pose",
    sanskritName: "Vrikshasana",
    difficulty: "beginner",
    benefits: ["Improves balance", "Strengthens legs", "Calms mind"],
    imageUrl: "https://images.unsplash.com/photo-1566501206188-5dd0cf160a0e?q=80&w=1887&auto=format&fit=crop",
    description: "A balancing pose that strengthens your legs and core while improving your focus and concentration."
  },
  {
    id: 3,
    name: "Warrior II",
    sanskritName: "Virabhadrasana II",
    difficulty: "intermediate",
    benefits: ["Opens hips", "Builds stamina", "Strengthens legs"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=1964&auto=format&fit=crop",
    description: "A powerful standing pose that builds strength and stamina in the legs and opens the hips and chest."
  },
  {
    id: 4,
    name: "Downward-Facing Dog",
    sanskritName: "Adho Mukha Svanasana",
    difficulty: "beginner",
    benefits: ["Strengthens arms", "Stretches hamstrings", "Energizes body"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1820&auto=format&fit=crop",
    description: "An energizing pose that stretches the hamstrings, shoulders and calves while strengthening the arms and legs."
  },
  {
    id: 5,
    name: "Chair Pose",
    sanskritName: "Utkatasana",
    difficulty: "intermediate",
    benefits: ["Strengthens legs", "Tones core", "Improves balance"],
    imageUrl: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1170&auto=format&fit=crop",
    description: "A powerful pose that strengthens the thighs, calves, and spine while challenging your balance and endurance."
  },
  {
    id: 6,
    name: "Cobra Pose",
    sanskritName: "Bhujangasana",
    difficulty: "beginner",
    benefits: ["Strengthens spine", "Opens chest", "Improves posture"],
    imageUrl: "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?q=80&w=1770&auto=format&fit=crop",
    description: "A gentle backbend that opens the chest and strengthens the spine while stretching the shoulders and abdomen."
  }
];

const PracticePage = () => {
  const navigate = useNavigate();
  const [selectedPose, setSelectedPose] = useState<YogaPose | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("practice");
  
  // Check authentication on component mount
  useEffect(() => {
    // Simulate auth check - replace with actual authentication when integrated with Supabase
    const userAuth = localStorage.getItem("yogaAI-user");
    
    if (!userAuth) {
      toast({
        title: "Authentication required",
        description: "Please create an account or sign in to access this page",
      });
      navigate("/signup");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handlePoseSelect = (pose: YogaPose) => {
    setSelectedPose(pose);
    setActiveTab("practice");
    
    toast({
      title: `${pose.name} selected`,
      description: "Follow the instructions to practice this pose",
    });
  };
  
  const handleStartGuidedPractice = () => {
    if (selectedPose) {
      toast({
        title: `Starting ${selectedPose.name} practice`,
        description: "Position yourself in front of the camera to begin",
      });
      
      // Scroll to the pose detection area
      document.querySelector('.pose-detection-area')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Practice Yoga</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="practice">Interactive Practice</TabsTrigger>
              <TabsTrigger value="poses">Yoga Poses</TabsTrigger>
            </TabsList>
            
            <TabsContent value="practice" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 pose-detection-area">
                  <PoseDetection />
                </div>
                
                <div>
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
                          onClick={handleStartGuidedPractice}
                        >
                          Start Guided Practice
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
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="poses">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {yogaPoses.map((pose) => (
                  <PoseCard
                    key={pose.id}
                    name={pose.name}
                    sanskritName={pose.sanskritName}
                    difficulty={pose.difficulty}
                    benefits={pose.benefits}
                    imageUrl={pose.imageUrl}
                    onPractice={() => handlePoseSelect(pose)}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PracticePage;
