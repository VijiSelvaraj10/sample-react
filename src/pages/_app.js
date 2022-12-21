
import { store } from '../store'
import { Provider } from 'react-redux'
import LayoutWrapper from '../layouts';

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <LayoutWrapper {...pageProps}>
        <Component {...pageProps} />
      </LayoutWrapper>
    </Provider>

  )
}


