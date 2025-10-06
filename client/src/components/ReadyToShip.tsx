import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Package, ArrowRight, Phone, Mail } from 'lucide-react';
import { Link } from 'wouter';

export default function ReadyToShip() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary via-primary/95 to-primary/80 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-primary-foreground">
          <div className="p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Package className="w-8 h-8 text-primary-foreground" />
                  <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground">
                    Ready to Ship with Confidence?
                  </h2>
                </div>
                <p className="text-lg text-primary-foreground/90 leading-relaxed">
                  Join thousands of satisfied customers who trust CMC Logistics for their logistics needs. 
                  Get your free quote today and experience the difference of professional shipping services.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/quote">
                    <Button 
                      size="lg" 
                      variant="secondary"
                      className="bg-white text-primary hover:bg-white/90 font-semibold px-8 w-full sm:w-auto"
                    >
                      Get Free Quote
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/track">
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-primary font-semibold px-8 w-full sm:w-auto"
                    >
                      Track Shipment
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <Phone className="w-6 h-6 text-primary-foreground" />
                    <div>
                      <div className="font-semibold text-primary-foreground">Call Us Now</div>
                      <div className="text-primary-foreground/80">+1 (555) 123-4567</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                    <div>
                      <div className="font-semibold text-primary-foreground">Email Support</div>
                      <div className="text-primary-foreground/80">support@cmclogistics.com</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center pt-4">
                  <div className="text-sm text-primary-foreground/80 mb-2">Trusted by</div>
                  <div className="text-2xl font-bold text-primary-foreground">16,000+ Customers Worldwide</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}