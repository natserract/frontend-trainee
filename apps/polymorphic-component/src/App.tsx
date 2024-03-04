import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import PolymorphicComponentPlayground from "./components/polymorphic-component/playground";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PolymorphicComponentPlayground />
    </QueryClientProvider>
  );
}

export default App;
