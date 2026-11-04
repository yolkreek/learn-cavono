import { useEffect, useState, type RefObject } from "react";

export function usePopoverOpen(
  ref: RefObject<HTMLElement | null>,
  caller?: RefObject<HTMLElement | null>,
) {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  useEffect(() => {
    if (!isPopoverOpen) return;
    const onPointerDownOutside = (e: Event) => {
      if (
        !ref.current!.contains(e.target as Node) &&
        !(caller?.current!.contains(e.target as Node) ?? false)
      )
        setIsPopoverOpen(false);
    };

    const onScrollOutside = (e: Event) => {
      console.log(e.target);
      console.log(ref.current);
      if (!ref.current!.contains(e.target as Node)) setIsPopoverOpen(false);
    };

    const onResizeOutside = () => {
      setIsPopoverOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDownOutside);
    window.addEventListener("scroll", onScrollOutside, true);
    window.addEventListener("resize", onResizeOutside);

    return () => {
      document.removeEventListener("pointerdown", onPointerDownOutside);
      window.removeEventListener("scroll", onScrollOutside, true);
      window.removeEventListener("resize", onResizeOutside);
    };
  }, [isPopoverOpen]);

  return { isPopoverOpen, setIsPopoverOpen };
}
