import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Pagination, CircularProgress } from '@mui/material';
import BookCard from '../components/BookCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTrendingBooks,
  fetchClassicBooks,
  fetchWeLoveBooks,
  fetchKidsBooks,
  fetchRomanceBooks,
  fetchThrillersBooks,
} from '../redux/slices/bookSlice';

const BooksBySubject = () => {
  const { subject } = useParams();
  const dispatch = useDispatch();
  const booksState = useSelector((state) => state.books);

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  // Pick which array of books to show based on subject
  const dataMap = {
    trending: booksState.trending,
    classics: booksState.classics,
    'we-love': booksState.weLove,
    kids: booksState.kids,
    romance: booksState.romance,
    thrillers: booksState.thrillers,
  };

  const books = dataMap[subject] || [];

  useEffect(() => {
    // Fetch only if not already loaded
    switch (subject) {
      case 'trending':
        dispatch(fetchTrendingBooks());
        break;
      case 'classics':
        dispatch(fetchClassicBooks());
        break;
      case 'we-love':
        dispatch(fetchWeLoveBooks());
        break;
      case 'kids':
        dispatch(fetchKidsBooks());
        break;
      case 'romance':
        dispatch(fetchRomanceBooks());
        break;
      case 'thrillers':
        dispatch(fetchThrillersBooks());
        break;
      default:
        break;
    }
  }, [dispatch, subject]);

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const displayedBooks = books.slice(start, end);

  if (booksState.loading && books.length === 0)
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
      <Typography variant="h4" sx={{ mb: 4, textTransform: 'capitalize' }}>
        {subject.replace('-', ' ')} Books
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 3,
        }}
      >
        {displayedBooks.map((book, index) => (
          <BookCard
            key={book?.key || index}
            bookey={book?.key}
            title={book?.title}
            img={
              book?.cover_id
                ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
                : book?.cover_i
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
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default BooksBySubject;
