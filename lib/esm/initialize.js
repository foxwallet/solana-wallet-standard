import { registerWallet } from './register.js';
import { FoxWalletWallet } from './wallet.js';
export function initialize(foxwallet) {
    registerWallet(new FoxWalletWallet(foxwallet));
}
//# sourceMappingURL=initialize.js.map