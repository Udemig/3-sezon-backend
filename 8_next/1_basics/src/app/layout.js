import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Amazon - Alışveriş",
    template: "%s - Amazon",
  },
  description: "Amazon büyük bir e ticareti sitesidir...",
};

// Layput bileşeni projede ekrana basılcak olan sayfayı children propu yardımıyla alır bizde bu sayfanın hangi düzen içerisnde olucağın bütün sayfalarda ortak olarak hangi bileşenlerin olucağını belirkeyebiliyoruz
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="border border-gray-500 p-4">Header</header>

          <main className="flex-1 grid place-items-center text-3xl">
            {children}
          </main>

          <footer className="border border-gray-500 p-4">Footer</footer>
        </div>
      </body>
    </html>
  );
}
