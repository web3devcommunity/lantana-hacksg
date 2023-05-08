import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'

// TODO lazy create 
export const getWagmiClient = ()=> {
    return createClient({
        autoConnect: true,
        provider: getDefaultProvider(),
    })
    
} 