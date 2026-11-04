import { IconMenu } from "@tabler/icons-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import AgentPromptPopover from "./AgentPromptPopover";
import { createPortal } from "react-dom";
import { useRef, useState } from "react";
import { usePopoverOpen } from "@/hooks/usePopoverOpen";

export default function CardDropDown({
  id,
  handleDelete,
  handleUpdate,
  content,
}: {
  id: string;
  handleDelete: (id: string) => void;
  handleUpdate: (
    id: string,
    title?: string | undefined,
    content?: string | undefined,
  ) => void;
  content: string;
}) {
  const askGeminiButton = useRef<HTMLDivElement | null>(null);
  const askGeminiPopover = useRef<HTMLDivElement | null>(null);
  const [domrect, setDomrect] = useState<DOMRect | null>(null);
  const { isPopoverOpen, setIsPopoverOpen } = usePopoverOpen(
    askGeminiPopover,
    askGeminiButton,
  );

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          render={
            <Button
              className={
                "ml-auto shrink-0 w-5 h-5 bg-brand/70 hover:bg-brand/80 cursor-pointer"
              }
            >
              <IconMenu />
            </Button>
          }
        ></DropdownMenuTrigger>
        <DropdownMenuContent className={"bg-brand-lite ring-2 p-1"}>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Functions</DropdownMenuLabel>
            <DropdownMenuItem
              className={
                "transition-all 300 ease-in focus:bg-brand/20 cursor-pointer"
              }
              onClick={() => {
                handleUpdate(id, "modified", "modified");
              }}
            >
              Update
            </DropdownMenuItem>

            <DropdownMenuItem
              closeOnClick={false}
              className={
                "relative transition-all 300 ease-in focus:bg-brand/20 cursor-pointer"
              }
              onClick={(e) => {
                setIsPopoverOpen(!isPopoverOpen);
                setDomrect(askGeminiButton.current!.getBoundingClientRect());
              }}
              ref={askGeminiButton}
            >
              Ask Gemini
            </DropdownMenuItem>

            <DropdownMenuItem
              className={
                "transition-all 300 ease-in focus:bg-brand/20 cursor-pointer text-red-600 focus:text-red-600"
              }
              onClick={() => {
                handleDelete(id);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {isPopoverOpen &&
        domrect &&
        createPortal(
          <AgentPromptPopover
            content={content}
            ref={askGeminiPopover}
            domrect={domrect}
          />,
          document.body,
        )}
    </>
  );
}
