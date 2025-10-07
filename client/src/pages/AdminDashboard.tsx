
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Package, 
  TrendingUp, 
  MapPin, 
  Users, 
  Plus, 
  LogOut,
  Truck,
  Clock,
  CheckCircle,
  AlertCircle,
  Menu,
  Car,
  Mail,
  LayoutDashboard
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import CreateShipmentModal from '@/components/CreateShipmentModal';
import EditShipmentModal from '@/components/EditShipmentModal';
import ShipmentsList from '@/components/ShipmentsList';
import TrackingUpdatesModal from '@/components/TrackingUpdatesModal';
import SendEmailModal from '@/components/SendEmailModal';
import GeneralEmailForm from '@/components/GeneralEmailForm';
import PrintInvoiceModal from '@/components/PrintInvoiceModal';

interface AdminDashboardProps {
  admin: any;
  onLogout: () => void;
}

export default function AdminDashboard({ admin, onLogout }: AdminDashboardProps) {
  const [stats, setStats] = useState<any>(null);
  const [shipments, setShipments] = useState<any[]>([]);
  const [carPurchases, setCarPurchases] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all shipments
      const { data: shipmentsData, error: shipmentsError } = await supabase
        .from('shipments')
        .select('*')
        .order('created_at', { ascending: false });

      if (shipmentsError) throw shipmentsError;

      // Fetch car purchases
      const { data: carPurchasesData, error: carPurchasesError } = await supabase
        .from('car_purchases')
        .select('*')
        .order('created_at', { ascending: false });

      if (carPurchasesError) console.error('Error fetching car purchases:', carPurchasesError);

      // Fetch quotes
      const { data: quotesData, error: quotesError } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });

      if (quotesError) console.error('Error fetching quotes:', quotesError);

      // Calculate stats from shipments data
      const totalShipments = shipmentsData?.length || 0;
      const deliveredShipments = shipmentsData?.filter(s => s.status === 'delivered').length || 0;
      const inTransitShipments = shipmentsData?.filter(s => s.status === 'in_transit').length || 0;
      const pendingShipments = shipmentsData?.filter(s => s.status === 'pending').length || 0;

      const statsData = {
        totalShipments,
        deliveredShipments,
        inTransitShipments,
        pendingShipments,
        totalCarPurchases: carPurchasesData?.length || 0,
        totalQuotes: quotesData?.length || 0
      };
        
      setStats(statsData);
      setShipments(shipmentsData || []);
      setCarPurchases(carPurchasesData || []);
      setQuotes(quotesData || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateShipment = () => {
    fetchDashboardData();
    setIsCreateModalOpen(false);
  };

  const handleUpdateTracking = (shipment: any) => {
    setSelectedShipment(shipment);
    setIsTrackingModalOpen(true);
  };

  const handleTrackingUpdate = () => {
    fetchDashboardData();
    setIsTrackingModalOpen(false);
    setSelectedShipment(null);
  };

  const handleSendEmail = async (shipment: any) => {
    setSelectedShipment(shipment);
    setIsEmailModalOpen(true);
  };

  const handleDeleteShipment = async (shipmentId: number) => {
    if (!confirm('Are you sure you want to delete this shipment? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('shipments')
        .delete()
        .eq('id', shipmentId);

      if (error) throw error;

      toast({
        title: "Shipment Deleted",
        description: "The shipment has been successfully deleted.",
      });

      fetchDashboardData();
    } catch (error) {
      console.error('Error deleting shipment:', error);
      toast({
        title: "Error",
        description: "Failed to delete shipment",
        variant: "destructive",
      });
    }
  };

  const handleEditShipment = (shipment: any) => {
    setSelectedShipment(shipment);
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    fetchDashboardData();
    setIsEditModalOpen(false);
    setSelectedShipment(null);
  };

  const handlePrintInvoice = (shipment: any) => {
    // Transform snake_case database fields to camelCase for the modal
    const transformedShipment = {
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
      cost: shipment.cost,
      clearance_cost: shipment.clearance_cost
    };
    setSelectedShipment(transformedShipment);
    setIsPrintModalOpen(true);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'shipments', label: 'Shipments', icon: Package },
    { id: 'car-quotes', label: 'Car Purchases', icon: Car },
    { id: 'shipping-quotes', label: 'Shipping Quotes', icon: TrendingUp },
    { id: 'emails', label: 'Emails', icon: Mail },
  ];

  const NavigationMenu = ({ mobile = false }: { mobile?: boolean }) => (
    <nav className={`${mobile ? 'flex flex-col space-y-2 py-4' : 'hidden lg:flex flex-col space-y-2'}`}>
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => {
              setActiveView(item.id);
              if (mobile) setIsMobileMenuOpen(false);
            }}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeView === item.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Truck className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-border sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md">
                      <Truck className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="text-lg font-bold">CMC Admin</span>
                  </div>
                  <NavigationMenu mobile />
                </SheetContent>
              </Sheet>

              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md">
                  <Truck className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-base sm:text-lg font-bold">CMC Logistics</span>
              </div>
              <div className="hidden md:block text-xs sm:text-sm text-muted-foreground">
                Welcome, {admin.username}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-primary hover:bg-primary/90"
                size="sm"
              >
                <Plus className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">New Shipment</span>
              </Button>
              <Button
                variant="ghost"
                onClick={onLogout}
                size="sm"
              >
                <LogOut className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar Navigation - Desktop */}
        <aside className="hidden lg:block w-64 border-r border-border bg-white dark:bg-gray-900 min-h-[calc(100vh-4rem)] sticky top-16">
          <div className="p-4">
            <NavigationMenu />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Dashboard View */}
          {activeView === 'dashboard' && stats && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Dashboard Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Shipments</p>
                        <p className="text-xl sm:text-2xl font-bold">{stats.totalShipments}</p>
                      </div>
                      <Package className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Pending</p>
                        <p className="text-xl sm:text-2xl font-bold text-yellow-600">{stats.pendingShipments}</p>
                      </div>
                      <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">In Transit</p>
                        <p className="text-xl sm:text-2xl font-bold text-blue-600">{stats.inTransitShipments}</p>
                      </div>
                      <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Delivered</p>
                        <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.deliveredShipments}</p>
                      </div>
                      <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Shipments View */}
          {activeView === 'shipments' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Manage Shipments</h2>
              <ShipmentsList 
                shipments={shipments}
                onUpdateTracking={handleUpdateTracking}
                onRefresh={fetchDashboardData}
                onEdit={handleEditShipment}
                onPrintInvoice={handlePrintInvoice}
                onSendEmail={handleSendEmail}
                onDelete={handleDeleteShipment}
              />
            </div>
          )}

          {/* Tracking View */}
          {activeView === 'tracking' && (
            <Card>
              <CardHeader>
                <CardTitle>Tracking Management</CardTitle>
                <CardDescription>
                  Manage shipment locations and status updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Select a shipment from the Shipments view to update its tracking information.
                  </p>
                  <Button onClick={() => setActiveView('shipments')}>
                    Go to Shipments
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Emails View */}
          {activeView === 'emails' && (
            <Card>
              <CardHeader>
                <CardTitle>Email Management</CardTitle>
                <CardDescription>
                  Send custom emails to customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GeneralEmailForm />
              </CardContent>
            </Card>
          )}

          {/* Car Quotes View */}
          {activeView === 'car-quotes' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Car Purchase Requests</h2>
                <p className="text-muted-foreground">View and manage car purchase quote requests</p>
              </div>
              
              {carPurchases.length === 0 ? (
                <Card>
                  <CardContent className="p-8">
                    <div className="text-center py-8">
                      <Car className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        No car purchase requests yet
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {carPurchases.map((purchase) => (
                    <Card key={purchase.id}>
                      <CardContent className="p-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-semibold text-lg mb-2">
                              {purchase.car_make} {purchase.car_model} ({purchase.year})
                            </h3>
                            <div className="space-y-1 text-sm">
                              <p><span className="font-medium">Customer:</span> {purchase.full_name}</p>
                              <p><span className="font-medium">Email:</span> {purchase.email}</p>
                              <p><span className="font-medium">Phone:</span> {purchase.phone}</p>
                              <p><span className="font-medium">Condition:</span> {purchase.condition}</p>
                              <p><span className="font-medium">Budget:</span> {purchase.budget}</p>
                            </div>
                          </div>
                          <div className="space-y-1 text-sm">
                            <p><span className="font-medium">Delivery Location:</span> {purchase.delivery_location}</p>
                            {purchase.preferred_color && (
                              <p><span className="font-medium">Color:</span> {purchase.preferred_color}</p>
                            )}
                            {purchase.transmission && (
                              <p><span className="font-medium">Transmission:</span> {purchase.transmission}</p>
                            )}
                            {purchase.fuel_type && (
                              <p><span className="font-medium">Fuel Type:</span> {purchase.fuel_type}</p>
                            )}
                            {purchase.additional_requirements && (
                              <p><span className="font-medium">Requirements:</span> {purchase.additional_requirements}</p>
                            )}
                            <p className="pt-2">
                              <Badge variant={purchase.status === 'pending' ? 'default' : 'secondary'}>
                                {purchase.status}
                              </Badge>
                            </p>
                            <p className="text-xs text-muted-foreground pt-2">
                              Submitted: {new Date(purchase.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Shipping Quotes View */}
          {activeView === 'shipping-quotes' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Shipping Quote Requests</h2>
                <p className="text-muted-foreground">View and manage shipping quote requests</p>
              </div>
              
              {quotes.length === 0 ? (
                <Card>
                  <CardContent className="p-8">
                    <div className="text-center py-8">
                      <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        No quote requests yet
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {quotes.map((quote) => (
                    <Card key={quote.id}>
                      <CardContent className="p-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-semibold text-lg mb-2">
                              {quote.first_name} {quote.last_name}
                            </h3>
                            <div className="space-y-1 text-sm">
                              <p><span className="font-medium">Email:</span> {quote.email}</p>
                              <p><span className="font-medium">Phone:</span> {quote.phone}</p>
                              {quote.company_name && (
                                <p><span className="font-medium">Company:</span> {quote.company_name}</p>
                              )}
                              <p><span className="font-medium">Service:</span> {quote.service_type.replace('_', ' ').toUpperCase()}</p>
                            </div>
                          </div>
                          <div className="space-y-1 text-sm">
                            <p><span className="font-medium">Route:</span> {quote.origin_country} → {quote.destination_country}</p>
                            <p><span className="font-medium">Weight:</span> {quote.package_weight} lbs</p>
                            {quote.package_dimensions && (
                              <p><span className="font-medium">Dimensions:</span> {quote.package_dimensions}</p>
                            )}
                            {quote.estimated_value && (
                              <p><span className="font-medium">Value:</span> ${quote.estimated_value}</p>
                            )}
                            {quote.shipping_date && (
                              <p><span className="font-medium">Date:</span> {new Date(quote.shipping_date).toLocaleDateString()}</p>
                            )}
                            {quote.additional_info && (
                              <p><span className="font-medium">Notes:</span> {quote.additional_info}</p>
                            )}
                            <p className="pt-2">
                              <Badge variant={quote.status === 'pending' ? 'default' : 'secondary'}>
                                {quote.status}
                              </Badge>
                            </p>
                            <p className="text-xs text-muted-foreground pt-2">
                              Submitted: {new Date(quote.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <CreateShipmentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateShipment}
        adminId={admin.id}
      />

      <TrackingUpdatesModal
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
        onSuccess={handleTrackingUpdate}
        shipment={selectedShipment}
        adminId={admin.id}
      />

      <SendEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => {
          setIsEmailModalOpen(false);
          setSelectedShipment(null);
        }}
        shipment={selectedShipment}
      />

      <EditShipmentModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedShipment(null);
        }}
        onSuccess={handleEditSuccess}
        shipment={selectedShipment}
      />

      <PrintInvoiceModal
        isOpen={isPrintModalOpen}
        onClose={() => {
          setIsPrintModalOpen(false);
          setSelectedShipment(null);
        }}
        shipment={selectedShipment}
      />
    </div>
  );
}
