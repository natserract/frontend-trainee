import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import IntersectionObserverPlayground from "./components/intersection-observer/playground";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <IntersectionObserverPlayground />
    </QueryClientProvider>
  );
}

export default App;
