import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { startViewTransition } from "../utils/viewTransitions";

export default function VTLink({ to, onClick, children, ...props }) {
  const navigate = useNavigate();

  return (
    <Link
      to={to}
      {...props}
      onClick={(e) => {
        // permite abrir en nueva pestaña o ctrl/cmd click
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
          onClick?.(e);
          return;
        }

        e.preventDefault();
        startViewTransition(() => navigate(to));
        onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
}
