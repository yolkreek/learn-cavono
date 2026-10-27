import { useState } from "react";

export default function useAgentPrompt() {
  const [answerState, setAnswerState] = useState<
    { status: "loading" } | { status: "loaded"; answer: string }
  >({ status: "loading" });

  async function ask(content: string) {
    const res = await fetch("/api/agent/gemini", {
      method: "POST",
      body: JSON.stringify({ content: content }),
    });
    const data = await res.json();
    const answer = data.answer as string;

    setAnswerState({ status: "loaded", answer: answer });
  }
  return { ask, answerState };
}
