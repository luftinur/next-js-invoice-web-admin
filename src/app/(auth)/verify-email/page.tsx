import { MailCheck } from "lucide-react";
import { AuthPageWrapper } from "@/components/ui/auth-page-wrapper";

export default function VerifyEmailPage() {
  return (
    <AuthPageWrapper>
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
          <MailCheck className="h-6 w-6 text-success" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Verify your email</h1>
          <p className="text-sm text-muted-foreground">
            We&apos;ve sent a verification link to your email address. Please check your inbox.
          </p>
        </div>
      </div>
    </AuthPageWrapper>
  );
}
