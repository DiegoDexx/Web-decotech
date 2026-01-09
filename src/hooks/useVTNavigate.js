import { useNavigate } from "react-router-dom";
import { startViewTransition } from "../utils/viewTransitions";

export function useVTNavigate() {
  const navigate = useNavigate();

  return (to, options) => {
    startViewTransition(() => navigate(to, options));
  };
}
