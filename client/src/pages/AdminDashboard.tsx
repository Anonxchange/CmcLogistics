
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
import ShipmentsList from '@/components/ShipmentsList';
import TrackingUpdatesModal from '@/components/TrackingUpdatesModal';
import SendEmailModal from '@/components/SendEmailModal';
import GeneralEmailForm from '@/components/GeneralEmailForm';

interface AdminDashboardProps {
  admin: any;
  onLogout: () => void;
}

export default function AdminDashboard({ admin, onLogout }: AdminDashboardProps) {
  const [stats, setStats] = useState<any>(null);
  const [shipments, setShipments] = useState<any[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
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

      // Calculate stats from shipments data
      const totalShipments = shipmentsData?.length || 0;
      const deliveredShipments = shipmentsData?.filter(s => s.status === 'delivered').length || 0;
      const inTransitShipments = shipmentsData?.filter(s => s.status === 'in_transit').length || 0;
      const pendingShipments = shipmentsData?.filter(s => s.status === 'pending').length || 0;

      const statsData = {
        totalShipments,
        deliveredShipments,
        inTransitShipments,
        pendingShipments
      };
        
      setStats(statsData);
      setShipments(shipmentsData || []);
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

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'shipments', label: 'Shipments', icon: Package },
    { id: 'tracking', label: 'Tracking', icon: MapPin },
    { id: 'emails', label: 'Emails', icon: Mail },
    { id: 'car-quotes', label: 'Car Quotes', icon: Car },
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
            <Card>
              <CardHeader>
                <CardTitle>Car Purchase Quotes</CardTitle>
                <CardDescription>
                  View and manage car purchase quote requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Car className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Car purchase quotes are automatically sent to support@cmcautoslogistics.com
                  </p>
                </div>
              </CardContent>
            </Card>
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
    </div>
  );
}
