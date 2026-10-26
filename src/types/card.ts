export type CardsSetType =
  | {
      cards: CardType[];
      status: "loaded";
    }
  | { cards: null; status: "loading" }
  | { cards: null; status: "error" };

export type CardType = {
  id: string;
  title: string;
  content: string;
  tag: string[];
  linked_to: string[];
  created_at: string;
  updated_at: string;
  pos: number;
};
