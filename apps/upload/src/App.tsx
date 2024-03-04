import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import UploadPlayground from "./components/upload/playground";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UploadPlayground />
    </QueryClientProvider>
  );
}

export default App;
