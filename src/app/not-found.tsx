import Link from 'next/link';
import { type FC } from 'react';

const NotFound: FC = () => {
  return (
    <div className="flex w-96 max-w-full flex-col items-center justify-center font-mono">
      <h1 className="mb-4 text-6xl font-bold">404</h1>
      <p className="mb-8 text-xl">Page not found</p>
      <Link
        href="/"
        className="profile-link rounded border border-current px-4 py-2"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
