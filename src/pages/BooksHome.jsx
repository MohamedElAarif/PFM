import { useDispatch, useSelector } from 'react-redux'
import { fetchTrendingBooks,fetchClassicBooks,fetchWeLoveBooks,fetchKidsBooks,fetchRomanceBooks,fetchThrillersBooks } from '../redux/slices/bookSlice'
import BookCard from '../components/BookCard'
import { Typography, Box } from '@mui/material'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Section = ({ title, subject, books, loading }) => {
  if (!loading && (!books || books.length === 0)) return null;

  const displayedBooks = loading ? Array.from({ length: 5 }) : books;

  return (
    <Box sx={{ marginY: 4 }}>
      <Typography
        component={Link}
        to={`/${subject}`}
        variant="h5"
        sx={{
          marginBottom: 2,
          color: 'primary.main',
          textDecoration: 'none',
          fontWeight: 600,
          '&:hover': { textDecoration: 'underline', cursor: 'pointer' },
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 2,
          paddingBottom: 2,
          '&::-webkit-scrollbar': { display: 'none' },
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
                : `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            }
            loading={loading}
          />
        ))}
      </Box>
    </Box>
  );
};

const BooksHome = () => {
  const dispatch = useDispatch();
  const { trending, classics, weLove, kids, romance, thrillers, loading } =
    useSelector((state) => state.books);
  const list = useSelector((state) => state.favorite.list);

  useEffect(() => {
    dispatch(fetchTrendingBooks());
    dispatch(fetchClassicBooks());
    dispatch(fetchWeLoveBooks());
    dispatch(fetchKidsBooks());
    dispatch(fetchRomanceBooks());
    dispatch(fetchThrillersBooks());
  }, [dispatch]);

  return (
    <Box
      sx={{
        p: 4,
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" sx={{ mb: 4 }}>
        Welcome to Open Library
      </Typography>

      <Section title="Trending Books #" subject="trending" books={trending} loading={loading} />
      <Section title="Classic Books #" subject="classics" books={classics} loading={loading} />
      <Section title="Books We Love #" subject="we-love" books={weLove} loading={loading} />
      <Section title="Kids #" subject="kids" books={kids} loading={loading} />
      <Section title="Romance #" subject="romance" books={romance} loading={loading} />
      <Section title="Thrillers #" subject="thrillers" books={thrillers} loading={loading} />
    </Box>
  );
};

export default BooksHome;
