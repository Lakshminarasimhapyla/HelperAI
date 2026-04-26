import { useEffect, useRef } from "react";

export function useAutoScroll(dependencies) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    element.scrollTo({
      top: element.scrollHeight,
      behavior: "smooth"
    });
  }, dependencies);

  return ref;
}
