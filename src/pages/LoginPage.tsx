import { useEffect, useState } from "react";
import Login from "../components/Login";
import { BrandWallpaper } from "@/components/BrandWallpaper";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router";
import type { Session } from "@supabase/supabase-js";

export default function LoginPage() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <BrandWallpaper>
      <Login session={session}></Login>
    </BrandWallpaper>
  );
}
