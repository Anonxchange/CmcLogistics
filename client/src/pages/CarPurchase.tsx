
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Car, Shield, DollarSign, Truck, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Autoplay from 'embla-carousel-autoplay';
import { supabase } from '@/lib/supabase';

export default function CarPurchase() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    carMake: '',
    carModel: '',
    year: '',
    condition: '',
    budget: '',
    preferredColor: '',
    transmission: '',
    fuelType: '',
    deliveryLocation: '',
    additionalRequirements: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('car_purchases')
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          car_make: formData.carMake,
          car_model: formData.carModel,
          year: formData.year,
          condition: formData.condition,
          budget: formData.budget,
          preferred_color: formData.preferredColor || null,
          transmission: formData.transmission || null,
          fuel_type: formData.fuelType || null,
          delivery_location: formData.deliveryLocation,
          additional_requirements: formData.additionalRequirements || null,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      const emailContent = `
New Car Purchase Request

Customer Information:
- Name: ${formData.fullName}
- Email: ${formData.email}
- Phone: ${formData.phone}

Vehicle Details:
- Make: ${formData.carMake}
- Model: ${formData.carModel}
- Year: ${formData.year}
- Condition: ${formData.condition}
- Budget: ${formData.budget}
${formData.preferredColor ? `- Preferred Color: ${formData.preferredColor}` : ''}
${formData.transmission ? `- Transmission: ${formData.transmission}` : ''}
${formData.fuelType ? `- Fuel Type: ${formData.fuelType}` : ''}

Delivery Location:
${formData.deliveryLocation}

${formData.additionalRequirements ? `Additional Requirements:\n${formData.additionalRequirements}` : ''}
      `.trim();

      await supabase.functions.invoke('send-email', {
        body: {
          to: 'support@cmcautologistics.com',
          subject: `New Car Purchase Request - ${formData.carMake} ${formData.carModel}`,
          text: emailContent,
          html: emailContent.replace(/\n/g, '<br>')
        }
      });

      toast({
        title: "Quote Request Submitted",
        description: "We'll get back to you within 24 hours with a personalized quote.",
      });

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        carMake: '',
        carModel: '',
        year: '',
        condition: '',
        budget: '',
        preferredColor: '',
        transmission: '',
        fuelType: '',
        deliveryLocation: '',
        additionalRequirements: ''
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
      icon: Car,
      title: "Wide Selection",
      description: "Access to thousands of vehicles from trusted dealers"
    },
    {
      icon: Shield,
      title: "Verified Sellers",
      description: "All vehicles inspected and verified for quality"
    },
    {
      icon: DollarSign,
      title: "Competitive Pricing",
      description: "Best market rates with transparent pricing"
    },
    {
      icon: Truck,
      title: "Delivery Included",
      description: "Safe delivery to your location worldwide"
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "Get your personalized quote within 24 hours"
    },
    {
      icon: CheckCircle,
      title: "Quality Guarantee",
      description: "Full documentation and warranty options"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Car className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold">Car Purchase Service</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Get your dream car delivered anywhere in the world. Request a quote and we'll handle everything from sourcing to delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Car Showcase Carousel */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Latest Vehicle Collection 2024</h2>
            <p className="text-lg text-muted-foreground">
              Premium selection of modern vehicles from certified dealers worldwide
            </p>
          </div>
          
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              <CarouselItem>
                <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg">
                  <img 
                    src="/cars/modern_luxury_car_de_10b558e8.jpg" 
                    alt="Latest luxury vehicles" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
                    <div className="p-8 text-white">
                      <h3 className="text-2xl font-bold mb-2">Premium Luxury Collection</h3>
                      <p className="text-white/90">Experience ultimate comfort and performance</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              
              <CarouselItem>
                <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg">
                  <img 
                    src="/cars/modern_luxury_car_de_44c608d4.jpg" 
                    alt="Modern sports cars" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
                    <div className="p-8 text-white">
                      <h3 className="text-2xl font-bold mb-2">Sports & Performance</h3>
                      <p className="text-white/90">High-performance vehicles for driving enthusiasts</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              
              <CarouselItem>
                <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg">
                  <img 
                    src="/cars/modern_luxury_car_de_75e7aab2.jpg" 
                    alt="Executive sedans" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
                    <div className="p-8 text-white">
                      <h3 className="text-2xl font-bold mb-2">Executive Class</h3>
                      <p className="text-white/90">Sophistication meets cutting-edge technology</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem>
                <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg">
                  <img 
                    src="/cars/modern_luxury_car_de_7952a385.jpg" 
                    alt="Electric and hybrid vehicles" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
                    <div className="p-8 text-white">
                      <h3 className="text-2xl font-bold mb-2">Eco-Friendly Fleet</h3>
                      <p className="text-white/90">Sustainable electric and hybrid options</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem>
                <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg">
                  <img 
                    src="/cars/modern_luxury_car_de_e67fefe2.jpg" 
                    alt="SUVs and family vehicles" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
                    <div className="p-8 text-white">
                      <h3 className="text-2xl font-bold mb-2">SUVs & Family Vehicles</h3>
                      <p className="text-white/90">Spacious, safe, and reliable for every journey</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem>
                <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg">
                  <img 
                    src="/cars/modern_luxury_car_de_a90cd203.jpg" 
                    alt="Latest automotive technology" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
                    <div className="p-8 text-white">
                      <h3 className="text-2xl font-bold mb-2">Innovation & Technology</h3>
                      <p className="text-white/90">Advanced features and smart connectivity</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex left-4" />
            <CarouselNext className="hidden md:flex right-4" />
          </Carousel>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Our Service?</h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive car purchasing and logistics solution
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6 space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote Request Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center">Request Your Car Purchase Quote</CardTitle>
              <CardDescription className="text-center text-lg">
                Fill out the form below and our team will provide you with a detailed quote
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        required
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Vehicle Information */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Vehicle Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="carMake">Car Make *</Label>
                      <Input
                        id="carMake"
                        value={formData.carMake}
                        onChange={(e) => handleInputChange('carMake', e.target.value)}
                        required
                        placeholder="e.g., Toyota, BMW, Mercedes"
                      />
                    </div>
                    <div>
                      <Label htmlFor="carModel">Car Model *</Label>
                      <Input
                        id="carModel"
                        value={formData.carModel}
                        onChange={(e) => handleInputChange('carModel', e.target.value)}
                        required
                        placeholder="e.g., Camry, X5, C-Class"
                      />
                    </div>
                    <div>
                      <Label htmlFor="year">Year *</Label>
                      <Input
                        id="year"
                        type="number"
                        value={formData.year}
                        onChange={(e) => handleInputChange('year', e.target.value)}
                        required
                        placeholder="2024"
                        min="1990"
                        max="2025"
                      />
                    </div>
                    <div>
                      <Label htmlFor="condition">Condition *</Label>
                      <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Brand New</SelectItem>
                          <SelectItem value="used_excellent">Used - Excellent</SelectItem>
                          <SelectItem value="used_good">Used - Good</SelectItem>
                          <SelectItem value="used_fair">Used - Fair</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Preferences</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="budget">Budget Range *</Label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under_10k">Under $10,000</SelectItem>
                          <SelectItem value="10k_25k">$10,000 - $25,000</SelectItem>
                          <SelectItem value="25k_50k">$25,000 - $50,000</SelectItem>
                          <SelectItem value="50k_100k">$50,000 - $100,000</SelectItem>
                          <SelectItem value="over_100k">Over $100,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="preferredColor">Preferred Color</Label>
                      <Input
                        id="preferredColor"
                        value={formData.preferredColor}
                        onChange={(e) => handleInputChange('preferredColor', e.target.value)}
                        placeholder="e.g., Black, White, Silver"
                      />
                    </div>
                    <div>
                      <Label htmlFor="transmission">Transmission *</Label>
                      <Select value={formData.transmission} onValueChange={(value) => handleInputChange('transmission', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select transmission" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="automatic">Automatic</SelectItem>
                          <SelectItem value="manual">Manual</SelectItem>
                          <SelectItem value="no_preference">No Preference</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="fuelType">Fuel Type *</Label>
                      <Select value={formData.fuelType} onValueChange={(value) => handleInputChange('fuelType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fuel type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gasoline">Gasoline</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="electric">Electric</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="no_preference">No Preference</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Delivery & Additional Info */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Delivery & Additional Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="deliveryLocation">Delivery Location *</Label>
                      <Input
                        id="deliveryLocation"
                        value={formData.deliveryLocation}
                        onChange={(e) => handleInputChange('deliveryLocation', e.target.value)}
                        required
                        placeholder="City, State, Country"
                      />
                    </div>
                    <div>
                      <Label htmlFor="additionalRequirements">Additional Requirements or Comments</Label>
                      <Textarea
                        id="additionalRequirements"
                        value={formData.additionalRequirements}
                        onChange={(e) => handleInputChange('additionalRequirements', e.target.value)}
                        rows={4}
                        placeholder="Any specific features, options, or requirements you're looking for..."
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Request Quote'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Simple steps to get your dream car
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Submit Request</h3>
              <p className="text-muted-foreground">Fill out the quote request form with your requirements</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Get Quote</h3>
              <p className="text-muted-foreground">Receive a detailed quote within 24 hours</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Review & Approve</h3>
              <p className="text-muted-foreground">Review options and approve your purchase</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">Delivery</h3>
              <p className="text-muted-foreground">We handle everything and deliver to your location</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
