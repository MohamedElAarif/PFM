import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, CircularProgress, Pagination } from '@mui/material';
import BookCard from '../components/BookCard';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery().get('q');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    if (!query) return;
    setLoading(true);

    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=100`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.docs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const displayedBooks = books.slice(start, end);

  if (loading)
    return (
      <Box
        sx={{
          p: 6,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ p: 4, bgcolor: 'background.default', color: 'text.primary' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Search results for: “{query}”
      </Typography>

      {books.length === 0 ? (
        <Typography>No books found.</Typography>
      ) : (
        <>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: 3,
            }}
          >
            {displayedBooks.map((book, index) => (
              <BookCard
                key={book.key || index}
                bookey={book.key}
                title={book.title}
                img={
                  book.cover_i
                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                    : undefined
                }
              />
            ))}
          </Box>

          {/* Pagination */}
          {books.length > itemsPerPage && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={Math.ceil(books.length / itemsPerPage)}
                page={page}
                onChange={(e, val) => setPage(val)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default SearchResults;
