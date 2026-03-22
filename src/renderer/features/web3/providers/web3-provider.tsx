import { OnchainKitProvider } from '@coinbase/onchainkit';
import { ReactNode } from 'react';
import { base, baseSepolia } from 'viem/chains';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { coinbaseWallet } from 'wagmi/connectors';

export const wagmiConfig = createConfig({
    chains: [base, baseSepolia],
    connectors: [
        coinbaseWallet({
            appName: 'iLe Muziq',
            preference: 'all',
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
    const apiKey = import.meta.env.VITE_ONCHAINKIT_API_KEY;

    if (!apiKey) {
        console.warn('[Web3] VITE_ONCHAINKIT_API_KEY not set. Wallet features will be limited.');
    }

    return (
        <WagmiProvider config={wagmiConfig}>
            <OnchainKitProvider apiKey={apiKey} chain={base}>
                {children}
            </OnchainKitProvider>
        </WagmiProvider>
    );
};
