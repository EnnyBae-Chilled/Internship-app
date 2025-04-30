import React from "react";
import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";

// Create the root element for React to render
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

// Install prompt for PWA
let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installButton = document.getElementById("installButton");
  if (installButton) {
    installButton.style.display = "block";
    installButton.addEventListener("click", () => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted install");
        }
        deferredPrompt = null;
      });
    });
  }
});
