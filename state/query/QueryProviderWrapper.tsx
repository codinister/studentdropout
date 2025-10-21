import { QueryClient, QueryClientProvider } from 'react-query';

const QueryProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default QueryProviderWrapper;
