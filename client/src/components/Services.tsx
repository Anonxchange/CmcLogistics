import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, Ship, Truck, Warehouse, Package, Shield, ArrowRight } from 'lucide-react';

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
      features: ['Global Coverage', 'Express Delivery', '24/7 Tracking'],
      image: airFreightImage
    },
    {
      icon: Ship,
      title: 'Sea/Ocean Freight',
      description: 'International ocean freight shipping import and export services. FCL, LCL shipments, port to port or door to door.',
      features: ['FCL & LCL', 'Port to Door', 'Cost Effective'],
      image: seaFreightImage
    },
    {
      icon: Truck,
      title: 'Road Transportation',
      description: 'Highly experienced and dependable, CMC Logistics is a trusted partner in domestic road transportation.',
      features: ['Domestic Coverage', 'Flexible Scheduling', 'Real-time Updates'],
      image: roadTransportImage
    },
    {
      icon: Shield,
      title: 'Diplomatic Bag & Secure Logistics',
      description: 'Global secure mail and equipment delivery service with complete confidence and security.',
      features: ['Secure Handling', 'Confidential', 'Global Network'],
      image: diplomaticImage
    },
    {
      icon: Warehouse,
      title: 'Warehousing',
      description: 'Shared and dedicated warehousing solutions supported by state-of-the-art technology and warehouse services.',
      features: ['Flexible Storage', 'Inventory Management', 'Technology Enabled'],
      image: warehouseImage
    },
    {
      icon: Package,
      title: 'Packaging & Storage',
      description: 'Professional packaging and storage solutions for raw materials, electronics, and finished goods with cargo insurance.',
      features: ['Professional Packing', 'Insurance Coverage', 'Custom Solutions'],
      image: packagingImage
    }
  ];

  return (
    <section id="services" className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive shipping and logistics solutions tailored to your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="hover-elevate transition-all duration-300 h-full overflow-hidden group">
                {/* Service Image - Half of container */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                </div>

                {/* Service Content - Half of container */}
                <div className="p-4 space-y-3 h-48 flex flex-col justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-base font-semibold text-foreground leading-tight">{service.title}</CardTitle>
                    <CardDescription className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {service.description}
                    </CardDescription>
                  </div>

                  <div className="space-y-2 mt-auto">
                    <ul className="space-y-1">
                      {service.features.slice(0, 2).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-xs text-muted-foreground">
                          <div className="w-1 h-1 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button 
                      variant="ghost"
                      size="sm"
                      className="w-full text-primary hover:text-primary hover:bg-primary/10 justify-between group/btn text-xs h-8 mt-2"
                      data-testid={`button-learn-more-${service.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    >
                      Learn More
                      <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}