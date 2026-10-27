import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useAgentPrompt from "@/hooks/useAgentPrompt";
import { IconLoader } from "@tabler/icons-react";

import ReactMarkdown from "react-markdown";

export default function AgentPromptPopover({ content }: { content: string }) {
  const { ask, answerState } = useAgentPrompt();
  return (
    <>
      <Popover>
        <PopoverTrigger
          render={
            <button
              tabIndex={-1}
              className="cursor-pointer"
              onClick={async () => await ask(content)}
            >
              Ask Gemini
            </button>
          }
        ></PopoverTrigger>
        <PopoverContent
          side="right"
          align="start"
          className={"w-100 h-125 bg-brand-lite ring-2"}
        >
          <div className="overflow-auto">
            {answerState.status === "loading" ? (
              <IconLoader className="animate-spin self-center" />
            ) : (
              <ReactMarkdown>{answerState.answer}</ReactMarkdown>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
