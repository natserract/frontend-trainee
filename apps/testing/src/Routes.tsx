import type { RouteObject } from "react-router-dom";

// Layout
import { Layout } from "./components/layout";

// Pages
import HomePage from "./features/home/routes/Home";
import ContactPage from "./features/contact/routes/Contact";
import PostsPage from "./features/posts/routes/Posts";

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
      {
        path: "/posts",
        Component: PostsPage,
      },
    ],
  },
];
