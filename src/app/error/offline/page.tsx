"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { WifiOff, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  if (isOnline) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="text-center">
          <WifiOff className="mx-auto h-12 w-12 text-success" />
          <h1 className="mt-4 text-xl font-semibold tracking-tight">You&apos;re Back Online</h1>
          <p className="mt-2 text-sm text-muted-foreground">Your connection has been restored.</p>
          <Link href="/dashboard/finance">
            <Button className="mt-6">Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="text-center">
        <WifiOff className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 text-xl font-semibold tracking-tight">No Internet Connection</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You appear to be offline. Check your connection and try again.
        </p>
        <Button
          className="mt-6"
          onClick={() => window.location.reload()}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
