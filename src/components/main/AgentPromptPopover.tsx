import useAgentPrompt from "@/hooks/useAgentPrompt";

import ReactMarkdown from "react-markdown";

import { IconSparkles2Filled } from "@tabler/icons-react";
import { Input } from "../ui/input";
import type { RefObject } from "react";
import useViewportSize from "@/hooks/useViewportSize";
import type React from "react";

const DESKTOP_WIDTH = 600;
const DESKTOP_HEIGHT = 480;
const MOBILE_WIDTH = 400;
const MOBILE_HEIGHT = 600;

export default function AgentPromptPopover({
  content,
  ref,
  domrect,
}: {
  content: string;
  ref: RefObject<HTMLDivElement | null>;
  domrect: DOMRect;
}) {
  const { ask, answerState } = useAgentPrompt();
  const size = useViewportSize();
  console.log(size.width, size.height);
  console.log(domrect.top, domrect.height, domrect.left, domrect.width);

  return (
    <div
      className="absolute flex flex-col justify-between z-50 bg-brand-lite w-[var(--mob_w)] h-[var(--mob_h)] md:w-[var(--desk-w)] md:h-[var(--desk-h)] rounded-2xl ring-1 p-2 ring-brand-lite/50 shadow-md shadow-black"
      style={
        {
          top:
            domrect.bottom + 480 > size.height - 20
              ? domrect.top - 480
              : domrect.bottom,
          left:
            domrect.right + 600 > size.width - 20
              ? domrect.left - 600
              : domrect.right,
          "--mob-w": `${MOBILE_WIDTH}px`,
          "--mob-h": `${MOBILE_HEIGHT}px`,
          "--desk-w": `${DESKTOP_WIDTH}px`,
          "--desk-h": `${DESKTOP_HEIGHT}px`,
        } as React.CSSProperties
      }
      ref={ref}
    >
      {answerState.status === "loading" ? (
        <div className="w-full h-full flex justify-center items-center">
          <IconSparkles2Filled
            className="size-12 text-brand/50 animate-pulse"
            stroke="0"
          />
        </div>
      ) : (
        <>
          <div className="flex-6 overflow-auto p-2">
            <ReactMarkdown>{answerState.answer}</ReactMarkdown>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget);
              ask(
                ("내용: " +
                  content +
                  "추가 질문: " +
                  form.get("input")) as string,
              );
            }}
          >
            <Input
              name="input"
              type="text"
              className="flex-1 bg-white shadow-2xs rounded-2xl overflow-auto"
            ></Input>
          </form>
        </>
      )}
    </div>
  );
}
