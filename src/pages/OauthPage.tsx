import { approveOauth } from "@/api/oauth";
import { BrandWallpaper } from "@/components/BrandWallpaper";
import { Button } from "@/components/ui/button";

export default function OauthPage() {
  return (
    <BrandWallpaper>
      <div className="flex flex-col justify-center items-center gap-15 text-4xl font-extrabold  md:w-300 text-center">
        <p>Your agent's trying to access your cards. Accept?</p>
        <div className="flex flex-row md:gap-10 gap-5 w-full justify-center">
          <Button
            variant={"outline"}
            className={
              "bg-brand text-white w-50 h-10 cursor-pointer hover:-translate-y-1 hover:bg-brand/90 hover:text-white"
            }
            onClick={() => {
              approveOauth();
            }}
          >
            Accept
          </Button>
          <Button
            variant={"outline"}
            className={
              "bg-brand text-white w-50 h-10 cursor-pointer hover:-translate-y-1 hover:bg-brand/90 hover:text-white"
            }
          >
            Decline
          </Button>
        </div>
      </div>
    </BrandWallpaper>
  );
}
