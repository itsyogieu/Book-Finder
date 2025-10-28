import React from "react";
import { coverUrl } from "../api/openLibrary";

/*
 BookCard - displays brief info about a book
*/
export default function BookCard({ book, onClick }) {
  const cover = coverUrl(book.cover_i, "M");
  const authors = (book.author_name || []).slice(0, 2).join(", ");
  const year = book.first_publish_year || "—";

  return (
    <article className="card" onClick={onClick} role="button" tabIndex={0}>
      <div className="cover">
        {cover ? (
          <img src={cover} alt={`${book.title} cover`} />
        ) : (
          <div className="no-cover">No cover</div>
        )}
      </div>

      <div className="card-body">
        <h3 className="book-title">{book.title}</h3>
        <div className="meta">
          <span className="authors">{authors}</span>
          <span className="year">{year}</span>
        </div>
      </div>
    </article>
  );
}
