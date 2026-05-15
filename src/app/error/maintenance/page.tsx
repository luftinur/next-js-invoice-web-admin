import { Wrench } from "lucide-react";

export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <Wrench className="h-16 w-16 mx-auto text-muted-foreground" />
        <h1 className="text-3xl font-bold tracking-tight">Under Maintenance</h1>
        <p className="text-muted-foreground">We&apos;re performing some updates. We&apos;ll be back shortly.</p>
      </div>
    </div>
  );
}
