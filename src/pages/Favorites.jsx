import { useSelector } from 'react-redux';
import { Box, Typography, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';

export default function Favorites() {
  const list = useSelector((state) => state.favorite.list); // array of book IDs
  const allBooks = useSelector((state) => state.books); // contains trending, classics, etc.

  // Combine all book arrays into one flat array
  const allBooksArray = [
    ...allBooks.trending,
    ...allBooks.classics,
    ...allBooks.weLove,
    ...allBooks.kids,
    ...allBooks.romance,
    ...allBooks.thrillers,
  ];

  // Find book objects that match IDs in the favorite list
  const favoriteBooks = allBooksArray.filter((book) =>
    list.includes(book.key)
  );

  return (
    <Box
      sx={{
        p: 4,
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        ❤️ Your Favorite Books
      </Typography>

      {
        <Grid container spacing={3}>
          {favoriteBooks.map((book) => (
            <Grid item key={book.key} xs={12} sm={6} md={3} lg={2}>
              <BookCard
                bookey={book.key}
                title={book.title}
                img={
                  book.cover_id
                    ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
                    : `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                }
              />
            </Grid>
          ))}
        </Grid>
      }
    </Box>
  );
}
