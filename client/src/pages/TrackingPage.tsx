import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Package, MapPin, Clock, CheckCircle, Truck, Calendar, Mail, Phone, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format, parseISO, isValid } from 'date-fns';
import { supabase } from '@/lib/supabase';

// Add print styles
const printStyles = `
  @media print {
    .print\:hidden { display: none !important; }
    .bg-primary { background-color: #000 !important; }
    .text-primary-foreground { color: #fff !important; }
    body { background: white !important; }
    .shadow-lg, .shadow-md { box-shadow: none !important; }
    .border { border: 1px solid #000 !important; }
    .bg-gradient-to-br { background: white !important; }
    .bg-muted { background: #f8f9fa !important; }
    * { 
      -webkit-print-color-adjust: exact !important; 
      color-adjust: exact !important; 
    }
    @page { 
      margin: 1in; 
      size: A4; 
    }
    .card { 
      page-break-inside: avoid; 
      margin-bottom: 1rem; 
    }
  }
`;

// Function to safely format dates, handling invalid or null values.
const formatSafeDate = (dateValue: any, formatString: string = 'yyyy-MM-dd') => {
  if (!dateValue || dateValue === 'undefined' || dateValue === 'null') return 'N/A';

  try {
    const date = typeof dateValue === 'string' ? parseISO(dateValue) : new Date(dateValue);
    if (!isValid(date)) return 'N/A';
    return format(date, formatString);
  } catch (error) {
    console.warn('Date formatting error:', error, 'for value:', dateValue);
    return 'N/A';
  }
};

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const { toast } = useToast();

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;

    setIsLoading(true);
    setError('');
    setTrackingData(null);

    try {
      // Query Supabase directly for shipment data
      const { data: shipment, error: shipmentError } = await supabase
        .from('shipments')
        .select('*')
        .eq('tracking_number', trackingNumber.trim())
        .single();

      if (shipmentError || !shipment) {
        setError('Tracking number not found');
        toast({
          title: "Tracking failed",
          description: "Tracking number not found. Please check your tracking number and try again.",
          variant: "destructive",
        });
        return;
      }

      // Get tracking updates for this shipment
      const { data: updates, error: updatesError } = await supabase
        .from('tracking_updates')
        .select('*')
        .eq('shipment_id', shipment.id)
        .order('timestamp', { ascending: false });

      // Format the data to match the expected structure
      const trackingData = {
        shipment: {
          trackingNumber: shipment.tracking_number,
          senderName: shipment.sender_name,
          senderAddress: shipment.sender_address,
          senderPhone: shipment.sender_phone,
          recipientName: shipment.recipient_name,
          recipientAddress: shipment.recipient_address,
          recipientPhone: shipment.recipient_phone,
          serviceType: shipment.service_type,
          packageWeight: shipment.weight,
          status: shipment.status,
          estimatedDelivery: shipment.estimated_delivery,
          currentLocation: updates && updates.length > 0 ? updates[0].location : null
        },
        trackingUpdates: updates || []
      };

      setTrackingData(trackingData);
      toast({
        title: "Tracking information found",
        description: `Shipment ${trackingNumber} details loaded successfully`,
      });
    } catch (error) {
      console.error('Tracking error:', error);
      setError('Network error. Please try again.');
      toast({
        title: "Network error",
        description: "Please check your connection and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'picked_up': return 'bg-orange-500';
      case 'in_transit': return 'bg-blue-500';
      case 'held_by_customs': return 'bg-amber-600';
      case 'out_for_delivery': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      case 'delayed': return 'bg-red-500';
      case 'failed_delivery': return 'bg-red-600';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'picked_up': return Package;
      case 'in_transit': return Truck;
      case 'held_by_customs': return AlertCircle;
      case 'out_for_delivery': return MapPin;
      case 'delivered': return CheckCircle;
      case 'delayed': return Clock;
      case 'failed_delivery': return Package;
      default: return Package;
    }
  };

  const faqItems = [
    {
      question: "What information do I need to track my package?",
      answer: "You only need your tracking number, which is typically 10-15 characters. Updates are available 24/7 and reflect real-time status."
    },
    {
      question: "How often is my tracking information updated?",
      answer: "Tracking information is updated in real-time as your package moves through our network. You'll see updates whenever there's a significant change in your shipment's status or location."
    },
    {
      question: "What should I do if my tracking isn't working?",
      answer: "Please verify your tracking number is correct and try again. If the issue persists, contact our customer support team for assistance."
    },
    {
      question: "Can I track multiple packages at once?",
      answer: "Currently, you can track one package at a time. For multiple shipments, please enter each tracking number separately."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <style>{printStyles}</style>
      <Header />

      {/* Navy Hero Section */}
      <div className="bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        {/* Animated Background Blobs */}
        <div className="pointer-events-none absolute -top-16 -right-24 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl motion-safe:animate-pulse"></div>
        <div className="pointer-events-none absolute -bottom-16 -left-24 h-48 w-48 rounded-full bg-purple-400/20 blur-3xl motion-safe:animate-pulse delay-1000"></div>
        <div className="pointer-events-none absolute top-1/2 left-1/4 h-32 w-32 rounded-full bg-cyan-400/20 blur-2xl motion-safe:animate-bounce delay-500"></div>
        {/* --- Airplane Effect --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`absolute airplane w-12 h-8 bg-white/50 rounded-full blur-sm ${
                i % 2 === 0 ? 'animate-fly-left' : 'animate-fly-right'
              }`}
              style={{
                top: `${Math.random() * 70}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `-${Math.random() * 20}s`,
              }}
            ></div>
          ))}
        </div>
        <style jsx>{`
          @keyframes fly-left {
            0% { transform: translateX(-200%) rotate(-45deg); opacity: 0; }
            10% { transform: translateX(0%) rotate(-45deg); opacity: 1; }
            90% { transform: translateX(0%) rotate(-45deg); opacity: 1; }
            100% { transform: translateX(200%) rotate(-45deg); opacity: 0; }
          }
          @keyframes fly-right {
            0% { transform: translateX(200%) rotate(45deg); opacity: 0; }
            10% { transform: translateX(0%) rotate(45deg); opacity: 1; }
            90% { transform: translateX(0%) rotate(45deg); opacity: 1; }
            100% { transform: translateX(-200%) rotate(45deg); opacity: 0; }
          }
          .airplane {
            animation-timing-function: linear;
          }
          .animate-fly-left {
            animation-name: fly-left;
            animation-iteration-count: infinite;
          }
          .animate-fly-right {
            animation-name: fly-right;
            animation-iteration-count: infinite;
          }
        `}</style>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Track & Trace Your Shipment
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Real-time tracking for your packages, delivered with precision and care
            </p>

            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-primary-foreground/60">
              <span>Home</span>
              <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
              <span>Track & Trace Shipment</span>
            </div>
          </div>
        </div>

        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" fill="none" className="w-full h-12">
            <path d="M0,0 C150,100 350,100 600,50 C850,0 1050,0 1200,50 L1200,120 L0,120 Z" fill="currentColor" className="text-background"/>
          </svg>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 lg:grid lg:grid-cols-12 lg:gap-8 lg:max-w-7xl xl:max-w-[1200px]">
        {/* Track Your Shipment Section - Left Column */}
        <div className="lg:col-span-5">
        <Card className="mb-8 lg:sticky lg:top-24">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold mb-2">
              Track Your Shipment
            </CardTitle>
            <CardDescription className="text-base leading-relaxed max-w-2xl mx-auto">
              Here's the fastest way to check the status of your shipment. No need to call Customer Service - our online results give you real-time, detailed progress as your shipment speeds through the Smartship network.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleTrackSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Tracking Number
                </label>
                <div className="sm:flex sm:items-center gap-3">
                  <div className="relative sm:flex-1">
                    <Input
                      type="text"
                      placeholder="Enter your tracking number"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      className="h-12 text-base pl-4 pr-12 border-2 border-border focus:border-primary transition-all duration-300 hover:shadow-md focus:shadow-lg"
                      data-testid="input-tracking-search"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-8 h-6 bg-muted border border-border rounded flex items-center justify-center">
                        <div className="grid grid-cols-3 gap-0.5">
                          {[...Array(9)].map((_, i) => (
                            <div key={i} className="w-0.5 h-0.5 bg-foreground/40 rounded-full"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isLoading || !trackingNumber.trim()}
                    className="w-full sm:w-auto h-12 px-6 text-base bg-primary hover:bg-primary/90 font-semibold transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 mt-3 sm:mt-0"
                    data-testid="button-track-search"
                  >
                    {isLoading ? (
                      <>
                        <Search className="w-4 h-4 mr-2 animate-spin" />
                        Tracking...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Track Shipment
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>

            {/* Tracking Tips */}
            <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-primary">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-xs">®</span>
                </div>
                Tracking Tips
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Your tracking number can be found on your shipping confirmation email</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Tracking numbers typically contain a barcode - look for the package code on the left side of your shipping label</span>
                </li>
              </ul>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Status Overview Card - stays on left */}
        {trackingData && (
          <Card className="border-l-4 border-l-primary transition-all duration-300 hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary/70 text-primary-foreground px-3 py-1 shadow-sm animate-pulse`}>
                        <div className={`w-2 h-2 rounded-full bg-white`}></div>
                        <span className="text-sm font-medium">
                          {trackingData.shipment.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mt-2">
                      Package Status
                    </h2>
                    <p className="text-muted-foreground">
                      Tracking #: <span className="font-mono font-semibold text-foreground">{trackingData.shipment.trackingNumber}</span>
                    </p>
                    {trackingData.shipment.currentLocation && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="font-medium">Last seen at: {trackingData.shipment.currentLocation}</span>
                      </div>
                    )}
                  </div>
                  {trackingData.shipment.estimatedDelivery && (
                    <div className="text-center md:text-right">
                      <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                      <p className="text-lg font-semibold text-foreground">
                        {formatSafeDate(trackingData.shipment.estimatedDelivery, 'EEE, MMM dd')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatSafeDate(trackingData.shipment.estimatedDelivery, 'yyyy')}
                      </p>
                    </div>
                  )}
                </div>

                {/* Visual Progress Indicator */}
                <div className="bg-muted/30 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Shipment Progress
                  </h3>

                  {/* Progress Steps */}
                  <div className="relative">
                    {/* Progress Line */}
                    <div className="absolute top-6 left-6 right-6 h-0.5 bg-border"></div>
                    <div 
                      className="absolute top-6 left-6 h-0.5 bg-gradient-to-r from-primary via-blue-500 to-green-500 transition-all duration-1000 ease-in-out"
                      style={{
                        width: `${(() => {
                          const status = trackingData.shipment.status;
                          if (status === 'pending') return '16.66%';
                          if (status === 'picked_up') return '33.33%';
                          if (status === 'in_transit') return '50%';
                          if (status === 'held_by_customs') return '66.66%';
                          if (status === 'out_for_delivery') return '83.33%';
                          if (status === 'delivered') return '100%';
                          return '0%';
                        })()}`
                      }}
                    ></div>
                    {/* Progress shimmer effect */}
                    <div 
                      className="absolute top-6 left-6 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-1000 ease-in-out animate-pulse"
                      style={{
                        width: `${(() => {
                          const status = trackingData.shipment.status;
                          if (status === 'pending') return '16.66%';
                          if (status === 'picked_up') return '33.33%';
                          if (status === 'in_transit') return '50%';
                          if (status === 'held_by_customs') return '66.66%';
                          if (status === 'out_for_delivery') return '83.33%';
                          if (status === 'delivered') return '100%';
                          return '0%';
                        })()}`
                      }}
                    ></div>

                    {/* Progress Steps */}
                    <div className="relative flex flex-wrap justify-between gap-2 sm:gap-0">
                      {[
                        { status: 'pending', label: 'Order\nReceived', icon: Clock },
                        { status: 'picked_up', label: 'Package\nPicked Up', icon: Package },
                        { status: 'in_transit', label: 'In\nTransit', icon: Truck },
                        { status: 'held_by_customs', label: 'Customs\nProcessing', icon: AlertCircle },
                        { status: 'out_for_delivery', label: 'Out for\nDelivery', icon: MapPin },
                        { status: 'delivered', label: 'Delivered', icon: CheckCircle }
                      ].map((step, index) => {
                        const StepIcon = step.icon;
                        const currentStatus = trackingData.shipment.status;
                        const isActive = currentStatus === step.status;
                        const isCompleted = (() => {
                          const statuses = ['pending', 'picked_up', 'in_transit', 'held_by_customs', 'out_for_delivery', 'delivered'];
                          const currentIndex = statuses.indexOf(currentStatus);
                          const stepIndex = statuses.indexOf(step.status);
                          return currentIndex > stepIndex;
                        })();
                        const isPending = (() => {
                          const statuses = ['pending', 'picked_up', 'in_transit', 'held_by_customs', 'out_for_delivery', 'delivered'];
                          const currentIndex = statuses.indexOf(currentStatus);
                          const stepIndex = statuses.indexOf(step.status);
                          return currentIndex < stepIndex;
                        })();

                        return (
                          <div key={step.status} className={`flex flex-col items-center space-y-2 ${
                            step.status === 'held_by_customs' && isActive ? 'scale-105' : ''
                          }`}>
                            {/* Step Circle */}
                            <div className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                              isCompleted 
                                ? 'bg-green-500 border-green-500 text-white' 
                                : isActive 
                                  ? step.status === 'held_by_customs'
                                    ? 'bg-amber-600 border-amber-600 text-white ring-4 ring-amber-600/20 shadow-lg'
                                    : 'bg-primary border-primary text-primary-foreground ring-4 ring-primary/20'
                                  : isPending
                                    ? 'bg-muted border-border text-muted-foreground'
                                    : 'bg-muted border-border text-muted-foreground'
                            }`}>
                              <StepIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                              {isCompleted && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-600 rounded-full flex items-center justify-center">
                                  <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                                </div>
                              )}
                              {step.status === 'held_by_customs' && isActive && (
                                <div className="absolute -top-2 -right-2 w-2 h-2 bg-amber-400 rounded-full animate-ping"></div>
                              )}
                            </div>

                            {/* Step Label */}
                            <div className="text-center">
                              <p className={`text-xs font-medium whitespace-pre-line ${
                                isActive 
                                  ? step.status === 'held_by_customs' 
                                    ? 'text-amber-600 font-semibold' 
                                    : 'text-primary' 
                                  : isCompleted 
                                    ? 'text-green-600' 
                                    : 'text-muted-foreground'
                              }`}>
                                {step.label}
                              </p>
                              {step.status === 'held_by_customs' && isActive && (
                                <p className="text-xs text-amber-600 font-medium mt-1">Clearance</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
        )}
        </div>

        {/* Right Column - Map and Updates */}
        <div className="lg:col-span-7">
        {trackingData && (
          <div className="space-y-8">
            {/* Shipment Route Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Shipment Route Map
                </CardTitle>
                <CardDescription>
                  Follow your package's complete journey from pickup to delivery
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="w-full">
                  {/* Map Container */}
                  <div className="relative w-full bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden">
                    <div className="relative bg-white shadow-inner w-full h-64 sm:h-80 md:h-96">
                      {/* Map Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <svg width="100%" height="100%" className="text-muted-foreground">
                          <defs>
                            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                      </div>

                      {/* Route Line - Responsive */}
                      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} viewBox="0 0 600 300" preserveAspectRatio="xMidYMid meet">
                        <defs>
                          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#22c55e" />
                            <stop offset="50%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 80 150 Q 200 100 300 120 Q 400 140 520 160"
                          stroke="url(#routeGradient)"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray="8,8"
                          className="animate-pulse"
                        >
                          <animate attributeName="stroke-dashoffset" values="0;16;0" dur="2s" repeatCount="indefinite"/>
                        </path>
                      </svg>

                      {/* Location Markers - Responsive positioning */}
                      <div className="absolute inset-0" style={{ zIndex: 2 }}>
                        {/* Origin Marker */}
                        <div className="absolute" style={{ left: '13%', top: '48%', transform: 'translate(-50%, -50%)' }}>
                          <div className="relative">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg ring-2 sm:ring-4 ring-green-100">
                              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>
                            </div>
                            <div className="absolute top-8 sm:top-10 left-1/2 transform -translate-x-1/2 bg-white rounded px-1 sm:px-2 py-1 text-xs font-medium shadow-md border whitespace-nowrap max-w-24 sm:max-w-none">
                              <div className="font-semibold text-green-700 text-xs">Origin</div>
                              <div className="text-muted-foreground text-xs truncate">
                                {trackingData.shipment.senderAddress?.split(',')[0] || 'Origin Location'}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Current Location Marker (if available) */}
                        {trackingData.shipment.currentLocation && trackingData.shipment.status !== 'delivered' && (
                          <div className="absolute" style={{ left: '50%', top: '38%', transform: 'translate(-50%, -50%)' }}>
                            <div className="relative">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg ring-2 sm:ring-4 ring-blue-100 animate-pulse">
                                <Truck className="w-3 h-3 sm:w-4 sm:h-4" />
                              </div>
                              <div className="absolute top-8 sm:top-10 left-1/2 transform -translate-x-1/2 bg-white rounded px-1 sm:px-2 py-1 text-xs font-medium shadow-md border whitespace-nowrap max-w-24 sm:max-w-none">
                                <div className="font-semibold text-blue-700 text-xs">Current</div>
                                <div className="text-muted-foreground text-xs truncate">{trackingData.shipment.currentLocation}</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Destination Marker */}
                        <div className="absolute" style={{ left: '87%', top: '52%', transform: 'translate(-50%, -50%)' }}>
                          <div className="relative">
                            <div className={`w-6 h-6 sm:w-8 sm:h-8 ${trackingData.shipment.status === 'delivered' ? 'bg-green-500' : 'bg-purple-500'} rounded-full flex items-center justify-center text-white shadow-lg ring-2 sm:ring-4 ${trackingData.shipment.status === 'delivered' ? 'ring-green-100' : 'ring-purple-100'}`}>
                              {trackingData.shipment.status === 'delivered' ? (
                                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                              ) : (
                                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                              )}
                            </div>
                            <div className="absolute top-8 sm:top-10 left-1/2 transform -translate-x-1/2 bg-white rounded px-1 sm:px-2 py-1 text-xs font-medium shadow-md border whitespace-nowrap max-w-24 sm:max-w-none">
                              <div className={`font-semibold text-xs ${trackingData.shipment.status === 'delivered' ? 'text-green-700' : 'text-purple-700'}`}>
                                {trackingData.shipment.status === 'delivered' ? 'Delivered' : 'Destination'}
                              </div>
                              <div className="text-muted-foreground text-xs truncate">
                                {trackingData.shipment.recipientAddress?.split(',')[0] || 'Destination'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Route Summary */}
                    <div className="p-4 sm:p-6">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                        <div className="space-y-1">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium text-green-700">Origin</span>
                          </div>
                          <p className="text-xs text-muted-foreground break-words">
                            {trackingData.shipment.senderAddress?.split(',').slice(1).join(',').trim() || 'Sender Address'}
                          </p>
                        </div>

                        {trackingData.shipment.currentLocation && trackingData.shipment.status !== 'delivered' && (
                          <div className="space-y-1">
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                              <span className="text-sm font-medium text-blue-700">Current</span>
                            </div>
                            <p className="text-xs text-muted-foreground">In Transit</p>
                          </div>
                        )}

                        <div className={`space-y-1 ${trackingData.shipment.currentLocation && trackingData.shipment.status !== 'delivered' ? 'col-span-2 md:col-span-1' : ''}`}>
                          <div className="flex items-center justify-center gap-2">
                            <div className={`w-3 h-3 ${trackingData.shipment.status === 'delivered' ? 'bg-green-500' : 'bg-purple-500'} rounded-full`}></div>
                            <span className={`text-sm font-medium ${trackingData.shipment.status === 'delivered' ? 'text-green-700' : 'text-purple-700'}`}>
                              {trackingData.shipment.status === 'delivered' ? 'Delivered' : 'Destination'}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground break-words">
                            {trackingData.shipment.recipientAddress?.split(',').slice(1).join(',').trim() || 'Recipient Address'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tracking Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Complete Tracking Timeline
                </CardTitle>
                <CardDescription>
                  Follow your package's complete journey with detailed status updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Complete Process Timeline */}
                <div className="relative mb-8">
                  {/* Background Timeline line */}
                  <div className="absolute left-6 top-6 bottom-0 w-1 bg-border rounded-full"></div>

                  {/* Colored Progress line */}
                  <div 
                    className="absolute left-6 top-6 w-1 bg-gradient-to-b from-green-500 via-blue-500 to-primary rounded-full transition-all duration-1000 ease-in-out"
                    style={{
                      height: `${(() => {
                        const completeProcess = [
                          { status: 'pending' },
                          { status: 'picked_up' },
                          { status: 'in_transit' },
                          { status: 'held_by_customs' },
                          { status: 'out_for_delivery' },
                          { status: 'delivered' }
                        ];
                        const currentStatusIndex = completeProcess.findIndex(step => step.status === trackingData.shipment.status);
                        const progressPercentage = currentStatusIndex >= 0 ? ((currentStatusIndex + 1) / completeProcess.length) * 100 : 0;
                        return `${progressPercentage}%`;
                      })()}`
                    }}
                  ></div>

                  <div className="space-y-6">
                    {/* Generate complete process steps */}
                    {(() => {
                      const completeProcess = [
                        { status: 'pending', title: 'Order Created', description: 'Your shipping order has been created and is being processed', defaultTime: '2024-01-15 09:00 AM' },
                        { status: 'picked_up', title: 'Package Picked Up', description: 'Your package has been collected from the sender', defaultTime: '2024-01-15 02:30 PM' },
                        { status: 'in_transit', title: 'In Transit', description: 'Package is on its way to the destination', defaultTime: '2024-01-16 10:15 AM' },
                        { status: 'held_by_customs', title: 'Held by Customs', description: 'Package is being processed by customs officials for inspection', defaultTime: '2024-01-16 06:30 PM' },
                        { status: 'out_for_delivery', title: 'Out for Delivery', description: 'Package is out for delivery to the final destination', defaultTime: '2024-01-17 08:45 AM' },
                        { status: 'delivered', title: 'Delivered', description: 'Package has been successfully delivered', defaultTime: '2024-01-17 03:20 PM' }
                      ];

                      const currentStatusIndex = completeProcess.findIndex(step => step.status === trackingData.shipment.status);

                      return completeProcess.map((step, index) => {
                        const StatusIcon = getStatusIcon(step.status);
                        const isCompleted = index <= currentStatusIndex;
                        const isActive = index === currentStatusIndex;
                        const isPending = index > currentStatusIndex;

                        // Find actual update for this status
                        const actualUpdate = trackingData.trackingUpdates.find((update: any) => update.status === step.status);

                        return (
                          <div 
                            key={step.status} 
                            className={`relative flex items-start gap-6 ${isActive ? 'pb-4' : ''}`}
                          >
                            {/* Status Icon - Clean design without check marks */}
                            <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                              isCompleted 
                                ? 'bg-white border-primary shadow-lg' 
                                : isPending 
                                  ? 'bg-muted border-border' 
                                  : 'bg-white border-primary shadow-lg'
                            } ${isActive ? 'ring-4 ring-primary/20 scale-110' : ''}`}>
                              <StatusIcon className={`w-6 h-6 ${isCompleted ? 'text-primary' : isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                            </div>

                            {/* Content */}
                            <div className={`flex-1 min-w-0 ${isActive ? 'bg-primary/5 rounded-lg p-4' : 'pt-2'}`}>
                              <div className="flex items-start justify-between gap-4 mb-2">
                                <div>
                                  <h3 className={`font-semibold flex items-center gap-2 ${
                                    isActive ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                                  }`}>
                                    {step.title}
                                    {isActive && <Badge variant="default" className="text-xs">CURRENT</Badge>}
                                    {isCompleted && index < currentStatusIndex && <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">COMPLETED</Badge>}
                                    {isPending && <Badge variant="outline" className="text-xs">PENDING</Badge>}
                                  </h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    <span className={`font-medium ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                                      {actualUpdate ? actualUpdate.location : 'Processing Location'}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-right text-sm text-muted-foreground">
                                  <div className="font-medium">
                                    {actualUpdate 
                                      ? formatSafeDate(actualUpdate.timestamp, 'MMM dd, yyyy')
                                      : isPending ? 'Pending' : formatSafeDate(step.defaultTime, 'MMM dd, yyyy')
                                    }
                                  </div>
                                  <div>
                                    {actualUpdate && actualUpdate.timestamp
                                      ? (() => {
                                          try {
                                            const date = new Date(actualUpdate.timestamp);
                                            return isValid(date) ? format(date, 'h:mm a') : '--:--';
                                          } catch {
                                            return '--:--';
                                          }
                                        })()
                                      : isPending ? '--:--' : (() => {
                                          try {
                                            const date = new Date(step.defaultTime);
                                            return isValid(date) ? format(date, 'h:mm a') : '--:--';
                                          } catch {
                                            return '--:--';
                                          }
                                        })()
                                    }
                                  </div>
                                </div>
                              </div>
                              <p className={`text-sm leading-relaxed ${isCompleted ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>
                                {actualUpdate ? actualUpdate.description || step.description : step.description}
                              </p>

                              {/* Progress indicator */}
                              <div className="mt-3 flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-green-500' : isPending ? 'bg-gray-300' : 'bg-primary'}`}></div>
                                <span className={`text-xs font-medium ${
                                  isActive ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-muted-foreground'
                                }`}>
                                  {isCompleted && index < currentStatusIndex ? 'Completed' : isActive ? 'In Progress' : 'Awaiting'}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>

                {/* Additional Updates */}
                {trackingData.trackingUpdates.length > 0 && (
                  <div className="border-t pt-6">
                    <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      Additional Updates
                    </h4>
                    <div className="space-y-4">
                      {trackingData.trackingUpdates
                        .filter((update: any) => !['pending', 'picked_up', 'in_transit', 'held_by_customs', 'out_for_delivery', 'delivered'].includes(update.status))
                        .map((update: any, index: number) => {
                          const StatusIcon = getStatusIcon(update.status);
                          return (
                            <div key={update.id} className="flex items-start gap-4 p-3 bg-muted/30 rounded-lg">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(update.status)}`}>
                                <StatusIcon className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <h5 className="font-medium text-foreground">
                                      {update.status.replace('_', ' ').toUpperCase()}
                                    </h5>
                                    <div className="flex items-center gap-2 mt-1">
                                      <MapPin className="w-3 h-3 text-primary" />
                                      <span className="text-sm text-foreground">{update.location}</span>
                                    </div>
                                  </div>
                                  <div className="text-right text-xs text-muted-foreground">
                                    <div>{formatSafeDate(update.timestamp, 'MMM dd, yyyy')}</div>
                                    <div>
                                      {(() => {
                                        try {
                                          const date = new Date(update.timestamp);
                                          return isValid(date) ? format(date, 'h:mm a') : '--:--';
                                        } catch {
                                          return '--:--';
                                        }
                                      })()}
                                    </div>
                                  </div>
                                </div>
                                {update.description && (
                                  <p className="text-sm text-muted-foreground mt-2">{update.description}</p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Parcel Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-primary" />
                      Parcel Information
                    </CardTitle>
                    <CardDescription>
                      Detailed information about your shipment package
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => {
                      // Add a small delay to ensure DOM is ready
                      setTimeout(() => {
                        try {
                          if (window.print) {
                            window.print();
                          } else {
                            throw new Error('Print not supported');
                          }
                        } catch (error) {
                          console.error('Print failed:', error);
                          toast({
                            title: "Print failed",
                            description: "Print function not available. Please use Ctrl+P or Cmd+P to print.",
                            variant: "destructive",
                          });

                          // Fallback: Try to open print dialog manually
                          try {
                            document.execCommand('print');
                          } catch (fallbackError) {
                            console.error('Fallback print also failed:', fallbackError);
                          }
                        }
                      }, 100);
                    }} 
                    variant="outline" 
                    size="sm"
                    className="print:hidden"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a1 1 0 001-1v-4a1 1 0 00-1-1H9a1 1 0 00-1 1v4a1 1 0 001 1zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Package Details */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground border-b pb-2">Package Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Tracking Number:</span>
                        <span className="font-mono font-medium">{trackingData.shipment.trackingNumber}</span>
                      </div>
                      {trackingData.shipment.packageWeight && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Weight:</span>
                          <span className="font-medium">{trackingData.shipment.packageWeight} kg</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Service Type:</span>
                        <Badge variant="outline">{trackingData.shipment.serviceType} Freight</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Current Status:</span>
                        <Badge className={`${getStatusColor(trackingData.shipment.status)} text-white`}>
                          {trackingData.shipment.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground border-b pb-2">Shipping Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-muted-foreground block">From:</span>
                        <div className="font-medium">{trackingData.shipment.senderName}</div>
                        <div className="text-sm text-muted-foreground">{trackingData.shipment.senderAddress || 'Sender Address'}</div>
                        {trackingData.shipment.senderPhone && (
                          <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <Phone className="w-3 h-3" />
                            {trackingData.shipment.senderPhone}
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground block">To:</span>
                        <div className="font-medium">{trackingData.shipment.recipientName}</div>
                        <div className="text-sm text-muted-foreground">{trackingData.shipment.recipientAddress || 'Recipient Address'}</div>
                        {trackingData.shipment.recipientPhone && (
                          <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <Phone className="w-3 h-3" />
                            {trackingData.shipment.recipientPhone}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold text-foreground mb-4">Delivery Information</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {trackingData.shipment.estimatedDelivery && (
                      <div className="text-center p-4 bg-primary/5 rounded-lg border">
                        <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                        <div className="text-sm text-muted-foreground">Estimated Delivery</div>
                        <div className="font-semibold text-primary">
                          {formatSafeDate(trackingData.shipment.estimatedDelivery, 'EEE, MMM dd, yyyy')}
                        </div>
                      </div>
                    )}

                    {trackingData.shipment.currentLocation && (
                      <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-sm text-muted-foreground">Current Location</div>
                        <div className="font-semibold text-blue-600">{trackingData.shipment.currentLocation}</div>
                      </div>
                    )}

                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <Truck className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <div className="text-sm text-muted-foreground">Delivery Method</div>
                      <div className="font-semibold text-green-600">Ground Delivery</div>
                    </div>
                  </div>
                </div>

                {/* Special Instructions */}
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-1">Delivery Instructions</h4>
                      <p className="text-sm text-yellow-700">
                        Please ensure someone is available to receive the package during delivery hours (9 AM - 6 PM). 
                        If no one is available, the package will be held at the nearest pickup location.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tracking Features Section */}
        {!trackingData && !isLoading && (
          <div className="space-y-12">
            {/* Features Section */}
            <div className="text-center">
              <span className="text-sm font-semibold text-primary uppercase tracking-wide mb-2 block">
                TRACKING FEATURES
              </span>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Real-Time Tracking Benefits
              </h2>
              <p className="text-lg text-muted-foreground mb-12">
                Monitor your shipments with precision and confidence using our advanced tracking system
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Real-Time Updates */}
                <Card className="text-center p-6 shadow-lg">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Real-Time Updates</h3>
                  <p className="text-muted-foreground">
                    Stay informed with accurate, up-to-the-minute information about your shipment's location and status throughout its journey.
                  </p>
                </Card>

                {/* Estimated Delivery */}
                <Card className="text-center p-6 shadow-lg">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Estimated Delivery</h3>
                  <p className="text-muted-foreground">
                    Get precise delivery time estimates that help you plan and prepare for your shipment's arrival with confidence.
                  </p>
                </Card>

                {/* Shipment History */}
                <Card className="text-center p-6 shadow-lg">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Shipment History</h3>
                  <p className="text-muted-foreground">
                    Access a detailed timeline of your package's journey, including all transit points and handling activities along the route.
                  </p>
                </Card>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-sm font-semibold text-primary uppercase tracking-wide mb-2 block">
                  HELP CENTER
                </span>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-muted-foreground">
                  Find answers to common tracking and shipping questions
                </p>
              </div>

              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <Card key={index} className="border">
                    <CardContent className="p-0">
                      <button
                        className="w-full text-left p-6 flex items-center justify-between hover:bg-muted transition-colors"
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      >
                        <span className="font-semibold text-foreground">{item.question}</span>
                        {expandedFaq === index ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                      {expandedFaq === index && (
                        <div className="px-6 pb-6">
                          <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contact Help Section */}
            <div className="bg-primary text-primary-foreground rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Need Additional Help With Your Shipment?
              </h2>
              <p className="text-primary-foreground/80 mb-8 text-lg">
                Our customer service team is available to assist you with any questions or concerns about your shipment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-background text-foreground hover:bg-muted px-8 py-3"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Support
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-3"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us
                </Button>
              </div>
            </div>
          </div>
        )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Label({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}