"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RevenueLineChart } from "@/components/charts/revenue-line-chart";
import { ExpensePieChart } from "@/components/charts/expense-pie-chart";
import { PaymentBarChart } from "@/components/charts/payment-bar-chart";
import { CashflowChart } from "@/components/charts/cashflow-chart";
import { GrowthAreaChart } from "@/components/charts/growth-area-chart";

export default function ChartsShowcasePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Charts</h1>
        <p className="text-sm text-muted-foreground">Recharts-based chart components for data visualization</p>
      </div>

      <Tabs defaultValue="line">
        <TabsList>
          <TabsTrigger value="line">Line</TabsTrigger>
          <TabsTrigger value="bar">Bar</TabsTrigger>
          <TabsTrigger value="pie">Pie</TabsTrigger>
          <TabsTrigger value="area">Area</TabsTrigger>
        </TabsList>

        <TabsContent value="line" className="mt-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue vs expenses line chart</CardDescription>
              </CardHeader>
              <CardContent>
                <RevenueLineChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Income Overview</CardTitle>
                <CardDescription>Line chart with single data series</CardDescription>
              </CardHeader>
              <CardContent>
                <RevenueLineChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bar" className="mt-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Payment Breakdown</CardTitle>
                <CardDescription>Stacked bar chart by payment status</CardDescription>
              </CardHeader>
              <CardContent>
                <PaymentBarChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Cashflow Summary</CardTitle>
                <CardDescription>Bar chart with cash inflow/outflow</CardDescription>
              </CardHeader>
              <CardContent>
                <CashflowChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pie" className="mt-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Expense Distribution</CardTitle>
                <CardDescription>Donut chart showing expense categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ExpensePieChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Growth Overview</CardTitle>
                <CardDescription>Area chart with revenue growth</CardDescription>
              </CardHeader>
              <CardContent>
                <GrowthAreaChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="area" className="mt-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-base">Growth Area Chart</CardTitle>
              <CardDescription>Filled area chart showing cumulative growth</CardDescription>
            </CardHeader>
            <CardContent>
              <GrowthAreaChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
