import { BrowserRouter, Routes, Route } from "react-router-dom";
import Matches from "./results/Matches";
import MainLayout from "./global/MainLayout"
import { HeaderProvider } from "./global/HeaderContext";
import Stats from "./stats/Stats";
import Bets from "./bets/Bets";

function App() {
  return (
    <HeaderProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<SomeOutsideComponent/>} /> */}

          <Route element={<MainLayout />}>
            <Route path="/" element={<Stats />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/bets" element={<Bets />} />
            <Route path="/results" element={<Matches />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HeaderProvider>
  );
}

export default App;