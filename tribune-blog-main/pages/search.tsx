import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Blog } from "@/types/payload-types";

type Content = {
  content?: {
    children?: {
      text?: string;
    }[];
  }[];
};

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query; // read ?q= from URL

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔎 Fetch blogs from Payload
  const fetchResults = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/blogs`,
        {
          params: {
            "where[or][0][title][like]": searchTerm,
            "where[or][1][excerpt][like]": searchTerm,
            "where[or][2][content][like]": searchTerm,
          },
        },
      );
      setResults(data.docs || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 On page load or URL change → run search
  useEffect(() => {
    if (typeof q === "string" && q.trim()) {
      setQuery(q); // sync input with URL
      fetchResults(q);
    }
  }, [q]);

  // 📝 On form submit → push to URL → triggers useEffect
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <Head>
        <title>Search Results - Tribune</title>
      </Head>
      <section className="flex flex-col items-center px-[15px] pt-[80px] md:px-[30px]">
        <div className="max-w-custom-container mx-auto flex w-full flex-col items-center">
          <div className="flex w-full items-center justify-center px-[10%] py-[50px] md:py-[85px]">
            <h1 className="m-0 text-center text-[30px] leading-[110%] font-bold md:text-[60px]">
              Search results {q ? `for "${q}"` : ""}
            </h1>
          </div>
          <div className="flex w-full max-w-[780px] flex-col items-center justify-center">
            <div className="bg-border mb-[30px] h-px w-full md:mb-[50px]" />

            {/* 🔎 Search Form */}
            <form
              className="mb-[30px] grid w-full gap-1.5 md:mb-[50px] md:grid-cols-3"
              onSubmit={handleSearch}
            >
              <input
                className="border-border focus:border-accent h-[62px] rounded-lg border bg-[#2f2c331f] p-5 text-[16px] leading-[115%] transition-colors focus:outline-none md:col-span-2"
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type="submit"
                style={{
                  transition:
                    "color 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), background-color 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
                className="button"
              >
                Search
              </button>
            </form>

            <div className="bg-border mb-[30px] h-px w-full md:mb-[50px]" />

            {/* 📄 Results */}
            <div className="flex w-full flex-col">
              {loading && (
                <p className="text-center text-gray-500">Searching…</p>
              )}

              {!loading && results.length === 0 && q && (
                <p className="text-center text-gray-500">No results found.</p>
              )}

              {results.map((blog) => {
                return (
                  <div
                    className="border-border mb-[30px] w-full border-b pb-[30px] md:mb-[50px] md:pb-[50px]"
                    key={blog.id}
                  >
                    <Link
                      href={`/blog/${blog.slug}`}
                      style={{
                        transition:
                          "color .25s cubic-bezier(.25, .46, .45, .94), box-shadow .25s cubic-bezier(.25, .46, .45, .94)",
                      }}
                      className="dark:shadow-link shadow-dark-link hover:shadow-dark-link-hover dark:hover:shadow-link-hover hover:text-light dark:hover:text-dark text-[18px] leading-[170%]"
                    >
                      {blog.title}
                    </Link>
                    <div className="text-accent mt-[4px] mb-[16px] text-[14px] leading-[140%] font-semibold">
                      tribune.com/blogs/{blog.slug}
                    </div>
                    <p className="text-paragraph text-[16px] leading-[160%]">
                      {blog.excerpt ||
                        (
                          blog as Content
                        ).content?.[0]?.children?.[0]?.text?.slice(0, 160)}
                      …
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
