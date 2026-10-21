import { useEffect, useState } from "react";
import Login from "../components/Login";
import { BrandWallpaper } from "@/components/BrandWallpaper";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router";
import type { Session } from "@supabase/supabase-js";
import { useSession } from "@/hooks/useSession";

export default function LoginPage() {
  const sessionSet = useSession();
  useEffect(() => {
    async function load() {
      const s = await supabase.auth.getSession();
      sessionSet.setSession(s.data.session);
    }

    load();
  }, []);

  return (
    <BrandWallpaper>
      <Login></Login>
    </BrandWallpaper>
  );
}
