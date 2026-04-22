import type { Metadata } from "next";
import { Poppins, Parisienne } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ModalProvider } from "@/app/share/modals/ModalContext";
import LoginModal from "@/app/share/modals/LoginModal";
import ReviewModal from "@/app/share/modals/ReviewModal";
import ProfileModal from "@/app/share/modals/ProfileModal";
import RecommendationModal from "@/app/share/modals/RecommendationModal";
import Navbar from "@/app/share/navbar/Navbar";
import MainWrapper from "@/app/share/ui/MainWrapper";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const parisienne = Parisienne({
  variable: "--font-parisienne",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lúmina – Tu guía de maquillaje ideal",
  description:
    "Encuentra, prueba y elige el maquillaje perfecto para ti. Reseñas, sugerencias y los mejores productos de belleza.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${poppins.variable} ${parisienne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AuthProvider>
          <ModalProvider>
            <Navbar />
            {/* MainWrapper aplica pt-[60px] solo en rutas con navbar */}
            <MainWrapper>{children}</MainWrapper>
            <LoginModal />
            <ReviewModal />
            <ProfileModal />
            <RecommendationModal />
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
