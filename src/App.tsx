import { createTheme, ScopedCssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Router from "./routes/Router";
import { Provider } from "react-redux";
import { store } from "./infrastructure/store";

const theme = createTheme({
  typography: {
    fontFamily: ["Lato", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#484848",
    },
  },
  spacing: 8,
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ScopedCssBaseline>
          <ToastContainer />
          <Router />
        </ScopedCssBaseline>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
