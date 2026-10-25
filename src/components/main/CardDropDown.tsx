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

export default function CardDropDown({
  id,
  handleDelete,
  handleUpdate,
}: {
  id: string;
  handleDelete: (id: string) => void;
  handleUpdate: (
    id: string,
    title?: string | undefined,
    content?: string | undefined,
  ) => void;
}) {
  return (
    <DropdownMenu>
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
      <DropdownMenuContent className={"bg-brand-lite"}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Functions</DropdownMenuLabel>

          <DropdownMenuItem
            className={
              "transition-all 300 ease-in focus:bg-brand/20 cursor-pointer"
            }
            onClick={() => {
              handleDelete(id);
            }}
          >
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            className={
              "transition-all 300 ease-in focus:bg-brand/20 cursor-pointer"
            }
            onClick={() => {
              handleUpdate(id, "MODIFIED", "MODIFIED AS WELL");
            }}
          >
            Update
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
