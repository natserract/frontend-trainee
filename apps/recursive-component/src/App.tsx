import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import RecursiveComponentPlayground from "./components/recursive-component/playground";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecursiveComponentPlayground />
    </QueryClientProvider>
  );
}

export default App;
