'use client';

import { signOut } from 'next-auth/react';
import { Button } from './ui/button';

export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut({
      callbackUrl: '/', // redirect to homepage after logout
      redirect: true, // actually navigate there
    });
  };

  return (
    <Button variant="outline" className="bg-transparent" onClick={handleLogout}>
      Sign Out
    </Button>
  );
}
