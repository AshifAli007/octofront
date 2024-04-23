import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Typography, Grid, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import { host } from '../hosts';

// Define the Alert component for easier use with the Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function LoginSignup() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [course, setCourse] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('error');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      userDetails: {
        username,
        password,
        ...(isLoginView ? {} : {
          name, college, course, phone, "privileges": "user",
          "events": []
        })
      }
    };

    const url = isLoginView ? host + '/userService/login' : host + '/userService/sign-up';

    axios.post(url, userData)
      .then(response => {
        if (isLoginView) {
          // Save accessToken to local storage
          const { accessToken, refreshToken } = response.data.data;
          console.log(accessToken, refreshToken, response.data.data);
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          // Optionally, save other data or handle navigation
          navigate('/home');
        } else {
          setIsLoginView(true);
          setSnackbarMessage('User created successfully. Please login.');
          setOpenSnackbar(true);
          setAlertSeverity('success');
        }



      })
      .catch(error => {
        // Check if the error is a 404 or other network-related issue
        if (error.response && error.response.status === 404) {
          setSnackbarMessage('User not found. Please check your credentials or sign up if you do not have an account.');
          setOpenSnackbar(true);
          setAlertSeverity('error');
        } else {
          setSnackbarMessage('An error occurred. Please try again.');
          setOpenSnackbar(true);
          setAlertSeverity('error');
        }
      });
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setUsername('');
    setPassword('');
    setName('');
    setCollege('');
    setCourse('');
    setPhone('');
  };

  return (
    <Container component="main" maxWidth="xs" sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh', // Ensures the container takes at least the height of the viewport
      alignItems: 'center', // Centers items horizontally in the container
      justifyContent: 'center', // Centers items vertically in the container
      padding: '20px' // Adds padding around the container
    }}>
      <Typography component="h1" variant="h5">
        {isLoginView ? 'Login' : 'Signup'}
      </Typography>
      <form onSubmit={handleSubmit} autoComplete='off' style={{ width: '100%' }}> {/* Ensure the form takes full width of its parent */}
        <Grid container spacing={2}>
          {!isLoginView && (
            <>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="College"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Email Address"
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              {isLoginView ? 'Login' : 'Signup'}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={toggleView} fullWidth color="secondary">
              {isLoginView ? 'No account? Sign up' : 'Have an account? Sign in'}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setOpenSnackbar(false)} severity={alertSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}


export default LoginSignup;
