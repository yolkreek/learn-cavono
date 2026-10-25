import { useNavigate } from "react-router";
import { Button } from "./ui/button";

export default function GoToHome({
  className,
  text = "Home",
}: {
  className?: string;
  text?: string;
}) {
  const nav = useNavigate();
  return (
    <Button
      className={`bg-brand hover:bg-brand/90 cursor-pointer ${className}`}
      onClick={() => {
        nav("/");
      }}
    >
      {text}
    </Button>
  );
}
