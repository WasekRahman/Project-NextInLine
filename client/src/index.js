import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import { Grid } from "@material-ui/core";

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Grid container justify="center">
      <App />
    </Grid>
    <Footer />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
