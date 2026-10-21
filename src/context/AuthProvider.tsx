import { createContext, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { PreviewCard } from "@base-ui/react";
type AuthCtx =
  | { status: "loading" }
  | { status: "signedOut" }
  | { status: "signedIn"; session: Session };
//undefined: out of AuthContext.
export const AuthContext = createContext<AuthCtx | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthCtx>({ status: "loading" });
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuth(
        session
          ? { status: "signedIn", session: session }
          : { status: "signedOut" },
      );
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return <AuthContext value={auth}>{children}</AuthContext>;
}
