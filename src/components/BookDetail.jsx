import React from "react";
import { coverUrl } from "../api/openLibrary";

/*
 BookDetail - modal-like detail panel for a selected book
*/
export default function BookDetail({ book, onClose }) {
  const cover = coverUrl(book.cover_i, "L");
  const authors = (book.author_name || []).join(", ");
  const subjects = (book.subject || []).slice(0, 8);
  const openLibraryUrl = `https://openlibrary.org${book.key || ""}`;

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>

        <div className="detail-grid">
          <div className="detail-cover">
            {cover ? <img src={cover} alt={`${book.title} cover`} /> : <div className="no-cover">No cover</div>}
          </div>

          <div className="detail-body">
            <h2>{book.title}</h2>
            <p className="detail-authors">{authors}</p>
            <p><strong>First published:</strong> {book.first_publish_year || "Unknown"}</p>
            <p><strong>Edition count:</strong> {book.edition_count || 0}</p>

            {subjects.length > 0 && (
              <div className="subjects">
                <strong>Subjects:</strong>
                <div className="subject-list">
                  {subjects.map((s) => <span key={s} className="subject">{s}</span>)}
                </div>
              </div>
            )}

            <div className="links">
              <a href={openLibraryUrl} target="_blank" rel="noreferrer">Open on Open Library</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
