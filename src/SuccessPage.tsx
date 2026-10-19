import { Analytics } from "@vercel/analytics/react";
import { IconHome } from "@tabler/icons-react";
import { useNavigate } from "react-router";

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col w-full min-h-dvh justify-center items-center bg-[url(/cavono-wallpaper.svg)]">
        <div className="flex flex-col justify-center items-center gap-10">
          <p className="font-extrabold text-6xl">Verified!</p>
          <button
            className="cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <IconHome size={100} className="rounded-2xl backdrop-blur-2xl" />
          </button>
        </div>
      </div>
      <Analytics />
    </>
  );
}
