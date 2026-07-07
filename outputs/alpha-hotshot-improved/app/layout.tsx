import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alpha Hotshot | Lease-on para dueños-operadores",
  description:
    "Programa lease-on para dueños-operadores hotshot y flatbed en los 48 estados.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
