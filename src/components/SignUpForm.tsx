import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useSignUp } from "@/hooks/useSignUp";
import { useState } from "react";

export default function SignUpForm() {
  const [password, setPassword] = useState<string | null>(null);
  const [repassword, setRepassword] = useState<string | null>(null);
  const [isMatch, setIsMatch] = useState<boolean>(true);
  const { submit, loading, success, error } = useSignUp();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    if (password === "" || password === null) return;
    if (repassword !== password) {
      setIsMatch(false);
      return;
    }
    if (repassword === password) {
      setIsMatch(true);
    }

    submit(
      form.get("signup-email") as string,
      form.get("signup-password") as string,
    );
  };
  return (
    <>
      <form
        className="flex flex-col gap-4 justify-center"
        onSubmit={handleSubmit}
      >
        <Label htmlFor="signup-email">Your e-mail..</Label>
        <Input
          id="signup-email"
          name="signup-email"
          type="email"
          className="bg-white"
          disabled={success}
        ></Input>
        <Label htmlFor="signup-password">Your password..</Label>
        <Input
          id="signup-password"
          name="signup-password"
          type="password"
          className="bg-white"
          disabled={success}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></Input>
        {password === "" && (
          <Label
            htmlFor="signup-password-re"
            className="text-red-700 block text-right text-xs"
          >
            Enter your password
          </Label>
        )}
        <Label htmlFor="signup-password-re">Your password again..</Label>
        <Input
          id="signup-password-re"
          name="signup-password-re"
          type="password"
          className="bg-white"
          disabled={success}
          aria-invalid={isMatch === false}
          onChange={(e) => {
            setRepassword(e.target.value);
          }}
        ></Input>
        {isMatch === false && (
          <Label
            htmlFor="signup-password-re"
            className="text-red-700 block text-right text-xs"
          >
            Not matching
          </Label>
        )}
        {success && (
          <Label
            htmlFor="signup-password-re"
            className="text-green-700 block text-right text-xs"
          >
            Success
          </Label>
        )}
        {error && (
          <Label
            htmlFor="signup-password-re"
            className="text-red-700 block text-right text-xs"
          >
            {error}
          </Label>
        )}
        <Button
          type="submit"
          className="bg-[#0F1E3D] hover:bg-[#0F1E3D]/90 hover:-translate-y-0.5 h-10 mt-4 w-1/2 text-center self-center cursor-pointer"
          disabled={loading || success}
        >
          Done
        </Button>
      </form>
    </>
  );
}
