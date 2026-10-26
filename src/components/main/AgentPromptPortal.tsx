import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useAgentPrompt from "@/hooks/useAgentPrompt";
import { IconLoader } from "@tabler/icons-react";

import ReactMarkdown from "react-markdown";

export default function AgentPromptPopover({ content }: { content: string }) {
  const answerState = useAgentPrompt(content);
  return (
    <>
      <Popover>
        <PopoverTrigger
          render={
            <button tabIndex={-1} className="cursor-pointer">
              Ask Gemini
            </button>
          }
        ></PopoverTrigger>
        <PopoverContent
          side="right"
          align="start"
          className={"w-100 h-125 bg-brand-lite ring-2"}
        >
          {answerState.status === "loading" && (
            <IconLoader className="animate-spin self-center size-5" />
          )}
          {answerState.status === "loaded" && (
            <div className="overflow-auto">
              <ReactMarkdown>{answerState.answer}</ReactMarkdown>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}
