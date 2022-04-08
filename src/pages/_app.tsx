import '~/styles/globals.css';
import type { AppProps } from 'next/app';
import { setupStore } from '~/app/store';
import { Provider } from 'react-redux';
import { hydrateStore } from '~/app/middleware/localStorageMiddleware';

const store = setupStore(hydrateStore());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
