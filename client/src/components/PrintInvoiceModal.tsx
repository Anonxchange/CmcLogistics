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

  const handlePrint = async () => {
    const printContents = invoiceRef.current;
    if (!printContents) return;

    // Clone the content to avoid modifying the original
    const clonedContent = printContents.cloneNode(true) as HTMLElement;
    
    // Convert all images to absolute URLs
    const images = clonedContent.getElementsByTagName('img');
    for (let img of Array.from(images)) {
      const src = img.getAttribute('src');
      if (src && src.startsWith('/')) {
        // Convert relative URLs to absolute URLs
        img.setAttribute('src', window.location.origin + src);
      }
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Get Tailwind styles from link tags
    const tailwindLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .map(link => `<link rel="stylesheet" href="${(link as HTMLLinkElement).href}">`)
      .join('\n');

    // Get inline styles
    const styles = Array.from(document.styleSheets)
      .map(styleSheet => {
        try {
          return Array.from(styleSheet.cssRules)
            .map(rule => rule.cssText)
            .join('\n');
        } catch (e) {
          return '';
        }
      })
      .join('\n');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - ${shipment?.tracking_number || 'N/A'}</title>
          <meta charset="utf-8">
          ${tailwindLinks}
          <style>
            ${styles}
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            body {
              font-family: Arial, sans-serif;
              background: white;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              color-adjust: exact;
            }

            @page {
              size: A4;
              margin: 10mm;
            }

            @media print {
              body {
                margin: 0;
                padding: 0;
              }

              .no-print {
                display: none !important;
              }

              * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
              }
            }
          </style>
        </head>
        <body>
          ${clonedContent.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();

    // Wait for images and styles to load
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 1000);
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

        <div className="flex gap-2 justify-end mb-4 no-print">
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