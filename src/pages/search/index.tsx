
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Banner from "@/components/banner/banner";
import Card from "@/components/card/card";
import { Artwork } from "@/types/typings";
import Link from "next/link";
import Pagination from "@/components/pagination/pagination";
import Image from "next/image";
const ITEMS_PER_PAGE = 10;

export default function SearchPage() {
  const router = useRouter();
  const { q, page } = router.query;

  const [query, setQuery] = useState(q ? String(q) : "");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Artwork[]>([]);
  const [totalPages, setTotalPages] = useState(1);
const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    if (!query) {
      router.push(`/${page}`);
      return;
    }
    return () => {
      clearTimeout(handler);
    };
  }, [query, router, page]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${encodeURIComponent(debouncedQuery)}`
        );
        const data = await res.json();

        if (!data.objectIDs) {
          setSearchResults([]);
          return;
        }

        const totalResults = data.objectIDs.length;
        setTotalPages(Math.ceil(totalResults / ITEMS_PER_PAGE));

        const paginatedObjectIDs = data.objectIDs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
        const objectDetails = await Promise.all(
          paginatedObjectIDs.map(async (id: number) => {
            const objRes = await fetch(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
            );
            return objRes.json();
          })
        );
        setSearchResults(objectDetails);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchResults();
  }, [debouncedQuery, currentPage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <Banner />
      <div className="mx-[20px] grid gap-[20px] sm:grid-cols-[1fr_3fr] grid-cols-1">
      <div className="flex self-start border-b border-[#CDCDCD] p-[10px]">
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none rounded-lg"
            value={query}
            onChange={handleChange}
          />
          <span className="flex items-center justify-center">
            <Image src="/search_icon.svg" alt="Search Icon" width={24} height={24} />
          </span>
        </div>
        <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr] md:grid-cols-3 gap-[20px] w-full min-h-[70vh]">
        {searchResults.map((obj: Artwork) => (
            <Link key={obj.objectID} href={`/artwork/${obj.objectID}`}>
              <Card {...obj} />
            </Link>
          ))}
          </div>
          <div className="flex items-center justify-between mt-[60px] w-full">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((num) => num - 1)}
              className="px-4 py-2 bg-white disabled:opacity-50"
            >
              &lt; Prev
            </button>

            <Pagination page={currentPage} totalPages={totalPages} isSearching={false} searchResults={[]} ITEMS_PER_PAGE={10} />

            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((num) => num + 1)}
              className="px-4 py-2 bg-white disabled:opacity-50"
            >
              Next &gt;
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
