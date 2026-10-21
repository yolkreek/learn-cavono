import AuthWrapper from "@/components/auth/AuthWrapper";
import Card from "@/components/main/Card";
import { useCards } from "@/hooks/useCards";

export default function Home() {
  const cards = useCards();

  return (
    <AuthWrapper>
      <div className="bg-brand-lite w-screen min-h-dvh ">
        <h1 className="text-9xl">Homepage</h1>
        <div className="grid grid-cols-7 my-5">
          {cards.status !== "loading" &&
            cards.cards.map((v) => <Card card={v}></Card>)}
        </div>
      </div>
    </AuthWrapper>
  );
}
