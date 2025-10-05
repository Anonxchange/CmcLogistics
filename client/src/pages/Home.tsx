import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import FeaturedImage from '@/components/FeaturedImage';
import Statistics from '@/components/Statistics';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import ReadyToShip from '@/components/ReadyToShip';
import Footer from '@/components/Footer';

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
        <Testimonials />
        <ReadyToShip />
      </main>
      <Footer />
    </div>
  );
}