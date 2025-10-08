
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
                background: white !important;
                color: black !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              
              /* Force all backgrounds and colors */
              .bg-gray-800, .bg-gray-800 * { 
                background-color: #1f2937 !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .bg-gray-50 { 
                background-color: #f9fafb !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .bg-blue-50 { 
                background-color: #eff6ff !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .bg-blue-100 { 
                background-color: #dbeafe !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .bg-blue-500 { 
                background-color: #3b82f6 !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .bg-blue-700 { 
                background-color: #1d4ed8 !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .bg-red-600 { 
                background-color: #dc2626 !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .bg-gradient-to-br { 
                background: linear-gradient(to bottom right, #3b82f6, #2563eb) !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .text-white { color: white !important; }
              .text-blue-700 { color: #1d4ed8 !important; }
              .text-blue-500 { color: #3b82f6 !important; }
              .text-blue-800 { color: #1e40af !important; }
              .text-green-700 { color: #15803d !important; }
              .text-gray-600 { color: #4b5563 !important; }
              .text-gray-700 { color: #374151 !important; }
              .text-gray-800 { color: #1f2937 !important; }
              .text-primary { color: #2563eb !important; }
              
              /* Invoice container styles */
              .max-w-4xl { max-width: 56rem; }
              .mx-auto { margin-left: auto; margin-right: auto; }
              .bg-white { background-color: white !important; }
              .border { border-width: 1px; border-color: #e5e7eb; }
              .border-2 { border-width: 2px; }
              .border-gray-200 { border-color: #e5e7eb !important; }
              .border-gray-300 { border-color: #d1d5db !important; }
              .border-gray-400 { border-color: #9ca3af !important; }
              .border-blue-300 { border-color: #93c5fd !important; }
              .rounded-lg { border-radius: 0.5rem; }
              .rounded { border-radius: 0.25rem; }
              .overflow-hidden { overflow: hidden; }
              
              /* Header styles */
              .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
              .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
              .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
              .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
              .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
              .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
              .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
              .px-4 { padding-left: 1rem; padding-right: 1rem; }
              .p-3 { padding: 0.75rem; }
              .p-4 { padding: 1rem; }
              .p-6 { padding: 1.5rem; }
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
              .gap-1 { gap: 0.25rem; }
              .space-y-1 > * + * { margin-top: 0.25rem; }
              .space-y-2 > * + * { margin-top: 0.5rem; }
              .space-y-3 > * + * { margin-top: 0.75rem; }
              .mb-2 { margin-bottom: 0.5rem; }
              .mb-3 { margin-bottom: 0.75rem; }
              .mb-4 { margin-bottom: 1rem; }
              .mt-2 { margin-top: 0.5rem; }
              .mt-4 { margin-top: 1rem; }
              .-space-x-1 > * + * { margin-left: -0.25rem; }
              
              /* Typography */
              .text-xs { font-size: 0.75rem; line-height: 1rem; }
              .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
              .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
              .font-semibold { font-weight: 600; }
              .text-center { text-align: center; }
              .uppercase { text-transform: uppercase; }
              .whitespace-nowrap { white-space: nowrap; }
              .break-all { word-break: break-all; }
              
              /* Table styles */
              .w-full { width: 100%; }
              .w-10 { width: 2.5rem; }
              .w-12 { width: 3rem; }
              .w-6 { width: 1.5rem; }
              .w-3 { width: 0.75rem; }
              .h-10 { height: 2.5rem; }
              .h-12 { height: 3rem; }
              .h-6 { height: 1.5rem; }
              .h-3 { height: 0.75rem; }
              .border-collapse { border-collapse: collapse; }
              thead { 
                background-color: #f9fafb !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              th, td { 
                padding: 0.75rem;
                text-align: left;
                border: 1px solid #e5e7eb;
              }
              th { font-weight: 600; }
              .text-right { text-align: right; }
              
              /* Image styles */
              .relative { position: relative; }
              .absolute { position: absolute; }
              .w-48 { width: 12rem; }
              .h-48 { height: 12rem; }
              .w-32 { width: 8rem; }
              .h-32 { height: 8rem; }
              .object-contain { object-fit: contain; }
              .object-cover { object-fit: cover; }
              .object-center { object-position: center; }
              .transform { transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
              .rotate-12 { --tw-rotate: 12deg; transform: rotate(12deg); }
              .opacity-10 { opacity: 0.1; }
              .col-span-full { grid-column: 1 / -1; }
              
              /* SVG and icons */
              svg { display: inline-block; }
              .fill-current { fill: currentColor; }
              
              /* Rounded corners */
              .rounded-full { border-radius: 9999px; }
              
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
              background: white !important;
              color: black !important;
              padding: 20px;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            /* Force all backgrounds and colors */
            .bg-gray-800, .bg-gray-800 * { 
              background-color: #1f2937 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .bg-gray-50 { 
              background-color: #f9fafb !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .bg-blue-50 { 
              background-color: #eff6ff !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .bg-blue-100 { 
              background-color: #dbeafe !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .bg-blue-500 { 
              background-color: #3b82f6 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .bg-blue-700 { 
              background-color: #1d4ed8 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .bg-red-600 { 
              background-color: #dc2626 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .bg-gradient-to-br { 
              background: linear-gradient(to bottom right, #3b82f6, #2563eb) !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .text-white { color: white !important; }
            .text-blue-700 { color: #1d4ed8 !important; }
            .text-blue-500 { color: #3b82f6 !important; }
            .text-blue-800 { color: #1e40af !important; }
            .text-green-700 { color: #15803d !important; }
            .text-gray-600 { color: #4b5563 !important; }
            .text-gray-700 { color: #374151 !important; }
            .text-gray-800 { color: #1f2937 !important; }
            .text-primary { color: #2563eb !important; }
            
            /* Invoice container styles */
            .max-w-4xl { max-width: 56rem; }
            .mx-auto { margin-left: auto; margin-right: auto; }
            .bg-white { background-color: white !important; }
            .border { border-width: 1px; border-color: #e5e7eb; }
            .border-2 { border-width: 2px; }
            .border-gray-200 { border-color: #e5e7eb !important; }
            .border-gray-300 { border-color: #d1d5db !important; }
            .border-gray-400 { border-color: #9ca3af !important; }
            .border-blue-300 { border-color: #93c5fd !important; }
            .rounded-lg { border-radius: 0.5rem; }
            .rounded { border-radius: 0.25rem; }
            .overflow-hidden { overflow: hidden; }
            
            /* Header styles */
            .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
            .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
            .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
            .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
            .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
            .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
            .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
            .px-4 { padding-left: 1rem; padding-right: 1rem; }
            .p-3 { padding: 0.75rem; }
            .p-4 { padding: 1rem; }
            .p-6 { padding: 1.5rem; }
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
