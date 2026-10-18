import { useState } from "react";
import { signUp } from "@/api/auth";
import { isAuthError } from "@supabase/supabase-js";

export function useSignUp() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      await signUp(email, password);
      setSuccess(true);
    } catch (e) {
      if (isAuthError(e)) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return { submit, loading, success, error };
}
