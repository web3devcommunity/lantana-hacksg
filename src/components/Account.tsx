import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import styled from 'styled-components';

// TODO fix the overlap styles rainbowkit/material ui
// easier to just override per our need
const StyledConnectButtonWrapper = styled.div`
  .rainbowkit-connect-btn button {
    height: 30px;
    min-width: max-content;
    text-decoration: none;
    border: 0px;
    cursor: pointer;
    margin-top: 3px;
  }
`;

export const Account = () => {
  return (
    <StyledConnectButtonWrapper>
      <div className="rainbowkit-box">
        <div className="rainbowkit-connect-btn">
          <ConnectButton label="Log In" />
        </div>
      </div>
    </StyledConnectButtonWrapper>
  );
};
