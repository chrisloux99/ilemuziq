import { Address, Avatar, Identity, Name } from '@coinbase/onchainkit/identity';
import {
    ConnectWallet,
    Wallet,
    WalletDropdown,
    WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';

export function Web3Wallet() {
    return (
        <Wallet>
            <ConnectWallet className="h-8 py-1 rounded-md text-sm font-semibold hover:bg-white/10 transition-colors">
                <Avatar className="h-5 w-5 mr-2" />
                <Name />
            </ConnectWallet>
            <WalletDropdown className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl shadow-black/50">
                <Identity className="px-4 pt-3 pb-2 text-white" hasCopyAddressOnClick>
                    <Avatar />
                    <Name />
                    <Address className="text-zinc-400" />
                </Identity>
                <div className="h-[1px] bg-zinc-800 w-full my-1" />
                <WalletDropdownDisconnect className="hover:bg-red-500/20 text-red-400 transition-colors" />
            </WalletDropdown>
        </Wallet>
    );
}
