"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  Mail, Globe, BellRing, CheckCircle2, XCircle, Loader2, Eye, EyeOff,
} from "lucide-react";
import {
  useNotificationChannelsStore,
  eventLabels,
  type EmailChannelConfig,
  type WebhookChannelConfig,
  type PushChannelConfig,
  type NotificationEvent,
} from "@/store/notification-channels-store";

interface EventToggleProps {
  events: NotificationEvent[];
  onChange: (events: NotificationEvent[]) => void;
}

function EventToggles({ events, onChange }: EventToggleProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {(Object.entries(eventLabels) as [NotificationEvent, string][]).map(([key, label]) => {
        const active = events.includes(key);
        return (
          <button
            key={key}
            type="button"
            onClick={() =>
              onChange(active ? events.filter((e) => e !== key) : [...events, key])
            }
            className={cn(
              "rounded-md px-2 py-0.5 text-[10px] font-medium transition-colors cursor-pointer",
              active
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function TestResult({ success }: { success: boolean | null }) {
  if (success === null) return null;
  return (
    <div className={cn(
      "flex items-center gap-1.5 text-xs",
      success ? "text-success" : "text-destructive"
    )}>
      {success ? (
        <><CheckCircle2 className="h-3 w-3" /> Test successful</>
      ) : (
        <><XCircle className="h-3 w-3" /> Test failed</>
      )}
    </div>
  );
}

export function EmailChannelCard({ className }: { className?: string }) {
  const { email, updateEmail } = useNotificationChannelsStore();
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<boolean | null>(null);
  const [showPass, setShowPass] = useState(false);

  const handleTest = async () => {
    setTesting(true);
    const result = await useNotificationChannelsStore.getState().testEmail();
    setTestResult(result);
    setTesting(false);
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-sm">Email</CardTitle>
          </div>
          <Switch checked={email.enabled} onCheckedChange={(v) => updateEmail({ enabled: v })} />
        </div>
        <CardDescription>SMTP configuration for email notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">SMTP Host</label>
            <Input  placeholder="smtp.example.com" value={email.smtpHost} onChange={(e) => updateEmail({ smtpHost: e.target.value })} disabled={!email.enabled} />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Port</label>
            <Input  type="number" value={email.smtpPort} onChange={(e) => updateEmail({ smtpPort: parseInt(e.target.value) || 587 })} disabled={!email.enabled} />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">SMTP User</label>
          <Input  placeholder="user@example.com" value={email.smtpUser} onChange={(e) => updateEmail({ smtpUser: e.target.value })} disabled={!email.enabled} />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">SMTP Password</label>
          <div className="relative">
            <Input  type={showPass ? "text" : "password"} placeholder="********" value={email.smtpPass} onChange={(e) => updateEmail({ smtpPass: e.target.value })} disabled={!email.enabled} />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer">
              {showPass ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">From Email</label>
            <Input  placeholder="noreply@example.com" value={email.fromEmail} onChange={(e) => updateEmail({ fromEmail: e.target.value })} disabled={!email.enabled} />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">From Name</label>
            <Input  placeholder="InvoiceCore" value={email.fromName} onChange={(e) => updateEmail({ fromName: e.target.value })} disabled={!email.enabled} />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground">Trigger Events</label>
          <EventToggles events={email.events} onChange={(e) => updateEmail({ events: e })} />
        </div>
        <div className="flex items-center justify-between pt-1">
          <TestResult success={testResult} />
          <Button size="xs" variant="outline" onClick={handleTest} disabled={testing || !email.enabled}>
            {testing ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
            {testing ? "Testing..." : "Test Connection"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function WebhookChannelCard({ className }: { className?: string }) {
  const { webhook, updateWebhook } = useNotificationChannelsStore();
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<boolean | null>(null);
  const [showSecret, setShowSecret] = useState(false);

  const handleTest = async () => {
    setTesting(true);
    const result = await useNotificationChannelsStore.getState().testWebhook();
    setTestResult(result);
    setTesting(false);
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-sm">Webhook</CardTitle>
          </div>
          <Switch checked={webhook.enabled} onCheckedChange={(v) => updateWebhook({ enabled: v })} />
        </div>
        <CardDescription>HTTP callbacks for real-time event delivery</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">Webhook URL</label>
          <Input  placeholder="https://hooks.example.com/notify" value={webhook.url} onChange={(e) => updateWebhook({ url: e.target.value })} disabled={!webhook.enabled} />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">Secret Key</label>
          <div className="relative">
            <Input  type={showSecret ? "text" : "password"} placeholder="********" value={webhook.secret} onChange={(e) => updateWebhook({ secret: e.target.value })} disabled={!webhook.enabled} />
            <button type="button" onClick={() => setShowSecret(!showSecret)} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer">
              {showSecret ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground">Trigger Events</label>
          <EventToggles events={webhook.events} onChange={(e) => updateWebhook({ events: e })} />
        </div>
        <div className="flex items-center justify-between pt-1">
          <TestResult success={testResult} />
          <Button size="xs" variant="outline" onClick={handleTest} disabled={testing || !webhook.enabled}>
            {testing ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
            {testing ? "Testing..." : "Test Webhook"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function PushChannelCard({ className }: { className?: string }) {
  const { push, updatePush } = useNotificationChannelsStore();
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<boolean | null>(null);
  const [showPrivate, setShowPrivate] = useState(false);

  const handleTest = async () => {
    setTesting(true);
    const result = await useNotificationChannelsStore.getState().testPush();
    setTestResult(result);
    setTesting(false);
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BellRing className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-sm">Push Notifications</CardTitle>
          </div>
          <Switch checked={push.enabled} onCheckedChange={(v) => updatePush({ enabled: v })} />
        </div>
        <CardDescription>Browser push notification delivery</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">VAPID Public Key</label>
          <Input  placeholder="BBk..." value={push.vapidPublicKey} onChange={(e) => updatePush({ vapidPublicKey: e.target.value })} disabled={!push.enabled} />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">VAPID Private Key</label>
          <div className="relative">
            <Input  type={showPrivate ? "text" : "password"} placeholder="********" value={push.vapidPrivateKey} onChange={(e) => updatePush({ vapidPrivateKey: e.target.value })} disabled={!push.enabled} />
            <button type="button" onClick={() => setShowPrivate(!showPrivate)} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer">
              {showPrivate ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground">Trigger Events</label>
          <EventToggles events={push.events} onChange={(e) => updatePush({ events: e })} />
        </div>
        <div className="flex items-center justify-between pt-1">
          <TestResult success={testResult} />
          <Button size="xs" variant="outline" onClick={handleTest} disabled={testing || !push.enabled}>
            {testing ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
            {testing ? "Testing..." : "Test Push"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
