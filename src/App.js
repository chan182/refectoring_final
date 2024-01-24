import React from 'react';
import { RecoilRoot } from 'recoil';
import Router from './shared/Router';
import { QueryClient, QueryClientProvider } from 'react-query';
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
