import { useEffect, useState } from "react";

export default function useTest() {
  const [state, setState] = useState("");
  useEffect(() => {
    const load = async () => {
      const res = await fetch("http://localhost:3000");
      const data = await res.text();
      setState(data);
    };
    load();
  }, []);

  return state;
}
