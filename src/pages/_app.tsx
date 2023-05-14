import '../rainbowkit.css';
import { createWalletModalProviderConfig } from '@/components/wallet-config';
import { ParticleNetwork } from '@particle-network/auth';

import { LensProvider } from '@lens-protocol/react-web';
import { getWagmiClient } from '@/libs/wagmi';
import { WagmiConfig, configureChains, createClient } from "wagmi";
import { InjectedConnector } from "@wagmi/core/connectors/injected";
import { getDefaultProvider } from "ethers";
import { publicProvider } from "@wagmi/core/providers/public";
import { mainnet, polygon, optimism } from "@wagmi/core/chains";
import { particleWallet } from "@particle-network/rainbowkit-ext";
import { PN_PROJECT_ID, PN_CLIENT_KEY, PN_APP_ID } from '@/env';
import { useParticleNetworkWagmi } from '@/components/hooks/pn-wagmi';

// import {
//     ModalProvider as ParticleNetworkModalProvider
// } from '@particle-network/connect-react-ui';

const MyApp = ({ Component, pageProps }) => {


    // const particle = new ParticleNetwork({
    //     projectId: PN_PROJECT_ID as string,
    //     clientKey: PN_CLIENT_KEY as string,
    //     appId: PN_APP_ID as string,
    // });


    const { client: wagmiClient, chains } = useParticleNetworkWagmi() || {};


    return (<div>
        <WagmiConfig client={wagmiClient}>
            {/* <LensProvider config={lensConfig}> */}
            < Component {...pageProps} />

            {/* </LensProvider> */}
        </WagmiConfig>
    </div >);
}


export default MyApp;