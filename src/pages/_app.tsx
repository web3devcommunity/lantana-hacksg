import { createWalletModalProviderConfig } from '@/components/wallet-config';
import {
    ModalProvider
} from '@particle-network/connect-react-ui';

const walletConfig = createWalletModalProviderConfig();
const MyApp = ({ Component, pageProps }) => {
    return <ModalProvider
        {...walletConfig}
    >  < Component {...pageProps} /> </ModalProvider >;
}


export default MyApp;