import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Shield, Zap, MapPin, Globe, Headphones } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: Search,
      title: 'Track & Trace',
      description: 'Fast and reliable way to check the real-time status of your shipment with our advanced tracking system.'
    },
    {
      icon: Shield,
      title: 'Secure Warehousing',
      description: 'We leverage a network of operational warehousing facilities with state-of-the-art security systems.'
    },
    {
      icon: Zap,
      title: 'Express Delivery',
      description: 'We service your shipments via a diverse operating infrastructure for fastest delivery times.'
    },
    {
      icon: MapPin,
      title: 'Domestic Services',
      description: 'Next business day delivery for time-sensitive parcels with comprehensive domestic coverage.'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'US, Europe & Worldwide coverage by sea & air. We offer a broad range of international freight services.'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Get excellent 24/7 online support and expert advice from our dedicated customer service team.'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Why Choose Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Trusted by thousands of customers worldwide for reliable and professional logistics solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="text-center h-full hover-elevate transition-all duration-300">
                <CardContent className="p-8 space-y-4">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-3 text-foreground">{feature.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}