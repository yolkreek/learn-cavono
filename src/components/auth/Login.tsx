import { Label } from "../ui/label";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { supabase } from "@/lib/supabase";
import { useSignIn } from "@/hooks/useSignIn";
import SignUp from "./SignUp";

import { useAuth } from "@/hooks/useAuth";
import GoToHome from "../GoToHome";

export default function Login() {
  const { submit, loading, error } = useSignIn();
  const auth = useAuth();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    submit(form.get("email") as string, form.get("password") as string);
  }
  console.log("LOGIN: " + auth);
  if (auth.status !== "loading")
    return (
      <div
        className={`m-5 flex flex-col gap-1 justify-center items-center px-10 py-10
        bg-linear-to-br from-white/45 to-white/10 rounded-2xl backdrop-blur-2xl backdrop-saturate-150 
      border border-white/20 border-t-white/70 border-l-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_32px_rgba(15,30,61,0.08)]`}
      >
        <img src="/cavono-learn-logo.svg" className="scale-90"></img>
        <form
          className="w-full h-full flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
        >
          <FieldGroup className="flex flex-col gap-6 w-full p-5 md:p-8">
            {auth.status === "signedOut" && (
              <>
                <Field
                  className="flex flex-row gap-2"
                  orientation={"horizontal"}
                >
                  <Label
                    htmlFor="email"
                    className="w-20 font-extrabold inline-block text-right"
                  >
                    Email:
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    className="flex-1 bg-white/50 border-white/60 shadow-none focus-visible:ring-[#0F1E3D]/20 "
                  ></Input>
                </Field>
                <Field
                  className="flex flex-row gap-2"
                  orientation={"horizontal"}
                >
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
              </>
            )}

            {/*로그인 버튼*/}
            {auth.status === "signedOut" && (
              <Button
                variant={"outline"}
                className={
                  "bg-brand hover:bg-brand/90 hover:-translate-y-0.5 cursor-pointer"
                }
                type="submit"
                disabled={loading}
              >
                <p className="text-white">Login</p>
              </Button>
            )}

            {/*로그아웃 버튼*/}
            {auth.status === "signedIn" && (
              <>
                <Button
                  variant={"outline"}
                  className={
                    "bg-brand hover:bg-brand/90 hover:-translate-y-0.5 cursor-pointer"
                  }
                  onClick={async () => {
                    await supabase.auth.signOut();
                    window.location.reload();
                  }}
                >
                  <p className="text-white">Sign out</p>
                </Button>
                <GoToHome />
              </>
            )}
          </FieldGroup>
          {error && <p className="text-sm text-red-700">{error}</p>}
          {auth.status === "signedIn" && (
            <p className="text-sm text-green-700">
              Hello, {auth.session.user.email}{" "}
              {auth.session.user.last_sign_in_at})
            </p>
          )}
        </form>
        {auth.status === "signedOut" && (
          <SignUp className="flex-1 p-4 w-full" />
        )}
      </div>
    );
}
