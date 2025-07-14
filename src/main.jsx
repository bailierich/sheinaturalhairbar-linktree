import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

// Handle route parameters from redirect HTML files
(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const route = urlParams.get("route");
  if (route) {
    // Remove the route parameter and navigate to the correct path
    const newUrl = new URL(window.location);
    newUrl.searchParams.delete("route");
    newUrl.pathname = `/${route}`;
    window.history.replaceState({}, "", newUrl.toString());
  }
})();

// Single Page Apps for GitHub Pages / Static Sites
// https://github.com/rafgraph/spa-github-pages
(function (l) {
  if (l.search[1] === "/") {
    var decoded = l.search
      .slice(1)
      .split("&")
      .map(function (s) {
        return s.replace(/~and~/g, "&");
      })
      .join("?");
    window.history.replaceState(
      null,
      null,
      l.pathname.slice(0, -1) + decoded + l.hash
    );
  }
})(window.location);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
