import { BrowserRouter, Routes, Route } from "react-router-dom";
import Matches from "./matches/matches";
// import MainLayout from "./global/mainlayout/MainLayout"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<SomeOutsideComponent/>} /> */}

        {/* <Route element={<MainLayout/>}> */}
        <Route path="/" element={<Matches />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;