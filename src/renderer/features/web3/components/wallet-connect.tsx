import { Address, Avatar, Identity, Name } from '@coinbase/onchainkit/identity';
import {
    ConnectWallet,
    Wallet,
    WalletDropdown,
    WalletDropdownDisconnect,
    WalletDropdownLink,
} from '@coinbase/onchainkit/wallet';

export function Web3Wallet() {
    return (
        <Wallet>
            <ConnectWallet
                className="h-8 py-1 px-3 rounded-md text-sm font-semibold transition-all duration-300 hover:scale-105"
                style={{
                    background:
                        'linear-gradient(135deg, rgba(249, 115, 22, 0.9) 0%, rgba(22, 163, 74, 0.8) 100%)',
                }}
            >
                <Avatar className="h-5 w-5 mr-2" />
                <Name />
            </ConnectWallet>
            <WalletDropdown className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-orange-500/30 rounded-lg shadow-xl shadow-black/50">
                <Identity className="px-4 pt-3 pb-2 text-white" hasCopyAddressOnClick>
                    <Avatar />
                    <Name />
                    <Address className="text-orange-400" />
                </Identity>
                <div className="h-[1px] bg-gradient-to-r from-orange-500/50 via-green-500/50 to-orange-500/50 w-full my-1" />
                <div className="px-2 py-2">
                    <WalletDropdownLink
                        icon={null}
                        label="Open Coinbase Wallet"
                        href="https://wallet.coinbase.com"
                        className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-white hover:bg-orange-500/20 transition-colors"
                    />
                </div>
                <WalletDropdownDisconnect className="hover:bg-red-500/20 text-red-400 transition-colors mx-2 mb-2 rounded-md px-3 py-2" />
            </WalletDropdown>
        </Wallet>
    );
}
