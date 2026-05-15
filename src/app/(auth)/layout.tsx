import { BlankLayout } from "@/layouts/blank-layout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BlankLayout>{children}</BlankLayout>;
}
