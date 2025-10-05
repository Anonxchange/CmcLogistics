
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Truck, Users, Globe, Award, Shield, Clock } from 'lucide-react';
import img0898 from '@assets/generated_images/IMG_0898.jpeg';
import img0899 from '@assets/generated_images/IMG_0899.jpeg';
import img0900 from '@assets/generated_images/IMG_0900.jpeg';

export default function AboutUs() {
  const milestones = [
    { year: "1995", event: "CMC Logistics founded with a vision to revolutionize global logistics" },
    { year: "2000", event: "Expanded operations to 25 countries across 4 continents" },
    { year: "2005", event: "Launched innovative tracking technology platform" },
    { year: "2010", event: "Achieved ISO 27001 certification for security standards" },
    { year: "2015", event: "Reached 1 million successful deliveries milestone" },
    { year: "2020", event: "Introduced AI-powered route optimization systems" },
    { year: "2024", event: "Leading global logistics provider with 50+ countries coverage" }
  ];

  const values = [
    {
      icon: Shield,
      title: "Reliability",
      description: "We ensure your shipments arrive safely and on time, every time."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Comprehensive coverage across major trade routes worldwide."
    },
    {
      icon: Clock,
      title: "Efficiency",
      description: "Streamlined processes and advanced technology for faster delivery."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to exceeding customer expectations in every interaction."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold">About CMC Logistics</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              For nearly three decades, we've been connecting businesses worldwide through 
              reliable, innovative logistics solutions that drive global commerce forward.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 1995, CMC Logistics began as a small freight forwarding company with a big vision: 
                  to make global shipping accessible, reliable, and efficient for businesses of all sizes.
                </p>
                <p>
                  Today, we're a leading global logistics provider serving over 10,000 customers across 
                  50+ countries. Our comprehensive network spans air, sea, and land transportation, 
                  supported by state-of-the-art technology and a team of logistics experts.
                </p>
                <p>
                  We've built our reputation on trust, innovation, and an unwavering commitment to 
                  customer success. Every shipment we handle represents someone's business goals, 
                  and we treat that responsibility with the utmost care and professionalism.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-primary/5 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-2">29+</div>
                <div className="text-sm text-muted-foreground">Years of Excellence</div>
              </div>
              <div className="text-center p-6 bg-primary/5 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Countries Served</div>
              </div>
              <div className="text-center p-6 bg-primary/5 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center p-6 bg-primary/5 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-2">1M+</div>
                <div className="text-sm text-muted-foreground">Successful Deliveries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do and drive our commitment to excellence
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Our Journey</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Key milestones in our evolution to becoming a global logistics leader
            </p>
          </div>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-8 items-center">
                <div className="flex-shrink-0 w-20 text-right">
                  <div className="text-2xl font-bold text-primary">{milestone.year}</div>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-primary rounded-full"></div>
                <div className="flex-1 text-muted-foreground">{milestone.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Facilities */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Our Facilities</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A glimpse into our world-class logistics operations
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="group relative overflow-hidden rounded-lg shadow-lg hover-elevate transition-all duration-300">
                <img 
                  src={img0898} 
                  alt="CMC Logistics facility" 
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-foreground">State-of-the-Art Warehouse</h3>
                <p className="text-muted-foreground">
                  Our modern warehousing facilities equipped with advanced inventory management systems and climate-controlled storage areas ensure your cargo is handled with precision and care.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="group relative overflow-hidden rounded-lg shadow-lg hover-elevate transition-all duration-300">
                <img 
                  src={img0899} 
                  alt="CMC Logistics operations" 
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Global Operations Center</h3>
                <p className="text-muted-foreground">
                  Our 24/7 operations center monitors shipments worldwide in real-time, providing seamless coordination across all transportation modes and ensuring on-time delivery.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="group relative overflow-hidden rounded-lg shadow-lg hover-elevate transition-all duration-300">
                <img 
                  src={img0900} 
                  alt="CMC Logistics team" 
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Dedicated Expert Team</h3>
                <p className="text-muted-foreground">
                  Our experienced logistics professionals bring decades of industry expertise, working together to deliver customized solutions for your unique shipping needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
