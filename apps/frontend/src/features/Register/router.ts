import { RouteObject } from "react-router";
import RegisterView from "./views/RegisterView";

export const RegisterRoutes: RouteObject[] = [
  {
    path: "/register", 
    Component: RegisterView,    
    children: [  
    ],
  },
];
