import type { CardType } from "@/types/card";
import { supabase } from "@/lib/supabase";
import type { CardsSetType } from "@/types/card";
import { useEffect, useState } from "react";

export function useCards() {
  const [cardsState, setCardsState] = useState<CardsSetType>({
    cards: null,
    status: "loading",
  });
  const [cardsToBeShown, setCardsToBeShown] = useState<CardType[]>(
    [] as CardType[],
  );

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("cards")
        .select("*")
        .order("pos");

      if (error) throw new Error(error.message);
      console.log(data);
      setCardsState({ cards: data, status: "loaded" });
      setCardsToBeShown(data);
    }

    load();
  }, []);

  function renderCard() {
    if (cardsState.status !== "loaded")
      return { cards: null, status: cardsState.status };
    return { cards: cardsToBeShown, status: "loaded" };
  }

  async function createCard(title: string, content: string, pos: number) {
    const { data, error } = await supabase
      .from("cards")
      .insert({
        title,
        content,
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

  function searchCard(tag: string[]) {
    if (tag.length === 1 && tag.at(0) === "") {
      setCardsToBeShown(cardsState.cards ?? []);
      return;
    }

    if (cardsState.cards === null) return;
    setCardsToBeShown(() => {
      const render = cardsState.cards.filter((v) => {
        if (!v.tag) return false;
        else return tag.every((item) => v.tag?.includes(item) ?? false);
      });
      return render;
    });
  }

  return {
    renderCard,
    createCard,
    deleteCard,
    updateCard,
    searchCard,
  };
}
