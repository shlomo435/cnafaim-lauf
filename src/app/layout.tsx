import type { Metadata } from "next";
import { Assistant, Frank_Ruhl_Libre } from "next/font/google";
import "./globals.css";

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  variable: "--font-assistant",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const frankRuhl = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  variable: "--font-frank-ruhl",
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "כנפיים לעוף | מרכז טיפולי-לימודי",
  description:
    "ליווי לצמיחה, חיזוק וחיבור עצמי לילדים, נערות ונשים. גאולה אלון, מטפלת ומאבחנת עם מעל 20 שנות ניסיון.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${assistant.variable} ${frankRuhl.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
