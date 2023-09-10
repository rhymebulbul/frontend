import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Header from '../../Layout/Header';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import { AuthContext } from '../../../shared/context/Auth-context';
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useNavigate } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();



export default function SignUp() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name,setName] = React.useState('');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [snackbarMessage, setSnackbarMessage] = React.useState('');


   const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        "http://localhost:8081/api/auth/signup",
          "POST",
        JSON.stringify({ email, name, password }),
        {
          "Content-Type": "application/json",
        }
      );

      auth.login(responseData.userId, responseData.token);
      navigate('/'); // Navigate to the main page on successful login
    } catch (err) {
         if (err.message.includes('Failed! Username is already in use!')) {  // Check the error message
        setSnackbarMessage('Email already exists. Please try another.');
      } else {
        setSnackbarMessage('An error occurred. Please try again.');
      }
      setOpenSnackbar(true); // Show the Snackbar when there's an error
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
        <Header/>
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
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={e => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={e => setPassword(e.target.value)}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href = '/signin' variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
      <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
                action={
                    <React.Fragment>
                    <Button color="secondary" size="small" onClick={() => setOpenSnackbar(false)}>
                        Close
                    </Button>
                    </React.Fragment>
                }>

      </Snackbar>
    </ThemeProvider>
  );
}