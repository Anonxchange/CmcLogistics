
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Globe, Headphones } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

export default function Contact() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !email || !message) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const emailContent = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Service Type:</strong> ${serviceType || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `;

      const { error } = await supabase.functions.invoke('send-email', {
        body: {
          to: 'support@cmcautoslogistics.com',
          subject: `New Contact Form: ${firstName} ${lastName} - ${serviceType || 'General Inquiry'}`,
          html: emailContent,
        }
      });

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });

      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setServiceType('');
      setMessage('');
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try emailing us directly at support@cmcautoslogistics.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our logistics experts",
      contact: "+1 (815) 257-1522",
      hours: "24/7 Available"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your inquiries and we'll respond quickly",
      contact: "support@cmcautoslogistics.com",
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
      contact: "8340 Harford Parkville, Maryland USA",
      hours: "Mon-Fri, 9AM-6PM EST"
    }
  ];

  const offices = [
    {
      city: "Maryland (Headquarters)",
      address: "8340 Harford Parkville, Maryland USA",
      phone: "+1 (815) 257-1522",
      email: "support@cmcautoslogistics.com"
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input 
                    placeholder="First Name *" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <Input 
                    placeholder="Last Name *" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <Input 
                  placeholder="Email Address *" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input 
                  placeholder="Phone Number" 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Input 
                  placeholder="Company Name" 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
                <select 
                  className="w-full p-3 border border-input rounded-md bg-background"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                >
                  <option value="">Select Service Type</option>
                  <option value="Air Freight">Air Freight</option>
                  <option value="Sea Freight">Sea Freight</option>
                  <option value="Road Transportation">Road Transportation</option>
                  <option value="Warehousing">Warehousing</option>
                  <option value="Other">Other</option>
                </select>
                <Textarea 
                  placeholder="Tell us about your shipping needs... *" 
                  rows={6} 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
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
