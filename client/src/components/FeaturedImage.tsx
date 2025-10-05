import featuredImage from '@assets/generated_images/IMG_0535.jpeg';

export default function FeaturedImage() {
  return (
    <section className="w-full relative overflow-hidden">
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden group">
        {/* Main Image with Parallax Effect */}
        <img 
          src={featuredImage} 
          alt="Professional logistics facility" 
          className="w-full h-full object-contain transition-all duration-700 group-hover:scale-105"
        />
        
        {/* Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-3 h-3 bg-white/40 rounded-full motion-safe:animate-ping"></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-blue-300/50 rounded-full motion-safe:animate-pulse delay-500"></div>
          <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-cyan-300/30 rounded motion-safe:animate-bounce delay-1000"></div>
        </div>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-start">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-lg">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 animate-slideInLeft">
                Global Logistics Excellence
              </h3>
              <p className="text-white/90 text-lg animate-slideInLeft" style={{ animationDelay: '200ms' }}>
                State-of-the-art facilities and professional handling ensure your cargo reaches its destination safely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}