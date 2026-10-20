import { createContext, useState } from "react";
import type { Session } from "@supabase/supabase-js";

type AuthCtx = {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
};

export const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  return <AuthContext value={{ session, setSession }}>{children}</AuthContext>;
}
