import React, { useContext } from "react";
import { AppBar, Typography, Toolbar, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../context/auth-context";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // display: 'none',
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  sectionDesktop: {
    // display: 'none',
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

const Navbar = () => {
  const auth = useContext(AuthContext);
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <IconButton color="inherit" href="/">
              Online Store
            </IconButton>
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <div>
              {!auth.isLoggedIn && (
                <IconButton color="inherit" href="/login">
                  Login
                </IconButton>
              )}
              {!auth.isLoggedIn && (
                <IconButton color="inherit" href="/signup">
                  Sign Up
                </IconButton>
              )}
              {auth.isLoggedIn && (
                <IconButton color="inherit" href={`/${auth.userId}/cart`}>
                  Cart
                </IconButton>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
