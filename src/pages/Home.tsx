import AuthWrapper from "@/components/auth/AuthWrapper";
import HomeWallpaper from "@/components/HomeWallpaper";
import Card from "@/components/main/Card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCards } from "@/hooks/useCards";

export default function Home() {
  const { cardsState, createCard } = useCards();

  return (
    <AuthWrapper>
      <HomeWallpaper>
        <div className="flex flex-col justify-center items-center w-full h-full">
          <header className="h-50 flex flex-col justify-center">
            <p className="text-5xl font-extrabold font-sora text-brand/80">
              Homepage
            </p>
          </header>
          <Separator className={"bg-brand"} />
          <main className="min-h-0 flex-1 w-full overflow-y-auto flex flex-col items-center">
            <Button
              className={
                "bg-brand h-10 w-80 m-4 cursor-pointer hover:-translate-y-1 hover:bg-brand/90"
              }
              onClick={() => {
                createCard("untitled", "test");
              }}
            >
              Create Card
            </Button>
            <div className="grid md:grid-cols-5 gap-10 w-full p-4 ">
              {cardsState.status === "loaded" &&
                cardsState.cards.map((v) => <Card key={v.id} card={v}></Card>)}
            </div>
          </main>
        </div>
      </HomeWallpaper>
    </AuthWrapper>
  );
}
