import { Button } from '@/components/ui/button';
import { Truck, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const trustedPartners = [
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'FedEx', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/FedEx_Express.svg' },
    { name: 'DHL', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/DHL_Logo.svg' },
    { name: 'UPS', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/UPS_logo_2014.svg/320px-UPS_logo_2014.svg.png' },
    { name: 'Walmart', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg' },
    { name: 'Costco', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Costco_Wholesale_logo_2010-10-26.svg' }
  ];
  const footerSections = [
    {
      title: 'Services',
      links: [
        { name: 'All Services', href: '/services' },
        { name: 'Air Freight', href: '/services#air-freight' },
        { name: 'Sea Freight', href: '/services#sea-freight' },
        { name: 'Road Transportation', href: '/services#road-transportation' },
        { name: 'Warehousing', href: '/services#warehousing' },
        { name: 'Packaging & Storage', href: '/services#packaging-storage' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Team', href: '/team' },
        { name: 'Careers', href: '/careers' },
        { name: 'News & Updates', href: '/news-updates' },
        { name: 'Partners', href: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Track Shipment', href: '#track' },
        { name: 'Get Quote', href: '/quote' },
        { name: 'Car Purchase', href: '/car-purchase' },
        { name: 'Cookie Policy', href: '/cookie-policy' },
        { name: 'Terms of Service', href: '/terms-conditions' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' },
    { icon: Instagram, href: '#', name: 'Instagram' }
  ];

  return (
    <>
      {/* Trusted Partners Section */}
      <section className="py-12 bg-muted/30 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Trusted by Industry Leaders</h2>
            <p className="text-muted-foreground">Join thousands of companies that rely on CMC Logistics for their logistics needs</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {trustedPartners.map((partner) => (
              <div key={partner.name} className="flex items-center justify-center h-16 w-32 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="max-h-12 max-w-full object-contain"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Serving 16,000+ satisfied customers worldwide across 160+ countries
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground">
        {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-md">
                <Truck className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">CMC Logistics</span>
            </div>

            <p className="text-blue-100 leading-relaxed max-w-md">
              Leading global logistics service provider offering comprehensive shipping solutions 
              with unmatched reliability and professional service standards.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-blue-100">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">support@cmcautoslogistics.com</span>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">Global Headquarters, New York</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white"
                    data-testid={`link-social-${social.name.toLowerCase()}`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-blue-100 hover:text-white transition-colors duration-200 text-sm"
                      data-testid={`link-footer-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-sm text-blue-100">
              © 2024 CMC Logistics. All rights reserved. | 
              <a href="/privacy-policy" className="hover:text-white mx-1">Privacy Policy</a> | 
              <a href="/terms-conditions" className="hover:text-white mx-1">Terms of Service</a>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center gap-4 text-sm text-blue-100">
                <span>Certifications:</span>
                <span className="px-2 py-1 bg-white/10 rounded text-xs">ISO 27001</span>
                <span className="px-2 py-1 bg-white/10 rounded text-xs">IATA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </footer>
    </>
  );
}