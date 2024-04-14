import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routes } from "./Routes";
import "./Globals.css";
import "./App.css";

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
