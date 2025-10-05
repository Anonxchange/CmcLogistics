
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, MapPin, Users, Award, Truck, Search, Star, Calendar, Shield, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StatItemProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  description: string;
}

function StatItem({ icon: IconComponent, value, label, description }: StatItemProps) {
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    // Simple counter animation for demo purposes
    const numericValue = parseInt(value.replace(/[^0-9.]/g, ''));
    const increment = Math.max(1, Math.floor(numericValue / 100));
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(current.toLocaleString() + (value.includes('+') ? '+' : ''));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300">
      <CardContent className="p-6 text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        <div>
          <div className="text-3xl lg:text-4xl font-bold text-white mb-2" data-testid={`stat-${label.toLowerCase().replace(/\s+/g, '-')}`}>
            {displayValue}
          </div>
          <div className="text-lg font-medium text-white/90">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}

interface PerformanceMetricProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  subtitle: string;
  description: string;
}

function PerformanceMetric({ icon: IconComponent, title, value, subtitle, description }: PerformanceMetricProps) {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
      <CardContent className="p-8 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl lg:text-2xl font-bold text-white">{title}</h3>
        </div>
        
        <div className="space-y-2">
          <div className="text-4xl lg:text-5xl font-bold text-white">
            {value}
          </div>
          <div className="text-lg font-medium text-white/90">{subtitle}</div>
          <p className="text-white/80 max-w-2xl">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Statistics() {
  const achievements = [
    {
      icon: TrendingUp,
      value: '101,273+',
      label: 'Delivered Packages',
      description: 'Successfully delivered packages worldwide with industry-leading reliability'
    },
    {
      icon: MapPin,
      value: '673,754+',
      label: 'KM Per Year',
      description: 'Total distance covered annually across our global logistics network'
    },
    {
      icon: Users,
      value: '16,714+',
      label: 'Happy Clients',
      description: 'Satisfied customers who trust us with their shipping needs globally'
    },
    {
      icon: Award,
      value: '160+',
      label: 'Countries Served',
      description: 'Global coverage spanning across continents with reliable service'
    }
  ];

  const performanceMetrics = [
    {
      icon: Truck,
      title: 'Delivery Performance',
      value: '99.8%',
      subtitle: 'On-Time Delivery',
      description: 'Industry-leading on-time delivery performance across all shipping methods'
    },
    {
      icon: Search,
      title: 'Tracking Precision',
      value: 'Real-time',
      subtitle: 'GPS Accuracy',
      description: 'Advanced tracking systems with minute-by-minute updates and GPS precision'
    },
    {
      icon: Star,
      title: 'Client Satisfaction',
      value: '4.9/5',
      subtitle: 'Average Rating',
      description: 'Outstanding client satisfaction across all our logistics services'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary via-primary/95 to-primary/80 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
          {achievements.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>

        {/* Performance Metrics */}
        <div className="space-y-6 mb-12">
          {performanceMetrics.map((metric, index) => (
            <PerformanceMetric key={index} {...metric} />
          ))}
        </div>

        {/* Additional Credentials */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-6 text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-white">11+ Years</div>
                <div className="text-sm text-white/80">Industry Experience</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-6 text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-white">ISO 27001</div>
                <div className="text-sm text-white/80">Security Certification</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-6 text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-white">8+ Awards</div>
                <div className="text-sm text-white/80">Industry Recognition</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-6 text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-white">5-Star</div>
                <div className="text-sm text-white/80">Service Rating</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
