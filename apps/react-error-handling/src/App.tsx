import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Playground from "./components/error-handling/playground";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Playground />
    </QueryClientProvider>
  );
}

export default App;
