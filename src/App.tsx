import { Route, Routes } from "react-router";
import SuccessPage from "./pages/SuccessPage";
import { Analytics } from "@vercel/analytics/react";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthProvider";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <AuthProvider>
              <Home />
            </AuthProvider>
          }
        />
        <Route
          path="/login"
          element={
            <AuthProvider>
              <LoginPage />
            </AuthProvider>
          }
        />
        <Route
          path="/login/verified"
          element={
            <AuthProvider>
              <SuccessPage />
            </AuthProvider>
          }
        />
      </Routes>

      <Analytics />
    </>
  );
}

export default App;
