"use client";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { BalanceCard } from "@/components/ui/balance-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/formatting";
import { ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";
import { ContactWidget } from "@/components/customer/contact-widget";
import { LifetimeValueWidget } from "@/components/customer/lifetime-value-widget";
import { CompanyAvatar } from "@/components/customer/company-avatar";

const customer = {
  id: "1",
  name: "John Smith",
  email: "john@acme.com",
  company: "Acme Corp",
  phone: "+1 (555) 123-4567",
  address: "123 Innovation Drive, Suite 400",
  city: "San Francisco",
  country: "CA 94105",
  status: "active" as const,
  totalInvoiced: 45000,
  totalPaid: 42000,
  outstanding: 3000,
  lifetimeValue: 125000,
  createdAt: "2025-01-15",
  taxId: "12-3456789",
};

export default function CustomerProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/customers" className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <CompanyAvatar name={customer.name} size="lg" />
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold tracking-tight">{customer.name}</h1>
              <StatusBadge status={customer.status} />
            </div>
            <p className="text-sm text-muted-foreground">Customer since {formatDate(customer.createdAt)}</p>
          </div>
        </div>
        <Button variant="outline" size="sm"><Edit className="h-4 w-4" /> Edit</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <BalanceCard label="Total Invoiced" amount={customer.totalInvoiced} />
        <BalanceCard label="Total Paid" amount={customer.totalPaid} variant="success" />
        <BalanceCard label="Outstanding" amount={customer.outstanding} variant="warning" />
        <LifetimeValueWidget customerLtv={customer.lifetimeValue} averageLtv={85000} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ContactWidget
            email={customer.email}
            phone={customer.phone}
            address={customer.address}
            city={customer.city}
            country={customer.country}
            company={customer.company}
            taxId={customer.taxId}
          />
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="transactions">
            <TabsList>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="transactions" className="mt-4">
              <div className="rounded-xl border">
                <div className="p-6 text-center text-sm text-muted-foreground">
                  Transaction history will appear here.
                </div>
              </div>
            </TabsContent>
            <TabsContent value="activity" className="mt-4">
              <div className="rounded-xl border">
                <div className="p-6 text-center text-sm text-muted-foreground">
                  Activity log will appear here.
                </div>
              </div>
            </TabsContent>
            <TabsContent value="notes" className="mt-4">
              <div className="rounded-xl border">
                <div className="p-6 text-center text-sm text-muted-foreground">
                  Notes will appear here.
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
