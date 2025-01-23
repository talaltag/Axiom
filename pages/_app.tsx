import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      if (typeof args[1] === 'undefined') {
        args[1] = {};
      }
      if (typeof args[1].headers === 'undefined') {
        args[1].headers = {};
      }
      
      const token = sessionStorage.getItem('token');
      if (token) {
        args[1].headers['Authorization'] = `Bearer ${token}`;
      }
      
      return originalFetch(...args);
    };
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
