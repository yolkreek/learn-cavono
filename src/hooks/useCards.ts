import type { CardType } from "@/components/main/Card";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export type CardsSetType =
  | {
      cards: CardType[];
      status: "loaded";
    }
  | { cards: null; status: "loading" };

export function useCards() {
  const [cards, setCards] = useState<CardsSetType>({
    cards: null,
    status: "loading",
  });

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("cards")
        .select("*")
        .overrideTypes<CardType[], { merge: false }>();
      if (error) throw new Error(error.message);
      console.log(data);
      setCards(() => {
        let outCards = [] as CardType[];
        data.map((v) => {
          outCards.push({
            id: v.id,
            title: v.title,
            content: v.content,
            tag: v.tag,
            linked_to: v.linked_to,
            created_at: v.created_at,
            updated_at: v.updated_at,
          });
        });

        return { cards: outCards, status: "loaded" };
      });
    }

    load();
  }, []);

  return cards;
}
