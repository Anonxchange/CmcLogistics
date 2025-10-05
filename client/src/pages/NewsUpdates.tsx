
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, Calendar, Clock, Truck, Globe, Award, Users, Newspaper, TrendingUp, Building } from 'lucide-react';

export default function NewsUpdates() {
  const newsArticles = [
    {
      id: 1,
      title: 'CMC Logistics Expands Operations to 25 New Countries',
      excerpt: 'We are excited to announce our expansion into 25 new markets across Africa, Asia, and South America, bringing our total coverage to 160+ countries worldwide.',
      date: '2024-03-15',
      category: 'Expansion',
      icon: Globe,
      featured: true,
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=300&fit=crop',
      author: 'Sarah Johnson, CEO',
      readTime: '3 min read'
    },
    {
      id: 2,
      title: 'New AI-Powered Route Optimization System',
      excerpt: 'Our latest technology upgrade includes machine learning algorithms that optimize delivery routes in real-time, reducing transit times by up to 30%.',
      date: '2024-03-10',
      category: 'Technology',
      icon: Truck,
      featured: true,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=300&fit=crop',
      author: 'Michael Chen, CTO',
      readTime: '4 min read'
    },
    {
      id: 3,
      title: 'CMC Logistics Receives ISO 27001 Certification',
      excerpt: 'We have achieved ISO 27001 certification for information security management, demonstrating our commitment to protecting customer data.',
      date: '2024-03-05',
      category: 'Certification',
      icon: Award,
      featured: false,
      image: 'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=400&h=200&fit=crop',
      author: 'Security Team',
      readTime: '2 min read'
    },
    {
      id: 4,
      title: 'Partnership with Major E-commerce Platforms',
      excerpt: 'New integrations with leading e-commerce platforms make it easier than ever for online retailers to manage their shipping needs.',
      date: '2024-02-28',
      category: 'Partnership',
      icon: Users,
      featured: false,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop',
      author: 'Business Development',
      readTime: '3 min read'
    },
    {
      id: 5,
      title: 'Sustainable Packaging Initiative Launch',
      excerpt: 'Introducing our eco-friendly packaging solutions to reduce environmental impact while maintaining the highest protection standards.',
      date: '2024-02-20',
      category: 'Sustainability',
      icon: Globe,
      featured: false,
      image: 'https://raw.githubusercontent.com/Anonxchange/Smartship/refs/heads/main/attached_assets/generated_images/IMG_0534.jpeg?w=400&h=200&fit=crop',
      author: 'Environmental Team',
      readTime: '2 min read'
    },
    {
      id: 6,
      title: '24/7 Customer Support Now Available',
      excerpt: 'Our customer support team is now available around the clock to assist with tracking, claims, and general inquiries in multiple languages.',
      date: '2024-02-15',
      category: 'Service',
      icon: Users,
      featured: false,
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=200&fit=crop',
      author: 'Customer Success',
      readTime: '2 min read'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Expansion': 'bg-blue-100 text-blue-800 border-blue-200',
      'Technology': 'bg-purple-100 text-purple-800 border-purple-200',
      'Certification': 'bg-green-100 text-green-800 border-green-200',
      'Partnership': 'bg-orange-100 text-orange-800 border-orange-200',
      'Sustainability': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Service': 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const featuredNews = newsArticles.filter(article => article.featured);
  const regularNews = newsArticles.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-white/10 rounded-lg">
                <Newspaper className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold">News & Updates</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Stay informed about the latest developments, expansions, and innovations at CMC Logistics. 
              We're constantly working to improve our services and expand our global reach.
            </p>
          </div>
        </div>
      </section>

      <main className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          

          

          {/* Featured News */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Featured Stories</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredNews.map((article) => {
                const IconComponent = article.icon;
                return (
                  <Card key={article.id} className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge className={`${getCategoryColor(article.category)} border`}>
                          {article.category}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-primary text-primary-foreground">
                          Featured
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <IconComponent className="w-4 h-4 text-primary" />
                        </div>
                        <div className="text-sm text-muted-foreground">{article.author}</div>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(article.date)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Regular News */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Newspaper className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Recent Updates</h2>
            </div>
            <div className="grid gap-6">
              {regularNews.map((article) => {
                const IconComponent = article.icon;
                return (
                  <Card key={article.id} className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 relative h-48 md:h-auto">
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className={`${getCategoryColor(article.category)} border`}>
                              {article.category}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="md:w-2/3 p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <IconComponent className="w-4 h-4 text-primary" />
                            </div>
                            <div className="text-sm text-muted-foreground">{article.author}</div>
                          </div>
                          
                          <h3 className="text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          
                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            {article.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(article.date)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {article.readTime}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Team Spotlight */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Team Spotlight</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face"
                    alt="CMC Logistics Team Member"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-lg font-semibold">David Thompson</div>
                    <div className="text-sm opacity-90">Operations Manager</div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm">
                      CMC Logistics Team
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop&crop=face"
                    alt="CMC Logistics Team Member"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-lg font-semibold">Sarah Johnson</div>
                    <div className="text-sm opacity-90">CEO & Founder</div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm">
                      CMC Logistics Team
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=face"
                    alt="CMC Logistics Team Member"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-lg font-semibold">Michael Chen</div>
                    <div className="text-sm opacity-90">Chief Technology Officer</div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm">
                      CMC Logistics Team
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Newsletter Signup */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-primary to-primary/80 text-white">
            <CardContent className="p-12 text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="p-3 bg-white/10 rounded-lg">
                  <Newspaper className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-4">Stay Updated with CMC Logistics</h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
                Subscribe to our newsletter to receive the latest news, updates, and industry insights 
                directly in your inbox. Never miss important announcements about our services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg text-foreground border-0 focus:ring-2 focus:ring-white"
                />
                <Button size="lg" variant="secondary" className="whitespace-nowrap bg-white text-primary hover:bg-gray-100">
                  Subscribe Now
                </Button>
              </div>
              <p className="text-blue-100 text-sm mt-4">
                Join 5,000+ logistics professionals who trust our insights
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
