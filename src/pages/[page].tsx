import { useRouter } from "next/router";
import Banner from "@/components/banner/banner";
import Card from "@/components/card/card";
import Image from "next/image";
import { Artwork } from "@/types/typings";
import Link from "next/link";
import { GetStaticPropsContext } from "next";
import Pagination from "@/components/pagination/pagination";
import {useState} from 'react';
export async function getStaticPaths() {
  const paths = Array.from({ length: 5 }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext<{ page: string }>) {
  const { params = { page: "1" } } = context;
  const pageNum = parseInt(params.page, 10) || 1;
  const searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects`;

  const res = await fetch(searchUrl);
  const data = await res.json();
  const objectIDs = data.objectIDs || [];

  if (objectIDs.length === 0) {
    return { notFound: true };
  }

  const ITEMS_PER_PAGE = 10;
  const totalResults = objectIDs.length;
  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);
  const startIndex = (pageNum - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedObjectIDs = objectIDs.slice(startIndex, endIndex);

  const objectDetails = await Promise.all(
    paginatedObjectIDs.map(async (id: number) => {
      const objRes = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
      );
      return objRes.json();
    })
  );

  return {
    props: {
      pageNum,
      totalPages,
      objectDetails,
    },
    revalidate: 60,
  };
}

export default function HomePage({
  pageNum,
  totalPages,
  objectDetails,
}: {
  pageNum: number;
  totalPages: number;
  objectDetails: Artwork[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query)}&page=${pageNum}`);
      } else {
        router.push("/");
      }
    }
  };

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

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
            onKeyDown={handleKeyDown}
          />
          <span className="flex items-center justify-center">
            <Image src="/search_icon.svg" alt="Search Icon" width={24} height={24} />
          </span>
        </div>

        <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr] md:grid-cols-3 gap-[20px] w-full">
            {objectDetails.map((obj: Artwork) => (
              <Link key={obj.objectID} href={`/artwork/${obj.objectID}`}>
                <Card
                  primaryImage={obj.primaryImage}
                  tags={obj.tags}
                  medium={obj.medium}
                  dimensions={obj.dimensions}
                  artistNationality={obj.artistNationality}
                  artistDisplayName={obj.artistDisplayName}
                />
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between mt-[60px] w-full">
            <button
              disabled={pageNum <= 1}
              onClick={() => router.push(`/${pageNum - 1}`)}
              className="px-4 py-2 bg-white disabled:opacity-50"
            >
              &lt; Prev
            </button>

            <Pagination page={pageNum} totalPages={totalPages} isSearching={false} searchResults={[]} ITEMS_PER_PAGE={10} />

            <button
              disabled={pageNum >= totalPages}
              onClick={() => router.push(`/${pageNum + 1}`)}
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
