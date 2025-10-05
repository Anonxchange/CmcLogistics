import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, Cookie, Shield, Settings, Eye } from 'lucide-react';

export default function CookiePolicy() {
  const cookieTypes = [
    {
      icon: Shield,
      title: 'Essential Cookies',
      description: 'These cookies are necessary for the website to function and cannot be switched off.',
      examples: ['Authentication', 'Security', 'Session management']
    },
    {
      icon: Eye,
      title: 'Analytics Cookies',
      description: 'These cookies help us understand how visitors interact with our website.',
      examples: ['Google Analytics', 'Page views', 'User behavior tracking']
    },
    {
      icon: Settings,
      title: 'Functional Cookies',
      description: 'These cookies enable enhanced functionality and personalization.',
      examples: ['Language preferences', 'Remember me settings', 'Chat features']
    },
    {
      icon: Cookie,
      title: 'Marketing Cookies',
      description: 'These cookies track visitors across websites to display relevant ads.',
      examples: ['Advertising networks', 'Retargeting', 'Social media integration']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <h1 className="text-4xl font-bold text-foreground mb-4">Cookie Policy</h1>
            <p className="text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="w-5 h-5" />
                What are cookies?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
                They are widely used to make websites work more efficiently and provide information to website owners.
              </p>
              <p>
                At CMC Logistics, we use cookies to enhance your browsing experience, provide personalized content, 
                and analyze our website traffic to improve our services.
              </p>
            </CardContent>
          </Card>

          {/* Cookie Types */}
          <div className="grid gap-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground">Types of Cookies We Use</h2>
            
            {cookieTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <IconComponent className="w-5 h-5 text-primary" />
                      {type.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3">{type.description}</p>
                    <div>
                      <strong>Examples:</strong>
                      <ul className="list-disc list-inside mt-2 text-muted-foreground">
                        {type.examples.map((example, idx) => (
                          <li key={idx}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Cookie Management */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Managing Your Cookie Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                You have the right to decide whether to accept or reject cookies. You can exercise your 
                cookie rights by setting your preferences in the cookie consent manager or by adjusting 
                your browser settings.
              </p>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Browser Settings:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                  <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                </ul>
              </div>

              <p className="text-sm text-muted-foreground">
                Note: Disabling certain cookies may impact the functionality of our website and limit your access to some features.
              </p>
            </CardContent>
          </Card>

          {/* Third-party Services */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Third-party Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We use various third-party services that may set their own cookies when you visit our website:
              </p>
              
              <div className="grid gap-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">Google Analytics</h4>
                  <p className="text-sm text-muted-foreground">
                    Helps us understand website usage and improve user experience. 
                    <a href="https://policies.google.com/privacy" className="text-primary underline ml-1" target="_blank" rel="noopener noreferrer">
                      Privacy Policy
                    </a>
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">Supabase</h4>
                  <p className="text-sm text-muted-foreground">
                    Our backend service provider for database and authentication services.
                    <a href="https://supabase.com/privacy" className="text-primary underline ml-1" target="_blank" rel="noopener noreferrer">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Questions about Cookies?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                If you have any questions about our use of cookies, please contact us:
              </p>
              
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> privacy@cmclogistics.com</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Address:</strong> CMC Logistics Privacy Team, Global Headquarters, New York</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}