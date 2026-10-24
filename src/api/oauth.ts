import { supabase } from "@/lib/supabase";

export function approveOauth(authId: string) {
  async function approve() {
    const { data, error } =
      await supabase.auth.oauth.getAuthorizationDetails(authId);
    const { error: error1 } =
      await supabase.auth.oauth.approveAuthorization(authId);
    console.log(data, error);
    console.log(error1);
  }

  approve();
}

export function denyOauth(authId: string) {
  async function deny() {
    await supabase.auth.oauth.getAuthorizationDetails(authId);
    const { error } = await supabase.auth.oauth.denyAuthorization(authId);
    console.log("denyFunc: " + error?.message || "no error");
  }

  deny();
}
