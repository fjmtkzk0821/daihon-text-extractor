import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import TextExtractor from "./components/text_extractor";

const theme = createMuiTheme({
  shape: {
    borderRadius: 0,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <TextExtractor />
      </div>
    </ThemeProvider>
  );
}

export default App;
