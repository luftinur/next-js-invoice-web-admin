"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Check, ChevronLeft, ChevronRight, CreditCard, Building2, CheckCircle2 } from "lucide-react";

const steps = [
  { id: 1, title: "Account", icon: Building2 },
  { id: 2, title: "Billing", icon: CreditCard },
  { id: 3, title: "Confirmation", icon: CheckCircle2 },
];

export default function WizardFormPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const renderStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <Label>First Name</Label>
                <Input placeholder="John" />
              </div>
              <div className="space-y-1">
                <Label>Last Name</Label>
                <Input placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-1">
              <Label>Email</Label>
              <Input type="email" placeholder="john@company.com" />
            </div>
            <div className="space-y-1">
              <Label>Company</Label>
              <Input placeholder="Company Inc." />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-1">
              <Label>Plan</Label>
              <Select defaultValue="monthly">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free — $0/mo</SelectItem>
                  <SelectItem value="starter">Starter — $29/mo</SelectItem>
                  <SelectItem value="professional">Professional — $99/mo</SelectItem>
                  <SelectItem value="enterprise">Enterprise — $299/mo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Card Number</Label>
              <Input placeholder="4242 4242 4242 4242" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <Label>Expiry</Label>
                <Input placeholder="MM/YY" />
              </div>
              <div className="space-y-1">
                <Label>CVC</Label>
                <Input placeholder="123" />
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm font-normal">
                I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a>
              </Label>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 text-center py-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">All Done!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your account has been created successfully. You can now start using all features.
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4 text-left text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-medium">Professional</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">$99/month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Next Billing</span>
                <span className="font-medium">Jun 15, 2026</span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Wizard Form</h1>
        <p className="text-sm text-muted-foreground">Multi-step form with progress indicator</p>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s.id} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors",
                      i < currentStep && "bg-success text-success-foreground",
                      i === currentStep && "bg-primary text-primary-foreground",
                      i > currentStep && "bg-muted text-muted-foreground"
                    )}
                  >
                    {i < currentStep ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                  </div>
                  <span
                    className={cn(
                      "mt-1.5 text-xs font-medium hidden sm:block",
                      i === currentStep ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {s.title}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={cn(
                      "mx-4 h-px flex-1",
                      i < currentStep ? "bg-success" : "bg-border"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-medium">Step {currentStep + 1}: {steps[currentStep].title}</h3>
              <p className="text-sm text-muted-foreground">
                {currentStep === 0 && "Tell us about yourself"}
                {currentStep === 1 && "Set up your billing information"}
                {currentStep === 2 && "Review and confirm your details"}
              </p>
            </div>
            {renderStep(currentStep)}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))} className="cursor-pointer">
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setCurrentStep(0)} className="cursor-pointer">
                  Start Over
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
