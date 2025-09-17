import type { RouteObject } from "react-router"; 
import WelcomeView from "./views/WelcomeView";
import Layout from "../../core/components/Layout";
export const WelcomeRoutes: RouteObject[] = [
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "",
        Component: WelcomeView,
      },
    ],
  },
];
