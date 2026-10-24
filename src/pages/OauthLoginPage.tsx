import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import LoginPage from "./LoginPage";
import Login from "@/components/auth/Login";
import { BrandWallpaper } from "@/components/BrandWallpaper";

export default function OauthLoginPage() {
  const redir = useLocation().state?.from || "/";
  const auth = useAuth();
  if (auth.status === "signedIn") return <Navigate to={redir}></Navigate>;
  return (
    <BrandWallpaper>
      <div className="flex flex-col justify-center items-center gap-5">
        <p className="font-bold text-6xl text-brand">Log in to proceed.</p>
        <Login></Login>
      </div>
    </BrandWallpaper>
  );
}
