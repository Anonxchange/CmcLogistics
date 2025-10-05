
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, FileText, Scale, Shield, AlertTriangle, Calendar, Gavel, Users, CreditCard, Globe } from 'lucide-react';

export default function TermsConditions() {
  const sections = [
    {
      icon: FileText,
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using CMC Logistics services, you accept and agree to be bound by the terms and provision of this agreement.',
        'If you do not agree to abide by the above, please do not use this service.',
        'Use of our services is also governed by our Privacy Policy.'
      ]
    },
    {
      icon: Shield,
      title: 'Service Description',
      content: [
        'CMC Logistics provides global logistics and freight forwarding services including air freight, sea freight, road transportation, and warehousing.',
        'We reserve the right to modify, suspend, or discontinue any service at any time without notice.',
        'Service availability may vary by location and is subject to operational constraints.'
      ]
    },
    {
      icon: Users,
      title: 'User Responsibilities',
      content: [
        'You are responsible for providing accurate shipment information and documentation.',
        'You must comply with all applicable laws and regulations regarding international shipping.',
        'Prohibited items include hazardous materials, illegal substances, and restricted goods as defined by international shipping regulations.',
        'You agree not to use our services for unlawful purposes or in violation of any applicable regulations.'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Liability and Insurance',
      content: [
        'CMC Logistics\'s liability is limited to the declared value of the shipment or actual loss, whichever is less.',
        'We strongly recommend obtaining appropriate insurance coverage for valuable shipments.',
        'CMC Logistics is not liable for delays caused by customs, weather, or other circumstances beyond our control.',
        'Claims must be reported within 30 days of delivery or expected delivery date.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-white/10 rounded-lg">
                <Scale className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold">Terms and Conditions</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Clear and transparent terms that govern our logistics services and outline 
              the rights and responsibilities for all parties involved.
            </p>
            <div className="flex items-center justify-center gap-2 text-blue-100">
              <Calendar className="w-4 h-4" />
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </section>

      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          

          {/* Introduction */}
          <Card className="mb-12 border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <Gavel className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">Welcome to CMC Logistics</h2>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    These terms and conditions outline the rules and regulations for the use of CMC Logistics's services and website. 
                    By using our services, you agree to comply with and be bound by these terms.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Sections */}
          <div className="space-y-8 mb-12">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <Card key={index} className="border-0 shadow-lg overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {section.content.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-sm leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Additional Terms */}
          <div className="grid gap-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-500/5 to-green-500/10 border-b">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <CreditCard className="w-5 h-5 text-green-600" />
                    </div>
                    Payment Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>Payment is due upon invoice unless other arrangements have been made in writing.</p>
                    <p>Late payments may be subject to interest charges and suspension of services.</p>
                    <p>All prices are subject to change without notice.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-500/5 to-purple-500/10 border-b">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                    Intellectual Property
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>All content on this website is the property of CMC Logistics and is protected by copyright laws.</p>
                    <p>You may not reproduce, distribute, or create derivative works without written permission.</p>
                    <p>Trademarks and logos are the property of their respective owners.</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500/5 to-blue-500/10 border-b">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  Privacy and Data Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Privacy Policy</h4>
                    <p className="text-sm text-muted-foreground">Please review our Privacy Policy for information about how we collect and use your data.</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Security Measures</h4>
                    <p className="text-sm text-muted-foreground">We implement appropriate security measures to protect your personal information.</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Your Rights</h4>
                    <p className="text-sm text-muted-foreground">You have the right to access, correct, or delete your personal data as outlined in our Privacy Policy.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-orange-500/5 to-orange-500/10 border-b">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-orange-500/10 rounded-lg">
                      <Scale className="w-5 h-5 text-orange-600" />
                    </div>
                    Dispute Resolution
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>Any disputes arising from these terms will be resolved through binding arbitration.</p>
                    <p>These terms are governed by the laws of the State of New York.</p>
                    <p>Any legal proceedings must be brought in the courts of New York.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-red-500/5 to-red-500/10 border-b">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-red-500/10 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    Modifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>CMC Logistics reserves the right to modify these terms at any time.</p>
                    <p>Changes will be effective immediately upon posting on our website.</p>
                    <p>Continued use of our services constitutes acceptance of modified terms.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Information */}
          <Card className="mt-12 border-0 shadow-lg bg-gradient-to-br from-primary to-primary/80 text-white">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <Gavel className="w-8 h-8" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Questions About These Terms?</h3>
                  <p className="text-blue-100 mb-6">
                    If you have any questions about these Terms and Conditions, please contact us:
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="p-4 bg-white/10 rounded-lg">
                    <div className="font-semibold">Legal Department</div>
                    <div className="text-blue-100">legal@cmclogistics.com</div>
                  </div>
                  <div className="p-4 bg-white/10 rounded-lg">
                    <div className="font-semibold">Phone</div>
                    <div className="text-blue-100">+1 (555) 123-4567</div>
                  </div>
                  <div className="p-4 bg-white/10 rounded-lg">
                    <div className="font-semibold">Address</div>
                    <div className="text-blue-100">Global Headquarters, New York</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
