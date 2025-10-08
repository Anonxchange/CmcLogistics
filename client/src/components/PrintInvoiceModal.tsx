
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Printer, X } from 'lucide-react';
import ShippingInvoice from './ShippingInvoice';

interface PrintInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipment: any;
}

export default function PrintInvoiceModal({ isOpen, onClose, shipment }: PrintInvoiceModalProps) {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContents = invoiceRef.current;
    if (!printContents) {
      console.error('Print contents not found');
      return;
    }

    // Try to open a popup window first
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    
    if (!printWindow) {
      // Fallback for devices that don't support window.open() or have popups blocked
      console.log('Popup blocked or not supported, using inline print method');
      
      // Create a hidden iframe for printing
      const printFrame = document.createElement('iframe');
      printFrame.style.position = 'fixed';
      printFrame.style.right = '0';
      printFrame.style.bottom = '0';
      printFrame.style.width = '0';
      printFrame.style.height = '0';
      printFrame.style.border = '0';
      document.body.appendChild(printFrame);

      const frameDoc = printFrame.contentWindow?.document || printFrame.contentDocument;
      if (!frameDoc) {
        alert('Unable to print. Please try using your browser\'s print function (Ctrl+P or Cmd+P) while viewing this invoice.');
        return;
      }

      frameDoc.open();
      frameDoc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Invoice - ${shipment.trackingNumber}</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
              }
              
              body {
                font-family: Arial, sans-serif;
                background: white;
                color: black;
              }
              
              /* Invoice container styles */
              .max-w-4xl { max-width: 56rem; }
              .mx-auto { margin-left: auto; margin-right: auto; }
              .bg-white { background-color: white; }
              .border { border-width: 1px; border-color: #e5e7eb; }
              .rounded-lg { border-radius: 0.5rem; }
              .overflow-hidden { overflow: hidden; }
              
              /* Header styles */
              .bg-gray-800 { background-color: #1f2937 !important; }
              .text-white { color: white !important; }
              .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
              .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
              .flex { display: flex; }
              .justify-between { justify-content: space-between; }
              .items-center { align-items: center; }
              .text-2xl { font-size: 1.5rem; line-height: 2rem; }
              .font-bold { font-weight: 700; }
              .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
              
              /* Grid and spacing */
              .grid { display: grid; }
              .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
              .gap-6 { gap: 1.5rem; }
              .gap-4 { gap: 1rem; }
              .gap-2 { gap: 0.5rem; }
              .space-y-1 > * + * { margin-top: 0.25rem; }
              .space-y-2 > * + * { margin-top: 0.5rem; }
              .space-y-3 > * + * { margin-top: 0.75rem; }
              .mb-2 { margin-bottom: 0.5rem; }
              .mb-3 { margin-bottom: 0.75rem; }
              .mb-4 { margin-bottom: 1rem; }
              .mt-2 { margin-top: 0.5rem; }
              
              /* Typography */
              .text-xs { font-size: 0.75rem; line-height: 1rem; }
              .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
              .font-semibold { font-weight: 600; }
              .text-gray-600 { color: #4b5563; }
              .text-gray-700 { color: #374151; }
              .text-center { text-align: center; }
              
              /* Table styles */
              .w-full { width: 100%; }
              .border-collapse { border-collapse: collapse; }
              thead { background-color: #f9fafb; }
              th, td { 
                padding: 0.75rem;
                text-align: left;
                border: 1px solid #e5e7eb;
              }
              th { font-weight: 600; }
              .text-right { text-align: right; }
              
              /* Footer */
              .bg-gray-50 { background-color: #f9fafb !important; }
              .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
              
              /* Image styles */
              .relative { position: relative; }
              .w-48 { width: 12rem; }
              .h-48 { height: 12rem; }
              .w-32 { width: 8rem; }
              .h-32 { height: 8rem; }
              .object-contain { object-fit: contain; }
              .transform { transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
              .rotate-12 { --tw-rotate: 12deg; transform: rotate(12deg); }
              
              @media print {
                @page {
                  size: A4;
                  margin: 10mm;
                }
                
                body {
                  padding: 0;
                }
                
                * {
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                  color-adjust: exact !important;
                }
              }
              
              @media (max-width: 768px) {
                body { font-size: 12px; }
                table { font-size: 10px; }
              }
            </style>
          </head>
          <body>
            ${printContents.innerHTML}
          </body>
        </html>
      `);
      frameDoc.close();

      // Wait for iframe to load, then print
      setTimeout(() => {
        printFrame.contentWindow?.focus();
        printFrame.contentWindow?.print();
        // Remove iframe after printing
        setTimeout(() => {
          document.body.removeChild(printFrame);
        }, 100);
      }, 250);
      
      return;
    }

    // Popup window approach (for devices that support it)
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - ${shipment.trackingNumber}</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            
            body {
              font-family: Arial, sans-serif;
              background: white;
              color: black;
              padding: 20px;
            }
            
            /* Invoice container styles */
            .max-w-4xl { max-width: 56rem; }
            .mx-auto { margin-left: auto; margin-right: auto; }
            .bg-white { background-color: white; }
            .border { border-width: 1px; border-color: #e5e7eb; }
            .rounded-lg { border-radius: 0.5rem; }
            .overflow-hidden { overflow: hidden; }
            
            /* Header styles */
            .bg-gray-800 { background-color: #1f2937 !important; }
            .text-white { color: white !important; }
            .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
            .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
            .flex { display: flex; }
            .justify-between { justify-content: space-between; }
            .items-center { align-items: center; }
            .text-2xl { font-size: 1.5rem; line-height: 2rem; }
            .font-bold { font-weight: 700; }
            .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
            
            /* Grid and spacing */
            .grid { display: grid; }
            .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .gap-6 { gap: 1.5rem; }
            .gap-4 { gap: 1rem; }
            .gap-2 { gap: 0.5rem; }
            .space-y-1 > * + * { margin-top: 0.25rem; }
            .space-y-2 > * + * { margin-top: 0.5rem; }
            .space-y-3 > * + * { margin-top: 0.75rem; }
            .mb-2 { margin-bottom: 0.5rem; }
            .mb-3 { margin-bottom: 0.75rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mt-2 { margin-top: 0.5rem; }
            
            /* Typography */
            .text-xs { font-size: 0.75rem; line-height: 1rem; }
            .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
            .font-semibold { font-weight: 600; }
            .text-gray-600 { color: #4b5563; }
            .text-gray-700 { color: #374151; }
            .text-center { text-align: center; }
            
            /* Table styles */
            .w-full { width: 100%; }
            .border-collapse { border-collapse: collapse; }
            thead { background-color: #f9fafb; }
            th, td { 
              padding: 0.75rem;
              text-align: left;
              border: 1px solid #e5e7eb;
            }
            th { font-weight: 600; }
            .text-right { text-align: right; }
            
            /* Footer */
            .bg-gray-50 { background-color: #f9fafb !important; }
            .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
            
            /* Image styles */
            .relative { position: relative; }
            .w-48 { width: 12rem; }
            .h-48 { height: 12rem; }
            .w-32 { width: 8rem; }
            .h-32 { height: 8rem; }
            .object-contain { object-fit: contain; }
            .transform { transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
            .rotate-12 { --tw-rotate: 12deg; transform: rotate(12deg); }
            
            @media print {
              @page {
                size: A4;
                margin: 10mm;
              }
              
              body {
                padding: 0;
              }
              
              * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
              }
            }
            
            @media (max-width: 768px) {
              body { font-size: 12px; }
              table { font-size: 10px; }
            }
          </style>
        </head>
        <body>
          ${printContents.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();

    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }, 250);
    };
  };

  if (!shipment) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Shipping Invoice</DialogTitle>
          <DialogDescription>
            Invoice for tracking number: {shipment.trackingNumber}
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 justify-end mb-4">
          <Button onClick={handlePrint} className="gap-2">
            <Printer className="w-4 h-4" />
            Print Invoice
          </Button>
          <Button onClick={onClose} variant="outline" className="gap-2">
            <X className="w-4 h-4" />
            Close
          </Button>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <ShippingInvoice
            ref={invoiceRef}
            trackingNumber={shipment.trackingNumber}
            shipment={shipment}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
