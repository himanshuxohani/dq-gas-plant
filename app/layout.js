import "./globals.css";
import { ThemeProvider } from "@/lib/theme-context";
import AppShell from "@/components/AppShell";

export const metadata = {
  title: "Digital Quotient Gas Plant | Value Chain Control Tower",
  description: "Site value chain, process flow and performance dashboards",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="font-body">
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
