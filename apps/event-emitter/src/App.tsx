import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import EventEmitterPlayground from "./components/event-emitter/playground";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <EventEmitterPlayground />
    </QueryClientProvider>
  );
}

export default App;
