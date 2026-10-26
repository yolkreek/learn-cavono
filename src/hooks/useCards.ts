import { supabase } from "@/lib/supabase";
import type { CardsSetType } from "@/types/card";
import { useEffect, useState } from "react";

export function useCards() {
  const [cardsState, setCardsState] = useState<CardsSetType>({
    status: "loading",
  });

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("cards")
        .select("*")
        .order("pos");

      if (error) {
        setCardsState({ status: "error", error: error.message });
        return;
      }
      console.log(data);
      setCardsState({ cards: data, status: "loaded" });
    }

    load();
  }, []);

  async function createCard(
    title: string = "untitled",
    content: string = "",
    tags: string[] = [],
    linked_to: string[] = [],
    pos: number = 0,
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
      if (prev.status === "loaded") {
        console.log(data);
        return { status: "loaded", cards: [...prev.cards, data] };
      } else return prev;
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
      if (prev.status !== "loaded") return prev;
      const newCards = prev.cards.filter((v) => v.id !== id);
      return { status: "loaded", cards: newCards };
    });

    return data;
  }

  async function updateCard(
    id: string,
    title?: string,
    content?: string,
    tags?: string[],
    linked_to?: string[],
  ) {
    const params = { title, content, tags, linked_to };
    const { data, error } = await supabase
      .from("cards")
      .update(params)
      .eq("id", id)
      .select()
      .maybeSingle();
    console.log(data, error);

    if (error) {
      return { error: null };
    }

    setCardsState((prev) => {
      if (prev.status !== "loaded") return prev;

      const newCards = prev.cards.map((v) => {
        if (v.id === id)
          return {
            ...v,
            ...(title && { title }),
            ...(content && { content }),
            ...(tags && { tags }),
            ...(linked_to && { linked_to }),
          };
        else return v;
      });

      return { status: "loaded", cards: newCards };
    });

    return data;
  }

  return {
    cardsState,
    createCard,
    deleteCard,
    updateCard,
  };
}
