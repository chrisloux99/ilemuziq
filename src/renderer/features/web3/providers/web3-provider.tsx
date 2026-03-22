import { ReactNode } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base, baseSepolia } from 'viem/chains';
import { coinbaseWallet } from 'wagmi/connectors';

const wagmiConfig = createConfig({
    chains: [base, baseSepolia],
    connectors: [
        coinbaseWallet({
            appName: 'iLe Muziq',
            preference: 'smartWalletOnly',
        }),
    ],
    transports: {
        [base.id]: http(),
        [baseSepolia.id]: http(),
    },
});

interface Web3ProviderProps {
    children: ReactNode;
}

export const Web3Provider = ({ children }: Web3ProviderProps) => {
    return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>;
};
