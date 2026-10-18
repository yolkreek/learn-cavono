import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { IconX } from "@tabler/icons-react";

import SignUpForm from "./SignUpForm";

export default function SignUp({ className }: { className: string }) {
  return (
    <>
      <Dialog>
        <DialogTrigger
          render={
            <Button
              variant={"outline"}
              className={`${className} bg-[#0F1E3D] hover:bg-[#0F1E3D]/90 hover:-translate-y-0.5 cursor-pointer`}
            >
              <p className="text-white">Sign up</p>
            </Button>
          }
        ></DialogTrigger>

        <DialogContent
          className={"flex flex-col gap-4 bg-[#e0e9fc] p-10"}
          showCloseButton={false}
        >
          <DialogClose
            render={
              <Button className="absolute top-2 right-2 bg-[#e0e9fc] text-[#0F1E3D] hover:bg-bg-[#e0e9fc]/90 hover:scale-120 cursor-pointer">
                <IconX />
              </Button>
            }
          ></DialogClose>
          <SignUpForm></SignUpForm>
        </DialogContent>
      </Dialog>
    </>
  );
}
