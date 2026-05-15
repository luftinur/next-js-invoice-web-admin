import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <ShieldAlert className="h-16 w-16 mx-auto text-muted-foreground" />
        <h1 className="text-3xl font-bold tracking-tight">401</h1>
        <p className="text-muted-foreground">You are not authorized to view this page.</p>
        <Link href="/login"><Button>Sign in</Button></Link>
      </div>
    </div>
  );
}
