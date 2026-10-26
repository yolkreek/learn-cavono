export type CardsSetType =
  | {
      cards: CardType[];
      status: "loaded";
    }
  | { status: "loading" }
  | { status: "error"; error: string };

export type CardType = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  linked_to: string[];
  created_at: string;
  updated_at: string;
  pos: number;
};
