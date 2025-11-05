import { AppBar,Box,Toolbar,Typography,IconButton,Button,Badge,TextField,InputAdornment } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SearchIcon from '@mui/icons-material/Search'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useTheme } from '@mui/material/styles'
import { useColorMode } from '../theme/ThemeProvider'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Navbar() {
  const theme = useTheme()
  const colorMode = useColorMode()
  const navigate = useNavigate()
  const favoriteCount = useSelector((state) => state.favorite.list.length)

  const [query, setQuery] = useState('')

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <Box sx={{ flexGrow: 1, mb: 3 }}>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ gap: 2 }}>
          {/* App Title */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Open Library
          </Typography>

          {/* Search Input */}
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            sx={{
              width: 220,
              bgcolor: 'background.paper',
              borderRadius: 1,
              input: { color: theme.palette.text.primary },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* Favorite Icon with Badge */}
          <IconButton
            color="inherit"
            onClick={() => navigate('/favorites')}
            sx={{ mr: 1 }}
          >
            <Badge badgeContent={favoriteCount} color="error">
              <FavoriteIcon />
            </Badge>
          </IconButton>

          {/* Dark/Light Mode Toggle */}
          <IconButton
            sx={{ ml: 1 }}
            color="inherit"
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === 'dark' ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
