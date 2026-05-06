import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from ".././components/Header/Header";
import { Footer } from ".././components/Footer/Footer";
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
    url: "https://notehub-phi.vercel.app/",
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
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <div className="app-wrapper">
            <Header />
            <main>{children}</main>
            {modal}
            <Footer />
          </div>
        </TanStackProvider>
      </body>
    </html>
  );
}