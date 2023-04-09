import { Nunito } from "next/font/google";
import getCurrentUser from "./actions/getCurrentUser";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./components/providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";

export const metadata = {
  title: "Bookit",
  description: "Bookit Hotel Room Book Website",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <RentModal />
          <RegisterModal />
          <LoginModal />
          <Navbar CurrentUser={currentUser} />
        </ClientOnly>
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
