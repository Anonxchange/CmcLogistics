
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calculator, Clock, Shield, Truck, Plane, Ship } from 'lucide-react';

export default function GetQuote() {
  const features = [
    {
      icon: Calculator,
      title: "Instant Estimates",
      description: "Get preliminary quotes in seconds with our smart calculator"
    },
    {
      icon: Clock,
      title: "Fast Response",
      description: "Detailed quotes delivered within 2 hours during business hours"
    },
    {
      icon: Shield,
      title: "No Obligation",
      description: "Free quotes with no commitment or hidden fees"
    }
  ];

  const services = [
    { icon: Plane, name: "Air Freight", description: "Fast international shipping" },
    { icon: Ship, name: "Sea Freight", description: "Cost-effective ocean shipping" },
    { icon: Truck, name: "Ground Transportation", description: "Domestic road shipping" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold">Get a Quote</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Get competitive pricing for your shipping needs. Fill out our form 
              and receive a detailed quote within hours.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <CardTitle className="text-3xl mb-4">Request Your Quote</CardTitle>
                <CardDescription className="text-lg">
                  Provide details about your shipping requirements and we'll send you a competitive quote
                </CardDescription>
              </div>

              <form className="space-y-8">
                {/* Contact Information */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input placeholder="First Name *" required />
                    <Input placeholder="Last Name *" required />
                    <Input placeholder="Email Address *" type="email" required />
                    <Input placeholder="Phone Number *" type="tel" required />
                    <Input placeholder="Company Name" className="md:col-span-2" />
                  </div>
                </div>

                {/* Service Type */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Service Type</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {services.map((service, index) => {
                      const IconComponent = service.icon;
                      return (
                        <Card key={index} className="cursor-pointer hover:bg-primary/5 transition-colors border-2 hover:border-primary">
                          <CardContent className="p-4 text-center space-y-3">
                            <IconComponent className="w-8 h-8 text-primary mx-auto" />
                            <div>
                              <div className="font-medium">{service.name}</div>
                              <div className="text-sm text-muted-foreground">{service.description}</div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                {/* Shipment Details */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Shipment Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Origin Country *</label>
                      <select className="w-full p-3 border border-input rounded-md bg-background" required>
                        <option value="">Select origin country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="MX">Mexico</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Destination Country *</label>
                      <select className="w-full p-3 border border-input rounded-md bg-background" required>
                        <option value="">Select destination country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="MX">Mexico</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <Input placeholder="Origin City/Port *" required />
                    <Input placeholder="Destination City/Port *" required />
                  </div>
                </div>

                {/* Package Information */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Package Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input placeholder="Number of Packages *" type="number" required />
                    <Input placeholder="Total Weight (lbs) *" type="number" required />
                    <Input placeholder="Dimensions (L x W x H inches)" />
                    <select className="p-3 border border-input rounded-md bg-background">
                      <option value="">Package Type</option>
                      <option value="boxes">Boxes</option>
                      <option value="pallets">Pallets</option>
                      <option value="documents">Documents</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Special Requirements */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Special Requirements</h3>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-input" />
                        <span className="text-sm">Temperature Controlled</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-input" />
                        <span className="text-sm">Fragile Items</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-input" />
                        <span className="text-sm">Hazardous Materials</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-input" />
                        <span className="text-sm">Insurance Required</span>
                      </label>
                    </div>
                    <Textarea 
                      placeholder="Additional requirements or comments..." 
                      rows={4}
                    />
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Timeline</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Pickup Date</label>
                      <Input type="date" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Delivery Urgency</label>
                      <select className="w-full p-3 border border-input rounded-md bg-background">
                        <option value="">Select urgency</option>
                        <option value="standard">Standard (5-7 days)</option>
                        <option value="express">Express (2-3 days)</option>
                        <option value="overnight">Overnight</option>
                        <option value="flexible">Flexible timing</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Request Quote
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Need Help with Your Quote?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our logistics experts are standing by to assist you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg">
              Call +1 (555) 123-4567
            </Button>
            <Button variant="outline" size="lg">
              Start Live Chat
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
