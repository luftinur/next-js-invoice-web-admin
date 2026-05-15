import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { AuthPageWrapper } from "@/components/ui/auth-page-wrapper";

export default function SessionTimeoutPage() {
  return (
    <AuthPageWrapper>
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
          <Clock className="h-6 w-6 text-warning" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Session expired</h1>
          <p className="text-sm text-muted-foreground">
            Your session has timed out due to inactivity. Please sign in again.
          </p>
        </div>
        <Link href="/login">
          <Button className="w-full">Sign in again</Button>
        </Link>
      </div>
    </AuthPageWrapper>
  );
}
