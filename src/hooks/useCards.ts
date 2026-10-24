import type { CardType } from "@/types/card";
import { supabase } from "@/lib/supabase";
import type { CardsSetType } from "@/types/card";
import { useEffect, useState } from "react";

export function useCards() {
  const [cardsState, setCardsState] = useState<CardsSetType>({
    cards: null,
    status: "loading",
  });

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.from("cards").select("*");

      if (error) throw new Error(error.message);
      console.log(data);
      setCardsState(() => {
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

  async function createCard(title: string, content: string) {
    const { data, error } = await supabase
      .from("cards")
      .insert({
        title,
        content,
      })
      .select()
      .single();

    if (error) {
      return { error: null };
    }

    setCardsState((prev) => {
      if (prev.cards === null) return { status: "loaded", cards: [data] };
      else return { status: "loaded", cards: [...prev.cards, data] };
    });
  }

  async function deleteCard(id: string) {
    const { data, error } = await supabase
      .from("cards")
      .delete()
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) {
      return { error: null };
    }

    setCardsState((prev) => {
      if (!prev.cards) return prev;

      const newCards = prev.cards.filter((v) => v.id !== id);
      return { status: "loaded", cards: newCards };
    });

    return data;
  }

  async function updateCard(
    id: string,
    updated_at: string,
    title?: string,
    content?: string,
  ) {
    const { data, error } = await supabase
      .from("cards")
      .update({ updated_at, title, content })
      .eq("id", id)
      .select()
      .maybeSingle();

    if (!data) return { error: null };
    if (error) {
      return { error: null };
    }

    setCardsState((prev) => {
      if (!prev.cards) return prev;

      const newCards = [...prev.cards];
      newCards.forEach((v) => {
        if (v.id === data.id) {
          v.updated_at = updated_at;
          if (title) v.title = title;
          if (content) v.content = content;
        }
      });
      return { status: "loaded", cards: newCards };
    });

    return data;
  }

  return { cardsState, createCard, deleteCard };
}
