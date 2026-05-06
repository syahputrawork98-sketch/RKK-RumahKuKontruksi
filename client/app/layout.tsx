import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { ToastProvider } from "@/context/toast-provider";
import { ToastContainer } from "@/components/ui/toast";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";


export const metadata: Metadata = {
  title: {
    default: "RumahkuKonstruksi",
    template: "%s | RumahkuKonstruksi",
  },
  description: "Frontend platform konstruksi digital yang serius dan terpercaya.",
  openGraph: {
    title: "RumahkuKonstruksi",
    description: "Frontend platform konstruksi digital yang serius dan terpercaya.",
    type: "website",
    locale: "id_ID",
    siteName: "RumahkuKonstruksi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased transition-theme">
        <ToastProvider>
          <ThemeProvider>
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  );
}
