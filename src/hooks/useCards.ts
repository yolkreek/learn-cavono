import type { CardType } from "@/types/card";
import { supabase } from "@/lib/supabase";
import type { CardsSetType } from "@/types/card";
import { useEffect, useMemo, useState } from "react";

export function useCards() {
  const [cardsState, setCardsState] = useState<CardsSetType>({
    cards: null,
    status: "loading",
  });
  const [tags, setTags] = useState<string[]>([]);
  const visibleCards = useMemo(() => {
    return searchCard(cardsState.cards, tags);
  }, [cardsState.cards, tags]);
  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("cards")
        .select("*")
        .order("pos");

      if (error) throw new Error(error.message);
      console.log(data);
      setCardsState({ cards: data, status: "loaded" });
    }

    load();
  }, []);

  async function createCard(
    title: string,
    content: string,
    tags: string[],
    linked_to: string[],
    pos: number,
  ) {
    const { data, error } = await supabase
      .from("cards")
      .insert({
        title,
        content,
        tags,
        linked_to,
        pos,
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

  async function updateCard(id: string, title?: string, content?: string) {
    const { data, error } = await supabase
      .from("cards")
      .update({ title, content })
      .eq("id", id)
      .select()
      .maybeSingle();
    console.log(data, error);

    if (error) {
      return { error: null };
    }

    setCardsState((prev) => {
      if (!prev.cards) return prev;

      const newCards = [...prev.cards];
      newCards.forEach((v) => {
        if (v.id === id) {
          if (title) v.title = title;
          if (content) v.content = content;
        }
      });
      return { status: "loaded", cards: newCards };
    });

    return data;
  }

  function searchCard(cards: CardType[] | null, tags: string[]): CardType[] {
    if (tags.length === 0 || (tags.length === 1 && tags.at(0) === "")) {
      return cards ?? [];
    }

    if (cards === null) return [];

    const visible = cards.filter((v) => {
      if (!v.tag) return false;
      else return tags.every((item) => v.tag?.includes(item) ?? false);
    });
    return visible;
  }

  return {
    cards: visibleCards,
    status: cardsState.status,
    createCard,
    deleteCard,
    updateCard,
    setTags,
  };
}
