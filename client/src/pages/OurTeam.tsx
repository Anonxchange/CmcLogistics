
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LinkedinIcon, MailIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OurTeam() {
  const leadership = [
    {
      name: "Sarah Johnson",
      position: "Chief Executive Officer",
      bio: "20+ years of logistics industry experience. Previously VP of Operations at Global Freight Solutions.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      linkedin: "#",
      email: "sarah.johnson@cmclogistics.com"
    },
    {
      name: "Michael Chen",
      position: "Chief Technology Officer",
      bio: "Expert in logistics technology and AI systems. Former lead engineer at Amazon Logistics.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      linkedin: "#",
      email: "michael.chen@cmclogistics.com"
    },
    {
      name: "Maria Rodriguez",
      position: "Chief Operations Officer",
      bio: "15+ years optimizing global supply chains. Specialized in international trade regulations.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      linkedin: "#",
      email: "maria.rodriguez@cmclogistics.com"
    },
    {
      name: "David Thompson",
      position: "Chief Financial Officer",
      bio: "Strategic financial leader with expertise in global logistics investments and cost optimization.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      linkedin: "#",
      email: "david.thompson@cmclogistics.com"
    }
  ];

  const departments = [
    {
      name: "Operations Team",
      description: "Managing daily logistics operations across our global network",
      members: "150+ Professionals"
    },
    {
      name: "Customer Service",
      description: "24/7 support ensuring exceptional customer experiences",
      members: "75+ Specialists"
    },
    {
      name: "Technology & Innovation",
      description: "Developing cutting-edge solutions for modern logistics challenges",
      members: "45+ Engineers"
    },
    {
      name: "Sales & Business Development",
      description: "Building partnerships and expanding our global reach",
      members: "80+ Representatives"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold">Our Team</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Meet the dedicated professionals who make CMC Logistics a global leader 
              in logistics and shipping solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Leadership Team</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Experienced leaders driving innovation and excellence in global logistics
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((member, index) => (
              <div key={index} className="text-center space-y-4 group">
                <div className="relative overflow-hidden rounded-lg mx-auto w-48 h-48">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                  <p className="text-primary font-medium">{member.position}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </div>
                <div className="flex justify-center gap-2">
                  <Button variant="ghost" size="icon" className="w-8 h-8">
                    <LinkedinIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-8 h-8">
                    <MailIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Our Departments</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Specialized teams working together to deliver exceptional logistics solutions
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {departments.map((dept, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm border space-y-4">
                <h3 className="text-2xl font-semibold text-foreground">{dept.name}</h3>
                <p className="text-muted-foreground">{dept.description}</p>
                <div className="text-primary font-medium">{dept.members}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Join Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We're always looking for talented individuals who share our passion for 
              excellence in logistics and customer service.
            </p>
            <Button size="lg" className="mt-6">
              View Open Positions
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
