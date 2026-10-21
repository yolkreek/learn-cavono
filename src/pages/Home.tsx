import { useNavigate } from "react-router";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";
import AuthWrapper from "@/components/AuthWrapper";

type HomeProps = {};

export default function Home({}: HomeProps) {
  const navigate = useNavigate();
  const session = useAuth();

  useEffect(() => {
    console.log(session);
    if (session === null) navigate("/login");
  }, [session]);
  if (session)
    return (
      <AuthWrapper>
        <h1 className="text-9xl">Homepage</h1>
      </AuthWrapper>
    );
}
