import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Building2, Globe } from "lucide-react";

interface ContactWidgetProps {
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  company?: string;
  website?: string;
  taxId?: string;
  className?: string;
}

export function ContactWidget({ email, phone, address, city, country, company, website, taxId, className }: ContactWidgetProps) {
  const items = [
    { icon: Mail, label: email, href: `mailto:${email}` },
    ...(phone ? [{ icon: Phone, label: phone, href: `tel:${phone}` }] : []),
    ...(address || city || country
      ? [{ icon: MapPin, label: [address, city, country].filter(Boolean).join(", "), href: undefined }]
      : []),
    ...(company ? [{ icon: Building2, label: company, href: undefined }] : []),
    ...(website ? [{ icon: Globe, label: website, href: website.startsWith("http") ? website : `https://${website}` }] : []),
  ];

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item, i) => (
          <div key={i}>
            <div className="flex items-center gap-3 text-sm">
              <item.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
              {item.href ? (
                <a href={item.href} className="hover:underline truncate">
                  {item.label}
                </a>
              ) : (
                <span className="truncate">{item.label}</span>
              )}
            </div>
            {i < items.length - 1 && <Separator className="mt-3" />}
          </div>
        ))}
        {taxId && (
          <>
            <Separator />
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground font-medium">Tax ID:</span>
              <span className="font-mono text-xs">{taxId}</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
