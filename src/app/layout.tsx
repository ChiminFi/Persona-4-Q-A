import { Noto_Sans_SC, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const notoSansSc = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-sc",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className={cn(
        "h-screen w-screen antialiased",
        "font-sans",
        geist.variable,
      )}
    >
      <body className={notoSansSc.variable}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
