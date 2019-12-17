'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const Kendaraan = require('../contract/kendaraan/lib/kendaraan.js');

const wallet = new FileSystemWallet('../identity/user/adminkeur/wallet');

// Main program function
async function main () {
    const gateway = new Gateway();
    try {
        const userName = 'User1@org1.prodence.com';
        let connectionProfile = yaml.safeLoad(fs.readFileSync('../gateway/networkConnection.yaml', 'utf8'));
        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: { enabled:false, asLocalhost: true }
        };

        console.log('Connect to Fabric gateway.');
        await gateway.connect(connectionProfile, connectionOptions);

        console.log('Use network channel: mychannel.');
        const network = await gateway.getNetwork('mychannel');

        console.log('Use org.prodence.kendaraan smart contract.');
        const contract = await network.getContract('kendaraancontract');

        console.log('Submit kendaraan issue transaction.');
        const updateResponse = await contract.submitTransaction('update', '11111', 'AA3214BE', '3304809386093860938', '88013081048098148', 'Yoruichi', 'Distcit 9');

        // process response
        console.log('Process buy transaction response.');

        let kendaraan = Kendaraan.fromBuffer(updateResponse);

        console.log(`${kendaraan.no_stnk} commercial paper : ${kendaraan.no_kendaraan} successfully purchased by ${kendaraan.no_ktp}`);
        console.log('Transaction complete.');
        console.log(kendaraan);

    } catch (error) {

        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);

    } finally {

        // Disconnect from the gateway
        console.log('Disconnect from Fabric gateway.');
        gateway.disconnect();

    }
}
main().then(() => {

    console.log('Buy program complete.');

}).catch((e) => {

    console.log('Buy program exception.');
    console.log(e);
    console.log(e.stack);
    process.exit(-1);

});