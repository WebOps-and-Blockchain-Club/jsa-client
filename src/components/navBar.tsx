// Navigation bar

//importing modules
import googleAuth from "./oAuth/google.js";
import React from "react";
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const NavBar = () => {
  return (
    <AppBar position="static" color="inherit" >
      <Container maxWidth="xl">
        <Toolbar disableGutters style={{ justifyContent:"space-between"}}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            JSA
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            JSA
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="end">
          <Button
            className="login"
            onClick={googleAuth}
            variant="outlined"
            style={{
              maxWidth: "123px",
              maxHeight: "43px",
              minWidth: "86px",
              minHeight: "43px",
            }}
          >
            Login
          </Button>
          <Button onClick={googleAuth} variant="contained">
            Register
          </Button>
        </Stack>
        
        </Toolbar>
      </Container>
    </AppBar>

        
  );
};

export default NavBar;
