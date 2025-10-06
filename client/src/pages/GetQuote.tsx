
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calculator, Clock, Shield, Truck, Plane, Ship } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

export default function GetQuote() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    serviceType: 'air_freight',
    originCountry: '',
    destinationCountry: '',
    packageWeight: '',
    packageDimensions: '',
    estimatedValue: '',
    shippingDate: '',
    additionalInfo: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('quotes')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company_name: formData.companyName || null,
          service_type: formData.serviceType,
          origin_country: formData.originCountry,
          destination_country: formData.destinationCountry,
          package_weight: formData.packageWeight,
          package_dimensions: formData.packageDimensions || null,
          estimated_value: formData.estimatedValue || null,
          shipping_date: formData.shippingDate || null,
          additional_info: formData.additionalInfo || null,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      const emailContent = `
New Shipping Quote Request

Customer Information:
- Name: ${formData.firstName} ${formData.lastName}
- Email: ${formData.email}
- Phone: ${formData.phone}
${formData.companyName ? `- Company: ${formData.companyName}` : ''}

Service Details:
- Service Type: ${formData.serviceType.replace('_', ' ').toUpperCase()}
- Origin: ${formData.originCountry}
- Destination: ${formData.destinationCountry}

Package Information:
- Weight: ${formData.packageWeight} lbs
${formData.packageDimensions ? `- Dimensions: ${formData.packageDimensions}` : ''}
${formData.estimatedValue ? `- Estimated Value: $${formData.estimatedValue}` : ''}
${formData.shippingDate ? `- Shipping Date: ${formData.shippingDate}` : ''}

${formData.additionalInfo ? `Additional Information:\n${formData.additionalInfo}` : ''}
      `.trim();

      await supabase.functions.invoke('send-email', {
        body: {
          to: 'support@cmcautologistics.com',
          subject: `New Shipping Quote Request - ${formData.firstName} ${formData.lastName}`,
          text: emailContent,
          html: emailContent.replace(/\n/g, '<br>')
        }
      });

      toast({
        title: "Quote Request Submitted",
        description: "We'll send you a detailed quote within 2 hours during business hours.",
      });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        companyName: '',
        serviceType: 'air_freight',
        originCountry: '',
        destinationCountry: '',
        packageWeight: '',
        packageDimensions: '',
        estimatedValue: '',
        shippingDate: '',
        additionalInfo: ''
      });
    } catch (error) {
      console.error('Error submitting quote request:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
    { icon: Plane, name: "Air Freight", value: "air_freight", description: "Fast international shipping" },
    { icon: Ship, name: "Sea Freight", value: "sea_freight", description: "Cost-effective ocean shipping" },
    { icon: Truck, name: "Ground Transportation", value: "ground", description: "Domestic road shipping" }
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

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input 
                      placeholder="First Name *" 
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required 
                    />
                    <Input 
                      placeholder="Last Name *"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required 
                    />
                    <Input 
                      placeholder="Email Address *" 
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required 
                    />
                    <Input 
                      placeholder="Phone Number *" 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required 
                    />
                    <Input 
                      placeholder="Company Name" 
                      className="md:col-span-2"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                    />
                  </div>
                </div>

                {/* Service Type */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Service Type</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {services.map((service, index) => {
                      const IconComponent = service.icon;
                      return (
                        <Card 
                          key={index} 
                          className={`cursor-pointer transition-colors border-2 ${
                            formData.serviceType === service.value 
                              ? 'border-primary bg-primary/5' 
                              : 'hover:bg-primary/5 hover:border-primary'
                          }`}
                          onClick={() => handleInputChange('serviceType', service.value)}
                        >
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
                      <Input 
                        placeholder="Enter origin country"
                        value={formData.originCountry}
                        onChange={(e) => handleInputChange('originCountry', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Destination Country *</label>
                      <Input 
                        placeholder="Enter destination country"
                        value={formData.destinationCountry}
                        onChange={(e) => handleInputChange('destinationCountry', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Package Information */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Package Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input 
                      placeholder="Total Weight (lbs) *" 
                      type="number"
                      value={formData.packageWeight}
                      onChange={(e) => handleInputChange('packageWeight', e.target.value)}
                      required 
                    />
                    <Input 
                      placeholder="Dimensions (L x W x H inches)"
                      value={formData.packageDimensions}
                      onChange={(e) => handleInputChange('packageDimensions', e.target.value)}
                    />
                    <Input 
                      placeholder="Estimated Value ($)"
                      type="number"
                      value={formData.estimatedValue}
                      onChange={(e) => handleInputChange('estimatedValue', e.target.value)}
                    />
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Preferred Shipping Date</label>
                      <Input 
                        type="date"
                        value={formData.shippingDate}
                        onChange={(e) => handleInputChange('shippingDate', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Additional Information</h3>
                  <Textarea 
                    placeholder="Special requirements, handling instructions, or any other details..." 
                    rows={4}
                    value={formData.additionalInfo}
                    onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Request Quote'}
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
