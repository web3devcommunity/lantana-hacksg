import { ModalProvider } from '@particle-network/connect-react-ui';
import { evmWallets } from '@particle-network/connect';
import { WalletEntryPosition } from '@particle-network/auth';
import { Ethereum, EthereumGoerli } from '@particle-network/common';

export const createWalletModalProviderConfig = () => {
    return {
        options: {
            projectId: 'replace with your projectId',
            clientKey: 'replace with your clientKey',
            appId: 'replace with your appId',
            chains: [
                Ethereum,
                EthereumGoerli
            ],
            particleWalletEntry: {    //optional: particle wallet config
                displayWalletEntry: true, //display wallet button when connect particle success.
                defaultWalletEntryPosition: WalletEntryPosition.BR,
                supportChains: [
                    Ethereum,
                    EthereumGoerli
                ],
                customStyle: {}, //optional: custom wallet style
            },
            wallets: evmWallets({ qrcode: false }),
        },
        theme: 'auto',
        language: 'en',   //optional：localize, default en
        walletSort: ['Particle Auth', 'Wallet'], //optional：walelt order
        particleAuthSort: [    //optional：display particle auth items and order
            'email',
            'phone',
            'google',
            'apple',
            'facebook'
        ]
    }
}

