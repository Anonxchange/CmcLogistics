
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, Ship, Truck, Warehouse, Package, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'wouter';

// Import service images
import airFreightImage from '@assets/generated_images/Air_freight_cargo_loading_10ab2b90.png';
import seaFreightImage from '@assets/generated_images/Sea_freight_container_ship_0289dbba.png';
import roadTransportImage from '@assets/generated_images/Road_transportation_trucks_aab9787d.png';
import warehouseImage from '@assets/generated_images/Warehouse_logistics_scene_dfb1c093.png';
import packagingImage from '@assets/generated_images/Packaging_storage_facility_8837bf21.png';
import diplomaticImage from '@assets/generated_images/Secure_diplomatic_logistics_dbf1d411.png';

export default function Services() {
  const services = [
    {
      icon: Plane,
      title: 'Air Freight',
      description: 'CMC Logistics, as an IATA-endorsed air forwarder, offers professional and reliable global air-freight solutions.',
      features: ['Global Coverage', 'Express Delivery', '24/7 Tracking', 'Temperature Controlled', 'Customs Clearance'],
      details: 'Our air freight services connect you to over 500 destinations worldwide with guaranteed delivery times and real-time tracking capabilities.',
      image: airFreightImage
    },
    {
      icon: Ship,
      title: 'Sea/Ocean Freight',
      description: 'International ocean freight shipping import and export services. FCL, LCL shipments, port to port or door to door.',
      features: ['FCL & LCL', 'Port to Door', 'Cost Effective', 'Container Tracking', 'Cargo Insurance'],
      details: 'Cost-effective ocean freight solutions with flexible container options and comprehensive port-to-door services for businesses of all sizes.',
      image: seaFreightImage
    },
    {
      icon: Truck,
      title: 'Road Transportation',
      description: 'Highly experienced and dependable, CMC Logistics is a trusted partner in domestic road transportation.',
      features: ['Domestic Coverage', 'Flexible Scheduling', 'Real-time Updates', 'Last Mile Delivery', 'Express Options'],
      details: 'Reliable ground transportation with flexible scheduling and comprehensive coverage across major domestic routes.',
      image: roadTransportImage
    },
    {
      icon: Shield,
      title: 'Diplomatic Bag & Secure Logistics',
      description: 'Global secure mail and equipment delivery service with complete confidence and security.',
      features: ['Secure Handling', 'Confidential', 'Global Network', 'Chain of Custody', 'Encrypted Tracking'],
      details: 'Specialized secure logistics for sensitive documents and equipment with end-to-end encryption and verified chain of custody.',
      image: diplomaticImage
    },
    {
      icon: Warehouse,
      title: 'Warehousing',
      description: 'Shared and dedicated warehousing solutions supported by state-of-the-art technology and warehouse services.',
      features: ['Flexible Storage', 'Inventory Management', 'Technology Enabled', 'Climate Control', 'Security Systems'],
      details: 'Modern warehousing facilities with advanced inventory management systems and flexible storage solutions tailored to your needs.',
      image: warehouseImage
    },
    {
      icon: Package,
      title: 'Packaging & Storage',
      description: 'Professional packaging and storage solutions for raw materials, electronics, and finished goods with cargo insurance.',
      features: ['Professional Packing', 'Insurance Coverage', 'Custom Solutions', 'Fragile Handling', 'Bulk Storage'],
      details: 'Expert packaging services with specialized handling for fragile items and comprehensive insurance coverage for peace of mind.',
      image: packagingImage
    }
  ];

  const certifications = [
    'ISO 9001:2015 Quality Management',
    'ISO 14001:2015 Environmental Management',
    'IATA Certified Air Freight Forwarder',
    'C-TPAT Certified Customs Partner',
    'AEO Authorized Economic Operator'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Our Services
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Comprehensive shipping and logistics solutions designed to meet your business needs with 
            industry-leading reliability and professional service standards.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const serviceId = service.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
              return (
                <Card key={index} id={serviceId} className="hover-elevate transition-all duration-300 h-full overflow-hidden group scroll-mt-20">
                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <CardTitle className="text-xl mb-3 text-foreground">{service.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed text-muted-foreground mb-4">
                        {service.description}
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">
                        {service.details}
                      </p>
                    </div>

                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button 
                      variant="ghost"
                      className="w-full mt-4 text-primary hover:text-primary hover:bg-primary/10 justify-between group/btn"
                      data-testid={`button-get-quote-${service.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    >
                      Get Quote
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose CMC Logistics Services?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Industry-leading expertise backed by certifications and proven track record
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-foreground">Global Reach, Local Expertise</h3>
                <p className="text-muted-foreground leading-relaxed">
                  With operations spanning over 160 countries and deep local knowledge in key markets, 
                  we provide seamless logistics solutions that bridge global commerce with local expertise.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-foreground">Technology-Driven Solutions</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our advanced tracking systems, automated processes, and digital platforms ensure 
                  transparency, efficiency, and real-time visibility throughout your supply chain.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-foreground">Sustainable Practices</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Committed to environmental responsibility with carbon-neutral shipping options and 
                  sustainable logistics practices that reduce environmental impact.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-foreground mb-6">Our Certifications</h3>
              <ul className="space-y-3">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Ship with CMC Logistics?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Get started with our comprehensive logistics solutions today. 
            Request a quote or speak with our logistics experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-gray-100 w-full sm:w-auto"
                data-testid="button-get-quote"
              >
                Get Quote
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto"
                data-testid="button-contact-expert"
              >
                Contact Expert
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
