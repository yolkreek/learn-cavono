import { useAuth } from "@/hooks/useAuth";
import LoadingPage from "@/pages/LoadingPage";
import { Navigate } from "react-router";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();

  if (auth.status === "loading") return <LoadingPage />;
  else if (auth.status === "signedOut")
    return <Navigate to="/login" replace></Navigate>;
  else return <>{children}</>;
}
