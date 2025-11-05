import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import BookCard from "../components/BookCard";

export default function BookDetails() {
  const { ISBN } = useParams();
  const [book, setBook] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [authorKeys, setAuthorKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [authorBooks, setAuthorBooks] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://openlibrary.org/works/${ISBN}.json`);
        if (!res.ok) throw new Error("Failed to fetch book data");
        const data = await res.json();
        setBook(data);

        // Fetch authors
        if (data.authors && data.authors.length > 0) {
          const authorNames = await Promise.all(
            data.authors.map(async (a) => {
              const resAuth = await fetch(`https://openlibrary.org${a.author.key}.json`);
              if (!resAuth.ok) return "Unknown Author";
              const dataAuth = await resAuth.json();
              return dataAuth.name;
            })
          );
          setAuthors(authorNames);

          const keys = data.authors.map(a => a.author.key);
          setAuthorKeys(keys);

          // Fetch other books by the first author
          const otherBooksRes = await fetch(`https://openlibrary.org${keys[0]}/works.json?limit=10`);
          if (otherBooksRes.ok) {
            const otherBooksData = await otherBooksRes.json();
            setAuthorBooks(otherBooksData.entries.filter(b => b.key !== `/works/${ISBN}`));
          }
        }

        // Fetch similar books based on first subject
        if (data.subjects && data.subjects.length > 0) {
          const subjectKey = data.subjects[0].toLowerCase().replace(/\s+/g, "_");
          const resSimilar = await fetch(`https://openlibrary.org/subjects/${subjectKey}.json?limit=10`);
          if (resSimilar.ok) {
            const similarData = await resSimilar.json();
            setSimilarBooks(similarData.works.filter((w) => w.key !== `/works/${ISBN}`));
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [ISBN]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh" }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" sx={{ mt: 10, textAlign: "center" }}>
        {error}
      </Typography>
    );

  const coverId = book?.covers?.[0];

  return (
    <Box sx={{ p: 4, bgcolor: "background.default", color: "text.primary", minHeight: "100vh" }}>
      <Button component={Link} to="/" variant="outlined" sx={{ mb: 3 }}>
        ← Back to Home
      </Button>

      <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {/* cover + details */}
        <Box sx={{ maxWidth: 600 }}>
          {coverId && (
            <Box
              component="img"
              src={`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`}
              alt={book.title}
              sx={{ width: 250, height: 350, objectFit: "cover", borderRadius: 2, mb: 2 }}
            />
          )}

          <Typography variant="h4" sx={{ mb: 1 }}>
            {book.title}
          </Typography>

          {authors.length > 0 && (
            <Typography variant="subtitle1" sx={{ mb: 2, color: "text.secondary" }}>
              By: {authors.join(", ")}
            </Typography>
          )}

          {book.description && (
            <Typography variant="body1" sx={{ mb: 3 }}>
              {typeof book.description === "string" ? book.description : book.description.value}
            </Typography>
          )}

          <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => alert("Read functionality coming soon!")}
            >
              Read
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => alert("Borrow functionality coming soon!")}
            >
              Borrow
            </Button>
          </Box>
        </Box>

        {/* Right panel: rating & languages */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 120 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <StarIcon sx={{ color: "#ffb400", mr: 0.5 }} />
            <Typography>{book.rating || "N/A"}</Typography>
          </Box>

          {book.languages && (
            <Box>
              <Typography variant="body2" color="text.secondary">
                Languages:
              </Typography>
              <Typography variant="body2">
                {book.languages.map((l) => l.key.replace("/languages/", "")).join(", ")}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Similar Books */}
      {similarBooks.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Similar Books
          </Typography>
          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: 2,
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {similarBooks.map((b) => (
              <BookCard
                key={b.key}
                bookey={b.key.replace("/works/", "")}
                title={b.title}
                img={b.cover_id ? `https://covers.openlibrary.org/b/id/${b.cover_id}-M.jpg` : ""}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Other Books by the Author */}
        {authorBooks.length > 0 && (
        <Box sx={{ mt: 6 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
            Other Books by {authors[0]}
            </Typography>
            <Box
            sx={{
                display: "flex",
                overflowX: "auto",
                gap: 2,
                "&::-webkit-scrollbar": { display: "none" },
            }}
            >
            {authorBooks.map((b) => {
                const cover = b.covers?.[0]
                ? `https://covers.openlibrary.org/b/id/${b.covers[0]}-M.jpg`
                : ""; // fallback image
                if (cover) {
                    return (
                    <BookCard
                        key={b.key}
                        bookey={b.key.replace("/works/", "")}
                        title={b.title}
                        img={cover}
                    />
                    );
                    
                }
            })}
            </Box>
        </Box>
        )}

    </Box>
  );
}
