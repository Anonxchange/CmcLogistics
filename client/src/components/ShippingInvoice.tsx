
import { forwardRef } from 'react';
import Barcode from 'react-barcode';
import { Package, Globe, Truck } from 'lucide-react';

interface ShippingInvoiceProps {
  trackingNumber: string;
  shipment: any;
}

const ShippingInvoice = forwardRef<HTMLDivElement, ShippingInvoiceProps>(
  ({ trackingNumber, shipment }, ref) => {
    // Debug: Log the shipment data to see what we're receiving
    console.log('ShippingInvoice - Full shipment data:', shipment);
    console.log('ShippingInvoice - cost:', shipment.cost);
    console.log('ShippingInvoice - clearance_cost:', shipment.clearance_cost);
    console.log('ShippingInvoice - clearanceCost:', shipment.clearanceCost);
    
    const formatDate = (date: any) => {
      if (!date) return 'N/A';
      try {
        return new Date(date).toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
      } catch {
        return 'N/A';
      }
    };

    return (
      <div ref={ref} className="bg-white text-black" style={{ 
        fontFamily: 'Arial, sans-serif'
      }}>
        {/* Page 1 */}
        <div className="border-2 border-gray-200">
          {/* Top Date and Title */}
          <div className="flex justify-between items-center px-6 py-3 border-b">
            <p className="text-sm text-gray-600">{formatDate(new Date())}</p>
            <p className="text-sm font-semibold text-gray-700">CMC Logistics Company | Invoice</p>
          </div>

          {/* Page indicator */}
          <div className="px-6 py-2 bg-gray-50 flex items-center gap-2 text-gray-500 text-sm">
            <Package className="w-4 h-4" />
            1 of 2
          </div>

          {/* Logo and Header Image Section */}
          <div className="p-4 sm:p-6 border-b relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded flex items-center justify-center">
                  <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <span className="text-xl sm:text-2xl font-bold text-primary">CMC Logistics</span>
              </div>
              
              {/* Header illustration */}
              <div className="relative w-full sm:w-48 md:w-64 h-24 sm:h-32 rounded-lg overflow-hidden border-2 border-gray-200 bg-white">
                <img 
                  src="/Gemini_Generated_Image_ebk705ebk705ebk7.png" 
                  alt="CMC Logistics Professional" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
            
            {/* Watermark */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 text-6xl font-bold text-gray-400 rotate-[-20deg]">
              Verified True Copy
            </div>
          </div>

          {/* Tracking Number */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-white border-b">
            <p className="text-lg sm:text-2xl font-bold break-all">Tracking Number: {trackingNumber}</p>
          </div>

          {/* Company Info */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 text-center border-b bg-gray-50">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
              CMC Logistics Company
            </h2>
            <p className="text-xs sm:text-sm text-gray-700 mb-1">
              <strong>Address:</strong> Global Headquarters, New York
            </p>
            <p className="text-xs sm:text-sm text-gray-700 mb-1 break-all">
              <strong>Email:</strong> support@cmcautoslogistics.com
            </p>
            <p className="text-xs sm:text-sm text-gray-700 break-all">
              <strong>Company Website:</strong> https://cmcautoslogistics.com
            </p>
          </div>

          {/* Sender, Recipient and Barcode Section */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6 border-b">
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-gray-800 mb-2 sm:mb-3 uppercase border-b border-gray-400 pb-1">FROM (SENDER)</h3>
              <div>
                <p className="font-bold text-sm sm:text-base text-gray-800 mb-2">{shipment.senderName || 'Sender Name'}</p>
                <p className="text-xs text-gray-600 mb-1">
                  <strong>Address:</strong> {shipment.senderAddress || 'Sender Address'}
                </p>
                {shipment.senderPhone && (
                  <p className="text-xs text-gray-600 mb-1">
                    <strong>Phone:</strong> {shipment.senderPhone}
                  </p>
                )}
                <p className="text-xs text-gray-600">
                  <strong>Origin Office:</strong> {shipment.senderAddress?.split(',').slice(-2).join(',').trim() || 'Origin'}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xs sm:text-sm text-gray-800 mb-2 sm:mb-3 uppercase border-b border-gray-400 pb-1">TO (CONSIGNEE)</h3>
              <div>
                <p className="font-bold text-sm sm:text-base text-gray-800 mb-2">{shipment.recipientName}</p>
                {shipment.recipientPhone && (
                  <p className="text-xs text-gray-600 mb-1">
                    <strong>Phone:</strong> {shipment.recipientPhone}
                  </p>
                )}
                <p className="text-xs text-gray-600 mb-1">
                  <strong>Address:</strong> {shipment.recipientAddress}
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Destination Office:</strong> {shipment.recipientAddress?.split(',').slice(-1)[0].trim() || 'Destination'}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center sm:items-end col-span-full lg:col-span-1">
              {/* Barcode */}
              <div className="overflow-x-auto max-w-full">
                <Barcode value={trackingNumber} width={1.2} height={50} fontSize={10} />
              </div>
              
              <div className="mt-4 text-center sm:text-right space-y-1 text-xs w-full">
                <p><strong>Order ID:</strong> {shipment.id || 'N/A'}</p>
                <p>
                  <strong>Booking Mode:</strong> 
                  <span className="ml-1 px-2 py-0.5 bg-gray-200 rounded text-xs">To Pay</span>
                </p>
                <p><strong>Shipment Cost:</strong> ${shipment.cost || shipment.shipping_cost || '0.00'}</p>
                <p className="font-mono break-all"><strong>Tracking:</strong> {trackingNumber}</p>
              </div>
            </div>
          </div>

          {/* Shipment Details Table */}
          <div className="p-4 sm:p-6 border-b overflow-x-auto">
            <table className="w-full text-xs sm:text-sm border-collapse border border-gray-400 min-w-[500px]">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left py-2 px-2 border border-gray-400 font-bold">Qty</th>
                  <th className="text-left py-2 px-2 border border-gray-400 font-bold">Product</th>
                  <th className="text-left py-2 px-2 border border-gray-400 font-bold">Status</th>
                  <th className="text-left py-2 px-2 border border-gray-400 font-bold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-2 border border-gray-400">1</td>
                  <td className="py-3 px-2 border border-gray-400">{shipment.packageType || 'Parcel'}</td>
                  <td className="py-3 px-2 border border-gray-400">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded border border-blue-300 whitespace-nowrap">
                      {shipment.status?.replace('_', ' ').toUpperCase() || 'In Transit'}
                    </span>
                  </td>
                  <td className="py-3 px-2 border border-gray-400 text-xs">
                    {shipment.description || 'Package contents'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Cost Breakdown Table */}
          <div className="p-4 sm:p-6 border-b overflow-x-auto">
            <table className="w-full text-xs sm:text-sm border-collapse border border-gray-400 min-w-[400px]">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left py-2 px-2 border border-gray-400 font-bold">Shipping Cost</th>
                  <th className="text-left py-2 px-2 border border-gray-400 font-bold">Clearance Cost</th>
                  <th className="text-left py-2 px-2 border border-gray-400 font-bold">Total Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-2 border border-gray-400 font-bold">${shipment.cost || shipment.shipping_cost || '0.00'}</td>
                  <td className="py-3 px-2 border border-gray-400">${shipment.clearance_cost || shipment.clearanceCost || '0.00'}</td>
                  <td className="py-3 px-2 border border-gray-400 font-bold">${((parseFloat(shipment.cost || shipment.shipping_cost || '0') + parseFloat(shipment.clearance_cost || shipment.clearanceCost || '0'))).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment Methods, Stamps Section */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6 border-b">
            <div>
              <h3 className="font-bold text-xs sm:text-sm mb-2 sm:mb-3">Payment Methods:</h3>
              <div className="border-2 border-gray-300 rounded p-3 bg-blue-50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-white text-xs font-bold">S</div>
                  <span className="text-xs font-semibold">SECURED PAYMENT</span>
                </div>
                <div className="space-y-1">
                  <div className="flex gap-2">
                    <div className="px-2 py-1 bg-blue-700 text-white text-xs font-bold rounded">VISA</div>
                    <div className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded flex items-center">
                      <div className="flex -space-x-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded">AMEX</div>
                  </div>
                  <div className="bg-white px-2 py-1 rounded">
                    <span className="text-blue-700 font-bold text-sm">Pay</span>
                    <span className="text-blue-500 font-bold text-sm">Pal</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1 text-green-700 text-xs">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-bold">SAFE SHOPPING</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                For your convenience we have CMC Logistics several payment methods: reliable, fast, secure.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-sm mb-3">
                Official Stamp/{formatDate(new Date()).split(',')[0]}
              </h3>
              <div className="relative w-48 h-48 mx-auto">
                <img 
                  src="/stamps/Gemini_Generated_Image_3a8m3r3a8m3r3a8m.png" 
                  alt="Official Stamp" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center mt-2">
                <p className="font-bold text-sm">Amount Due</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-sm mb-3">Stamp Duty:</h3>
              <div className="relative w-32 h-32 mx-auto transform rotate-12">
                <img 
                  src="/stamps/stamp-duty.jpeg" 
                  alt="Stamp Duty" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-gray-50 text-xs text-gray-600 flex justify-between items-center">
            <span>https://cmcautoslogistics.com/invoice/{trackingNumber}</span>
            <span>1/2</span>
          </div>
        </div>

        {/* Page 2 - Cost Breakdown */}
        <div className="border-2 border-gray-200 border-t-4 border-t-gray-800 mt-8">
          <div className="flex justify-between items-center px-6 py-3 border-b">
            <p className="text-sm text-gray-600">{formatDate(new Date())}</p>
            <p className="text-sm font-semibold text-gray-700">CMC Logistics Company | Invoice</p>
          </div>

          <div className="px-6 py-2 bg-gray-50 flex items-center gap-2 text-gray-500 text-sm border-b">
            <Package className="w-4 h-4" />
            2 of 2
          </div>

          <div className="p-4 sm:p-6">
            <h2 className="font-bold text-sm sm:text-base mb-4 sm:mb-6">SHIPPING COST BREAKDOWN:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
              <div>
                <h3 className="font-bold text-xs sm:text-sm mb-2">SHIPPING COST:</h3>
                <p className="text-base sm:text-lg">${shipment.cost || shipment.shipping_cost || '0.00'}</p>
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm mb-2">CLEARANCE COST:</h3>
                <p className="text-base sm:text-lg">${shipment.clearance_cost || shipment.clearanceCost || '0.00'}</p>
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm mb-2">TOTAL AMOUNT:</h3>
                <p className="text-lg sm:text-xl font-bold text-primary">${((parseFloat(shipment.cost || shipment.shipping_cost || '0') + parseFloat(shipment.clearance_cost || shipment.clearanceCost || '0'))).toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="px-6 py-3 bg-gray-50 text-xs text-gray-600 flex justify-end border-t">
            <span>2/2</span>
          </div>
        </div>
      </div>
    );
  }
);

ShippingInvoice.displayName = 'ShippingInvoice';

export default ShippingInvoice;
