import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import { DataFetchingPlayground } from "./components/data-fetching/playground";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DataFetchingPlayground />
    </QueryClientProvider>
  );
}

export default App;
