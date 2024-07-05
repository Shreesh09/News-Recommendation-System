import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));





const pages = ['dashboard','history'];
const settings = ['History', 'Logout'];

function ResponsiveAppBar() {
  const [state, setState] = useState(0);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [searchText, setSearchText] = useState(null);
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if(!searchText)
        return;
      if(searchText.length == 0)
          return navigate(`dashboard/1`, { absolute: "path" })
      navigate(`search/${searchText}/1`, { absolute: "path" })
    }
  };

  // useEffect(() => {
  //   if(!searchText)
  //       return;
  //   if(searchText.length == 0)
  //       return navigate(`dashboard/1`, { absolute: "path" })
  //   navigate(`search/${searchText}/1`, { absolute: "path" })
  // }, [searchText])

  const navigate = useNavigate();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="false" sx={{width: '100%'}}>
        <Toolbar disableGutters>
          <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
          <path d="M18 14h-8"></path>
          <path d="M15 18h-5"></path>
          <path d="M10 6h8v4h-8V6Z"></path>
      </svg>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              ml: 1,
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            NEWS
          </Typography>

          <Box marginLeft={'50px'} sx={{ display: "flex", flexGrow: 1, gap: '20px'}}>
            {pages.map((page, ind) => (
              <NavLink key={page} to={`${page}/1`} className={({ isActive }) => {
                if(isActive)
                    setState(ind);
            }}><Button
                sx={{ my: 2, color: 'white', fontSize: "18px", fontWeight:(state == ind?"bold":"normal") }}
              >
                {page}
              </Button></NavLink>
            ))}
          </Box>
             <Search>
            <SearchIconWrapper >
              <SearchIcon sx={{position: 'relative', zIndex: '100'}} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event) => {
                setSearchText(event.target.value)
              }}
              onKeyDown={handleKeyDown}
              value={searchText??""}
            />
          </Search>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar sx={{ m: 1, bgcolor: 'black', border: "1px solid white" }}>
              </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => {
                  if(setting == 'History') {
                    if(state == 0 || state == 2) {
                      navigate(`history/1`, { absolute: "path" })
                    }
                  } else {
                    sessionStorage.removeItem('username');
                    sessionStorage.removeItem('token');
                    navigate('/login', { absolute: "path" })
                  }
                  handleCloseUserMenu();
                }}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
