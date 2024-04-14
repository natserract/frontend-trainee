import type { RouteObject } from "react-router-dom";

// Layout
import { Layout } from "./components/layout";

// Pages
import HomePage from "./pages/Home";
import ContactPage from "./pages/Contact";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/contact",
        Component: ContactPage,
      },
    ],
  },
];
