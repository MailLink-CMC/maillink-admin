// scroll bar
import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

//
import App from './App';
import { RecoilRoot } from 'recoil';
// ----------------------------------------------------------------------

ReactDOM.render(
  <HelmetProvider>
    <RecoilRoot>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </HelmetProvider>,
  document.getElementById('root')
);
