import { flushSync } from "react-dom";

export function startViewTransition(callback) {
  // SSR guard + fallback navegadores sin soporte
  if (typeof document === "undefined" || !document.startViewTransition) {
    callback();
    return;
  }

  document.startViewTransition(() => {
    // Importante: el DOM debe actualizarse dentro del callback
    flushSync(() => {
      callback();
    });
  });
}
