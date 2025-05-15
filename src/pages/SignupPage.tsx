
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SignupForm from "@/components/auth/SignupForm";

const SignupPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md mb-8">
              <Link 
                to="/"
                className="text-sm text-yoga-blue hover:underline mb-4 inline-flex items-center"
              >
                ← Back to Home
              </Link>
            </div>
            
            <SignupForm />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignupPage;
