import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Tribune Blog - Contact</title>
      </Head>
      <section className="flex flex-col items-center px-[30px] pt-[80px]">
        <div className="max-w-custom-container mx-auto flex w-full flex-col items-center">
          <div className="flex w-full flex-col items-center pt-[100px] pb-[30px]">
            <div className="flex w-full max-w-[780px] flex-col items-center text-center">
              <h1 className="mb-0 text-[60px] leading-[110%] font-bold">
                Let`&apos;s see how we can help
              </h1>
              <p className="text-paragraph mt-[30px] max-w-[600px]">
                Magna diam eget odio ac dictumst tellus rhoncus. Auctor sagittis
                laoreet potenti elementum facilisis magnis.
              </p>
              <div className="mt-[40px] mb-[30px] flex w-full flex-col">
                <form
                  className="grid w-full max-w-[780px] gap-3"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    className="border-border focus:border-accent h-[60px] w-full rounded-lg border p-5 text-base leading-[115%] transition-colors focus:outline-none"
                    type="text"
                    placeholder="Name"
                  />
                  <input
                    className="border-border focus:border-accent h-[60px] w-full rounded-lg border p-5 text-base leading-[115%] transition-colors focus:outline-none"
                    type="email"
                    placeholder="Email"
                  />
                  <textarea
                    placeholder="Message"
                    className="border-border focus:border-accent w-full rounded-lg border p-5 text-base leading-[115%] transition-colors focus:outline-none"
                    rows={10}
                  ></textarea>
                  <button className="button">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
