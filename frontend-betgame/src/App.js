import { BrowserRouter, Routes, Route } from "react-router-dom";
import Matches from "./matches/Matches";
import MainLayout from "./global/MainLayout"
import { HeaderProvider } from "./global/HeaderContext";

function App() {
  return (
    <HeaderProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<SomeOutsideComponent/>} /> */}

          <Route element={<MainLayout />}>
            <Route path="/" element={<Matches />} />
            <Route path="/results" element={<Matches />} />
            <Route path="/bets" element={<Matches />} />
            <Route path="/stats" element={<Matches />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HeaderProvider>
  );
}

export default App;