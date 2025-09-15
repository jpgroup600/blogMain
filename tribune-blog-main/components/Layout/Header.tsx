'use client'
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";


const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) return null;
  return (
    <header className="  dark:bg-black  transition-colors duration-1000 ease-in-out fixed top-0 left-0 z-20 flex w-full items-center justify-center px-[30px]">
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
            <Image
              className="h-[40px] object-contain"
              src="/logo.svg"
              width={180}
              height={40}
              alt="logo"
            />
          </Link>
        </div>
        <button className="flex cursor-pointer gap-3">
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
            
             <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all  duration-1000 ease-in-out "
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <MoonIcon className="w-6 h-6 text-gray-800 transition-all duration-1000 ease-in-out" />
        ) : (
          <SunIcon className="w-6 h-6 text-yellow-400 transition-all duration-1000 ease-in-out" />
        )}
      </button>
        </button>
      </div>
    </header>
  );
};

export default Header;
