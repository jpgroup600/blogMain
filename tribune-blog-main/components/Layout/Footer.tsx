import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-border max-w-custom-container mx-auto mt-[50px] grid w-full grid-cols-[2fr_1fr_1fr] border-t py-[50px]">
      <div className="flex items-center">
        <Image
          className="h-[37px] w-auto object-contain"
          alt="logo"
          src="/logo.svg"
          width={400}
          height={200}
        />
        <div className="ml-[15px] cursor-pointer p-[7px] text-[13px] leading-[120%] opacity-60 transition-opacity duration-300 hover:opacity-100">
          Powered by Next.js
        </div>
        <div className="ml-[15px] cursor-pointer p-[7px] text-[13px] leading-[120%] opacity-60 transition-opacity duration-300 hover:opacity-100">
          Made by FusionCode
        </div>
      </div>
      <div className="border-border flex flex-col border-l pl-[50px]">
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
      <div className="border-border flex flex-col border-l pl-[50px]">
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
