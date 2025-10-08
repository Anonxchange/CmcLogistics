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

    // Get all link tags for stylesheets
    const linkTags = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .map(link => link.outerHTML)
      .join('\n');

    // Get all inline styles from style tags
    const styleTags = Array.from(document.querySelectorAll('style'))
      .map(style => style.outerHTML)
      .join('\n');

    // Create print-specific styles
    const printStyles = `
      <style>
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }

        body {
          margin: 0;
          padding: 0;
          background: white !important;
          font-family: Arial, sans-serif;
          width: 100%;
          max-width: 1024px;
          margin: 0 auto;
        }

        img {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }

        .page-break {
          page-break-after: always;
          break-after: page;
        }

        @media print {
          @page {
            size: A4;
            margin: 10mm 15mm;
          }

          body {
            padding: 0;
            margin: 0 auto;
            width: 1024px;
            max-width: 1024px;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          .page-break {
            page-break-after: always;
            break-after: page;
          }

          /* Ensure desktop layout in print */
          .invoice-container {
            width: 1024px !important;
            max-width: 1024px !important;
            margin: 0 auto !important;
          }
        }

        @media screen {
          body {
            padding: 20px;
            background: #f5f5f5 !important;
          }
        }
      </style>
    `;

    // Try to open a popup window first
    const printWindow = window.open('', '_blank', 'width=1024,height=768');

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
            ${linkTags}
            ${styleTags}
            ${printStyles}
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
      }, 500);

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
          ${linkTags}
          ${styleTags}
          ${printStyles}
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
      }, 500);
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