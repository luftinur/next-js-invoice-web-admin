"use client";

import { usePluginStore } from "@/store/plugin-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Puzzle, Plug, ExternalLink, Zap, Wrench } from "lucide-react";

const externalIntegrations = [
  { name: "Stripe", description: "Payment processing", status: "connected", icon: Zap },
  { name: "PayPal", description: "Payment gateway", status: "available", icon: Plug },
  { name: "QuickBooks", description: "Accounting sync", status: "available", icon: Puzzle },
  { name: "Slack", description: "Notifications", status: "connected", icon: Plug },
  { name: "Mailchimp", description: "Email marketing", status: "available", icon: Puzzle },
  { name: "HubSpot", description: "CRM integration", status: "available", icon: Puzzle },
];

export default function IntegrationsPage() {
  const registry = usePluginStore((s) => s.registry);
  const plugins = usePluginStore((s) => s.plugins);
  const togglePlugin = usePluginStore((s) => s.togglePlugin);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Integrations</h1>
        <p className="text-sm text-muted-foreground">Connect external services and manage built-in plugins</p>
      </div>

      <Tabs defaultValue="services">
        <TabsList>
          <TabsTrigger value="services" className="cursor-pointer"><Plug className="h-3.5 w-3.5" /> Services</TabsTrigger>
          <TabsTrigger value="plugins" className="cursor-pointer"><Wrench className="h-3.5 w-3.5" /> Plugins ({registry.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {externalIntegrations.map((integration) => (
              <Card key={integration.name}>
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted mb-2">
                    <integration.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base">{integration.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                  <Button
                    variant={integration.status === "connected" ? "outline" : "default"}
                    size="sm"
                    className="mt-4 w-full cursor-pointer"
                  >
                    {integration.status === "connected" ? (
                      <>Connected <ExternalLink className="h-3 w-3 ml-1" /></>
                    ) : (
                      <>Connect</>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="plugins" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {registry.map((plugin) => {
              const config = plugins[plugin.id];
              const enabled = config?.enabled ?? false;
              return (
                <Card key={plugin.id}>
                  <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <CardTitle className="text-sm">{plugin.name}</CardTitle>
                    <Badge variant={enabled ? "default" : "secondary"} className="cursor-pointer" onClick={() => togglePlugin(plugin.id)}>
                      {enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground line-clamp-2">{plugin.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[10px] text-muted-foreground">v{plugin.version}</span>
                      <a href="/plugins" className="inline-flex items-center justify-center rounded-md text-xs font-medium h-7 px-2 text-muted-foreground hover:text-foreground hover:bg-accent cursor-pointer">
                        Manage
                      </a>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
