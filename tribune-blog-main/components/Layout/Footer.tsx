import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-border max-w-custom-container mx-auto mt-[30px] grid w-full gap-y-[35px] border-t py-[30px] md:mt-[50px] md:grid-cols-[2fr_1fr_1fr] md:gap-y-0 md:py-[50px]">
      <div className="order-3 flex flex-col items-center md:order-1 md:flex-row">
        <Image
          className="h-[37px] w-auto object-contain"
          alt="logo"
          src="/logo.svg"
          width={400}
          height={200}
        />
        <div className="cursor-pointer p-[7px] text-[13px] leading-[120%] opacity-60 transition-opacity duration-300 hover:opacity-100 md:ml-[15px]">
          Powered by Next.js
        </div>
        <div className="cursor-pointer p-[7px] text-[13px] leading-[120%] opacity-60 transition-opacity duration-300 hover:opacity-100 md:ml-[15px]">
          Made by FusionCode
        </div>
      </div>
      <div className="border-border flex flex-col items-center md:order-2 md:items-start md:border-l md:pl-[50px]">
        <Link
          className="py-[7px] text-[15px] leading-[140%] font-semibold opacity-60 transition-opacity duration-300 hover:opacity-100"
          href="https://facebook.com"
        >
          Facebook
        </Link>
        <Link
          className="py-[7px] text-[15px] leading-[140%] font-semibold opacity-60 transition-opacity duration-300 hover:opacity-100"
          href="https://facebook.com"
        >
          Twitter
        </Link>
        <Link
          className="py-[7px] text-[15px] leading-[140%] font-semibold opacity-60 transition-opacity duration-300 hover:opacity-100"
          href="https://facebook.com"
        >
          Youtube
        </Link>
      </div>
      <div className="border-border flex flex-col items-center md:order-3 md:items-start md:border-l md:pl-[50px]">
        <Link
          className="py-[7px] text-[15px] leading-[140%] font-semibold opacity-60 transition-opacity duration-300 hover:opacity-100"
          href="https://facebook.com"
        >
          Home
        </Link>
        <Link
          className="py-[7px] text-[15px] leading-[140%] font-semibold opacity-60 transition-opacity duration-300 hover:opacity-100"
          href="https://facebook.com"
        >
          About
        </Link>
        <Link
          className="py-[7px] text-[15px] leading-[140%] font-semibold opacity-60 transition-opacity duration-300 hover:opacity-100"
          href="https://facebook.com"
        >
          Contact
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
