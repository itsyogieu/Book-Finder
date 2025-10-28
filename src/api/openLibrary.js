const BASE = "https://openlibrary.org";

/*
 Builds cover URL for given cover id and size suffix.
 size can be 'S', 'M', 'L'
*/
export function coverUrl(coverId, size = "M") {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

/*
 searchBooks - fetches search results from Open Library
 params:
   q - title query string
   page - page number (1-indexed)
   sortBy - 'relevance' or 'first_publish_year'
 returns parsed JSON with docs and numFound
*/
export async function searchBooks(q, page = 1, sortBy = "relevance") {
  const url = new URL(`${BASE}/search.json`);
  url.searchParams.set("title", q);
  url.searchParams.set("page", String(page));
  // request up to 20 results per page
  url.searchParams.set("limit", "20");

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`OpenLibrary error: ${res.status}`);
  }

  const data = await res.json();

  // sort client-side when requested
  if (sortBy === "first_publish_year") {
    data.docs.sort((a, b) => {
      const ay = a.first_publish_year || 0;
      const by = b.first_publish_year || 0;
      return ay - by;
    });
  }

  return {
    docs: data.docs || [],
    numFound: data.numFound || 0
  };
}
