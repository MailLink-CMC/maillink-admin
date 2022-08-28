// scroll bar
import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

//
import App from './App';
import { RecoilRoot } from 'recoil';

import { QueryClient, QueryClientProvider } from 'react-query';
// ----------------------------------------------------------------------

const queryClient = new QueryClient();
ReactDOM.render(
  <HelmetProvider>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  </HelmetProvider>,
  document.getElementById('root')
);
