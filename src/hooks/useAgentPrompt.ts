import { useEffect, useState } from "react";

export default function useAgentPrompt() {
  const [content, setContent] = useState("");
  const [ans, setAns] = useState("");
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/agent/gemini", {
        method: "POST",
        headers: {
          "x-vercel-protection-bypass": "postmanfromyolkandyolkfrompostma",
        },
        body: JSON.stringify({ content: content }),
      });
      const data = await res.json();
      const answer = data.answer as string;
      setAns(answer);
    }

    load();
  }, [content]);

  return { ask: setContent, answer: ans };
}
