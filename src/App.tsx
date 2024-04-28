import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { RecoilRoot } from 'recoil';
import Router from './shared/Router';
const queryClient = new QueryClient();

const App = () => {
    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <Router />
                <ReactQueryDevtools initialIsOpen={true} />
            </QueryClientProvider>
        </RecoilRoot>
    );
};
export default App;
