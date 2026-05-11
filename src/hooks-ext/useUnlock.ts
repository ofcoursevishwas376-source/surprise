import { useEffect, useState } from "react";

const KEY = "cake-cut-v1";

export function useUnlock() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setUnlocked(localStorage.getItem(KEY) === "1");
  }, []);

  const unlock = () => {
    setUnlocked(true);
    if (typeof window !== "undefined") localStorage.setItem(KEY, "1");
  };

  const reset = () => {
    setUnlocked(false);
    if (typeof window !== "undefined") localStorage.removeItem(KEY);
  };

  return { unlocked, unlock, reset };
}
