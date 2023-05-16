import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import styled from 'styled-components';

// TODO fix the overlap styles rainbowkit/material ui
// easier to just override per our need
const StyledConnectButtonWrapper = styled.div`
.rainbowkit-connect-btn button {
    height: 100px;
    font-size: 3em;
    width: 100%;
    color: black;
    text-decoration: underline;
    border: 0px;
    cursor: pointer;

}

`

export const Account = () => {

    const wagmiAccount = useAccount();


    return (
        <StyledConnectButtonWrapper>

            <div className="rainbowkit-box">
                <div className="rainbowkit-connect-btn">
                    <ConnectButton label="Sign Up" />
                </div>


            </div>
        </StyledConnectButtonWrapper >
    )
}
