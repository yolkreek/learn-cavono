import { Analytics } from "@vercel/analytics/react";
import Entry from "./components/Entry";
import Login from "./components/Login";
import { useState } from "react";

function App() {
  const [id, setId] = useState("");
  setId("");
  return (
    <>
      <div className="flex flex-col w-screen h-screen justify-center items-center bg-[url(/cavono-wallpaper.svg)]">
        <Login></Login>

        {id && <Entry></Entry>}

        <Analytics />
      </div>
    </>
  );
}

export default App;
