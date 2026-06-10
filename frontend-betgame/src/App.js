import { Routes, Route, useNavigate } from "react-router-dom";
import Matches from "./results/Matches";
import MainLayout from "./global/MainLayout"
import { HeaderProvider } from "./global/HeaderContext";
import Stats from "./stats/Stats";
import Bets from "./bets/Bets";
import Login from "./auth/login/Login";
import { useAuth } from "./auth/global/AuthContext";
import { useEffect } from "react";
import { setAuthFailureHandler } from "./api/base";
import Account from "./account/Account";

function App() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    setAuthFailureHandler(() => {
      logout();
      navigate("/login", { replace: true });
    });
  }, [navigate, logout]);

  return (
    <HeaderProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<Stats />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/bets" element={<Bets />} />
          <Route path="/results" element={<Matches />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </HeaderProvider>
  );
}

export default App;