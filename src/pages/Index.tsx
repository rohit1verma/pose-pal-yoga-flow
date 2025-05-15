import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Calendar, Play } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    // Simulate auth check - replace with actual authentication when integrated with Supabase
    const userAuth = localStorage.getItem("yogaAI-user");
    setIsAuthenticated(!!userAuth);
  }, []);

  const handlePracticeClick = () => {
    if (isAuthenticated) {
      navigate("/practice");
    } else {
      toast({
        title: "Authentication required",
        description: "Please create an account or sign in to start practicing",
      });
      navigate("/signup");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=1964&auto=format&fit=crop" 
            alt="Yoga background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-yoga-blue/20 to-yoga-green/20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Perfect Your Yoga Practice with <span className="text-yoga-blue">AI Guidance</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Get real-time feedback, track your progress, and improve your form with our advanced pose detection technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-yoga-blue hover:bg-yoga-blue/90 text-white"
                  onClick={handlePracticeClick}
                >
                  Start Practicing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Link to="/signup">
                  <Button size="lg" variant="outline">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="hidden md:block relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yoga-green/20 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-yoga-blue/20 rounded-full filter blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1820&auto=format&fit=crop" 
                alt="Woman doing yoga" 
                className="relative z-10 w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How YogaAI Works</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our advanced AI technology analyzes your poses in real-time and provides instant feedback to help you improve.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-yoga-blue/10 rounded-full flex items-center justify-center mb-4">
                    <Play className="h-6 w-6 text-yoga-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Real-time Detection</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our AI analyzes your yoga poses in real-time through your webcam, detecting 33 key body points.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-yoga-green/10 rounded-full flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-yoga-green" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Instant Feedback</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Receive immediate guidance and corrections to improve your form and alignment.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-yoga-blue/10 rounded-full flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6 text-yoga-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Monitor your improvement over time and celebrate your yoga journey milestones.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Testimonial/CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-yoga-blue/5 to-yoga-green/5"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Practice?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              Join thousands of yogis already using YogaAI to perfect their poses and deepen their practice.
            </p>
            <Link to="/practice">
              <Button size="lg" className="bg-yoga-blue hover:bg-yoga-blue/90 text-white">
                Start Your First Session
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg 
                          key={star} 
                          className="h-5 w-5 text-yellow-400" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      "YogaAI has completely transformed my home yoga practice. The real-time feedback helps me correct my form instantly."
                    </p>
                    <div className="mt-auto">
                      <p className="font-semibold">- Sarah J.</p>
                      <p className="text-sm text-gray-500">Practicing for 2 years</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
