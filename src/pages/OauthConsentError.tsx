import { BrandWallpaper } from "@/components/BrandWallpaper";
import GoToHome from "@/components/GoToHome";

export default function OauthConsentError() {
  return (
    <BrandWallpaper>
      <div className="flex flex-col justify-center items-center gap-20 p-3">
        <p className="text-5xl md:text-6xl text-brand font-bold text-center">
          It seems like your request is wrong.
        </p>
        <GoToHome text="Go to home" className="scale-200"></GoToHome>
      </div>
    </BrandWallpaper>
  );
}
