import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const Account = () => {

    // const provider = useParticleProvider();
    const wagmiAccount = useAccount();


    return (
        <div>

            <div className="rainbowkit-box">
                <div className="rainbowkit-connect-btn">
                    <ConnectButton />
                </div>


            </div>
            {/* <button> connect</button> */}
        </div >
    )
}
