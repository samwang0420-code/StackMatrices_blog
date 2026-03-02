import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AI Visibility Audit | StackMatrices",
  description: "Discover how much revenue AI is stealing from your practice. Get your complete 6-page AI visibility audit.",
};

export default function AuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
