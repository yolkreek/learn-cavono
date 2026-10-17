import { IconCheck } from "@tabler/icons-react";
import { Label } from "./ui/label";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Login() {
  return (
    <div
      className={`flex flex-col gap-10 justify-center items-center w-5/16 h-9/24 
      bg-linear-to-br from-white/45 to-white/10 rounded-2xl backdrop-blur-2xl backdrop-saturate-150 
     border border-white/20 border-t-white/70 border-l-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_32px_rgba(15,30,61,0.08)]`}
    >
      <img
        src="/cavono-learn-logo.svg"
        className="scale-90 translate-y-10"
      ></img>
      <form
        className="w-full h-full flex flex-col justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          const id = form.get("id") as string;
          const password = form.get("password") as string;

          console.log(id, password);
          alert("ㄱㄷ 아직 안만듬");
        }}
      >
        <FieldGroup className="flex flex-col gap-6 w-1/2">
          <Field className="flex flex-row gap-2">
            <Label htmlFor="id" className="flex-1 font-extrabold">
              ID:
            </Label>
            <Input
              id="id"
              name="id"
              className="flex-3 bg-white/50 border-white/60 shadow-none focus-visible:ring-[#0F1E3D]/20 "
            ></Input>
          </Field>
          <Field className="flex flex-row gap-2">
            <Label
              htmlFor="password"
              className="flex-1 overflow-hidden font-extrabold"
            >
              Password:
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              className="flex-3 bg-white/50 border-white/60 shadow-none focus-visible:ring-[#0F1E3D]/20"
            ></Input>
          </Field>
          <Button
            variant={"outline"}
            className={
              "bg-[#0F1E3D] hover:bg-[#0F1E3D]/90 hover:-translate-y-0.5 cursor-pointer"
            }
            type="submit"
          >
            <IconCheck color="white" stroke={3} />
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
