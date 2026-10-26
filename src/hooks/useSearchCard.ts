import type { CardsSetType, CardType } from "@/types/card";
import { useMemo, useState } from "react";

function searchCard(cards: CardType[], tags: string[]): CardType[] {
  if (tags.length === 0 || tags.every((item) => item === "")) {
    return cards;
  }

  if (cards === null) return [];

  const filteredCards = cards.filter((v) => {
    if (!v.tags) return false;
    else return tags.every((item) => v.tags.includes(item));
  });
  return filteredCards;
}

export function useSearchCard(cardsState: CardsSetType) {
  const [tagsState, setTagsState] = useState<string[]>([]);

  const filteredCards = useMemo(() => {
    if (cardsState.status !== "loaded") return [];
    return searchCard(cardsState.cards, tagsState);
  }, [cardsState, tagsState]);

  return {
    filteredCards,
    search: setTagsState,
  };
}
