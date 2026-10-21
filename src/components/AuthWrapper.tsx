import { useAuth } from "@/hooks/useAuth";
import LoadingPage from "@/pages/LoadingPage";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();

  if (auth.status === "loading") return <LoadingPage />;
  else return <>{children}</>;
}
