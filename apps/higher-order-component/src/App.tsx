import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import { HigherOrderComponentPlayground } from "./components/higher-order-component/playground";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HigherOrderComponentPlayground />
    </QueryClientProvider>
  );
}

export default App;
