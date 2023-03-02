import type { SolanaSignAndSendTransactionFeature, SolanaSignMessageFeature, SolanaSignTransactionFeature } from '@solana/wallet-standard-features';
import type { Wallet } from '@wallet-standard/base';
import type { ConnectFeature, DisconnectFeature, EventsFeature } from '@wallet-standard/features';
import { FoxWalletWalletAccount } from './account.js';
import type { FoxWallet } from './window.js';
export type FoxWalletFeature = {
    'foxwallet:': {
        foxwallet: FoxWallet;
    };
};
export declare class FoxWalletWallet implements Wallet {
    #private;
    get version(): "1.0.0";
    get name(): "FoxWallet";
    get icon(): `data:image/svg+xml;base64,${string}` | `data:image/webp;base64,${string}` | `data:image/png;base64,${string}` | `data:image/gif;base64,${string}`;
    get chains(): ("solana:mainnet" | "solana:devnet" | "solana:testnet" | "solana:localnet")[];
    get features(): ConnectFeature & DisconnectFeature & EventsFeature & SolanaSignAndSendTransactionFeature & SolanaSignTransactionFeature & SolanaSignMessageFeature & FoxWalletFeature;
    get accounts(): FoxWalletWalletAccount[];
    constructor(foxwallet: FoxWallet);
}
//# sourceMappingURL=wallet.d.ts.map