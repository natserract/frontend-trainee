import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import LazyRenderingPlayground from "./components/lazy-rendering/playground";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LazyRenderingPlayground />
    </QueryClientProvider>
  );
}

export default App;
