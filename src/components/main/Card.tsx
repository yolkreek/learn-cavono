import type { CardType } from "@/types/card";
import { Separator } from "../ui/separator";

export default function Card({ card }: { card: CardType }) {
  return (
    <div className="flex flex-col bg-brand/40 w-full h-[400px] rounded-2xl">
      <div className="flex-1 font-bold text-center p-1">{card.title}</div>
      <Separator></Separator>
      <div className="flex-15 p-1">{card.content}</div>
      <Separator></Separator>
      <div className="flex-1 p-1 text-center">Writed at, {card.created_at}</div>
    </div>
  );
}
