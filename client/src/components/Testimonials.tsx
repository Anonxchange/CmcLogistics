import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  // TODO: Remove mock data when implementing real testimonials
  const testimonials = [
    {
      quote: "Given my past experiences with other logistics companies, I can say without exception that the services provided by CMC Logistics greatly exceed industry standards.",
      name: "Monique Pete",
      role: "Logistics Manager",
      company: "Martrax Inc.",
      initials: "MP",
      rating: 5
    },
    {
      quote: "More than once, CMC Logistics has 'saved the day', delivering our cargo on time with short notice. They have won my gratitude and loyalty with their 'can do' approach.",
      name: "Steve Anderson",
      role: "President/Owner",
      company: "Duplication Factory",
      initials: "SA",
      rating: 5
    },
    {
      quote: "I am very pleased with the service provided by CMC Logistics. They find good carriers and use them regularly so we get a high level of service. Their communication is outstanding.",
      name: "Cathy Beckman",
      role: "Logistics Team",
      company: "Oxea Chemicals",
      initials: "CB",
      rating: 5
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Hear from our satisfied customers about their experience with our logistics solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full hover-elevate transition-all duration-300">
              <CardContent className="p-8 space-y-6">
                {/* Quote Icon */}
                <div className="flex justify-between items-start">
                  <Quote className="w-8 h-8 text-primary/20" />
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-muted-foreground leading-relaxed italic">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground" data-testid={`testimonial-name-${index}`}>
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}