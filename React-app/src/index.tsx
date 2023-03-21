import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App";
import "./styles/index.css";
const queryClient = new QueryClient();
const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
