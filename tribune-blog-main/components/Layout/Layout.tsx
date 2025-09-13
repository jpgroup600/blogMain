import { Manrope, Playfair_Display } from "next/font/google";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

const manrope = Manrope({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--google-font-manrope",
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--google-font-playfair-display",
});

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <main
      className={`${playfairDisplay.variable} ${manrope.variable} bg-dark text-light relative flex flex-col`}
    >
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
