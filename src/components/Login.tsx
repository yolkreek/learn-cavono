import { IconCheck } from "@tabler/icons-react";
import { Label } from "./ui/label";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("id") as string;
    const password = form.get("password") as string;

    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Wrong e-mail or password. Try again");
      return;
    }
    setUserEmail(data.user.email ?? null);
  }

  return (
    <div
      className={`m-10 flex flex-col gap-10 justify-center items-center px-10 py-5
      bg-linear-to-br from-white/45 to-white/10 rounded-2xl backdrop-blur-2xl backdrop-saturate-150 
     border border-white/20 border-t-white/70 border-l-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_32px_rgba(15,30,61,0.08)]`}
    >
      <img
        src="/cavono-learn-logo.svg"
        className="scale-90 translate-y-10"
      ></img>
      <form
        className="w-full h-full flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <FieldGroup className="flex flex-col gap-6 w-full p-5 md:p-8">
          <Field className="flex flex-row gap-2" orientation={"horizontal"}>
            <Label
              htmlFor="id"
              className="w-20 font-extrabold inline-block text-right"
            >
              ID:
            </Label>
            <Input
              id="id"
              name="id"
              type="email"
              className="flex-1 bg-white/50 border-white/60 shadow-none focus-visible:ring-[#0F1E3D]/20 "
            ></Input>
          </Field>
          <Field className="flex flex-row gap-2" orientation={"horizontal"}>
            <Label
              htmlFor="password"
              className="w-20 shrink-0 font-extrabold inline-block text-right"
            >
              Password:
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              className="flex-1 bg-white/50 border-white/60 shadow-none focus-visible:ring-[#0F1E3D]/20"
            ></Input>
          </Field>

          {/*로그인 버튼*/}
          {userEmail === null && (
            <Button
              variant={"outline"}
              className={
                "bg-[#0F1E3D] hover:bg-[#0F1E3D]/90 hover:-translate-y-0.5 cursor-pointer"
              }
              type="submit"
              disabled={loading || userEmail !== null}
            >
              <IconCheck color="white" stroke={3} />
            </Button>
          )}

          {/*로그아웃 버튼*/}
          {userEmail !== null && (
            <Button
              variant={"outline"}
              className={
                "bg-[#0F1E3D] hover:bg-[#0F1E3D]/90 hover:-translate-y-0.5 cursor-pointer"
              }
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.reload();
              }}
            >
              <p className="text-white">Sign out</p>
            </Button>
          )}

          {userEmail === null && (
            <Dialog>
              <DialogTrigger
                render={
                  <Button
                    variant={"outline"}
                    className={
                      "bg-[#0F1E3D] hover:bg-[#0F1E3D]/90 hover:-translate-y-0.5 cursor-pointer"
                    }
                  >
                    <p className="text-white">Sign up</p>
                  </Button>
                }
              ></DialogTrigger>

              <DialogContent className={"bg-[#e0e9fc] p-10"}>
                <form className="flex flex-col gap-3">
                  <Label htmlFor="signup_id">Your id..</Label>
                  <Input
                    id="signup_id"
                    name="signup_id"
                    className="bg-white"
                  ></Input>
                  <Label htmlFor="signup_password">Your password..</Label>
                  <Input
                    id="signup_password"
                    name="signup_password"
                    type="password"
                    className="bg-white"
                  ></Input>
                  <Label htmlFor="signup_password">Your password again..</Label>
                  <Input
                    id="signup_password"
                    name="signup_password"
                    type="password"
                    className="bg-white"
                  ></Input>
                  <Button className={"bg-[#0F1E3D]"}>Done</Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </FieldGroup>
        {error && <p className="text-sm text-red-700">{error}</p>}
        {userEmail && (
          <p className="text-sm text-green-700">Hello, {userEmail}</p>
        )}
      </form>
    </div>
  );
}
