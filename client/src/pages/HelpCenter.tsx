
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Package, Truck, Plane, Ship, HelpCircle, FileText, MessageCircle } from 'lucide-react';

export default function HelpCenter() {
  const categories = [
    {
      icon: Package,
      title: "Shipping & Tracking",
      description: "Learn how to ship packages and track your deliveries",
      articles: 15
    },
    {
      icon: Truck,
      title: "Ground Transportation",
      description: "Information about road and domestic shipping services",
      articles: 8
    },
    {
      icon: Plane,
      title: "Air Freight",
      description: "Air shipping guidelines and international delivery",
      articles: 12
    },
    {
      icon: Ship,
      title: "Ocean Freight",
      description: "Sea freight services and container shipping",
      articles: 10
    },
    {
      icon: FileText,
      title: "Documentation",
      description: "Required forms, customs, and shipping documents",
      articles: 7
    },
    {
      icon: MessageCircle,
      title: "Account & Billing",
      description: "Manage your account, payments, and invoices",
      articles: 9
    }
  ];

  const popularArticles = [
    "How to track my shipment?",
    "What documents do I need for international shipping?",
    "How to calculate shipping costs?",
    "What items cannot be shipped?",
    "How to file a claim for damaged goods?",
    "Understanding delivery timeframes",
    "How to change delivery address?",
    "Setting up automated shipping notifications"
  ];

  const quickActions = [
    { title: "Track a Shipment", description: "Enter tracking number", icon: Package },
    { title: "Get Quote", description: "Calculate shipping costs", icon: FileText },
    { title: "Contact Support", description: "Chat with an agent", icon: MessageCircle },
    { title: "Download Forms", description: "Shipping documents", icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold">Help Center</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Find answers to your shipping questions and get the help you need
            </p>
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mt-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="Search for help articles..." 
                  className="pl-12 h-14 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/70"
                />
                <Button className="absolute right-2 top-2 h-10" variant="secondary">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-foreground">Quick Actions</h2>
            <p className="text-lg text-muted-foreground">Common tasks you can do right away</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg mb-1">{action.title}</CardTitle>
                      <CardDescription>{action.description}</CardDescription>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-foreground">Browse by Category</h2>
            <p className="text-lg text-muted-foreground">Find help articles organized by topic</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">{category.title}</CardTitle>
                      <CardDescription className="mb-3">{category.description}</CardDescription>
                      <div className="text-sm text-primary font-medium">
                        {category.articles} articles
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Popular Articles</h2>
              <div className="space-y-4">
                {popularArticles.map((article, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 cursor-pointer border">
                    <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground hover:text-primary transition-colors">
                      {article}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Still Need Help?</h2>
              <Card>
                <CardContent className="p-8 space-y-6">
                  <div className="text-center space-y-4">
                    <MessageCircle className="w-16 h-16 text-primary mx-auto" />
                    <h3 className="text-2xl font-semibold text-foreground">Contact Support</h3>
                    <p className="text-muted-foreground">
                      Can't find what you're looking for? Our support team is available 24/7 
                      to help with any questions.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <Button className="w-full" size="lg">
                      Start Live Chat
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      Send Email
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                      Or call us at <strong>+1 (555) 123-4567</strong>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
