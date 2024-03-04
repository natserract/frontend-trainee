import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import StateMachinePlayground from "./components/state-machine/playground";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StateMachinePlayground />
    </QueryClientProvider>
  );
}

export default App;
