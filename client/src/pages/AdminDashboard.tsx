import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import CreateShipmentModal from '@/components/CreateShipmentModal';
import ShipmentsList from '@/components/ShipmentsList';
import TrackingUpdatesModal from '@/components/TrackingUpdatesModal';

interface AdminDashboardProps {
  admin: any;
  onLogout: () => void;
}

export default function AdminDashboard({ admin, onLogout }: AdminDashboardProps) {
  const [stats, setStats] = useState<any>(null);
  const [shipments, setShipments] = useState<any[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
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
    fetchDashboardData(); // Refresh data after creating shipment
    setIsCreateModalOpen(false);
  };

  const handleUpdateTracking = (shipment: any) => {
    setSelectedShipment(shipment);
    setIsTrackingModalOpen(true);
  };

  const handleTrackingUpdate = () => {
    fetchDashboardData(); // Refresh data after updating tracking
    setIsTrackingModalOpen(false);
    setSelectedShipment(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'in_transit': return 'bg-blue-500';
      case 'delivered': return 'bg-green-500';
      case 'delayed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

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
      <header className="bg-white dark:bg-gray-900 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md">
                  <Truck className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">CMC Logistics Admin</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Welcome, {admin.username}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-primary hover:bg-primary/90"
                data-testid="button-create-shipment"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Shipment
              </Button>
              <Button
                variant="ghost"
                onClick={onLogout}
                data-testid="button-logout"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Shipments</p>
                    <p className="text-2xl font-bold" data-testid="stat-total-shipments">
                      {stats.totalShipments}
                    </p>
                  </div>
                  <Package className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600" data-testid="stat-pending-shipments">
                      {stats.pendingShipments}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">In Transit</p>
                    <p className="text-2xl font-bold text-blue-600" data-testid="stat-transit-shipments">
                      {stats.inTransitShipments}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Delivered</p>
                    <p className="text-2xl font-bold text-green-600" data-testid="stat-delivered-shipments">
                      {stats.deliveredShipments}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="shipments" className="space-y-6">
          <TabsList>
            <TabsTrigger value="shipments" data-testid="tab-shipments">Shipments</TabsTrigger>
            <TabsTrigger value="tracking" data-testid="tab-tracking">Tracking Management</TabsTrigger>
          </TabsList>

          <TabsContent value="shipments">
            <ShipmentsList 
              shipments={shipments}
              onUpdateTracking={handleUpdateTracking}
              onRefresh={fetchDashboardData}
            />
          </TabsContent>

          <TabsContent value="tracking">
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
                    Select a shipment from the Shipments tab to update its tracking information.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

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
    </div>
  );
}