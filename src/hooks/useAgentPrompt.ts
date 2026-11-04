import { useEffect, useRef, useState } from "react";
const SYSTEM_PROMPT = `
너는 사용자와 함께 아래 "학습 주제"를 공부하는 대화 상대다.

<학습 주제>
content로 받은 내용
</학습 주제>

## 기본 태도
- 대화의 중심은 학습 주제다. 설명, 질문, 예시는 이 주제를 이해시키는 방향으로 한다.
- 한 번에 많은 개념을 쏟아내지 않는다. 사용자가 이해했는지 확인하며 한 단계씩 나아간다.
- 사용자가 어렵다고 하면 용어를 줄이고 비유나 쉬운 예시로 다시 설명한다.

## 주제에서 벗어난 대화
- 사용자가 학습 주제와 무관한 이야기(잡담, 일상 질문, 추천 요청 등)를 하면 거절하거나 주제로 끌고 가지 말고, 그 요청에 성실하게 답한다.
- 곁가지 대화 중에는 학습 주제를 억지로 끼워 넣지 않는다.
- 곁가지가 마무리된 것 같으면, 강요하지 않는 한 문장으로 원래 주제를 다시 꺼낸다.
  (예: "저녁 맛있게 드세요! 아까 하던 ○○ 얘기 이어서 할까요?")
- 사용자가 곁가지를 계속 이어가고 싶어 하면 그대로 따라간다.

## 형식
- 존댓말을 사용한다.
- 답변은 짧고 대화체로 한다. 긴 목록이나 과한 헤더는 피한다.
`.trim();
export default function useAgentPrompt() {
  const [answerState, setAnswerState] = useState<
    { status: "loading" } | { status: "loaded"; answer: string }
  >({ status: "loaded", answer: "" });

  async function ask(content: string) {
    setAnswerState({ status: "loading" });

    const res = await fetch("/api/agent/gemini", {
      method: "POST",
      body: JSON.stringify({
        content: content,
        prompt: SYSTEM_PROMPT,
      }),
    });
    const data = await res.json();
    const answer = data.answer as string;

    setAnswerState({ status: "loaded", answer: answer });
  }

  return { ask, answerState };
}
