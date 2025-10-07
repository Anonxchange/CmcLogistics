import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface EditShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  shipment: any;
}

export default function EditShipmentModal({ isOpen, onClose, onSuccess, shipment }: EditShipmentModalProps) {
  const [formData, setFormData] = useState({
    senderName: '',
    senderAddress: '',
    senderPhone: '',
    senderEmail: '',
    recipientName: '',
    recipientAddress: '',
    recipientPhone: '',
    recipientEmail: '',
    serviceType: '',
    packageWeight: '',
    packageDimensions: '',
    estimatedDelivery: '',
    cost: '',
    clearanceCost: '',
    status: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (shipment) {
      setFormData({
        senderName: shipment.sender_name || '',
        senderAddress: shipment.sender_address || '',
        senderPhone: shipment.sender_phone || '',
        senderEmail: shipment.sender_email || '',
        recipientName: shipment.recipient_name || '',
        recipientAddress: shipment.recipient_address || '',
        recipientPhone: shipment.recipient_phone || '',
        recipientEmail: shipment.recipient_email || '',
        serviceType: shipment.service_type || '',
        packageWeight: shipment.weight || '',
        packageDimensions: shipment.dimensions || '',
        estimatedDelivery: shipment.estimated_delivery ? new Date(shipment.estimated_delivery).toISOString().slice(0, 16) : '',
        cost: shipment.cost?.toString() || '',
        clearanceCost: shipment.clearance_cost?.toString() || '',
        status: shipment.status || ''
      });
    }
  }, [shipment]);

  const serviceTypes = [
    { value: 'air', label: 'Air Freight' },
    { value: 'sea', label: 'Sea Freight' },
    { value: 'road', label: 'Road Transportation' },
    { value: 'express', label: 'Express Delivery' }
  ];

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updatedData = {
        sender_name: formData.senderName,
        sender_email: formData.senderEmail,
        sender_phone: formData.senderPhone,
        sender_address: formData.senderAddress,
        recipient_name: formData.recipientName,
        recipient_email: formData.recipientEmail,
        recipient_phone: formData.recipientPhone,
        recipient_address: formData.recipientAddress,
        service_type: formData.serviceType,
        weight: formData.packageWeight || null,
        dimensions: formData.packageDimensions || null,
        status: formData.status,
        estimated_delivery: formData.estimatedDelivery || null,
        cost: formData.cost ? parseFloat(formData.cost) : null,
        clearance_cost: formData.clearanceCost ? parseFloat(formData.clearanceCost) : null,
      };

      const { error } = await supabase
        .from('shipments')
        .update(updatedData)
        .eq('id', shipment.id);

      if (error) throw error;

      toast({
        title: "Shipment updated successfully",
        description: `Shipment ${shipment.tracking_number} has been updated`,
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating shipment:', error);
      toast({
        title: "Failed to update shipment",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!shipment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Shipment</DialogTitle>
          <DialogDescription>
            Update shipment details for tracking number: {shipment.tracking_number}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sender Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sender Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="senderName">Sender Name *</Label>
                <Input
                  id="senderName"
                  value={formData.senderName}
                  onChange={(e) => handleInputChange('senderName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="senderPhone">Sender Phone</Label>
                <Input
                  id="senderPhone"
                  value={formData.senderPhone}
                  onChange={(e) => handleInputChange('senderPhone', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="senderAddress">Sender Address *</Label>
              <Textarea
                id="senderAddress"
                value={formData.senderAddress}
                onChange={(e) => handleInputChange('senderAddress', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="senderEmail">Sender Email</Label>
              <Input
                id="senderEmail"
                type="email"
                value={formData.senderEmail}
                onChange={(e) => handleInputChange('senderEmail', e.target.value)}
              />
            </div>
          </div>

          {/* Recipient Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Recipient Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="recipientName">Recipient Name *</Label>
                <Input
                  id="recipientName"
                  value={formData.recipientName}
                  onChange={(e) => handleInputChange('recipientName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="recipientPhone">Recipient Phone</Label>
                <Input
                  id="recipientPhone"
                  value={formData.recipientPhone}
                  onChange={(e) => handleInputChange('recipientPhone', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="recipientAddress">Recipient Address *</Label>
              <Textarea
                id="recipientAddress"
                value={formData.recipientAddress}
                onChange={(e) => handleInputChange('recipientAddress', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="recipientEmail">Recipient Email</Label>
              <Input
                id="recipientEmail"
                type="email"
                value={formData.recipientEmail}
                onChange={(e) => handleInputChange('recipientEmail', e.target.value)}
              />
            </div>
          </div>

          {/* Package and Cost Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Package & Cost Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="serviceType">Service Type *</Label>
                <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((service) => (
                      <SelectItem key={service.value} value={service.value}>
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="packageWeight">Package Weight (kg)</Label>
                <Input
                  id="packageWeight"
                  type="number"
                  step="0.01"
                  value={formData.packageWeight}
                  onChange={(e) => handleInputChange('packageWeight', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="packageDimensions">Package Dimensions (L x W x H)</Label>
              <Input
                id="packageDimensions"
                placeholder="e.g., 30 x 20 x 15 cm"
                value={formData.packageDimensions}
                onChange={(e) => handleInputChange('packageDimensions', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cost">Shipping Cost ($)</Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  value={formData.cost}
                  onChange={(e) => handleInputChange('cost', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="clearanceCost">Clearance Cost ($)</Label>
                <Input
                  id="clearanceCost"
                  type="number"
                  step="0.01"
                  value={formData.clearanceCost}
                  onChange={(e) => handleInputChange('clearanceCost', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Status and Delivery Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Status & Delivery Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">Status *</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="estimatedDelivery">Estimated Delivery Date</Label>
                <Input
                  id="estimatedDelivery"
                  type="datetime-local"
                  value={formData.estimatedDelivery}
                  onChange={(e) => handleInputChange('estimatedDelivery', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90"
            >
              {isLoading ? 'Updating...' : 'Update Shipment'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
