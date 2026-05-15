import { Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AuthPageWrapper } from "@/components/ui/auth-page-wrapper";

export default function TwoFactorPage() {
  return (
    <AuthPageWrapper>
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-info/10">
          <Shield className="h-6 w-6 text-info" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Two-factor authentication</h1>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code from your authenticator app.
          </p>
        </div>
        <div className="space-y-2 text-left">
          <Label htmlFor="code">Authentication Code</Label>
          <Input id="code" placeholder="000000" maxLength={6} className="text-center text-lg tracking-[0.5em]" />
        </div>
        <Button className="w-full">Verify</Button>
      </div>
    </AuthPageWrapper>
  );
}
