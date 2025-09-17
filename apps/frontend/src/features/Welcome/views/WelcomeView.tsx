import { Link } from 'react-router';

export default function WelcomeView() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800 flex-col gap-4">
        <h1 className="text-white text-xl font-bold">Welcome</h1>
        <div className="flex items-center gap-2 justify-center">
          <Link
            className="border px-6 py-2 rounded border-white text-white"
            to={{ pathname: '/login' }}
          >
            Login
          </Link>
          <Link
            className="border px-6 py-2 rounded border-white text-white"
            to={{ pathname: '/register' }}
          >
            Register
          </Link>
        </div>
      </div>
  );
}
