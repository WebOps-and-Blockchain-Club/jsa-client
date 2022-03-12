// Navigation bar

//importing modules
import googleAuth from "./oAuth/google.js";
import React, { Fragment, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AuthContext } from "../context/authContext";
import { IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
var axios = require("axios");

const NavBar = () => {
  const { user } = useContext(AuthContext);
   const handlelogout = async () => {
    var config = {
      method: "post",
      url: `${process.env.BACKEND_URL}/signout`,
      headers: {},
    };

    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <AppBar position="static" color="inherit">
      <Container maxWidth="xl">
        <Toolbar disableGutters style={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            JSA
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            JSA
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="end">
            {!user ? (
              <Fragment>
                <Button
                  className="login"
                  onClick={googleAuth}
                  variant="contained"
                  style={{
                    maxWidth: "123px",
                    maxHeight: "43px",
                    minWidth: "86px",
                    minHeight: "43px",
                  }}
                >
                  Login/Register
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <Button
                  className="login"
                  onClick={handlelogout}
                  variant="outlined"
                  style={{
                    maxWidth: "123px",
                    maxHeight: "43px",
                    minWidth: "86px",
                    minHeight: "43px",
                  }}
                >
                  Logout
                </Button>
                <a href={"/profile"}>
                  <IconButton sx={{ fontSize: 80 }} color="inherit">
                    <AccountCircle />
                  </IconButton>
                </a>
              </Fragment>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
