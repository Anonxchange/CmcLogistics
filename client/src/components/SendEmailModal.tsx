
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Mail, Send, Eye, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface SendEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipment: any;
}

const getHtmlTemplate = (title: string, content: string, shipment: any, customStyles?: string) => {
  const trackingUrl = `${window.location.origin}/track`;
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  ${customStyles ? `<style>${customStyles}</style>` : ''}
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 40px 30px; text-align: center;">
              <div style="background-color: white; width: 60px; height: 60px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" stroke-width="2">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </div>
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">CMC Logistics</h1>
              <p style="color: #e0e7ff; margin: 8px 0 0 0; font-size: 14px;">Your Trusted Shipping Partner</p>
            </td>
          </tr>
          
          <!-- Title -->
          <tr>
            <td style="padding: 30px 30px 20px 30px;">
              <h2 style="color: #1e3a8a; margin: 0; font-size: 24px; font-weight: 600;">${title}</h2>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 0 30px 20px 30px; color: #4b5563; font-size: 16px; line-height: 1.6;">
              ${content}
            </td>
          </tr>
          
          <!-- Tracking Box -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; border: 2px solid #e5e7eb;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px; font-weight: 600; text-transform: uppercase;">Tracking Number</p>
                    <p style="margin: 0 0 15px 0; color: #1e3a8a; font-size: 24px; font-weight: 700; font-family: 'Courier New', monospace;">${shipment?.tracking_number || 'N/A'}</p>
                    <a href="${trackingUrl}" style="display: inline-block; background-color: #3b82f6; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px;">Track Your Shipment</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Shipment Details -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 12px; background-color: #f9fafb; border-radius: 6px 6px 0 0;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Service Type</p>
                    <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 16px; font-weight: 600;">${shipment?.service_type || 'Standard'}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #ffffff; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Estimated Delivery</p>
                    <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 16px; font-weight: 600;">${shipment?.estimated_delivery ? new Date(shipment.estimated_delivery).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'TBD'}</p>
                  </td>
                </tr>
                ${shipment?.current_location ? `
                <tr>
                  <td style="padding: 12px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; border-radius: 0 0 6px 6px;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Current Location</p>
                    <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 16px; font-weight: 600;">${shipment.current_location}</p>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">Need help? Contact our support team</p>
              <p style="margin: 0 0 15px 0;">
                <a href="mailto:support@cmclogistics.com" style="color: #3b82f6; text-decoration: none; font-weight: 600;">support@cmclogistics.com</a> | 
                <a href="tel:+1 (815) 257-1522" style="color: #3b82f6; text-decoration: none; font-weight: 600;">+1 (815) 257-1522</a>
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">&copy; ${new Date().getFullYear()} CMC Logistics. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

const emailTemplates = {
  shipment_created: {
    subject: 'Your Shipment Has Been Created - [TRACKING_NUMBER]',
    title: 'Shipment Created Successfully!',
    body: `Dear [CUSTOMER_NAME],

Your shipment with tracking number [TRACKING_NUMBER] has been successfully created.

Shipment Details:
- Service Type: [SERVICE_TYPE]
- Estimated Delivery: [DELIVERY_DATE]

You can track your shipment anytime at: [TRACKING_URL]

Thank you for choosing CMC Logistics!

Best regards,
CMC Logistics Team`,
    htmlContent: `<p>Dear <strong>[CUSTOMER_NAME]</strong>,</p>
<p>Great news! Your shipment has been successfully created and is now being processed by our team.</p>
<p>We've received your package and will keep you updated every step of the way. You can track your shipment in real-time using the tracking number below.</p>`
  },
  in_transit: {
    subject: 'Your Shipment is In Transit - [TRACKING_NUMBER]',
    title: 'Your Shipment is On the Way!',
    body: `Dear [CUSTOMER_NAME],

Good news! Your shipment [TRACKING_NUMBER] is now in transit.

Current Status: In Transit
Current Location: [LOCATION]
Estimated Delivery: [DELIVERY_DATE]

Track your shipment: [TRACKING_URL]

Best regards,
CMC Logistics Team`,
    htmlContent: `<p>Dear <strong>[CUSTOMER_NAME]</strong>,</p>
<p>Exciting update! Your shipment is now <span style="color: #3b82f6; font-weight: 600;">in transit</span> and making its way to you.</p>
<p>Our logistics team is working hard to ensure your package arrives safely and on time. You can track its progress in real-time using the tracking information below.</p>`
  },
  out_for_delivery: {
    subject: 'Out for Delivery Today - [TRACKING_NUMBER]',
    title: 'Out for Delivery Today!',
    body: `Dear [CUSTOMER_NAME],

Your shipment [TRACKING_NUMBER] is out for delivery today!

Expected delivery time: [DELIVERY_DATE]
Current location: [LOCATION]

Please ensure someone is available to receive the package.

Track your shipment: [TRACKING_URL]

Best regards,
CMC Logistics Team`,
    htmlContent: `<p>Dear <strong>[CUSTOMER_NAME]</strong>,</p>
<p style="font-size: 18px; color: #3b82f6; font-weight: 600;">Your package is arriving today!</p>
<p>Our delivery driver is on the way with your shipment. Please ensure someone is available to receive the package.</p>
<p>If you have any special delivery instructions, please contact us immediately.</p>`
  },
  delivered: {
    subject: 'Delivered Successfully - [TRACKING_NUMBER]',
    title: 'Delivered Successfully! 🎉',
    body: `Dear [CUSTOMER_NAME],

Your shipment [TRACKING_NUMBER] has been successfully delivered!

Delivery Date: [DELIVERY_DATE]
Delivery Location: [LOCATION]

Thank you for choosing CMC Logistics. We hope to serve you again soon!

Track your shipment: [TRACKING_URL]

Best regards,
CMC Logistics Team`,
    htmlContent: `<p>Dear <strong>[CUSTOMER_NAME]</strong>,</p>
<p style="font-size: 18px; color: #10b981; font-weight: 600;">Your package has been delivered!</p>
<p>We're happy to confirm that your shipment has been successfully delivered. We hope you're satisfied with our service!</p>
<p>Thank you for choosing CMC Logistics. We look forward to serving you again in the future.</p>`
  },
  delayed: {
    subject: 'Shipment Delay Notification - [TRACKING_NUMBER]',
    title: 'Shipment Delay Notification',
    body: `Dear [CUSTOMER_NAME],

We regret to inform you that your shipment [TRACKING_NUMBER] has been delayed.

Current Status: Delayed
Current Location: [LOCATION]
Revised Delivery Estimate: [DELIVERY_DATE]

We apologize for any inconvenience and are working to deliver your package as soon as possible.

Track your shipment: [TRACKING_URL]

Best regards,
CMC Logistics Team`,
    htmlContent: `<p>Dear <strong>[CUSTOMER_NAME]</strong>,</p>
<p>We sincerely apologize for the delay in your shipment delivery.</p>
<p>Our team is actively working to resolve the situation and get your package to you as quickly as possible. We understand how important timely delivery is, and we appreciate your patience.</p>
<p>If you have any concerns or questions, please don't hesitate to contact our customer support team.</p>`
  },
  custom: {
    subject: 'Update on Your Shipment - [TRACKING_NUMBER]',
    title: 'Shipment Update',
    body: `Dear [CUSTOMER_NAME],

We wanted to send you an update regarding your shipment [TRACKING_NUMBER].

[Write your custom message here]

Track your shipment: [TRACKING_URL]

Best regards,
CMC Logistics Team`,
    htmlContent: `<p>Dear <strong>[CUSTOMER_NAME]</strong>,</p>
<p>We wanted to send you an update regarding your shipment.</p>
<p>[Write your custom message here]</p>`
  }
};

