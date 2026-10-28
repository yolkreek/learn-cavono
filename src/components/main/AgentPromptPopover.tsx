
import useAgentPrompt from "@/hooks/useAgentPrompt";

import ReactMarkdown from "react-markdown";

import { IconSparkles2Filled } from "@tabler/icons-react";
import { Input } from "../ui/input";
import type { RefObject } from "react";

export default function AgentPromptPopover({
  content,
  ref,
}: {
  content: string;
  ref: RefObject<HTMLDivElement | null>;
}) {
  const { ask, answerState } = useAgentPrompt();
  if (answerState.status === "loading") ask(content);
  return (
    <>
      {answerState.status === "loading" ? (
        <div className="w-full h-full flex justify-center items-center">
          <IconSparkles2Filled
            className="size-12 text-brand/50 animate-pulse"
            stroke="0"
          />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex-6 overflow-auto p-2" ref={ref}>
            <ReactMarkdown>{answerState.answer}</ReactMarkdown>
          </div>
          <Input
            type="text"
            className="flex-1 bg-white shadow-2xs rounded-2xl"
          ></Input>
        </div>
      )}
    </>
  );
}
