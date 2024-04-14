import type { RouteObject } from "react-router-dom";

// Layout
import { Layout } from "./components/layout";

// Pages
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";

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
        path: "/login",
        Component: LoginPage,
      },
    ],
  },
];
