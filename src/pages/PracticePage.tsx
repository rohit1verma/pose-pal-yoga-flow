
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PracticeArea from "@/components/yoga/PracticeArea";
import PoseInstructions from "@/components/yoga/PoseInstructions";
import PoseLibrary from "@/components/yoga/PoseLibrary";
import { YogaPose } from "@/types/yoga";
import { yogaPoses } from "@/data/yogaPoses";

const PracticePage = () => {
  const navigate = useNavigate();
  const [selectedPose, setSelectedPose] = useState<YogaPose | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("practice");
  const [isPracticing, setIsPracticing] = useState(false);
  
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
    setIsPracticing(false);
    
    toast({
      title: `${pose.name} selected`,
      description: "Follow the instructions to practice this pose",
    });
  };
  
  const handleStartGuidedPractice = () => {
    if (selectedPose) {
      setIsPracticing(true);
      
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
                <PracticeArea 
                  selectedPose={selectedPose} 
                  isPracticing={isPracticing} 
                />
                
                <div>
                  <PoseInstructions 
                    selectedPose={selectedPose}
                    isPracticing={isPracticing}
                    onStartPractice={handleStartGuidedPractice}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="poses">
              <PoseLibrary 
                poses={yogaPoses} 
                onPoseSelect={handlePoseSelect} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PracticePage;
