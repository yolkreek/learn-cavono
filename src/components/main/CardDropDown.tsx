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
import AgentPromptPortal from "./AgentPromptPortal";

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
  return (
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
            className={
              "transition-all 300 ease-in focus:bg-brand/20 cursor-pointer"
            }
            closeOnClick={false}
          >
            <AgentPromptPortal content={content} />
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
  );
}
