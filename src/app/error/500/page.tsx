import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ServerCrash } from "lucide-react";

export default function ServerErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <ServerCrash className="h-16 w-16 mx-auto text-muted-foreground" />
        <h1 className="text-3xl font-bold tracking-tight">500</h1>
        <p className="text-muted-foreground">Something went wrong on our end. Please try again.</p>
        <Link href="/dashboard/finance"><Button>Go to Dashboard</Button></Link>
      </div>
    </div>
  );
}
