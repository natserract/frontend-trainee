import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import ReactRouterPlayground from "./components/react-router/playground";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactRouterPlayground />
    </QueryClientProvider>
  );
}

export default App;
