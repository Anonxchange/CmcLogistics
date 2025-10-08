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
          size: A4 portrait;
          margin: 0;
        }

        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }

        /* Hide everything first */
        body * {
          visibility: hidden !important;
        }

        /* Show only the invoice and its children */
        .print-invoice-wrapper,
        .print-invoice-wrapper * {
          visibility: visible !important;
        }

        /* Hide dialog overlay, buttons, headers */
        [data-radix-dialog-overlay],
        button,
        .no-print,
        [role="dialog"] > div:first-child,
        h2:has(+ p) {
          display: none !important;
          visibility: hidden !important;
        }

        /* Position invoice for print */
        .print-invoice-wrapper {
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          background: white !important;
          border: none !important;
        }

        .invoice-container {
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        /* Force page breaks between pages */
        .page-break {
          page-break-after: always !important;
          break-after: page !important;
          display: block !important;
        }

        /* Prevent content from splitting across pages */
        .border-2 {
          page-break-inside: avoid !important;
        }

        /* Ensure images and colors print */
        img {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
          max-width: 100% !important;
        }

        /* Ensure borders and backgrounds print */
        * {
          box-shadow: none !important;
        }

        /* Remove margin between pages */
        .mt-8 {
          margin-top: 0 !important;
        }
      }
    `;

    // Small delay to ensure styles are applied
    setTimeout(() => {
      window.print();
    }, 100);
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