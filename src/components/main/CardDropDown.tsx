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
import { useEffect, useRef, useState } from "react";

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
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const askGeminiButton = useRef<HTMLDivElement | null>(null);
  const askGeminiPopover = useRef<HTMLDivElement | null>(null);
  const [coord, setCoord] = useState<DOMRect | null>(null);
  useEffect(() => {
    if (!isPopoverOpen) return;
    const portalClose = (e: Event) => {
      if (e.target !== askGeminiPopover.current) {
        setIsPopoverOpen(false);
      }
    };

    window.addEventListener("scroll", portalClose, true);
    window.addEventListener("resize", portalClose);

    return () => {
      window.removeEventListener("scroll", portalClose, true);
      window.removeEventListener("resize", portalClose);
    };
  }, [isPopoverOpen]);
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
                console.log(e.currentTarget);
                console.log(e.target);
                setIsPopoverOpen(!isPopoverOpen);
                setCoord(askGeminiButton.current!.getBoundingClientRect());
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
        coord &&
        createPortal(
          <div
            className="absolute z-50 bg-brand-lite w-100 h-120 rounded-2xl ring-1 p-2 ring-brand-lite/50 shadow-md shadow-black"
            style={{
              top: coord.top + coord.height,
              left: coord.left + coord.width,
            }}
          >
            <AgentPromptPopover content={content} ref={askGeminiPopover} />
          </div>,
          document.body,
        )}
    </>
  );
}
