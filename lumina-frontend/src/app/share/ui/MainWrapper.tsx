'use client';

import { usePathname } from 'next/navigation';

const NO_NAVBAR_ROUTES = ['/register'];

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hasNavbar = !NO_NAVBAR_ROUTES.includes(pathname);

  return (
    <div className={`${hasNavbar ? 'pt-[60px]' : ''} flex flex-col flex-1`}>
      {children}
    </div>
  );
}
