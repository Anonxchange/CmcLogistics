import { useRoute, Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { getArticleBySlug, newsArticles } from '@/data/newsArticles';

export default function ArticleDetail() {
  const [, params] = useRoute('/news/:slug');
  const article = params?.slug ? getArticleBySlug(params.slug) : null;

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/news-updates">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

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

  const relatedArticles = newsArticles
    .filter(a => a.id !== article.id && (a.category === article.category || a.featured))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Back Button */}
      <div className="bg-muted/30 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <Link href="/news-updates">
            <Button variant="ghost" size="sm" className="text-sm">
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Back to News
            </Button>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-6 sm:py-8 lg:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* CMC Logistics News Badge */}
          <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-3 sm:mb-4">CMC Logistics News</p>
          
          {/* Category Badge */}
          <div className="mb-4 sm:mb-6">
            <Badge className={`${getCategoryColor(article.category)} border text-xs sm:text-sm`}>
              {article.category}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 pb-6 sm:pb-8 border-b">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(article.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">By {article.author}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-6 sm:mb-8 lg:mb-12 rounded-lg overflow-hidden">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-auto"
            />
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-sm sm:prose-base lg:prose-lg max-w-none mb-8 sm:mb-12"
            dangerouslySetInnerHTML={{ __html: article.content }}
            style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.125rem)',
              lineHeight: '1.75',
              color: 'hsl(var(--foreground))'
            }}
          />

          {/* Share Buttons */}
          <div className="border-t border-b py-6 sm:py-8 mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                Share this article
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <Facebook className="w-4 h-4" />
                  Facebook
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Twitter className="w-4 h-4" />
                  Twitter
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Related Articles</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {relatedArticles.map((related) => (
                  <Link key={related.id} href={`/news/${related.slug}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                      <img 
                        src={related.image} 
                        alt={related.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <Badge className={`${getCategoryColor(related.category)} border text-xs mb-2`}>
                          {related.category}
                        </Badge>
                        <h4 className="font-semibold text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">
                          {related.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {related.excerpt}
                        </p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
}
