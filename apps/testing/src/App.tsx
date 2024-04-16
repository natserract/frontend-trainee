import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { routes } from "./Routes";
import "./Globals.css";
import "./App.css";

const router = createBrowserRouter(routes);

function App() {
  const [client] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } }),
  );

  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}

export default App;
