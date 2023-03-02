// This is copied with modification from @wallet-standard/wallet
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _FoxWalletWalletAccount_address, _FoxWalletWalletAccount_publicKey, _FoxWalletWalletAccount_chains, _FoxWalletWalletAccount_features, _FoxWalletWalletAccount_label, _FoxWalletWalletAccount_icon;
import { SOLANA_CHAINS } from './solana.js';
const chains = SOLANA_CHAINS;
const features = ['solana:signAndSendTransaction', 'solana:signMessage', 'solana:signTransaction'];
export class FoxWalletWalletAccount {
    get address() {
        return __classPrivateFieldGet(this, _FoxWalletWalletAccount_address, "f");
    }
    get publicKey() {
        return __classPrivateFieldGet(this, _FoxWalletWalletAccount_publicKey, "f").slice();
    }
    get chains() {
        return __classPrivateFieldGet(this, _FoxWalletWalletAccount_chains, "f").slice();
    }
    get features() {
        return __classPrivateFieldGet(this, _FoxWalletWalletAccount_features, "f").slice();
    }
    get label() {
        return __classPrivateFieldGet(this, _FoxWalletWalletAccount_label, "f");
    }
    get icon() {
        return __classPrivateFieldGet(this, _FoxWalletWalletAccount_icon, "f");
    }
    constructor({ address, publicKey, label, icon }) {
        _FoxWalletWalletAccount_address.set(this, void 0);
        _FoxWalletWalletAccount_publicKey.set(this, void 0);
        _FoxWalletWalletAccount_chains.set(this, void 0);
        _FoxWalletWalletAccount_features.set(this, void 0);
        _FoxWalletWalletAccount_label.set(this, void 0);
        _FoxWalletWalletAccount_icon.set(this, void 0);
        if (new.target === FoxWalletWalletAccount) {
            Object.freeze(this);
        }
        __classPrivateFieldSet(this, _FoxWalletWalletAccount_address, address, "f");
        __classPrivateFieldSet(this, _FoxWalletWalletAccount_publicKey, publicKey, "f");
        __classPrivateFieldSet(this, _FoxWalletWalletAccount_chains, chains, "f");
        __classPrivateFieldSet(this, _FoxWalletWalletAccount_features, features, "f");
        __classPrivateFieldSet(this, _FoxWalletWalletAccount_label, label, "f");
        __classPrivateFieldSet(this, _FoxWalletWalletAccount_icon, icon, "f");
    }
}
_FoxWalletWalletAccount_address = new WeakMap(), _FoxWalletWalletAccount_publicKey = new WeakMap(), _FoxWalletWalletAccount_chains = new WeakMap(), _FoxWalletWalletAccount_features = new WeakMap(), _FoxWalletWalletAccount_label = new WeakMap(), _FoxWalletWalletAccount_icon = new WeakMap();
//# sourceMappingURL=account.js.map