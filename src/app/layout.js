import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/store/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Finance Tracker",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body className={inter.className}>{children}</body>
      </ReduxProvider>
    </html>
  );
}
