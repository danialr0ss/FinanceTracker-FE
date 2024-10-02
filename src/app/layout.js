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
        <body
          className={`${inter.className} min-h-[947px] min-w-[1920px] w-screen h-screen`}
        >
          {children}
        </body>
      </ReduxProvider>
    </html>
  );
}
