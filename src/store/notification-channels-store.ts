import { create } from "zustand";
import { persist } from "zustand/middleware";

export type NotificationEvent =
  | "invoice_paid"
  | "invoice_overdue"
  | "subscription_renewed"
  | "payment_failed"
  | "new_customer"
  | "refund_issued";

export interface EmailChannelConfig {
  enabled: boolean;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  fromEmail: string;
  fromName: string;
  events: NotificationEvent[];
}

export interface WebhookChannelConfig {
  enabled: boolean;
  url: string;
  secret: string;
  events: NotificationEvent[];
}

export interface PushChannelConfig {
  enabled: boolean;
  vapidPublicKey: string;
  vapidPrivateKey: string;
  events: NotificationEvent[];
}

type PersistedState = Pick<NotificationChannelsState, "email" | "webhook" | "push">;

interface NotificationChannelsState {
  email: EmailChannelConfig;
  webhook: WebhookChannelConfig;
  push: PushChannelConfig;
  updateEmail: (config: Partial<EmailChannelConfig>) => void;
  updateWebhook: (config: Partial<WebhookChannelConfig>) => void;
  updatePush: (config: Partial<PushChannelConfig>) => void;
  testEmail: () => Promise<boolean>;
  testWebhook: () => Promise<boolean>;
  testPush: () => Promise<boolean>;
}

const allEvents: NotificationEvent[] = [
  "invoice_paid", "invoice_overdue", "subscription_renewed",
  "payment_failed", "new_customer", "refund_issued",
];

export const useNotificationChannelsStore = create<NotificationChannelsState>()(
  persist(
    (set, get) => ({
      email: {
        enabled: false,
        smtpHost: "",
        smtpPort: 587,
        smtpUser: "",
        smtpPass: "",
        fromEmail: "",
        fromName: "",
        events: allEvents,
      },
      webhook: {
        enabled: false,
        url: "",
        secret: "",
        events: allEvents,
      },
      push: {
        enabled: false,
        vapidPublicKey: "",
        vapidPrivateKey: "",
        events: allEvents,
      },

      updateEmail: (config) =>
        set((s) => ({ email: { ...s.email, ...config } })),

      updateWebhook: (config) =>
        set((s) => ({ webhook: { ...s.webhook, ...config } })),

      updatePush: (config) =>
        set((s) => ({ push: { ...s.push, ...config } })),

      testEmail: async () => {
        await new Promise((r) => setTimeout(r, 1000));
        return Math.random() > 0.3;
      },

      testWebhook: async () => {
        await new Promise((r) => setTimeout(r, 800));
        return Math.random() > 0.2;
      },

      testPush: async () => {
        await new Promise((r) => setTimeout(r, 600));
        return Math.random() > 0.1;
      },
    }),
    {
      name: "invoicecore-notification-channels",
      partialize: (state) => {
        const { email, webhook, push } = state;
        return {
          email: { ...email, smtpPass: "" },
          webhook: { ...webhook, secret: "" },
          push: { ...push, vapidPrivateKey: "" },
        } satisfies PersistedState;
      },
    }
  )
);

export const eventLabels: Record<NotificationEvent, string> = {
  invoice_paid: "Invoice Paid",
  invoice_overdue: "Invoice Overdue",
  subscription_renewed: "Subscription Renewed",
  payment_failed: "Payment Failed",
  new_customer: "New Customer",
  refund_issued: "Refund Issued",
};
