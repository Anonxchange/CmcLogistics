
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, Shield, Eye, Lock, UserCheck, FileText, AlertCircle, Globe, Calendar, Award } from 'lucide-react';

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: FileText,
      title: 'Information We Collect',
      content: [
        'Personal Information: Name, email address, phone number, billing address, and shipping address when you create an account or place an order.',
        'Shipment Information: Details about packages you send or receive, including tracking information, delivery addresses, and package contents (when disclosed).',
        'Payment Information: Credit card details and billing information processed through secure payment gateways.',
        'Usage Data: Information about how you use our website, including IP address, browser type, pages visited, and time spent on our site.',
        'Location Data: GPS coordinates and delivery locations when using our mobile tracking services.'
      ]
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'Service Delivery: To process shipments, provide tracking information, and deliver packages to specified locations.',
        'Customer Support: To respond to inquiries, resolve issues, and provide technical support.',
        'Account Management: To maintain your account, process payments, and send service-related communications.',
        'Service Improvement: To analyze usage patterns and improve our logistics services and website functionality.',
        'Marketing Communications: To send promotional emails about new services and special offers (with your consent).',
        'Legal Compliance: To comply with applicable laws, regulations, and legal processes.'
      ]
    },
    {
      icon: Shield,
      title: 'Information Sharing and Disclosure',
      content: [
        'Service Partners: We share necessary information with carriers, customs authorities, and delivery partners to complete shipments.',
        'Payment Processors: Credit card information is shared with secure payment processing services.',
        'Legal Requirements: We may disclose information when required by law, court order, or to protect our legal rights.',
        'Business Transfers: In the event of a merger or acquisition, customer information may be transferred to the new entity.',
        'Third-Party Services: We may share data with analytics providers and marketing platforms (with appropriate safeguards).'
      ]
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: [
        'Encryption: All sensitive data is encrypted during transmission using SSL/TLS technology.',
        'Access Controls: We implement strict access controls and authentication measures for employee access to personal data.',
        'Data Centers: Our servers are housed in secure, SOC 2 compliant data centers with physical security measures.',
        'Regular Audits: We conduct regular security assessments and vulnerability testing.',
        'Incident Response: We have procedures in place to respond to and notify users of any data breaches.',
        'Employee Training: All staff receive regular training on data protection and privacy best practices.'
      ]
    },
    {
      icon: UserCheck,
      title: 'Your Rights and Choices',
      content: [
        'Access: You can request access to the personal information we hold about you.',
        'Correction: You can request that we correct or update inaccurate personal information.',
        'Deletion: You can request deletion of your personal information, subject to legal and operational requirements.',
        'Portability: You can request a copy of your data in a structured, machine-readable format.',
        'Marketing Opt-out: You can unsubscribe from marketing communications at any time.',
        'Account Deletion: You can request deletion of your account and associated data.'
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
                <Shield className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold">Privacy Policy</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Your privacy is our priority. Learn how we protect and manage your personal information 
              with the highest standards of data security and transparency.
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
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">Our Commitment to Privacy</h2>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    At CMC Logistics, we are committed to protecting your privacy and ensuring the security of your personal information. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                    logistics and shipping services.
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    By using CMC Logistics's services, you agree to the collection and use of information in accordance with this policy. 
                    We will not use or share your information with anyone except as described in this Privacy Policy.
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

          {/* Additional Important Sections */}
          <div className="grid gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-500/5 to-orange-500/10 border-b">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                  </div>
                  Data Retention
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground">We retain your personal information for as long as necessary to provide our services and comply with legal obligations:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Account Information</h4>
                    <p className="text-sm text-muted-foreground">Retained while your account is active and for 7 years after account closure</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Shipping Records</h4>
                    <p className="text-sm text-muted-foreground">Maintained for 7 years for customs and legal compliance</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Payment Information</h4>
                    <p className="text-sm text-muted-foreground">Stored securely for the duration required by payment processors</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Marketing Data</h4>
                    <p className="text-sm text-muted-foreground">Retained until you unsubscribe or request deletion</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-500/5 to-blue-500/10 border-b">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Globe className="w-5 h-5 text-blue-600" />
                    </div>
                    International Transfers
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <p className="text-sm text-muted-foreground">As a global logistics provider, we may transfer your personal information to countries outside your residence:</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• We ensure adequate protection through appropriate safeguards</li>
                    <li>• Transfers comply with applicable data protection laws</li>
                    <li>• We use standard contractual clauses for international transfers</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-500/5 to-green-500/10 border-b">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <UserCheck className="w-5 h-5 text-green-600" />
                    </div>
                    Children's Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">CMC Logistics services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected personal information from a child under 16, we will take steps to delete such information promptly.</p>
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
                    <Shield className="w-8 h-8" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Questions About Your Privacy?</h3>
                  <p className="text-blue-100 mb-6">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="p-4 bg-white/10 rounded-lg">
                    <div className="font-semibold">Privacy Officer</div>
                    <div className="text-blue-100">privacy@cmclogistics.com</div>
                  </div>
                  <div className="p-4 bg-white/10 rounded-lg">
                    <div className="font-semibold">Phone</div>
                    <div className="text-blue-100">+1 (555) 123-4567</div>
                  </div>
                  <div className="p-4 bg-white/10 rounded-lg">
                    <div className="font-semibold">Mail</div>
                    <div className="text-blue-100">Global Headquarters, New York, NY 10001</div>
                  </div>
                  <div className="p-4 bg-white/10 rounded-lg">
                    <div className="font-semibold">EU DPO</div>
                    <div className="text-blue-100">dpo-eu@cmclogistics.com</div>
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
