import { useState } from "react";
import { signIn } from "@/api/auth";
import { isAuthApiError, type Session } from "@supabase/supabase-js";

export function useSignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(email: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      await signIn(email, password);
    } catch (e: unknown) {
      if (isAuthApiError(e)) setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return { submit, loading, error };
}
