import { Analytics } from "@vercel/analytics/react";
import Login from "./components/Login";

export default function Home() {
  return (
    <>
      <div className="flex flex-col w-screen h-screen justify-center items-center bg-[url(/cavono-wallpaper.svg)]">
        <Login></Login>
        <Analytics />
      </div>
    </>
  );
}
