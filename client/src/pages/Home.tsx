import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import FeaturedImage from '@/components/FeaturedImage';
import Statistics from '@/components/Statistics';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import ReadyToShip from '@/components/ReadyToShip';
import Footer from '@/components/Footer';
import { Users, Globe } from 'lucide-react';
import img0899 from '@assets/generated_images/IMG_0899.jpeg';
import img0900 from '@assets/generated_images/IMG_0900.jpeg';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeaturedImage />
        <Services />
        <WhyChooseUs />
        <Statistics />
        
        {/* Global Operations Center */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img 
                  src={img0899} 
                  alt="Global Operations Center" 
                  className="w-full h-96 object-cover rounded-lg shadow-xl"
                />
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Global Operations Center</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our 24/7 operations center monitors shipments worldwide in real-time, providing seamless coordination across all transportation modes and ensuring on-time delivery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dedicated Expert Team */}
        <section className="py-16 lg:py-24 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Dedicated Expert Team</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our experienced logistics professionals bring decades of industry expertise, working together to deliver customized solutions for your unique shipping needs.
                </p>
              </div>
              <div>
                <img 
                  src={img0900} 
                  alt="Dedicated Expert Team" 
                  className="w-full h-96 object-cover rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        <Testimonials />
        <ReadyToShip />
      </main>
      <Footer />
    </div>
  );
}