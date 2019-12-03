'use strict';

const fs = require('fs');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const path = require('path');

const fixtures = path.resolve(__dirname, '../../../basic-network');

const wallet = new FileSystemWallet('../identity/user/adminkeur/wallet');

async function main() {
    try {

        // Identity to credentials to be stored in the wallet
        const credPath = path.join(fixtures, '/crypto-config/peerOrganizations/org1.prodence.com/users/User1@org1.prodence.com');
        const cert = fs.readFileSync(path.join(credPath, '/msp/signcerts/User1@org1.prodence.com-cert.pem')).toString();
        const key = fs.readFileSync(path.join(credPath, '/msp/keystore/900ab2e6f2d58a0d61e4a23a394b07545f9813912a7610dcd28e00ef676ec785_sk')).toString();

        // Load credentials into wallet
        const identityLabel = 'User1@org1.prodence.com';
        const identity = X509WalletMixin.createIdentity('Org1MSP', cert, key);

        await wallet.import(identityLabel, identity);

    } catch (error) {
        console.log(`Error adding to wallet. ${error}`);
        console.log(error.stack);
    }
}

main().then(() => {
    console.log('done');
}).catch((e) => {
    console.log(e);
    console.log(e.stack);
    process.exit(-1);
});