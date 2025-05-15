
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 py-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-yoga-blue to-yoga-green flex items-center justify-center">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-yoga-dark dark:text-white">YogaAI</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Improve your yoga practice with real-time AI feedback and guidance.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">Features</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/practice" className="text-gray-600 dark:text-gray-400 hover:text-yoga-blue dark:hover:text-yoga-blue text-sm">
                  Practice Yoga
                </Link>
              </li>
              <li>
                <Link to="/progress" className="text-gray-600 dark:text-gray-400 hover:text-yoga-blue dark:hover:text-yoga-blue text-sm">
                  Track Progress
                </Link>
              </li>
              <li>
                <Link to="/poses" className="text-gray-600 dark:text-gray-400 hover:text-yoga-blue dark:hover:text-yoga-blue text-sm">
                  Pose Library
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/help" className="text-gray-600 dark:text-gray-400 hover:text-yoga-blue dark:hover:text-yoga-blue text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-yoga-blue dark:hover:text-yoga-blue text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-yoga-blue dark:hover:text-yoga-blue text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 flex justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} YogaAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
