import { useRoutes } from 'react-router';
import { WelcomeRoutes } from '@features/Welcome/router';
import { LoginRoutes } from '@features/Login/router'; 
import { RegisterRoutes } from '@/features/Register/router';

export const appRoutes = [...WelcomeRoutes, ...LoginRoutes, ...RegisterRoutes];
export const AppRouter = () => {
  const element = useRoutes(appRoutes);
  return element;
};
