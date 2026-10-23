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
  content: string | null;
  tag: string[] | null;
  linked_to: string[] | null;
  created_at: string;
  updated_at: string;
};
