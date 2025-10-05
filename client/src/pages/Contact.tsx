
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Globe, Headphones } from 'lucide-react';

export default function Contact() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our logistics experts",
      contact: "+1 (555) 123-4567",
      hours: "24/7 Available"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your inquiries and we'll respond quickly",
      contact: "contact@cmclogistics.com",
      hours: "Response within 2 hours"
    },
    {
      icon: Headphones,
      title: "Live Chat",
      description: "Get instant help with our online chat",
      contact: "Available on website",
      hours: "24/7 Available"
    },
    {
      icon: MapPin,
      title: "Visit Our Office",
      description: "Meet our team at our headquarters",
      contact: "123 Logistics Plaza, New York, NY 10001",
      hours: "Mon-Fri, 9AM-6PM EST"
    }
  ];

  const offices = [
    {
      city: "New York (Headquarters)",
      address: "123 Logistics Plaza, New York, NY 10001",
      phone: "+1 (555) 123-4567",
      email: "ny.office@cmclogistics.com"
    },
    {
      city: "Los Angeles",
      address: "456 Pacific Blvd, Los Angeles, CA 90012",
      phone: "+1 (555) 234-5678",
      email: "la.office@cmclogistics.com"
    },
    {
      city: "Chicago",
      address: "789 Midwest Center, Chicago, IL 60601",
      phone: "+1 (555) 345-6789",
      email: "chicago.office@cmclogistics.com"
    },
    {
      city: "Miami",
      address: "321 Ocean Drive, Miami, FL 33101",
      phone: "+1 (555) 456-7890",
      email: "miami.office@cmclogistics.com"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold">Contact Us</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Get in touch with our logistics experts. We're here to help with all 
              your shipping and logistics needs, 24/7.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Get In Touch</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose the contact method that works best for you
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <Card key={index} className="text-center h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{method.title}</h3>
                    <p className="text-muted-foreground text-sm">{method.description}</p>
                    <div className="space-y-2">
                      <div className="font-medium text-foreground">{method.contact}</div>
                      <div className="text-sm text-muted-foreground">{method.hours}</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Send Us a Message</h2>
                <p className="text-lg text-muted-foreground">
                  Fill out the form and we'll get back to you within 24 hours.
                </p>
              </div>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="First Name" />
                  <Input placeholder="Last Name" />
                </div>
                <Input placeholder="Email Address" type="email" />
                <Input placeholder="Phone Number" type="tel" />
                <Input placeholder="Company Name" />
                <select className="w-full p-3 border border-input rounded-md bg-background">
                  <option>Select Service Type</option>
                  <option>Air Freight</option>
                  <option>Sea Freight</option>
                  <option>Road Transportation</option>
                  <option>Warehousing</option>
                  <option>Other</option>
                </select>
                <Textarea placeholder="Tell us about your shipping needs..." rows={6} />
                <Button size="lg" className="w-full">
                  Send Message
                </Button>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Our Offices</h3>
                <div className="space-y-6">
                  {offices.map((office, index) => (
                    <Card key={index}>
                      <CardContent className="p-6 space-y-3">
                        <h4 className="text-lg font-semibold text-foreground">{office.city}</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>{office.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 flex-shrink-0" />
                            <span>{office.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 flex-shrink-0" />
                            <span>{office.email}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-primary text-white max-w-4xl mx-auto">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-3xl font-bold">Emergency Assistance</h2>
              <p className="text-blue-100 text-lg">
                Need urgent help with your shipment? Our emergency hotline is available 24/7 
                for critical logistics support.
              </p>
              <div className="space-y-4">
                <div className="text-2xl font-bold">Emergency Hotline: +1 (555) 999-HELP</div>
                <div className="text-blue-100">Available 24/7/365 for urgent shipment issues</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
