import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has seen the banner in this browser session
    const hasSeenBanner = sessionStorage.getItem('cookieBannerSeen');
    
    if (!hasSeenBanner) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);

      // Auto-hide after 5 seconds
      const autoHideTimer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem('cookieBannerSeen', 'true');
      }, 6500);

      return () => {
        clearTimeout(timer);
        clearTimeout(autoHideTimer);
      };
    }
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem('cookieBannerSeen', 'true');
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  const handleClose = () => {
    sessionStorage.setItem('cookieBannerSeen', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl animate-in slide-in-from-bottom duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 max-w-4xl">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              This website uses cookies
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              We do this to better understand how visitors use our site and to offer you a more personal 
              experience. Please see our{' '}
              <a 
                href="/privacy-policy" 
                className="text-primary hover:text-primary/80 underline font-medium"
              >
                Privacy Notice
              </a>{' '}
              for more information. You can manage your preferences by selecting{' '}
              <a 
                href="/cookie-policy" 
                className="text-primary hover:text-primary/80 underline font-medium"
              >
                Cookie Settings
              </a>.
            </p>
          </div>
          
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button
              onClick={handleAccept}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              size="lg"
            >
              Accept All Cookies
            </Button>
            <Button
              onClick={handleClose}
              variant="outline"
              size="icon"
              className="border-gray-300 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}