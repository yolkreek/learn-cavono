import { supabase } from "@/lib/supabase";

export function approveOauth() {
  const authId = new URLSearchParams(window.location.search).get(
    "authorization_id",
  ) as string;
  async function approve() {
    const { data, error } =
      await supabase.auth.oauth.getAuthorizationDetails(authId);
    await supabase.auth.oauth.approveAuthorization(authId);
    console.log(data, error);
  }

  approve();
}
