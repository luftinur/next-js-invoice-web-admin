import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <FileQuestion className="h-16 w-16 mx-auto text-muted-foreground" />
        <h1 className="text-3xl font-bold tracking-tight">404</h1>
        <p className="text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/dashboard/finance"><Button>Go to Dashboard</Button></Link>
      </div>
    </div>
  );
}
