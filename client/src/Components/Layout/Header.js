import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  MuiThemeProvider,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const THEME = createMuiTheme({
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

export default function Header() {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={THEME}>
      <div>
        <AppBar position="sticky" color="black">
          <Toolbar className="ml-5 pl-5 mr-5 pr-5">
            <Typography
              fontFamily="Helvetica"
              variant="h6"
              className={classes.title}
            >
              <a href="/dashboard">Next In Line</a>
            </Typography>
            <Typography
              fontFamily="Helvetica"
              variant="subtitle1"
              className={classes.title}
              align="right"
            >
              <div className="pr-4">
                <a href="http://3.135.144.113/dashboard.html">Dashboard</a>
              </div>
            </Typography>

            <a href="/registration">
              <Typography
                fontFamily="Helvetica"
                variant="subtitle1"
                className={classes.title}
                align="right"
              >
                Register
              </Typography>
            </a>
          </Toolbar>
        </AppBar>
      </div>
    </MuiThemeProvider>
  );
}
