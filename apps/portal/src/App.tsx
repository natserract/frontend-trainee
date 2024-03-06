import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import PortalPlayground from "./components/portal/playground";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PortalPlayground />
    </QueryClientProvider>
  );
}

export default App;
