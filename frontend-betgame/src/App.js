import { Routes, Route, Navigate } from "react-router-dom";
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
import ProtectedRoute from "./auth/global/ProtectedRoute";

function App() {
  const { handleAuthFailure, isAuthenticated } = useAuth();

  useEffect(() => {
    setAuthFailureHandler(handleAuthFailure);
  }, [handleAuthFailure]);

  return (
    <HeaderProvider>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Stats />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/bets" element={<Bets />} />
            <Route path="/results" element={<Matches />} />
            <Route path="/account" element={<Account />} />
          </Route>
        </Route>
      </Routes>
    </HeaderProvider >
  );
}

export default App;