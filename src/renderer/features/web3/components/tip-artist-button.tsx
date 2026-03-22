import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { RiCoinLine } from 'react-icons/ri';
import { parseEther } from 'viem';
import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';

// Tips are sent to the platform wallet for artist distribution
const PLATFORM_WALLET = '0xA140614fDC23f0007029c68dF6E8449dCB69F2a9';

export function TipArtistButton({ artistName }: { artistName: string }) {
    const { data: hash, error: sendError, isPending, sendTransaction } = useSendTransaction();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

    const handleTip = () => {
        sendTransaction({
            to: PLATFORM_WALLET,
            value: parseEther('0.001'),
        });
    };

    useEffect(() => {
        if (hash) {
            notifications.show({
                color: 'blue',
                message: `Sending 0.001 ETH to ${artistName} on Base Sepolia...`,
                title: 'Transaction Sent!',
            });
        }
    }, [hash, artistName]);

    useEffect(() => {
        if (isSuccess) {
            notifications.show({
                color: 'green',
                message: `${artistName} received your tip safely on-chain.`,
                title: 'Tip Successful! 🎉',
            });
        }
    }, [isSuccess, artistName]);

    useEffect(() => {
        if (sendError) {
            notifications.show({
                color: 'red',
                message: sendError.message.split('\n')[0] || 'User rejected the transaction',
                title: 'Transaction Failed',
            });
        }
    }, [sendError]);

    if (isSuccess) {
        return (
            <Button color="green" leftSection={<RiCoinLine size={16} />} variant="light">
                Tipped {artistName}!
            </Button>
        );
    }

    return (
        <Button
            color="indigo"
            leftSection={<RiCoinLine size={16} />}
            loading={isPending || isConfirming}
            onClick={handleTip}
            variant="filled"
        >
            Tip {artistName}
        </Button>
    );
}
