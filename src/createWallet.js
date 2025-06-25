// importando bibliotecas
const bip39 = require('bip39');
const bip32 = require('bip32');
const bitcoin = require('bitcoinjs-lib');

// definir rede
// testnet - rede de teste - testnet
// bitcoin - rede principal - mainnet
const network = bitcoin.networks.testnet;

//derivação de carteiras HD
const path = `m/49'/1'/0'/0'`;

// criando o mnemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

// criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network);

//criando uma conta - par pvt-pub keys
let node = root.derivePath(path);

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network
}).address;

console.log("Carteira gerada");
console.log("Endereço da carteira", btcAddress);
console.log("Chave privada", node.toWIF());
console.log("Seed", mnemonic);
