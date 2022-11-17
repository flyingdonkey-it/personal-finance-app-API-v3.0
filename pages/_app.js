import { ToastNotification } from '../components/ToastNotification';
import { AccountVerificationFormProvider } from '../components/AccountVerificationForm';
import '../styles.css';
import ReduxProvider, { wrapper } from '../store/reduxProvider';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ReduxProvider>
      <AccountVerificationFormProvider>
          <Component {...pageProps} />
      </AccountVerificationFormProvider>
      </ReduxProvider>

      <ToastNotification />
    </>
  );
}

export default wrapper.withRedux(MyApp);