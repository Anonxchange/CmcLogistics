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
    // Add print styles to current document
    const printStyleId = 'invoice-print-styles';
    let printStyleEl = document.getElementById(printStyleId);
    
    if (!printStyleEl) {
      printStyleEl = document.createElement('style');
      printStyleEl.id = printStyleId;
      document.head.appendChild(printStyleEl);
    }

    printStyleEl.textContent = `
      @media print {
        @page {
          size: A4;
          margin: 10mm 15mm;
        }

        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }

        /* Hide body children except dialog portal */
        body > *:not([data-radix-portal]) {
          display: none !important;
        }

        /* Hide dialog overlay and unnecessary UI */
        [data-radix-dialog-overlay],
        button,
        .no-print {
          display: none !important;
        }

        /* Show and position invoice wrapper */
        .print-invoice-wrapper {
          position: fixed !important;
          left: 0 !important;
          top: 0 !important;
          width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          background: white !important;
        }

        .invoice-container {
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 !important;
        }

        /* Page breaks */
        .page-break {
          page-break-after: always !important;
          break-after: page !important;
        }

        /* Ensure images print */
        img {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
          max-width: 100% !important;
        }
      }
    `;

    // Trigger print directly
    window.print();
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

        <div className="border rounded-lg overflow-hidden print-invoice-wrapper">
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