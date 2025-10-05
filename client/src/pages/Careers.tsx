
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, DollarSign, Users, Award, Heart, Zap } from 'lucide-react';

export default function Careers() {
  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive medical, dental, and vision coverage plus wellness programs"
    },
    {
      icon: DollarSign,
      title: "Competitive Compensation",
      description: "Market-leading salaries with performance bonuses and stock options"
    },
    {
      icon: Users,
      title: "Professional Development",
      description: "Training programs, mentorship, and career advancement opportunities"
    },
    {
      icon: Clock,
      title: "Work-Life Balance",
      description: "Flexible schedules, remote work options, and generous PTO"
    },
    {
      icon: Award,
      title: "Recognition Programs",
      description: "Employee appreciation events and achievement recognition"
    },
    {
      icon: Zap,
      title: "Innovation Culture",
      description: "Collaborative environment encouraging creativity and new ideas"
    }
  ];

  const openPositions = [
    {
      title: "Senior Logistics Coordinator",
      location: "New York, NY",
      type: "Full-time",
      department: "Operations",
      description: "Lead coordination of international shipping operations and manage client relationships."
    },
    {
      title: "Software Engineer - Logistics Platform",
      location: "San Francisco, CA",
      type: "Full-time",
      department: "Technology",
      description: "Develop and maintain our proprietary logistics management platform."
    },
    {
      title: "Account Manager - Enterprise Sales",
      location: "Chicago, IL",
      type: "Full-time",
      department: "Sales",
      description: "Manage enterprise client accounts and drive business growth."
    },
    {
      title: "Customer Service Representative",
      location: "Miami, FL",
      type: "Full-time",
      department: "Customer Service",
      description: "Provide exceptional support to customers for tracking and logistics inquiries."
    },
    {
      title: "Data Analyst - Supply Chain",
      location: "Remote",
      type: "Full-time",
      department: "Analytics",
      description: "Analyze logistics data to optimize supply chain efficiency and performance."
    },
    {
      title: "Regional Operations Manager",
      location: "Los Angeles, CA",
      type: "Full-time",
      department: "Operations",
      description: "Oversee regional logistics operations and team management."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold">Join Our Team</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Build your career with a global leader in logistics. We offer exciting opportunities 
              to grow professionally while making a meaningful impact on global commerce.
            </p>
            <Button size="lg" variant="secondary" className="mt-6">
              View All Positions
            </Button>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Why CMC Logistics?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We believe in investing in our people and creating an environment where everyone can thrive
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">{benefit.title}</CardTitle>
                      <CardDescription>{benefit.description}</CardDescription>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Open Positions</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Find your next opportunity with our growing team
            </p>
          </div>
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      <div>
                        <CardTitle className="text-xl mb-1">{position.title}</CardTitle>
                        <CardDescription>{position.description}</CardDescription>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {position.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {position.type}
                        </div>
                        <div className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                          {position.department}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline">
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Application Process</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our streamlined hiring process is designed to find the best fit for both you and our team
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Apply Online", description: "Submit your application and resume through our careers portal" },
              { step: "2", title: "Initial Review", description: "Our HR team reviews your application and qualifications" },
              { step: "3", title: "Interview Process", description: "Phone/video screening followed by in-person or virtual interviews" },
              { step: "4", title: "Welcome Aboard", description: "Receive offer and begin your journey with our onboarding program" }
            ].map((step, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
