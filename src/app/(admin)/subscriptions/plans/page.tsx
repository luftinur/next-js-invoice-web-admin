"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const plans = [
  { name: "Starter", price: 29, interval: "monthly", features: ["50 invoices/mo", "1 user", "Email support", "Basic analytics"], popular: false },
  { name: "Professional", price: 79, interval: "monthly", features: ["Unlimited invoices", "5 users", "Priority support", "Advanced reports", "API access", "Custom branding"], popular: true },
  { name: "Enterprise", price: 199, interval: "monthly", features: ["Unlimited everything", "Unlimited users", "Dedicated support", "Custom integrations", "SLA guarantee", "White-label"], popular: false },
];

export default function PlansPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Plans</h1>
        <p className="text-sm text-muted-foreground">Manage subscription plans and pricing</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={cn("flex flex-col h-full", plan.popular && "border-primary relative")}>
            {plan.popular && (
              <span className="absolute  right-2  inline-flex items-center rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground">Popular</span>
            )}
            <CardHeader>
              <CardTitle className="text-base">{plan.name}</CardTitle>
              <p className="text-2xl font-bold">${plan.price}<span className="text-sm font-normal text-muted-foreground">/{plan.interval}</span></p>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 gap-3">
              <div className="flex-1 space-y-3">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-success" />{f}</div>
                ))}
              </div>
              <Button className="w-full mt-auto" variant={plan.popular ? "default" : "outline"}>{plan.popular ? "Current Plan" : "Switch"}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
