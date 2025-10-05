import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight, Plane } from 'lucide-react';
import { useState, useEffect } from 'react';
import cargoShipImage from '@assets/generated_images/Cargo_ship_logistics_scene_d218b66d.png';
import airFreightImage from '@assets/generated_images/Air_freight_logistics_scene_a980c507.png';
import warehouseImage from '@assets/generated_images/Warehouse_logistics_scene_dfb1c093.png';

export default function Hero() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const backgroundImages = [
    cargoShipImage,
    airFreightImage,
    warehouseImage
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      // Navigate to tracking page with the tracking number
      window.location.href = `/track?number=${encodeURIComponent(trackingNumber.trim())}`;
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/80 text-primary-foreground overflow-hidden">
      {/* Dynamic Background Images */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
        }}
      ></div>
      
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-primary/85"></div>
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Animated floating elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large floating blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl motion-safe:animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl motion-safe:animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-2xl motion-safe:animate-bounce delay-500"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-1/4 w-4 h-4 bg-white/20 rounded motion-safe:animate-ping delay-300"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-200/30 rounded-full motion-safe:animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-cyan-200/40 rounded motion-safe:animate-bounce delay-1200"></div>
        <div className="absolute top-2/3 right-1/4 w-6 h-6 bg-white/10 rotate-45 motion-safe:animate-pulse delay-900"></div>
        
        {/* Moving particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/6 w-1 h-1 bg-white/40 rounded-full motion-safe:animate-ping delay-200"></div>
          <div className="absolute top-1/2 left-1/5 w-1 h-1 bg-blue-200/50 rounded-full motion-safe:animate-ping delay-600"></div>
          <div className="absolute bottom-1/3 right-1/6 w-1 h-1 bg-cyan-200/40 rounded-full motion-safe:animate-ping delay-1000"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/30 rounded-full motion-safe:animate-ping delay-1400"></div>
        </div>

        {/* Flying Airplanes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Airplane 1 - Flying left to right */}
          <div className="absolute top-1/4 -left-16 motion-safe:animate-[flyLeftToRight_15s_linear_infinite]">
            <Plane className="w-8 h-8 text-white/30 transform rotate-90" />
          </div>
          
          {/* Airplane 2 - Flying right to left */}
          <div className="absolute top-1/2 -right-16 motion-safe:animate-[flyRightToLeft_20s_linear_infinite_3s]">
            <Plane className="w-6 h-6 text-blue-200/40 transform -rotate-90" />
          </div>
          
          {/* Airplane 3 - Flying diagonally */}
          <div className="absolute bottom-1/3 -left-12 motion-safe:animate-[flyDiagonal_18s_linear_infinite_7s]">
            <Plane className="w-7 h-7 text-cyan-200/35 transform rotate-45" />
          </div>
          
          {/* Airplane 4 - Small airplane */}
          <div className="absolute top-3/4 -right-12 motion-safe:animate-[flySmall_12s_linear_infinite_2s]">
            <Plane className="w-5 h-5 text-white/25 transform rotate-[135deg]" />
          </div>
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Leading Global{' '}
                <span className="text-blue-200">Logistics Service</span>
              </h1>
              <p className="text-lg lg:text-xl text-blue-100 leading-relaxed">
                We offer a full range of global freight services with unmatched reliability and speed. 
                Professional shipping solutions tailored to meet your business needs worldwide.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                data-testid="button-learn-more"
              >
                Learn More
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                data-testid="button-contact-us"
              >
                Contact Us
              </Button>
            </div>
          </div>

          {/* Tracking Form */}
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border border-white/20">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Track & Trace Your Shipment
                </h2>
                <p className="text-muted-foreground">
                  Enter your tracking number to get real-time updates on your package
                </p>
              </div>

              <form onSubmit={handleTrackSubmit} className="space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter tracking number (e.g., SS123456789)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="pr-12 h-12 text-base"
                    data-testid="input-tracking-number"
                  />
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base bg-primary hover:bg-primary/90"
                  data-testid="button-track-shipment"
                >
                  Track Shipment
                </Button>
              </form>

              <div className="text-sm text-muted-foreground">
                <p>Example tracking numbers:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <code 
                    className="bg-muted px-2 py-1 rounded cursor-pointer hover:bg-muted/80"
                    onClick={() => setTrackingNumber('SS123456789')}
                    data-testid="example-tracking-1"
                  >
                    SS123456789
                  </code>
                  <code 
                    className="bg-muted px-2 py-1 rounded cursor-pointer hover:bg-muted/80"
                    onClick={() => setTrackingNumber('SS987654321')}
                    data-testid="example-tracking-2"
                  >
                    SS987654321
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}