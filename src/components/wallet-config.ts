import { ModalProvider } from "@particle-network/connect-react-ui";
import { evmWallets } from "@particle-network/connect";
import { WalletEntryPosition } from "@particle-network/auth";
import { Ethereum, EthereumGoerli } from "@particle-network/common";
import { PN_PROJECT_ID, PN_CLIENT_KEY, PN_APP_ID } from "@/env";

export const createWalletModalProviderConfig = () => {
  return {
    options: {
      projectId: PN_PROJECT_ID,
      clientKey: PN_CLIENT_KEY,
      appId: PN_APP_ID,
      chains: [Ethereum, EthereumGoerli],
      particleWalletEntry: {
        //optional: particle wallet config
        displayWalletEntry: true, //display wallet button when connect particle success.
        defaultWalletEntryPosition: WalletEntryPosition.BR,
        supportChains: [Ethereum, EthereumGoerli],
        customStyle: {}, //optional: custom wallet style
      },
      wallets: evmWallets({ qrcode: false }),
    },
    theme: "auto",
    language: "en", //optional：localize, default en
    walletSort: ["Particle Auth", "Wallet"], //optional：walelt order
    particleAuthSort: [
      //optional：display particle auth items and order
      "email",
      "phone",
      "google",
      "apple",
      "facebook",
    ],
  };
};
