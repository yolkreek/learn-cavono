import { useState, useSyncExternalStore } from "react";

let last: SizeType = { width: window.innerWidth, height: window.innerHeight };

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);

  return () => window.removeEventListener("resize", callback);
}

function getSnapshot(): SizeType {
  const width = window.innerWidth;
  const height = window.innerHeight;

  if (last.width === width && last.height === height) return last;
  else {
    last = { width, height };
    return last;
  }
}

export default function useViewportSize() {
  const size = useSyncExternalStore<SizeType>(subscribe, getSnapshot);

  return size;
}
