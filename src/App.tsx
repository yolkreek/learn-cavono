import { Route, Routes } from "react-router";
import Home from "./Home";
import SuccessPage from "./SuccessPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/verified" element={<SuccessPage />} />
    </Routes>
  );
}

export default App;
