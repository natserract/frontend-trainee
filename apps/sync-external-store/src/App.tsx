import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import SyncExternalStorePlayground from "./components/sync-external-store/playground";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SyncExternalStorePlayground />
    </QueryClientProvider>
  );
}

export default App;
