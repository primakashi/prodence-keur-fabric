
'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const CommercialPaper = require('../contract/kendaraan/lib/kendaraan/kendaraan');

const wallet = new FileSystemWallet('../identity/user/admin/wallet');

async function main() {
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

        // Access PaperNet network
        console.log('Use network channel: mychannel.');

        const network = await gateway.getNetwork('mychannel');

        console.log('Use org.papernet.commercialpaper smart contract.');

        const contract = await network.getContract('papercontract');

        console.log('Submit commercial paper issue transaction.');

        const issueResponse = await contract.submitTransaction('issue', 'S1101', '33089810', '12345', '12345', '45678', '123456789', '3', '4', '92840328098');

        console.log('Process issue transaction response.'+issueResponse);

        let paper = CommercialPaper.fromBuffer(issueResponse);

        console.log(`${paper.issuer} commercial paper : ${paper.paperNumber} successfully issued for value ${paper.faceValue}`);
        console.log('Transaction complete.');
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

    console.log('Issue program complete.');

}).catch((e) => {

    console.log('Issue program exception.');
    console.log(e);
    console.log(e.stack);
    process.exit(-1);

});