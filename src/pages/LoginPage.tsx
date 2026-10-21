import { useEffect, useState } from "react";
import Login from "../components/Login";
import { BrandWallpaper } from "@/components/BrandWallpaper";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router";
import type { Session } from "@supabase/supabase-js";
import { useAuth } from "@/hooks/useAuth";
import AuthWrapper from "@/components/AuthWrapper";

export default function LoginPage() {
  return (
    <AuthWrapper>
      <BrandWallpaper>
        <Login></Login>
      </BrandWallpaper>
    </AuthWrapper>
  );
}
