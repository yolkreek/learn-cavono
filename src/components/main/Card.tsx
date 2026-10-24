import type { CardType } from "@/types/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

export default function Card({
  card,
  handleDelete,
}: {
  card: CardType;
  handleDelete: (id: string) => void;
}) {
  return (
    <div className="relative flex flex-col bg-brand/40 w-full h-[400px] rounded-2xl">
      <div className="flex-1 font-bold text-center p-2">{card.title}</div>
      <Button
        className="absolute w-5 h-5 bg-brand hover:bg-brand/90 cursor-pointer -right-2 -top-2 b"
        onClick={() => {
          handleDelete(card.id);
        }}
      >
        x
      </Button>
      <Separator></Separator>
      <div className="flex-15 p-2">{card.content}</div>
      <Separator></Separator>
      <div className="flex-1 p-2 text-center">Writed at, {card.created_at}</div>
    </div>
  );
}
