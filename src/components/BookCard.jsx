import { Card,CardContent,Typography,Button,IconButton,Box,Skeleton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorite,
  removeFromFavorite,
} from '../redux/slices/favoriteSlice.js';

export default function BookCard({ bookey, img, title, loading = false }) {
  const list = useSelector((state) => state.favorite.list);
  const isFavorite = list.includes(bookey);
  const dispatch = useDispatch();

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = (key) => {
    if (isFavorite) dispatch(removeFromFavorite(key));
    else dispatch(addToFavorite(key));
  };

  return (
    <Card
      sx={{
        width: 180,
        flexShrink: 0,
        boxShadow: 3,
        borderRadius: 2,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.paper',
        position: 'relative',
      }}
    >

      {/* Cover Image Area */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 220,
          overflow: 'hidden',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        {/* Skeleton placeholder while loading or image not loaded */}
        {(loading || !imageLoaded) && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
            sx={{ position: 'absolute', top: 0, left: 0 }}
          />
        )}

        {!loading && img && (
          <img
            src={img}
            alt={title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: imageLoaded ? 'block' : 'none',
              transition: 'opacity 0.3s ease',
            }}
          />
        )}

        {!loading && (
          <IconButton
            onClick={() => handleClick(bookey)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(255,255,255,0.7)',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
            }}
            size="small"
          >
            {isFavorite ? (
              <FavoriteIcon color="error" fontSize="small" />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </IconButton>
        )}
      </Box>

        {/* Title  */}
      <CardContent
        sx={{
          textAlign: 'center',
          p: 1,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        {loading ? (
          <Skeleton
            variant="text"
            width="80%"
            sx={{ mx: 'auto', mb: 0.5 }}
            animation="wave"
          />
        ) : (
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              fontSize: '0.9rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </Typography>
        )}
      </CardContent>

      {/* Button */}
      <CardContent sx={{ textAlign: 'center', p: 1.5 }}>
        {loading ? (
          <Skeleton
            variant="rounded"
            width={100}
            height={30}
            sx={{ mx: 'auto' }}
            animation="wave"
          />
        ) : (
          <Button
            component={Link}
            to={bookey}
            variant="contained"
            size="small"
            sx={{
              textTransform: 'none',
              fontSize: '0.8rem',
              borderRadius: 1.5,
              px: 2,
            }}
          >
            Show Details
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
