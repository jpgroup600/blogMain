import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const router = useRouter();

  const [isMenuActive, setIsMenuActive] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) {
      inputRef.current?.focus();
      return;
    }
    router.push(`/search?q=${encodeURIComponent(search)}`);
    setSearch("");
  };

  const handleMenuClick = () => {
    setIsMenuActive((prev) => !prev);
  };

  return (
    <>
      <header className="bg-light dark:bg-dark fixed top-0 left-0 z-40 flex w-full items-center justify-center px-[15px] md:px-[30px]">
        <div className="max-w-custom-container border-border grid w-full grid-cols-[1fr_auto] items-center gap-2.5 border-b py-[15px] md:grid-cols-[1fr_auto_1fr] md:py-2.5">
          <div className="order-2 flex gap-2 md:order-1">
            <Link href="/search" className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m21 21-4.34-4.34" />
                <circle cx="11" cy="11" r="8" />
              </svg>
            </Link>
            <div className="md:hidden">
              <ThemeToggle />
            </div>
            <button
              onClick={handleMenuClick}
              className="flex cursor-pointer gap-1"
            >
              <div className="flex h-[24px] w-[24px] items-center justify-center">
                <span className="relative h-[2px] w-[20px]">
                  <span
                    className={`bg-dark dark:bg-light ease-expo absolute left-0 h-full w-full rounded-full transition-transform ${isMenuActive ? "-translate-y-[0px] rotate-45" : "-translate-y-[8px] rotate-0"}`}
                  ></span>
                  <span
                    className={`bg-dark dark:bg-light ease-expo absolute left-0 h-full rounded-full transition-[width] ${isMenuActive ? "w-0" : "w-1/2"}`}
                  ></span>
                  <span
                    className={`bg-dark dark:bg-light rounded-ful ease-expo absolute left-0 h-full w-full transition-transform ${isMenuActive ? "translate-y-[0px] -rotate-45" : "translate-y-[8px] rotate-0"}`}
                  ></span>
                </span>
              </div>
              <div className="hidden p-1 text-[13px] leading-[130%] font-semibold uppercase md:block">
                Menu
              </div>
            </button>
          </div>
          <div className="order-1 flex items-center py-[5px] md:order-2 md:justify-center md:py-0">
            <Link href="/">
              <h1 className="text-[30px] leading-[110%] font-bold tracking-[-0.4px]">AIR & SPACE</h1>
            </Link>
          </div>
          <div className="order-3 hidden items-center justify-end gap-2 md:flex">
            <form onSubmit={handleSubmit} className="flex cursor-pointer gap-1">
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`h-[24px] w-[76px] text-[13px] leading-[130%] font-semibold tracking-[1.2px] uppercase transition-[width] focus:w-[170px] focus:outline-none`}
                placeholder="SEARCH"
                id="search"
              />
              <button className="cursor-pointer" type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m21 21-4.34-4.34" />
                  <circle cx="11" cy="11" r="8" />
                </svg>
              </button>
            </form>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <nav
        className={`bg-light dark:bg-dark ease-expo fixed top-0 left-0 z-20 flex w-full origin-top flex-col items-center justify-center pt-[80px] transition-transform duration-500 md:pt-[60px] ${isMenuActive ? "scale-y-100" : "scale-y-0 delay-500"}`}
      >
        <div className="max-w-custom-container border-border grid w-full gap-[30px] border-t py-[40px] md:grid-cols-2 md:gap-0 md:py-[50px]">
          <div
            className={`ease-expo flex flex-col items-center justify-center px-[10%] transition-all delay-200 duration-[400ms] ${isMenuActive ? "translate-y-0 opacity-100" : "-translate-y-1/2 opacity-0"}`}
          >
            <div className="mb-3 flex items-center justify-center text-[14px] leading-[130%] font-semibold opacity-50 md:mb-5">
              Page
            </div>
            <Link
              onClick={() => setIsMenuActive(false)}
              className="w-fit py-2 text-center text-[18px] leading-[110%] font-bold tracking-[-0.4px]"
              href="/"
            >
              Home
            </Link>
            <Link
              onClick={() => setIsMenuActive(false)}
              className="w-fit py-2 text-center text-[18px] leading-[110%] font-bold tracking-[-0.4px]"
              href="/trending"
            >
              Trending
            </Link>
            <Link
              onClick={() => setIsMenuActive(false)}
              className="w-fit py-2 text-center text-[18px] leading-[110%] font-bold tracking-[-0.4px]"
              href="/contact"
            >
              Contact
            </Link>
          </div>
          <div
            className={`border-border ease-expo flex flex-col items-center justify-center border-l px-[10%] transition-all delay-200 duration-[400ms] ${isMenuActive ? "translate-y-0 opacity-100" : "-translate-y-1/2 opacity-0"}`}
          >
            <div className="mb-3 flex items-center justify-center text-[14px] leading-[130%] font-semibold opacity-50 md:mb-5">
              Social
            </div>
            <Link
              className="w-fit py-2 text-center text-[18px] leading-[110%] font-bold tracking-[-0.4px]"
              href="https://facebook.com"
              target="_blank"
            >
              Facebook
            </Link>
            <Link
              className="w-fit py-2 text-center text-[18px] leading-[110%] font-bold tracking-[-0.4px]"
              href="https://youtube.com"
              target="_blank"
            >
              Youtube
            </Link>
            <Link
              className="w-fit py-2 text-center text-[18px] leading-[110%] font-bold tracking-[-0.4px]"
              href="https://x.com"
              target="_blank"
            >
              Twitter
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
