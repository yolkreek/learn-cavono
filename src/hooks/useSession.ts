import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";

export function useSession() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("context없음");
  }

  return context;
}
