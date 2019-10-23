'use strict';

const fs = require('fs');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const path = require('path');

const fixtures = path.resolve(__dirname, '../../../basic-network');

const wallet = new FileSystemWallet('../identity/user/admin/wallet');

async function main() {
    try {

        // Identity to credentials to be stored in the wallet
        const credPath = path.join(fixtures, '/crypto-config/peerOrganizations/org1.prodence.com/users/User1@org1.prodence.com');
        const cert = fs.readFileSync(path.join(credPath, '/msp/signcerts/User1@org1.prodence.com-cert.pem')).toString();
        const key = fs.readFileSync(path.join(credPath, '/msp/keystore/c75bd6911aca808941c3557ee7c97e90f3952e379497dc55eb903f31b50abc83_sk')).toString();

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