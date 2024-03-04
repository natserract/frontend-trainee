import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import LocalizationPlayground from "./components/localization/playground";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationPlayground />
    </QueryClientProvider>
  );
}

export default App;
