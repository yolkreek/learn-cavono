import { useNavigate } from "react-router";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import LoginPage from "./LoginPage";

type HomeProps = {};

export default function Home({}: HomeProps) {
  const navigate = useNavigate();
  const [isAuthed, setIsAuthed] = useState<boolean>(false);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getSession();
      if (data.session) setIsAuthed(true);
      else navigate("/login");
    }
    load();
  }, []);
  if (isAuthed)
    return (
      <>
        <h1>Homepage</h1>
      </>
    );
}
