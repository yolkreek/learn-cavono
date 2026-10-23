import { Route, Routes } from "react-router";
import SuccessPage from "./pages/SuccessPage";
import { Analytics } from "@vercel/analytics/react";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthProvider";
import Page404 from "./pages/Page404";
import OauthPage from "./pages/OauthPage";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/verified" element={<SuccessPage />} />
          <Route path="/oauth/consent" element={<OauthPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </AuthProvider>

      <Analytics />
    </>
  );
}

export default App;
