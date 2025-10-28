import React from "react";
import BookCard from "./BookCard";

/*
 BookList - renders list, loading state, error and pagination
*/
export default function BookList({
  books,
  loading,
  error,
  page,
  onPageChange,
  numFound,
  onSelectBook
}) {
  const totalPages = Math.max(1, Math.ceil((numFound || 0) / 20));

  return (
    <section className="result-section">
      {loading && <div className="status">Loading results...</div>}
      {error && <div className="status error">Error: {error}</div>}

      {!loading && !error && books.length === 0 && (
        <div className="status">No results. Try a different title.</div>
      )}

      <div className="grid">
        {books.map((b) => (
          <BookCard key={b.key || b.cover_edition_key || b.title} book={b} onClick={() => onSelectBook(b)} />
        ))}
      </div>

      {numFound > 0 && (
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page <= 1}
          >
            Previous
          </button>

          <span className="page-info">
            Page {page} of {totalPages} · {numFound} results
          </span>

          <button
            className="page-btn"
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
