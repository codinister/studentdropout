import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useProtectedPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) router.push('/');
  }, []);

};

export default useProtectedPage;
