import type { CardType } from "@/types/card";
import { Separator } from "../ui/separator";

import CardDropDown from "./CardDropDown";
import { motion } from "motion/react";

export default function Card({
  card,
  handleDelete,
  handleUpdate,
}: {
  card: CardType;
  handleDelete: (id: string) => void;
  handleUpdate: (
    id: string,
    title?: string | undefined,
    content?: string | undefined,
  ) => void;
}) {
  return (
    <motion.div
      tabIndex={card.pos}
      className={`relative flex flex-col bg-brand/40 w-full h-120 rounded-2xl transition-all 0.3s ease-in
        
    focus:outline-none
    focus:border-[#668cff]
    focus:ring-4 focus:ring-[#668cff]/75
    focus:shadow-[0_0_20px_4px_rgba(80,120,255,0.25)]`}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <div className="relative flex flex-row font-bold text-center p-4 items-center w-full">
        <p className="text-black/50 shrink-0">{card.pos}</p>
        <p className="absolute left-1/2 -translate-x-1/2 w-3/4">{card.title}</p>
        <CardDropDown
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          id={card.id}
          content={card.content}
        />
      </div>

      <Separator></Separator>
      <div className="flex-15 p-2 overflow-auto">{card.content}</div>
      <Separator></Separator>
      <div className="p-2 flex flex-row gap-2">
        {card.tags.map((v, i) => (
          <p key={v + i.toString()}>#{v}</p>
        ))}
      </div>
      <Separator></Separator>
      <div className="flex-1 p-2 flex flex-row justify-between">
        <p className="text-black/50">Writed at, {card.created_at}</p>
        <p className="text-black/80">Updated at, {card.updated_at}</p>
      </div>
    </motion.div>
  );
}
