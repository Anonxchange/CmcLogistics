import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Truck, Menu, X, Search, User, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Track Shipment', href: '/track' },
    { name: 'Car Purchase', href: '/car-purchase' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const servicesDropdown = [
    { name: 'Air Freight', href: '/services#air-freight' },
    { name: 'Sea/Ocean Freight', href: '/services#ocean-freight' },
    { name: 'Road Transportation', href: '/services#road-transport' },
    { name: 'Warehousing', href: '/services#warehousing' },
    { name: 'Packaging & Storage', href: '/services#packaging' },
    { name: 'Diplomatic Bag & Secure Logistics', href: '/services#diplomatic' },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-md">
              <Truck className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">CMC Logistics</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <a
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
              data-testid="link-nav-home"
            >
              Home
            </a>
            <a
              href="/track"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
              data-testid="link-nav-track-shipment"
            >
              Track Shipment
            </a>
            
            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors duration-200 font-medium focus:outline-none focus:text-primary"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isServicesOpen && (
                <div className="absolute left-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 border border-border rounded-md shadow-lg z-50">
                  <div className="py-1">
                    {servicesDropdown.map((service) => (
                      <a
                        key={service.name}
                        href={service.href}
                        className="block px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-primary transition-colors"
                        onClick={() => setIsServicesOpen(false)}
                        data-testid={`dropdown-${service.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      >
                        {service.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <a
              href="/car-purchase"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
              data-testid="link-nav-car-purchase"
            >
              Car Purchase
            </a>
            <a
              href="/about"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
              data-testid="link-nav-about"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
              data-testid="link-nav-contact"
            >
              Contact
            </a>
          </nav>

          {/* Search and CTA Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search or Tracking Numbers"
                className="pl-10 w-64 h-9"
                data-testid="search-input"
              />
            </div>
            
            {/* Profile Icon */}
            <a href="/login">
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
                data-testid="button-profile"
              >
                <User className="w-5 h-5" />
              </Button>
            </a>
            
            {/* CTA Button */}
            <a href="/quote">
              <Button 
                className="bg-primary hover:bg-primary/90"
                data-testid="button-get-quote"
              >
                Get Quote
              </Button>
            </a>
          </div>

          {/* Mobile Profile and Menu */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Profile Icon */}
            <a href="/login">
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
                data-testid="button-mobile-profile"
              >
                <User className="w-5 h-5" />
              </Button>
            </a>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-3 border-t border-border">
              {/* Mobile Search */}
              <div className="px-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search or Tracking Numbers"
                    className="pl-10 w-full"
                    data-testid="mobile-search-input"
                  />
                </div>
              </div>
              
              <a
                href="/"
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
                data-testid="link-mobile-home"
              >
                Home
              </a>
              <a
                href="/track"
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
                data-testid="link-mobile-track-shipment"
              >
                Track Shipment
              </a>
              
              {/* Mobile Services Dropdown */}
              <div className="px-3 py-2">
                <button
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className="flex items-center justify-between w-full font-medium text-muted-foreground mb-2"
                >
                  <span>Services</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMobileServicesOpen && (
                  <div className="pl-4 space-y-2 mt-2">
                    {servicesDropdown.map((service) => (
                      <a
                        key={service.name}
                        href={service.href}
                        className="block py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsMobileServicesOpen(false);
                        }}
                        data-testid={`link-mobile-service-${service.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      >
                        {service.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              
              <a
                href="/car-purchase"
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
                data-testid="link-mobile-car-purchase"
              >
                Car Purchase
              </a>
              <a
                href="/about"
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
                data-testid="link-mobile-about"
              >
                About
              </a>
              <a
                href="/contact"
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
                data-testid="link-mobile-contact"
              >
                Contact
              </a>
              
              <div className="px-3 pt-2">
                <a href="/quote" className="block">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    data-testid="button-mobile-quote"
                  >
                    Get Quote
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}