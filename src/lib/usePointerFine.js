import { useEffect, useState } from "react";

// True only on devices with a fine pointer + hover (desktops/laptops).
// Gates the custom cursor and magnetic effects away from touch.
export function usePointerFine() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (hover: hover)");
    const onChange = () => setFine(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return fine;
}
