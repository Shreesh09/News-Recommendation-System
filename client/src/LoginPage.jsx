import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from './keys';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.target);
      const username = formData.get('username');
      const password = formData.get('password');
      const response = await axios.post(`${SERVER_URL}/login`, {username, password})
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('token');
      sessionStorage.setItem('token', response.data.access_token);
      sessionStorage.setItem('username', username)
      navigate('/home/dashboard/1', {absolute: 'path'});
    } catch (e) {
      console.log(e)
      setError('Invalid username or password');
    }
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'black' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
            <Box component="form" method='POST' onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Typography textAlign={'center'} fontSize={"18px"} color={'red'}>{error}</Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                    <RouterLink to="/register">
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </RouterLink>
                </Grid>
              </Grid>
            </Box>
        </Box>
      </Container>
  );
}
