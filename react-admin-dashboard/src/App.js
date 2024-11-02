import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/layout/Topbar";
import Sidebar from "./scenes/layout/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/Devices";
import Profile from "./scenes/Profile";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import History from "./scenes/History";
import RandomPage from "./scenes/dashboard/RandomPage";
import Profile2 from "./scenes/Profile2";
import GaugeComponent from "./components/GaugeComponent";
import MyLineChart from "./scenes/MyLineChart";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/random" element={<RandomPage />} />
              <Route path="history" element={<History />} />
              <Route path="/profile" element={<Profile2 />} />
              <Route path="/test" element={<MyLineChart />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
