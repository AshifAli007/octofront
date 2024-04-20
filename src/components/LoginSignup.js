import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// Define the Alert component for easier use with the Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function LoginSignup() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // State for Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('error'); // or 'success'

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLoginView ? 'http://localhost:8000/v1/userService/login' : 'http://localhost:8000/v1/userService/signup';
    const userData = {
      userDetails: {
        username,
        password,
      }

    };

    axios.post(url, userData)
      .then(response => {
        // Save accessToken to local storage
        const { accessToken, refreshToken } = response.data.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // Optionally, save other data or handle navigation
        navigate('/home');
        // Handle success response
        navigate('/home');

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
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div>
      {isLoginView ? <h2>Login</h2> : <h2>Signup</h2>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">{isLoginView ? 'Login' : 'Signup'}</button>
      </form>
      <button onClick={toggleView}>
        {isLoginView ? 'No account? Sign up' : 'Have an account? Sign in'}
      </button>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={alertSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LoginSignup;