export default function SendEmailModal({ isOpen, onClose, shipment }: SendEmailModalProps) {
  const [templateType, setTemplateType] = useState('shipment_created');
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [emailTitle, setEmailTitle] = useState('');
  const [body, setBody] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [customStyles, setCustomStyles] = useState('');
  const [useHtmlTemplate, setUseHtmlTemplate] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (shipment) {
      setRecipient(shipment.recipient_email || '');
    }
  }, [shipment]);

  useEffect(() => {
    const template = emailTemplates[templateType as keyof typeof emailTemplates];
    setSubject(template.subject);
    setEmailTitle(template.title);
    setBody(template.body);
    setHtmlContent(template.htmlContent);
  }, [templateType]);

  const handleTemplateChange = (value: string) => {
    setTemplateType(value);
  };

  const replacePlaceholders = (text: string) => {
    if (!shipment) return text;
    
    const trackingUrl = `${window.location.origin}/track`;
    
    return text
      .replace(/\[CUSTOMER_NAME\]/g, shipment.recipient_name || 'Valued Customer')
      .replace(/\[TRACKING_NUMBER\]/g, shipment.tracking_number || 'N/A')
      .replace(/\[SERVICE_TYPE\]/g, shipment.service_type || 'Standard')
      .replace(/\[DELIVERY_DATE\]/g, shipment.estimated_delivery ? new Date(shipment.estimated_delivery).toLocaleDateString() : 'TBD')
      .replace(/\[LOCATION\]/g, shipment.current_location || 'Processing Center')
      .replace(/\[TRACKING_URL\]/g, trackingUrl);
  };

  const generatePreviewHtml = () => {
    if (!useHtmlTemplate) {
      return `<pre style="white-space: pre-wrap; font-family: monospace;">${replacePlaceholders(body)}</pre>`;
    }
    const processedContent = replacePlaceholders(htmlContent);
    const processedTitle = replacePlaceholders(emailTitle);
    return getHtmlTemplate(processedTitle, processedContent, shipment, customStyles);
  };

  const handleSend = async () => {
    if (!recipient) {
      toast({
        title: "Error",
        description: "Please enter a recipient email address",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      const finalSubject = replacePlaceholders(subject);
      const finalBody = useHtmlTemplate 
        ? getHtmlTemplate(
            replacePlaceholders(emailTitle), 
            replacePlaceholders(htmlContent), 
            shipment,
            customStyles
          )
        : replacePlaceholders(body);
      
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: recipient,
          subject: finalSubject,
          html: useHtmlTemplate ? finalBody : null,
          text: useHtmlTemplate ? null : finalBody,
          shipmentId: shipment?.id
        }
      });

      if (error) throw error;

      toast({
        title: "Email Sent Successfully",
        description: `Professional ${useHtmlTemplate ? 'HTML' : 'text'} email sent to ${recipient}`,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Send Email Notification
          </DialogTitle>
          <DialogDescription>
            Customize and send shipment updates to customer for tracking number: {shipment?.tracking_number}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="template">Email Template</Label>
              <Select value={templateType} onValueChange={handleTemplateChange}>
                <SelectTrigger id="template">
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shipment_created">Shipment Created</SelectItem>
                  <SelectItem value="in_transit">In Transit</SelectItem>
                  <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                  <SelectItem value="custom">Custom Message</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Email</Label>
              <Input
                id="recipient"
                type="email"
                placeholder="customer@example.com"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="html-mode"
                checked={useHtmlTemplate}
                onCheckedChange={setUseHtmlTemplate}
              />
              <Label htmlFor="html-mode">Use HTML Template</Label>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? <Edit className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showPreview ? 'Edit' : 'Preview'}
            </Button>
          </div>

          {!showPreview ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject Line</Label>
                <Input
                  id="subject"
                  placeholder="Email subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              {useHtmlTemplate && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email-title">Email Title (appears in email body)</Label>
                    <Input
                      id="email-title"
                      placeholder="Email title"
                      value={emailTitle}
                      onChange={(e) => setEmailTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="html-content">HTML Content</Label>
                    <Textarea
                      id="html-content"
                      placeholder="HTML content"
                      value={htmlContent}
                      onChange={(e) => setHtmlContent(e.target.value)}
                      rows={8}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      You can use HTML tags for formatting: &lt;p&gt;, &lt;strong&gt;, &lt;span&gt;, etc.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom-styles">Custom CSS (optional)</Label>
                    <Textarea
                      id="custom-styles"
                      placeholder=".custom-class { color: red; }"
                      value={customStyles}
                      onChange={(e) => setCustomStyles(e.target.value)}
                      rows={4}
                      className="font-mono text-sm"
                    />
                  </div>
                </>
              )}

              {!useHtmlTemplate && (
                <div className="space-y-2">
                  <Label htmlFor="body">Plain Text Message</Label>
                  <Textarea
                    id="body"
                    placeholder="Email message"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={12}
                    className="font-mono text-sm"
                  />
                </div>
              )}

              <div className="bg-muted p-3 rounded-lg">
                <p className="text-xs text-muted-foreground font-semibold mb-2">Available Placeholders:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <code className="bg-background px-2 py-1 rounded">[CUSTOMER_NAME]</code>
                  <code className="bg-background px-2 py-1 rounded">[TRACKING_NUMBER]</code>
                  <code className="bg-background px-2 py-1 rounded">[SERVICE_TYPE]</code>
                  <code className="bg-background px-2 py-1 rounded">[DELIVERY_DATE]</code>
                  <code className="bg-background px-2 py-1 rounded">[LOCATION]</code>
                  <code className="bg-background px-2 py-1 rounded">[TRACKING_URL]</code>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Label>Email Preview</Label>
              <div className="border rounded-lg p-4 bg-white max-h-[500px] overflow-y-auto">
                <div className="mb-4 pb-4 border-b">
                  <p className="text-sm"><strong>To:</strong> {recipient || 'customer@example.com'}</p>
                  <p className="text-sm"><strong>Subject:</strong> {replacePlaceholders(subject)}</p>
                </div>
                <div dangerouslySetInnerHTML={{ __html: generatePreviewHtml() }} />
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSending}>
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={isSending}>
            {isSending ? (
              <>
                <Send className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Email
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
