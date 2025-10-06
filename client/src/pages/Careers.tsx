
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Clock, DollarSign, Users, Award, Heart, Zap, Upload } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface JobPosition {
  title: string;
  location: string;
  type: string;
  department: string;
  description: string;
}

export default function Careers() {
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedIn: '',
    coverLetter: '',
    resumeText: ''
  });

  const handleApplyClick = (position: JobPosition) => {
    setSelectedJob(position);
    setIsApplicationOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.coverLetter) {
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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a8a;">New Job Application - ${selectedJob?.title}</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e3a8a; margin-top: 0;">Position Details</h3>
            <p><strong>Position:</strong> ${selectedJob?.title}</p>
            <p><strong>Location:</strong> ${selectedJob?.location}</p>
            <p><strong>Department:</strong> ${selectedJob?.department}</p>
          </div>

          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e3a8a; margin-top: 0;">Applicant Information</h3>
            <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
            <p><strong>LinkedIn:</strong> ${formData.linkedIn || 'Not provided'}</p>
          </div>

          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e3a8a; margin-top: 0;">Cover Letter</h3>
            <p style="white-space: pre-wrap;">${formData.coverLetter}</p>
          </div>

          ${formData.resumeText ? `
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e3a8a; margin-top: 0;">Resume / Additional Information</h3>
            <p style="white-space: pre-wrap;">${formData.resumeText}</p>
          </div>
          ` : ''}

          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              This application was submitted through the CMC Logistics careers portal.
            </p>
          </div>
        </div>
      `;

      const { error } = await supabase.functions.invoke('send-email', {
        body: {
          to: 'support@cmcautoslogistics.com',
          subject: `Job Application: ${selectedJob?.title} - ${formData.firstName} ${formData.lastName}`,
          html: emailContent,
        }
      });

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "Thank you for your application. We'll review it and get back to you soon.",
      });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        linkedIn: '',
        coverLetter: '',
        resumeText: ''
      });
      setIsApplicationOpen(false);
    } catch (error) {
      console.error('Application submission error:', error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try emailing your resume to support@cmcautoslogistics.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
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
                    <Button variant="outline" onClick={() => handleApplyClick(position)}>
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

      {/* Application Form Dialog */}
      <Dialog open={isApplicationOpen} onOpenChange={setIsApplicationOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Apply for Position</DialogTitle>
            <DialogDescription>
              {selectedJob?.title} - {selectedJob?.location}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedIn">LinkedIn Profile URL</Label>
                <Input
                  id="linkedIn"
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={formData.linkedIn}
                  onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                />
              </div>
            </div>

            {/* Cover Letter */}
            <div className="space-y-2">
              <Label htmlFor="coverLetter">Cover Letter *</Label>
              <Textarea
                id="coverLetter"
                rows={6}
                placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                value={formData.coverLetter}
                onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                required
              />
            </div>

            {/* Resume */}
            <div className="space-y-2">
              <Label htmlFor="resumeText">Resume / Additional Information</Label>
              <Textarea
                id="resumeText"
                rows={8}
                placeholder="Paste your resume text or provide additional relevant information about your experience, skills, and qualifications..."
                value={formData.resumeText}
                onChange={(e) => setFormData({ ...formData, resumeText: e.target.value })}
              />
              <p className="text-sm text-muted-foreground">
                You can also email your resume as an attachment to support@cmcautoslogistics.com with the subject: "Application - {selectedJob?.title}"
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsApplicationOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
