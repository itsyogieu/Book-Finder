import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import BookDetail from "./components/BookDetail";
import { searchBooks } from "./api/openLibrary";
import useDebounce from "./hooks/useDebounce";

/*
 App - root container
*/
export default function App() {
  const [query, setQuery] = useState(""); // current search query
  const debouncedQuery = useDebounce(query, 450); // debounced query
  const [page, setPage] = useState(1); // page number (Open Library)
  const [books, setBooks] = useState([]); // current page results
  const [numFound, setNumFound] = useState(0); // total results from API
  const [loading, setLoading] = useState(false); // loading flag
  const [error, setError] = useState(null); // error message
  const [selected, setSelected] = useState(null); // selected book for detail
  const [sortBy, setSortBy] = useState("relevance"); // sort mode

  // cache to reduce redundant network calls
  const cacheKey = (q, p) => `${q}::${p}`;

  useEffect(() => {
    setPage(1); // reset to first page when query changes
  }, [debouncedQuery, sortBy]);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.trim().length === 0) {
      setBooks([]);
      setNumFound(0);
      setError(null);
      return;
    }

    const key = cacheKey(debouncedQuery, page);
    const cachedRaw = sessionStorage.getItem(key);
    if (cachedRaw) {
      const cached = JSON.parse(cachedRaw);
      setBooks(cached.docs);
      setNumFound(cached.numFound);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    searchBooks(debouncedQuery, page, sortBy)
      .then((res) => {
        if (cancelled) return;
        setBooks(res.docs || []);
        setNumFound(res.numFound || 0);
        sessionStorage.setItem(key, JSON.stringify(res)); // cache page result
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || "Failed to fetch");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, page, sortBy]);

  const onSearchChange = (val) => {
    setQuery(val);
  };

  const onPageChange = (newPage) => {
    setPage(newPage);
  };

  const onSelectBook = (book) => {
    setSelected(book);
  };

  const clearSelected = () => {
    setSelected(null);
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Book Finder</h1>
        <p className="subtitle">Search books using Open Library</p>
      </header>

      <main className="container">
        <SearchBar
          value={query}
          onChange={onSearchChange}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <BookList
          books={books}
          loading={loading}
          error={error}
          page={page}
          onPageChange={onPageChange}
          numFound={numFound}
          onSelectBook={onSelectBook}
        />
      </main>

      {selected && (
        <BookDetail book={selected} onClose={clearSelected} />
      )}

      <footer className="footer">
        <small>Powered by Open Library · Example app</small>
      </footer>
    </div>
  );
}
