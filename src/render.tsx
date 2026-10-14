import "@fontsource-variable/inter-tight";
import "@fontsource-variable/jetbrains-mono";
import "./styles/global.css";
import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";

export function render(page: ReactNode) {
  createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>{page}</StrictMode>,
  );
}
