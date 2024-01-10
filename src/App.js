import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './shared/Router';
import { RecoilRoot } from 'recoil';
const queryClient = new QueryClient();
const App = () => {
    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <Router />
            </QueryClientProvider>
        </RecoilRoot>
    );
};
export default App;
