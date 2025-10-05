import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';
import { MapPin, Clock, User } from 'lucide-react';

interface TrackingUpdatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  shipment: any;
  adminId: string;
}

export default function TrackingUpdatesModal({ isOpen, onClose, onSuccess, shipment, adminId }: TrackingUpdatesModalProps) {
  const [trackingHistory, setTrackingHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newUpdate, setNewUpdate] = useState({
    status: '',
    location: '',
    description: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    if (shipment && isOpen) {
      fetchTrackingHistory();
    }
  }, [shipment, isOpen]);

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'picked_up', label: 'Picked Up' },
    { value: 'in_transit', label: 'In Transit' },
    { value: 'held_by_customs', label: 'Held by Customs' },
    { value: 'out_for_delivery', label: 'Out for Delivery' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'delayed', label: 'Delayed' },
    { value: 'failed_delivery', label: 'Failed Delivery' }
  ];

  const fetchTrackingHistory = async () => {
    if (!shipment) return;
    
    setIsLoading(true);
    try {
      const { data: history, error } = await supabase
        .from('tracking_updates')
        .select('*')
        .eq('shipment_id', shipment.id)
        .order('timestamp', { ascending: false });

      if (error) throw error;
      setTrackingHistory(history || []);
    } catch (error) {
      console.error('Error fetching tracking history:', error);
      toast({
        title: "Error",
        description: "Failed to fetch tracking history",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shipment || !newUpdate.status || !newUpdate.location) return;

    setIsSubmitting(true);
    try {
      // Insert tracking update directly to Supabase
      const { error: insertError } = await supabase
        .from('tracking_updates')
        .insert([{
          shipment_id: shipment.id,
          status: newUpdate.status,
          location: newUpdate.location,
          description: newUpdate.description,
          updated_by: parseInt(adminId),
          timestamp: new Date().toISOString()
        }]);

      if (insertError) {
        toast({
          title: "Failed to add update",
          description: insertError.message || "Please try again",
          variant: "destructive",
        });
        return;
      }

      // Update shipment status
      await supabase
        .from('shipments')
        .update({ 
          status: newUpdate.status,
          updated_at: new Date().toISOString()
        })
        .eq('id', shipment.id);

      toast({
        title: "Update added successfully",
        description: "Tracking information has been updated",
      });
      setNewUpdate({ status: '', location: '', description: '' });
      await fetchTrackingHistory();
      onSuccess();
    } catch (error) {
      toast({
        title: "Network error",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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

  if (!shipment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tracking Updates - {shipment.tracking_number || shipment.trackingNumber}</DialogTitle>
          <DialogDescription>
            Manage location updates and status changes for this shipment
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Shipment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Shipment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="font-semibold">Tracking Number</Label>
                <p className="font-mono text-sm">{shipment.tracking_number || shipment.trackingNumber}</p>
              </div>
              <div>
                <Label className="font-semibold">From</Label>
                <p className="text-sm">{shipment.sender_name || shipment.senderName}</p>
                <p className="text-xs text-muted-foreground">{shipment.sender_address || shipment.senderAddress}</p>
              </div>
              <div>
                <Label className="font-semibold">To</Label>
                <p className="text-sm">{shipment.recipient_name || shipment.recipientName}</p>
                <p className="text-xs text-muted-foreground">{shipment.recipient_address || shipment.recipientAddress}</p>
              </div>
              <div>
                <Label className="font-semibold">Service Type</Label>
                <Badge variant="outline" className="ml-2">
                  {(shipment.service_type || shipment.serviceType) ? 
                    ((shipment.service_type || shipment.serviceType).charAt(0).toUpperCase() + (shipment.service_type || shipment.serviceType).slice(1)) : 
                    'Unknown'
                  }
                </Badge>
              </div>
              <div>
                <Label className="font-semibold">Current Status</Label>
                <Badge className={`ml-2 text-white ${getStatusColor(shipment.status)}`}>
                  {shipment.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Add New Update */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add Location Update</CardTitle>
              <CardDescription>
                Update the shipment's current location and status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddUpdate} className="space-y-4">
                <div>
                  <Label htmlFor="status">Status *</Label>
                  <Select 
                    value={newUpdate.status} 
                    onValueChange={(value) => setNewUpdate(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger data-testid="select-update-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Distribution Center, Chicago"
                    value={newUpdate.location}
                    onChange={(e) => setNewUpdate(prev => ({ ...prev, location: e.target.value }))}
                    required
                    data-testid="input-update-location"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Additional details about this update"
                    value={newUpdate.description}
                    onChange={(e) => setNewUpdate(prev => ({ ...prev, description: e.target.value }))}
                    data-testid="input-update-description"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting || !newUpdate.status || !newUpdate.location}
                  className="w-full bg-primary hover:bg-primary/90"
                  data-testid="button-add-update"
                >
                  {isSubmitting ? 'Adding Update...' : 'Add Update'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Tracking History */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Tracking History</CardTitle>
            <CardDescription>
              Complete timeline of location updates for this shipment
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-4">Loading tracking history...</div>
            ) : trackingHistory.length === 0 ? (
              <div className="text-center py-8">
                <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">No tracking updates yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {trackingHistory.map((update, index) => (
                  <div 
                    key={update.id} 
                    className="flex items-start space-x-4 pb-4 border-b border-border last:border-b-0"
                    data-testid={`tracking-update-${index}`}
                  >
                    <div className={`w-3 h-3 rounded-full mt-2 ${getStatusColor(update.status)}`}></div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <Badge className={`text-white ${getStatusColor(update.status)}`}>
                          {update.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          {format(new Date(update.timestamp), 'MMM dd, yyyy HH:mm')}
                        </div>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="w-3 h-3 mr-1 text-muted-foreground" />
                        <span className="font-medium">{update.location}</span>
                      </div>
                      {update.description && (
                        <p className="text-sm text-muted-foreground">{update.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={onClose} data-testid="button-close-tracking">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}