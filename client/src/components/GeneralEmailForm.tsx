
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Mail, Send, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

const getHtmlTemplate = (title: string, content: string, trackingNumber?: string) => {
  const trackingUrl = `${window.location.origin}/track`;
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
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
          <tr>
            <td style="padding: 30px 30px 20px 30px;">
              <h2 style="color: #1e3a8a; margin: 0; font-size: 24px; font-weight: 600;">${title}</h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 30px 20px 30px; color: #4b5563; font-size: 16px; line-height: 1.6;">
              ${content.split('\n\n').map(para => para.trim()).filter(para => para.length > 0).map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`).join('\n')}
            </td>
          </tr>
          ${trackingNumber ? `
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; border: 2px solid #e5e7eb;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px; font-weight: 600; text-transform: uppercase;">Tracking Number</p>
                    <p style="margin: 0 0 15px 0; color: #1e3a8a; font-size: 24px; font-weight: 700; font-family: 'Courier New', monospace;">${trackingNumber}</p>
                    <a href="${trackingUrl}" style="display: inline-block; background-color: #3b82f6; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px;">Track Your Shipment</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">Need help? Contact our support team</p>
              <p style="margin: 0 0 15px 0;">
                <a href="mailto:support@cmcautoslogistics.com" style="color: #3b82f6; text-decoration: none; font-weight: 600;">support@cmcautoslogistics.com</a>
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
  general: {
    subject: 'Message from CMC Logistics',
    title: 'Important Update',
  },
  welcome: {
    subject: 'Welcome to CMC Logistics',
    title: 'Welcome to CMC Logistics!',
  },
  update: {
    subject: 'Important Update - CMC Logistics',
    title: 'Important Update',
  },
  notification: {
    subject: 'Notification from CMC Logistics',
    title: 'Notification',
  },
};

export default function GeneralEmailForm() {
  const [templateType, setTemplateType] = useState('general');
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState(emailTemplates.general.subject);
  const [emailTitle, setEmailTitle] = useState(emailTemplates.general.title);
  const [message, setMessage] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleTemplateChange = (value: string) => {
    setTemplateType(value);
    const template = emailTemplates[value as keyof typeof emailTemplates];
    setSubject(template.subject);
    setEmailTitle(template.title);
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

    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      const finalBody = getHtmlTemplate(emailTitle, message, trackingNumber || undefined);

      const { error } = await supabase.functions.invoke('send-email', {
        body: {
          to: recipient,
          subject: subject,
          html: finalBody,
        }
      });

      if (error) throw error;

      toast({
        title: "Email Sent Successfully",
        description: `Email sent to ${recipient}`,
      });

      // Reset form
      setRecipient('');
      setMessage('');
      setTrackingNumber('');
      setShowPreview(false);
    } catch (error) {
      console.error('Send email error:', error);
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Compose Email</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? <Mail className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
          {showPreview ? 'Edit' : 'Preview'}
        </Button>
      </div>

      {!showPreview ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="template">Email Template</Label>
              <Select value={templateType} onValueChange={handleTemplateChange}>
                <SelectTrigger id="template">
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Message</SelectItem>
                  <SelectItem value="welcome">Welcome Email</SelectItem>
                  <SelectItem value="update">Important Update</SelectItem>
                  <SelectItem value="notification">Notification</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Email *</Label>
              <Input
                id="recipient"
                type="email"
                placeholder="customer@example.com"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject Line *</Label>
            <Input
              id="subject"
              placeholder="Email subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email-title">Email Title *</Label>
            <Input
              id="email-title"
              placeholder="e.g., Important Update"
              value={emailTitle}
              onChange={(e) => setEmailTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tracking-number">Tracking Number (Optional)</Label>
            <Input
              id="tracking-number"
              placeholder="Enter tracking number to include in email"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              If provided, a tracking section will be added to the email
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Your Message *</Label>
            <Textarea
              id="message"
              placeholder="Type your message here. Use line breaks for new paragraphs."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={10}
            />
            <p className="text-xs text-muted-foreground">
              Your message will be automatically formatted in a professional template
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Card className="p-4">
            <div className="mb-4 pb-4 border-b">
              <p className="text-sm"><strong>To:</strong> {recipient || 'customer@example.com'}</p>
              <p className="text-sm"><strong>Subject:</strong> {subject}</p>
            </div>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: getHtmlTemplate(emailTitle, message || 'Your message will appear here...', trackingNumber || undefined) }} 
            />
          </Card>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button
          onClick={handleSend}
          disabled={isSending}
          size="lg"
        >
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
      </div>
    </div>
  );
}
