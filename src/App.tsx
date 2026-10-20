import { Route, Routes } from "react-router";
import SuccessPage from "./pages/SuccessPage";
import { Analytics } from "@vercel/analytics/react";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/verified" element={<SuccessPage />} />
      </Routes>

      <Analytics />
    </>
  );
}

export default App;
