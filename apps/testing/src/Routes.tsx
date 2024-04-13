import type { RouteObject } from "react-router-dom";

// Pages
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";

export const routes: RouteObject[] = [
  { path: "/", Component: HomePage },
  { path: "/login", Component: LoginPage },
];
