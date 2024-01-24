import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import route from "./Router/Routes";
import AuthProviders from "./Providers/AuthProviders";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="font-sans">
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProviders>
            <RouterProvider router={route}></RouterProvider>
          </AuthProviders>
        </QueryClientProvider>
      </HelmetProvider>
    </div>
  </React.StrictMode>
);
