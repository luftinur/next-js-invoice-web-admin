"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNotificationStore } from "@/store/notification-store";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import {
  EmailChannelCard,
  WebhookChannelCard,
  PushChannelCard,
} from "@/components/notifications/channel-setup";
import { Bell, BellDot, CheckCheck, Trash2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDateTime } from "@/lib/formatting";

const typeConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  invoice_paid: { label: "Paid", variant: "default" },
  invoice_overdue: { label: "Overdue", variant: "destructive" },
  subscription_renewed: { label: "Renewed", variant: "secondary" },
  payment_failed: { label: "Failed", variant: "destructive" },
  new_customer: { label: "New", variant: "default" },
  refund_issued: { label: "Refund", variant: "secondary" },
};

export default function NotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotificationStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Notifications</h1>
          <p className="text-sm text-muted-foreground">Stay updated with the latest activity</p>
        </div>
      </div>

      <Tabs defaultValue="in-app">
        <TabsList>
          <TabsTrigger value="in-app" className="gap-1.5">
            <Bell className="h-4 w-4" />
            In-App
            {unreadCount > 0 && (
              <Badge variant="default" className="ml-1 h-5 px-1.5 text-[10px]">{unreadCount}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="channels" className="gap-1.5">
            <BellDot className="h-4 w-4" />
            Channels
          </TabsTrigger>
        </TabsList>

        <TabsContent value="in-app" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">In-App Notifications</CardTitle>
                <div className="flex items-center gap-2">
                  {notifications.length > 0 && (
                    <>
                      <Button variant="ghost" size="xs" onClick={markAllAsRead} className="gap-1">
                        <CheckCheck className="h-3.5 w-3.5" /> Mark all read
                      </Button>
                      <Button variant="ghost" size="xs" onClick={clearNotifications} className="gap-1">
                        <Trash2 className="h-3.5 w-3.5" /> Clear all
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {notifications.length === 0 ? (
                <EmptyState
                  icon={<Bell className="h-8 w-8" />}
                  title="No notifications"
                  description="You're all caught up!"
                />
              ) : (
                <div className="space-y-1">
                  {notifications.map((n) => {
                    const cfg = typeConfig[n.type] ?? { label: n.type, variant: "outline" as const };
                    return (
                      <button
                        key={n.id}
                        type="button"
                        onClick={() => markAsRead(n.id)}
                        className={cn(
                          "flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-muted/50 cursor-pointer",
                          !n.read && "bg-muted/30"
                        )}
                      >
                        <div className={cn(
                          "mt-0.5 h-2 w-2 shrink-0 rounded-full",
                          n.read ? "bg-transparent" : "bg-primary"
                        )} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">{n.title}</p>
                            <Badge variant={cfg.variant} className="text-[10px] h-4 px-1.5">{cfg.label}</Badge>
                          </div>
                          {n.description && (
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.description}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-1 shrink-0 text-[10px] text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatDateTime(n.createdAt)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <EmailChannelCard />
            <WebhookChannelCard />
            <PushChannelCard />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
