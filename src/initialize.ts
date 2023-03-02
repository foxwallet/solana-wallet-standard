import { registerWallet } from './register.js';
import { FoxWalletWallet } from './wallet.js';
import type { FoxWallet } from './window.js';

export function initialize(foxwallet: FoxWallet): void {
    registerWallet(new FoxWalletWallet(foxwallet));
}
