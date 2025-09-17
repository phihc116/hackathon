import { RouteObject } from "react-router";
import LoginView from "./views/LoginView";

export const LoginRoutes: RouteObject[] = [
  {
    path: "/login", 
    Component: LoginView,    
    children: [
      {
        path: "/login",
        Component: LoginView,
      },     
    ],
  },
];
