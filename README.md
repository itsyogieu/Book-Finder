# Book Finder

Simple React app that searches books using the Open Library Search API.

## Features
- Search by title (debounced)
- Pagination (20 results per page)
- Sort by relevance or first publish year
- Click a result to open a detail panel
- Lightweight session caching to avoid repeated queries

## Dev
1. `npm install`
2. `npm run dev`
3. Visit `http://localhost:5173`

## Build
`npm run build` then `npm run preview` to test the production build.

## Notes
- Uses Open Library public API: https://openlibrary.org/search.json?title={title}
- Cover images served from `https://covers.openlibrary.org`
