import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useSignUp } from "@/hooks/useSignUp";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};
export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const pw = watch("password");

  const { submit, loading, success, error } = useSignUp();
  const [isMatch, setIsMatch] = useState(false);

  const onSubmit = (data: FormValues) => {
    submit(data.email, data.password);
  };
  return (
    <>
      <form
        className="flex flex-col gap-4 justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label>Email</Label>
        <Input
          className="bg-white"
          type="email"
          {...register("email", {
            required: true,
          })}
        ></Input>
        <Label>Password</Label>
        <Input
          className="bg-white"
          type="password"
          {...register("password", {
            required: true,
          })}
        ></Input>

        <Label>Password again</Label>
        <Input
          className="bg-white"
          onChange={(e) => {
            if (e.target.value === pw) setIsMatch(true);
            else setIsMatch(false);
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
          className="bg-brand hover:bg-brand/90 hover:-translate-y-0.5 h-10 mt-4 w-1/2 text-center self-center cursor-pointer"
          disabled={loading || success}
        >
          Done
        </Button>
      </form>
    </>
  );
}
