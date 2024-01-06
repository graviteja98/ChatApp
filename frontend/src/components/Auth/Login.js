import React, { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Container,
} from '@mui/material';
import { useAppContext } from '../../Context/ChatContext';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    room : ''
  });
  const x = useAppContext();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login credentials:', { ...credentials, isLogged : true } );
   x.dispatch({ type : "addUser", payload : { ...credentials, isLogged : true } } )
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '8vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Paper elevation={3} style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form style={{ width: '100%', marginTop: '16px' }} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleChange}
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="room"
            label="Room"
            type="text"
            id="room"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '24px 0 16px' }}
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
