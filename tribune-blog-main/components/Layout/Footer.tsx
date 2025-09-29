
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-border max-w-custom-container mx-auto mt-[30px] grid w-full gap-y-[35px] border-t py-[30px] md:mt-[50px] md:grid-cols-[2fr_1fr_1fr] md:gap-y-0 md:py-[50px]">
      <div className="order-3 flex flex-col items-center md:order-1 md:flex-row">
        <span className="text-[1.5rem] leading-[120%] opacity-100 transition-opacity duration-300 hover:opacity-60">
          AIR & SPACE
        </span>
        <div className="cursor-pointer p-[7px] text-[13px] leading-[120%] opacity-60 transition-opacity duration-300 hover:opacity-100 md:ml-[15px]">
          Powered by AIR & SPACE
        </div>
        <div className="cursor-pointer p-[7px] text-[13px] leading-[120%] opacity-60 transition-opacity duration-300 hover:opacity-100 md:ml-[15px]">
          Made by AIRON
        </div>
      </div>
      <div className="border-border flex flex-col items-center md:order-2 md:items-start md:border-l md:pl-[50px]">
        <Link
          className="py-[7px] text-[15px] leading-[140%] font-semibold opacity-60 transition-opacity duration-300 hover:opacity-100"
          href="https://facebook.com"
          target="_blank"
        >
          Facebook
        </Link>
        <Link
          className="py-[7px] text-[15px] leading-[140%] font-semibold opacity-60 transition-opacity duration-300 hover:opacity-100"
          href="https://facebook.com"
          target="_blank"
        >
          Twitter
        </Link>
        <Link
          className="py-[7px] text-[15px] leading-[140%] font-semibold opacity-60 transition-opacity duration-300 hover:opacity-100"
          href="https://facebook.com"
          target="_blank"
        >
          Youtube
        </Link>
      </div>
      <div className="border-border flex flex-col items-center md:order-3 md:items-start md:border-l md:pl-[50px]">
        <Link
          className="py-[7px] text-[15px] leading-[140%] font-semibold opacity-60 transition-opacity duration-300 hover:opacity-100"
          href="/"
        >
          Home
        </Link>
        <Link
          className="py-[7px] text-[15px] leading-[140%] font-semibold opacity-60 transition-opacity duration-300 hover:opacity-100"
          href="/contact"
        >
          Contact
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
