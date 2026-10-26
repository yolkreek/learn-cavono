import type { CardType } from "@/types/card";
import { useMemo, useState } from "react";

function searchCard(cards: CardType[], tags: string[]): CardType[] {
  if (tags.length === 0 || tags.every((item) => item === "")) {
    return cards;
  }

  if (cards === null) return [];

  const filteredCards = cards.filter((v) => {
    if (!v.tag) return false;
    else return tags.every((item) => v.tag?.includes(item) ?? false);
  });
  return filteredCards;
}

export default function useSearch(cards: CardType[]) {
  const [tagsState, setTagsState] = useState<string[]>([]);
  const filteredCards = useMemo(() => {
    return searchCard(cards, tagsState);
  }, [cards, tagsState]);

  return {
    cards: filteredCards,
    search: setTagsState,
  };
}
