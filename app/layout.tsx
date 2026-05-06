import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "NoteHub - Your Personal Knowledge Base",
  description: "Organize your thoughts, tasks, and ideas with NoteHub.",
  openGraph: {
    title: "NoteHub - Your Personal Knowledge Base",
    description: "Organize your thoughts, tasks, and ideas with NoteHub.",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        
        <TanStackProvider>
          {children}
        </TanStackProvider>
      </body>
    </html>
  );
}