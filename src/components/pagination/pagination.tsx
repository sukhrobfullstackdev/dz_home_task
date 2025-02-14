import { PaginationProps } from "@/types/typings";

const Pagination = ({ totalPages, page, isSearching, searchResults, ITEMS_PER_PAGE }: PaginationProps) => {
  const maxPages = isSearching ? Math.ceil(searchResults.length / ITEMS_PER_PAGE) : totalPages;
  const pagesToShow = 5; 
  const visiblePages = [];

  if (maxPages <= pagesToShow) {
    visiblePages.push(...Array.from({ length: maxPages }, (_, i) => i + 1));
  } else {
    visiblePages.push(1);

    if (page > 3) {
      visiblePages.push("...");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(maxPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    if (page < maxPages - 2) {
      visiblePages.push("...");
    }

    visiblePages.push(maxPages);
  }

  return (
    <div className="flex items-center gap-[7px]">
      {visiblePages.map((p, idx) =>
        p === "..." ? (
          <span key={`ellipsis-${idx}`} className="px-3 py-1 text-gray-500">
            ...
          </span>
        ) : (
          <span
            key={p}
            className={`px-3 py-1 ${page === p ? "color-black" : "text-gray-500"}`}
          >
            {p}
          </span>
        )
      )}
    </div>
  );
};

export default Pagination;
