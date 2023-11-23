import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Container } from "react-bootstrap";
import NavBar from "@/components/NavBar";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJS 14 Image Gallery",
  description: "Toturial",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar></NavBar>
        <main>
          <Container className="py-4">{children}</Container>
        </main>
      </body>
    </html>
  );
}
