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
import { Form, Link as RouterLink } from 'react-router-dom';



export default function RegistrationPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
        Register
      </Typography>
      
      <Form method="POST">
        <Box component={"div"} sx={{ mt: 1 }}>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {'Create Account'}
          </Button>
          <Grid container>
            <Grid item>
              <RouterLink to="/login">
                <Link href="#" variant="body2">
                  {"Already have an account? Login"}
                </Link>
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Form>
    </Box>
  </Container>
  );
}
