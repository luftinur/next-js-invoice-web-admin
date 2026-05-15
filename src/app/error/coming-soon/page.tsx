import { Rocket } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <Rocket className="h-16 w-16 mx-auto text-muted-foreground" />
        <h1 className="text-3xl font-bold tracking-tight">Coming Soon</h1>
        <p className="text-muted-foreground">We&apos;re working on something exciting. Stay tuned!</p>
      </div>
    </div>
  );
}
