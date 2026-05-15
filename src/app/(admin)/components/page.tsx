"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Bell, Heart, Settings, Star, Trash2, User } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function ComponentsShowcasePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Components</h1>
        <p className="text-sm text-muted-foreground">UI primitives and component library overview</p>
      </div>

      <Tabs defaultValue="buttons">
        <TabsList>
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="avatars">Avatars</TabsTrigger>
          <TabsTrigger value="controls">Controls</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
        </TabsList>

        <TabsContent value="buttons" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Button Variants</CardTitle>
              <CardDescription>All button variant and size combinations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium">VARIANT</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="default" className="cursor-pointer">Default</Button>
                  <Button variant="outline" className="cursor-pointer">Outline</Button>
                  <Button variant="secondary" className="cursor-pointer">Secondary</Button>
                  <Button variant="ghost" className="cursor-pointer">Ghost</Button>
                  <Button variant="destructive" className="cursor-pointer">Destructive</Button>
                  <Button variant="link" className="cursor-pointer">Link</Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium">SIZES</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="xs" className="cursor-pointer">XS</Button>
                  <Button size="sm" className="cursor-pointer">Small</Button>
                  <Button size="default" className="cursor-pointer">Default</Button>
                  <Button size="lg" className="cursor-pointer">Large</Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium">WITH ICONS</p>
                <div className="flex flex-wrap gap-2">
                  <Button className="cursor-pointer"><Heart className="h-4 w-4" /> Like</Button>
                  <Button variant="outline" className="cursor-pointer"><Settings className="h-4 w-4" /> Settings</Button>
                  <Button variant="destructive" className="cursor-pointer"><Trash2 className="h-4 w-4" /> Delete</Button>
                  <Button size="icon" className="cursor-pointer"><Bell className="h-4 w-4" /></Button>
                  <Button size="icon-sm" className="cursor-pointer"><Star className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Badge Variants</CardTitle>
              <CardDescription>Badge component with all variants</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="ghost">Ghost</Badge>
                <Badge variant="link">Link</Badge>
              </div>
              <Separator />
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-success/10 text-success border-success/20">Success</Badge>
                <Badge className="bg-warning/10 text-warning border-warning/20">Warning</Badge>
                <Badge className="bg-info/10 text-info border-info/20">Info</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="avatars" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Avatar Sizes & Groups</CardTitle>
              <CardDescription>Avatar component with sizes and grouped display</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-end gap-4">
                <Avatar size="sm"><AvatarFallback>JD</AvatarFallback></Avatar>
                <Avatar><AvatarFallback>AK</AvatarFallback></Avatar>
                <Avatar size="lg"><AvatarFallback>SW</AvatarFallback></Avatar>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium">AVATAR GROUP</p>
                <AvatarGroup>
                  <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
                  <Avatar><AvatarFallback>AK</AvatarFallback></Avatar>
                  <Avatar><AvatarFallback>SW</AvatarFallback></Avatar>
                  <Avatar><AvatarFallback>EM</AvatarFallback></Avatar>
                  <AvatarGroupCount>+3</AvatarGroupCount>
                </AvatarGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="controls" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Form Controls</CardTitle>
              <CardDescription>Checkbox, switch, and other input controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground font-medium">CHECKBOXES</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2"><Checkbox id="c1" /><Label htmlFor="c1">Option 1</Label></div>
                  <div className="flex items-center gap-2"><Checkbox id="c2" defaultChecked /><Label htmlFor="c2">Option 2</Label></div>
                  <div className="flex items-center gap-2"><Checkbox id="c3" disabled /><Label htmlFor="c3" className="text-muted-foreground">Disabled</Label></div>
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground font-medium">SWITCHES</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2"><Switch id="s1" /><Label htmlFor="s1">Wi-Fi</Label></div>
                  <div className="flex items-center gap-2"><Switch id="s2" defaultChecked /><Label htmlFor="s2">Bluetooth</Label></div>
                  <div className="flex items-center gap-2"><Switch id="s3" disabled /><Label htmlFor="s3" className="text-muted-foreground">Disabled</Label></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Alert Variants</CardTitle>
              <CardDescription>Alert component with different severity levels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Alert variant="default">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Default Alert</AlertTitle>
                <AlertDescription>This is a default alert with an icon.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Destructive Alert</AlertTitle>
                <AlertDescription>This is a destructive alert for errors.</AlertDescription>
              </Alert>
              <Alert className="border-success/20 bg-success/5">
                <AlertCircle className="h-4 w-4 text-success" />
                <AlertTitle className="text-success">Success Alert</AlertTitle>
                <AlertDescription>Operation completed successfully.</AlertDescription>
              </Alert>
              <Alert className="border-warning/20 bg-warning/5">
                <AlertCircle className="h-4 w-4 text-warning" />
                <AlertTitle className="text-warning">Warning Alert</AlertTitle>
                <AlertDescription>Please review before proceeding.</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cards" className="mt-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Simple Card</CardTitle>
                <CardDescription>Card with title and description</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Card content goes here. This is a basic card layout with header and content sections.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-base">With Icon</CardTitle>
                </div>
                <CardDescription>Card with icon in the header</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Cards can include icons in the header for visual context.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center gap-2">
                  <Settings className="h-8 w-8 text-muted-foreground" />
                  <CardTitle className="text-base">Content-Only Card</CardTitle>
                  <p className="text-sm text-muted-foreground">Card without a separate header section.</p>
                  <Button size="sm" className="mt-2 cursor-pointer">Action</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
