import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import WebWorkersPlayground from "./components/web-workers/playground";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WebWorkersPlayground />
    </QueryClientProvider>
  );
}

export default App;
