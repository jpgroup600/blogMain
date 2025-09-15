import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-dark fixed top-0 left-0 z-20 flex w-full items-center justify-center px-[30px]">
      <div className="max-w-custom-container border-border grid w-full grid-cols-[auto_1fr_auto] items-center gap-2.5 border-b py-2.5">
        <button className="flex cursor-pointer gap-1">
          <div className="flex h-[24px] w-[24px] items-center justify-center">
            <span className="relative h-[2px] w-[20px]">
              <span className="bg-light absolute -top-[8px] left-0 h-full w-full rounded-full"></span>
              <span className="bg-light absolute left-0 h-full w-1/2 rounded-full"></span>
              <span className="bg-light absolute -bottom-[8px] left-0 h-full w-full rounded-full"></span>
            </span>
          </div>
          <div className="p-1 text-[13px] leading-[130%] font-semibold uppercase">
            Menu
          </div>
        </button>
        <div className="flex items-center justify-center">
          <Link href="/">
           <span className="text-light text-[20px] font-bold">AIR & SPACE</span>
          </Link>
        </div>
        <button className="flex cursor-pointer gap-1">
          <div className="p-1 text-[13px] leading-[130%] font-semibold uppercase">
            Search
          </div>
          <Image
            className="object-contain"
            src="/icons/search.svg"
            width={24}
            height={24}
            alt="icons"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
