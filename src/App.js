// routes
import { useEffect } from 'react';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import { getLocalstorage } from './utils/localstorage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    let refreshSubscriber = [];
    const onTokenRefreshed = (accessToken) => {
      refreshSubscriber.map((callback) => callback(accessToken));
    };
    const addRefreshSubscriber = (callback) => {
      refreshSubscriber.push(callback);
    };
    const interceptorId = axios.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalRequest = err.config;
        const isRefreshing = !getLocalstorage('isRefreshing') ? false : true;
        if (
          !originalRequest._retry &&
          ((err.response?.data.status === 400 && err.response?.data.message.includes('만료된 JWT')) ||
            (err.response?.data.status === 401 && err.response?.data.message.includes('잘못된 JWT')))
        ) {
          originalRequest._retry = true;
          const retryOriginalRequest = new Promise((resolve) => {
            addRefreshSubscriber((accessToken) => {
              originalRequest.headers.Authorization = 'Bearer ' + accessToken;
              resolve(axios(originalRequest));
            });
          });
          if (!isRefreshing) {
            localStorage.setItem('isRefreshing', true);
            const tokensJson = getLocalstorage('@tokens');
            try {
              const res = await reissue(tokensJson);
              onTokenRefreshed(res.data.accessToken);
            } catch (e) {
              refreshSubscriber = [];
            }
            localStorage.setItem('isRefreshing', false);
          }
          return retryOriginalRequest;
        }
        return Promise.reject(err);
      }
    );
    return () => axios.interceptors.response.eject(interceptorId);
  }, []);

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}
