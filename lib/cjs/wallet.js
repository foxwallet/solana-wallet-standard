"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _FoxWalletWallet_instances, _FoxWalletWallet_listeners, _FoxWalletWallet_version, _FoxWalletWallet_name, _FoxWalletWallet_icon, _FoxWalletWallet_account, _FoxWalletWallet_foxwallet, _FoxWalletWallet_on, _FoxWalletWallet_emit, _FoxWalletWallet_off, _FoxWalletWallet_connected, _FoxWalletWallet_disconnected, _FoxWalletWallet_reconnected, _FoxWalletWallet_connect, _FoxWalletWallet_disconnect, _FoxWalletWallet_signAndSendTransaction, _FoxWalletWallet_deserializeTransaction, _FoxWalletWallet_signTransaction, _FoxWalletWallet_signMessage;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoxWalletWallet = void 0;
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
const account_js_1 = require("./account.js");
const icon_js_1 = require("./icon.js");
const solana_js_1 = require("./solana.js");
const util_js_1 = require("./util.js");
const supportedTransactionVersions = ['legacy', 0];
function isVersionedTransaction(transaction) {
    return 'version' in transaction;
}
class FoxWalletWallet {
    get version() {
        return __classPrivateFieldGet(this, _FoxWalletWallet_version, "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _FoxWalletWallet_name, "f");
    }
    get icon() {
        return __classPrivateFieldGet(this, _FoxWalletWallet_icon, "f");
    }
    get chains() {
        return solana_js_1.SOLANA_CHAINS.slice();
    }
    get features() {
        return {
            'standard:connect': {
                version: '1.0.0',
                connect: __classPrivateFieldGet(this, _FoxWalletWallet_connect, "f"),
            },
            'standard:disconnect': {
                version: '1.0.0',
                disconnect: __classPrivateFieldGet(this, _FoxWalletWallet_disconnect, "f"),
            },
            'standard:events': {
                version: '1.0.0',
                on: __classPrivateFieldGet(this, _FoxWalletWallet_on, "f"),
            },
            'solana:signAndSendTransaction': {
                version: '1.0.0',
                supportedTransactionVersions: supportedTransactionVersions,
                signAndSendTransaction: __classPrivateFieldGet(this, _FoxWalletWallet_signAndSendTransaction, "f"),
            },
            'solana:signTransaction': {
                version: '1.0.0',
                supportedTransactionVersions: supportedTransactionVersions,
                signTransaction: __classPrivateFieldGet(this, _FoxWalletWallet_signTransaction, "f"),
            },
            'solana:signMessage': {
                version: '1.0.0',
                signMessage: __classPrivateFieldGet(this, _FoxWalletWallet_signMessage, "f"),
            },
            'foxwallet:': {
                foxwallet: __classPrivateFieldGet(this, _FoxWalletWallet_foxwallet, "f"),
            },
        };
    }
    get accounts() {
        return __classPrivateFieldGet(this, _FoxWalletWallet_account, "f") ? [__classPrivateFieldGet(this, _FoxWalletWallet_account, "f")] : [];
    }
    constructor(foxwallet) {
        _FoxWalletWallet_instances.add(this);
        _FoxWalletWallet_listeners.set(this, {});
        _FoxWalletWallet_version.set(this, '1.0.0');
        _FoxWalletWallet_name.set(this, 'FoxWallet');
        _FoxWalletWallet_icon.set(this, icon_js_1.icon);
        _FoxWalletWallet_account.set(this, null);
        _FoxWalletWallet_foxwallet.set(this, void 0);
        _FoxWalletWallet_on.set(this, (event, listener) => {
            var _a;
            ((_a = __classPrivateFieldGet(this, _FoxWalletWallet_listeners, "f")[event]) === null || _a === void 0 ? void 0 : _a.push(listener)) || (__classPrivateFieldGet(this, _FoxWalletWallet_listeners, "f")[event] = [listener]);
            return () => __classPrivateFieldGet(this, _FoxWalletWallet_instances, "m", _FoxWalletWallet_off).call(this, event, listener);
        });
        _FoxWalletWallet_connected.set(this, () => {
            var _a;
            const address = (_a = __classPrivateFieldGet(this, _FoxWalletWallet_foxwallet, "f").publicKey) === null || _a === void 0 ? void 0 : _a.toBase58();
            if (address) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const publicKey = __classPrivateFieldGet(this, _FoxWalletWallet_foxwallet, "f").publicKey.toBytes();
                const account = __classPrivateFieldGet(this, _FoxWalletWallet_account, "f");
                if (!account || account.address !== address || !(0, util_js_1.bytesEqual)(account.publicKey, publicKey)) {
                    __classPrivateFieldSet(this, _FoxWalletWallet_account, new account_js_1.FoxWalletWalletAccount({ address, publicKey }), "f");
                    __classPrivateFieldGet(this, _FoxWalletWallet_instances, "m", _FoxWalletWallet_emit).call(this, 'change', { accounts: this.accounts });
                }
            }
        });
        _FoxWalletWallet_disconnected.set(this, () => {
            if (__classPrivateFieldGet(this, _FoxWalletWallet_account, "f")) {
                __classPrivateFieldSet(this, _FoxWalletWallet_account, null, "f");
                __classPrivateFieldGet(this, _FoxWalletWallet_instances, "m", _FoxWalletWallet_emit).call(this, 'change', { accounts: this.accounts });
            }
        });
        _FoxWalletWallet_reconnected.set(this, () => {
            if (__classPrivateFieldGet(this, _FoxWalletWallet_foxwallet, "f").publicKey) {
                __classPrivateFieldGet(this, _FoxWalletWallet_connected, "f").call(this);
            }
            else {
                __classPrivateFieldGet(this, _FoxWalletWallet_disconnected, "f").call(this);
            }
        });
        _FoxWalletWallet_connect.set(this, ({ silent } = {}) => __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _FoxWalletWallet_account, "f")) {
                yield __classPrivateFieldGet(this, _FoxWalletWallet_foxwallet, "f").connect(silent ? { onlyIfTrusted: true } : undefined);
            }
            __classPrivateFieldGet(this, _FoxWalletWallet_connected, "f").call(this);
            return { accounts: this.accounts };
        }));
        _FoxWalletWallet_disconnect.set(this, () => __awaiter(this, void 0, void 0, function* () {
            yield __classPrivateFieldGet(this, _FoxWalletWallet_foxwallet, "f").disconnect();
        }));
        _FoxWalletWallet_signAndSendTransaction.set(this, (...inputs) => __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _FoxWalletWallet_account, "f"))
                throw new Error('not connected');
            const outputs = [];
            if (inputs.length === 1) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const { transaction, account, chain, options } = inputs[0];
                const { minContextSlot, preflightCommitment, skipPreflight, maxRetries } = options || {};
                if (account !== __classPrivateFieldGet(this, _FoxWalletWallet_account, "f"))
                    throw new Error('invalid account');
                if (!(0, solana_js_1.isSolanaChain)(chain))
                    throw new Error('invalid chain');
                const { signature } = yield __classPrivateFieldGet(this, _FoxWalletWallet_foxwallet, "f").signAndSendTransaction(web3_js_1.VersionedTransaction.deserialize(transaction), {
                    preflightCommitment,
                    minContextSlot,
                    maxRetries,
                    skipPreflight,
                });
                outputs.push({ signature: bs58_1.default.decode(signature) });
            }
            else if (inputs.length > 1) {
                for (const input of inputs) {
                    outputs.push(...(yield __classPrivateFieldGet(this, _FoxWalletWallet_signAndSendTransaction, "f").call(this, input)));
                }
            }
            return outputs;
        }));
        _FoxWalletWallet_signTransaction.set(this, (...inputs) => __awaiter(this, void 0, void 0, function* () {
            console.log("standard signTransaction:", inputs);
            if (!__classPrivateFieldGet(this, _FoxWalletWallet_account, "f"))
                throw new Error('not connected');
            const outputs = [];
            if (inputs.length === 1) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const { account, chain } = inputs[0];
                const input = inputs[0];
                if (account !== __classPrivateFieldGet(this, _FoxWalletWallet_account, "f"))
                    throw new Error('invalid account');
                if (chain && !(0, solana_js_1.isSolanaChain)(chain))
                    throw new Error('invalid chain');
                const transaction = __classPrivateFieldGet(this, _FoxWalletWallet_instances, "m", _FoxWalletWallet_deserializeTransaction).call(this, input.transaction);
                const signedTransaction = yield __classPrivateFieldGet(this, _FoxWalletWallet_foxwallet, "f").signTransaction(transaction);
                console.log("standard signedTransaction:", signedTransaction);
                const serializedTransaction = isVersionedTransaction(signedTransaction)
                    ? signedTransaction.serialize()
                    : new Uint8Array(signedTransaction.serialize({
                        requireAllSignatures: false,
                        verifySignatures: false,
                    }));
                outputs.push({ signedTransaction: serializedTransaction });
            }
            else if (inputs.length > 1) {
                let chain = undefined;
                for (const input of inputs) {
                    if (input.account !== __classPrivateFieldGet(this, _FoxWalletWallet_account, "f"))
                        throw new Error('invalid account');
                    if (input.chain) {
                        if (!(0, solana_js_1.isSolanaChain)(input.chain))
                            throw new Error('invalid chain');
                        if (chain) {
                            if (input.chain !== chain)
                                throw new Error('conflicting chain');
                        }
                        else {
                            chain = input.chain;
                        }
                    }
                }
                const transactions = inputs.map(({ transaction }) => __classPrivateFieldGet(this, _FoxWalletWallet_instances, "m", _FoxWalletWallet_deserializeTransaction).call(this, transaction));
                const signedTransactions = yield __classPrivateFieldGet(this, _FoxWalletWallet_foxwallet, "f").signAllTransactions(transactions);
                outputs.push(...signedTransactions.map((signedTransaction) => {
                    const serializedTransaction = isVersionedTransaction(signedTransaction)
                        ? signedTransaction.serialize()
                        : new Uint8Array(signedTransaction.serialize({
                            requireAllSignatures: false,
                            verifySignatures: false,
                        }));
                    return { signedTransaction: serializedTransaction };
                }));
            }
            return outputs;
        }));
        _FoxWalletWallet_signMessage.set(this, (...inputs) => __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _FoxWalletWallet_account, "f"))
                throw new Error('not connected');
            const outputs = [];
            if (inputs.length === 1) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const { message, account } = inputs[0];
                if (account !== __classPrivateFieldGet(this, _FoxWalletWallet_account, "f"))
                    throw new Error('invalid account');
                const { signature } = yield __classPrivateFieldGet(this, _FoxWalletWallet_foxwallet, "f").signMessage(message);
                outputs.push({ signedMessage: message, signature });
            }
            else if (inputs.length > 1) {
                for (const input of inputs) {
                    outputs.push(...(yield __classPrivateFieldGet(this, _FoxWalletWallet_signMessage, "f").call(this, input)));
                }
            }
            return outputs;
        }));
        if (new.target === FoxWalletWallet) {
            Object.freeze(this);
        }
        __classPrivateFieldSet(this, _FoxWalletWallet_foxwallet, foxwallet, "f");
        foxwallet.on('connect', __classPrivateFieldGet(this, _FoxWalletWallet_connected, "f"), this);
        foxwallet.on('disconnect', __classPrivateFieldGet(this, _FoxWalletWallet_disconnected, "f"), this);
        foxwallet.on('accountChanged', __classPrivateFieldGet(this, _FoxWalletWallet_reconnected, "f"), this);
        __classPrivateFieldGet(this, _FoxWalletWallet_connected, "f").call(this);
    }
}
exports.FoxWalletWallet = FoxWalletWallet;
_FoxWalletWallet_listeners = new WeakMap(), _FoxWalletWallet_version = new WeakMap(), _FoxWalletWallet_name = new WeakMap(), _FoxWalletWallet_icon = new WeakMap(), _FoxWalletWallet_account = new WeakMap(), _FoxWalletWallet_foxwallet = new WeakMap(), _FoxWalletWallet_on = new WeakMap(), _FoxWalletWallet_connected = new WeakMap(), _FoxWalletWallet_disconnected = new WeakMap(), _FoxWalletWallet_reconnected = new WeakMap(), _FoxWalletWallet_connect = new WeakMap(), _FoxWalletWallet_disconnect = new WeakMap(), _FoxWalletWallet_signAndSendTransaction = new WeakMap(), _FoxWalletWallet_signTransaction = new WeakMap(), _FoxWalletWallet_signMessage = new WeakMap(), _FoxWalletWallet_instances = new WeakSet(), _FoxWalletWallet_emit = function _FoxWalletWallet_emit(event, ...args) {
    var _a;
    // eslint-disable-next-line prefer-spread
    (_a = __classPrivateFieldGet(this, _FoxWalletWallet_listeners, "f")[event]) === null || _a === void 0 ? void 0 : _a.forEach((listener) => listener.apply(null, args));
}, _FoxWalletWallet_off = function _FoxWalletWallet_off(event, listener) {
    var _a;
    __classPrivateFieldGet(this, _FoxWalletWallet_listeners, "f")[event] = (_a = __classPrivateFieldGet(this, _FoxWalletWallet_listeners, "f")[event]) === null || _a === void 0 ? void 0 : _a.filter((existingListener) => listener !== existingListener);
}, _FoxWalletWallet_deserializeTransaction = function _FoxWalletWallet_deserializeTransaction(serializedTransaction) {
    const transaction = web3_js_1.VersionedTransaction.deserialize(serializedTransaction);
    console.log("#deserializeTransaction", transaction);
    if (!supportedTransactionVersions.includes(transaction.version))
        throw new Error('unsupported transaction version');
    if (transaction.version === 'legacy' && (0, util_js_1.arraysEqual)(supportedTransactionVersions, ['legacy'])) {
        return web3_js_1.Transaction.from(serializedTransaction);
    }
    return transaction;
};
//# sourceMappingURL=wallet.js.map