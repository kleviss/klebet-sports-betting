import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { BetSlipProvider } from "./contexts/BetSlipContext";
import { BetProvider } from "./contexts/BetContext";
import { AppContent } from "./components/AppContent";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <BetProvider>
            <BetSlipProvider>
              <AppContent />
            </BetSlipProvider>
          </BetProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
