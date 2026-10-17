import { Analytics } from "@vercel/analytics/react";
import Entry from "./components/Entry";
import Authentication from "./components/Authentication";

function App() {
  return (
    <>
      <Authentication></Authentication>
      <Entry></Entry>

      <Analytics />
    </>
  );
}

export default App;
