import './Account.module.css'
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const Account = () => {

    const wagmiAccount = useAccount();

    return (
        <div>

            <div className="rainbowkit-box">
                <div className="rainbowkit-connect-btn">
                    <ConnectButton label="Sign Up" />
                </div>


            </div>
        </div >
    )
}
