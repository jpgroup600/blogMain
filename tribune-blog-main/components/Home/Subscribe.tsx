import Image from "next/image";

const Subscribe = () => {
  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden rounded-lg p-[10px] md:p-[30px]">
      <Image
        className="absolute inset-0 h-full w-full object-cover"
        src="/subscribe-banner.webp"
        alt="banner"
        width={1366}
        height={689}
      />
      <div className="bg-accent relative z-10 flex w-full max-w-[790px] flex-col items-center justify-center rounded-lg px-[10%] py-[62px]">
        <h2 className="heading-2 text-light mb-4 text-center">
          Subscribe <span className="font-display font-normal italic">to</span>{" "}
          AIR & SPACE
        </h2>
        <p className="text-light mb-[26px] max-w-[330px] text-center opacity-65">
          Sign up to our newsletters and we`&apos;ll keep you in the loop.
        </p>
        <div className="mb-2 flex w-full max-w-[400px]">
          <form
            className="grid w-full gap-1.5 md:grid-cols-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="text-light h-[50px] rounded-sm border border-[#e0dee7]/0 bg-[#e0dee726] p-[15px] leading-[115%] focus:border-[#e0dee7]/25 focus:outline-none md:col-span-2"
              type="text"
              placeholder="Email Address..."
            />
            <button className="bg-light text-dark btn-transition hover:bg-dark hover:text-light cursor-pointer rounded-sm px-[25px] py-4 leading-[115%] font-medium">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
