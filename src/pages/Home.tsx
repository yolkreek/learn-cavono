import AuthWrapper from "@/components/auth/AuthWrapper";
import HomeWallpaper from "@/components/HomeWallpaper";
import Card from "@/components/main/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCards } from "@/hooks/useCards";

import { IconSearch } from "@tabler/icons-react";
import { AnimatePresence } from "motion/react";

export default function Home() {
  const { cards, status, createCard, deleteCard, updateCard, setTags } =
    useCards();

  return (
    <AuthWrapper>
      <HomeWallpaper>
        <div className="flex flex-col items-center w-full h-full">
          <header className="w-full p-5 grid grid-cols-[1fr_auto_1fr] h-20 items-center">
            <form
              className="flex-1 w-1/3 flex gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                const form = new FormData(e.target);
                const tag = form.get("tag") as string;
                const tagArray = tag.split(" ");

                setTags(tagArray);
              }}
            >
              <Input name="tag" type="text" className=" bg-white"></Input>
              <Button
                name="search"
                className={"bg-white hover:bg-gray-300  cursor-pointer"}
                type="submit"
              >
                <IconSearch className=" text-black" color="black" />
              </Button>
            </form>

            <p className="text-5xl font-extrabold font-sora text-brand/80">
              Homepage
            </p>
            <Button
              variant={"outline"}
              className={"bg-black text-white justify-self-end"}
            >
              Soon
            </Button>
          </header>
          <Separator className={"bg-brand/60"} />
          <main className="min-h-0 flex-1 w-full overflow-y-auto flex flex-col items-center">
            <Button
              className={
                "bg-brand h-10 w-80 m-4 cursor-pointer hover:-translate-y-1 hover:bg-brand/90"
              }
              onClick={() => {
                createCard("untitled", "test", 10000);
              }}
            >
              Create Card
            </Button>
            <div className="grid md:grid-cols-5 gap-10 w-full p-4 ">
              <AnimatePresence>
                {status === "loaded" &&
                  cards.map((v) => (
                    <Card
                      key={v.id}
                      card={v}
                      handleDelete={deleteCard}
                      handleUpdate={updateCard}
                    ></Card>
                  ))}
              </AnimatePresence>
            </div>
          </main>
        </div>
      </HomeWallpaper>
    </AuthWrapper>
  );
}
