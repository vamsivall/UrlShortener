import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import App from "./App";

let theme = createMuiTheme({
    palette: {
        primary: {
            main: '#42a5f5'
        },
        secondary: {
            main: '#cfd8dc'
        }
    }
});

theme = responsiveFontSizes(theme);

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
    </ThemeProvider>
, document.getElementById("root"));