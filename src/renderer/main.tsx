import {
    PersistedClient,
    Persister,
    PersistQueryClientProvider,
} from '@tanstack/react-query-persist-client';
import { del, get, set } from 'idb-keyval';
import { createRoot } from 'react-dom/client';

import { App } from '/@/renderer/app';
import { Web3Provider } from '/@/renderer/features/web3/providers/web3-provider';
import { queryClient } from '/@/renderer/lib/react-query';

function createIDBPersister(idbValidKey: IDBValidKey = 'reactQuery') {
    return {
        persistClient: async (client: PersistedClient) => {
            set(idbValidKey, client);
        },
        removeClient: async () => {
            await del(idbValidKey);
        },
        restoreClient: async () => {
            return await get<PersistedClient>(idbValidKey);
        },
    } as Persister;
}

const indexedDbPersister = createIDBPersister('feishin');

if (window.api?.localSettings?.env) {
    const env = window.api.localSettings.env;
    window.SERVER_URL = env.SERVER_URL;
    window.SERVER_TYPE = env.SERVER_TYPE;
    window.SERVER_NAME = env.SERVER_NAME;
    window.SERVER_LOCK = env.SERVER_LOCK;
    window.REMOTE_URL = env.REMOTE_URL;
    window.LEGACY_AUTHENTICATION = env.LEGACY_AUTHENTICATION;
    window.SERVER_USERNAME = env.SERVER_USERNAME;
    window.SERVER_PASSWORD = env.SERVER_PASSWORD;
}

createRoot(document.getElementById('root')!).render(
    <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{
            buster: 'feishin',
            dehydrateOptions: {
                shouldDehydrateQuery: (query) => {
                    const isSuccess = query.state.status === 'success';
                    const isLyricsQueryKey =
                        query.queryKey.includes('song') &&
                        query.queryKey.includes('lyrics') &&
                        query.queryKey.includes('select');

                    return isSuccess && isLyricsQueryKey;
                },
            },
            hydrateOptions: {
                defaultOptions: {
                    queries: {
                        gcTime: Infinity,
                    },
                },
            },
            maxAge: Infinity,
            persister: indexedDbPersister,
        }}
    >
        <Web3Provider>
            <App />
        </Web3Provider>
    </PersistQueryClientProvider>,
);
