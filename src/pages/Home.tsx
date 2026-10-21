import { useNavigate } from "react-router";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";

import { useSession } from "@/hooks/useSession";

type HomeProps = {};

export default function Home({}: HomeProps) {
  const navigate = useNavigate();
  const { session, setSession } = useSession();
  console.log("Home" + session ? true : false);
  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getSession();
      if (data.session) setSession(data.session);
      else navigate("/login");
    }
    load();
  }, []);
  if (session)
    return (
      <>
        <h1 className="text-9xl">Homepage</h1>
      </>
    );
}
