import { AuthContext } from "@/context/AuthProvider";

import { useContext } from "react";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("auth 없음");
  }

  return context;
}
