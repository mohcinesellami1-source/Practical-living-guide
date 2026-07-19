import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Practical Living Guide',
  description: 'Eco-friendly pet supplies for conscious pets',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}