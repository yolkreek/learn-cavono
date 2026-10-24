import { approveOauth, denyOauth } from "@/api/oauth";
import { BrandWallpaper } from "@/components/BrandWallpaper";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation, useNavigate } from "react-router";
import OauthLoginPage from "./OauthLoginPage";
import OauthConsentError from "./OauthConsentError";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";

export default function OauthConsentPage() {
  const auth = useAuth();
  const loc = useLocation();
  const [loading, setLoading] = useState<boolean>(false);

  const queryParams = new URLSearchParams(loc.search);
  const authId = queryParams.get("authorization_id");
  if (!authId) return <OauthConsentError />;

  if (auth.status === "loading") return null;
  else if (auth.status === "signedOut")
    return (
      <Navigate
        to="/oauth/login"
        state={{ from: loc.pathname + loc.search }}
        replace
      ></Navigate>
    );

  if (loading)
    return (
      <BrandWallpaper>
        <Spinner className="size-12 text-brand" stroke="3" />
      </BrandWallpaper>
    );
  return (
    <BrandWallpaper>
      <div className="flex flex-col justify-center items-center gap-15 text-4xl font-extrabold  md:w-300 text-center text-brand">
        <p>Your agent's trying to access your cards. Accept?</p>
        <div className="flex flex-row md:gap-10 gap-5 w-full justify-center">
          <Button
            variant={"outline"}
            className={
              "bg-brand text-white w-50 h-10 cursor-pointer hover:-translate-y-1 hover:bg-brand/90 hover:text-white"
            }
            onClick={() => {
              approveOauth(authId);
              setLoading(true);
            }}
          >
            Accept
          </Button>
          <Button
            variant={"outline"}
            className={
              "bg-brand text-white w-50 h-10 cursor-pointer hover:-translate-y-1 hover:bg-brand/90 hover:text-white"
            }
            onClick={() => {
              denyOauth(authId);
              setLoading(true);
            }}
          >
            Decline
          </Button>
        </div>
      </div>
    </BrandWallpaper>
  );
}
