import { supabase } from "@/lib/supabase";

export function approveOauth() {
  const params = new URLSearchParams(window.location.search);
  async function approve() {
    await supabase.auth.oauth.approveAuthorization(
      params.get("authorization_id") as string,
    );
  }

  approve();
}
