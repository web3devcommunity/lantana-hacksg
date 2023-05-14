import { development as developmentConfig } from "@lens-protocol/react-web";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";

export const createConfig = () => {
  return {
    bindings: wagmiBindings(),
    environment: developmentConfig,
  };
};
