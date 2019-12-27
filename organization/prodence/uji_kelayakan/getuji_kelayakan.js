'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const Uji_kelayakan = require('../contract/uji_kelayakan/lib/uji_kelayakan.js');
const path = require('path');
let yamlPath =  path.resolve(__dirname,'../gateway/networkConnection.yaml');
let walletPath =  path.resolve(__dirname,'../identity/user/adminkeur/wallet');

const wallet = new FileSystemWallet(walletPath);
// const PosUji_kelayakan = () => {};

// PosUji_kelayakan.getUji_kelayakan = (data, result) =>{

async function main() {
    const gateway = new Gateway();
    try {
        const userName = 'User1@org1.prodence.com';
        let connectionProfile = yaml.safeLoad(fs.readFileSync(yamlPath, 'utf8'));
        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: { enabled:false, asLocalhost: true }
        };
        await gateway.connect(connectionProfile, connectionOptions);
        const network = await gateway.getNetwork('mychannel');
        const contract = await network.getContract('uji_kelayakancontract');
        const issueResponse = await contract.submitTransaction('getuji_kelayakan', '1231435', 'AD5846EG', '565', '878', '345', '898', '777', '678', '789', '246', '546', '346', '256', 'baik', 'baik', 'lulus');
        let uji_kelayakan = Uji_kelayakan.fromBuffer(issueResponse);

        delete uji_kelayakan.class;
        delete uji_kelayakan.key;

        // result(null, {data : uji_kelayakan});

        console.log(uji_kelayakan);

    } catch (error) {

        // result(true, null);

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
    // result(true, null);

    console.log('Issue program exception.');
    console.log(e);
    console.log(e.stack);
    process.exit(-1);

});
// };

// module.exports = PosUji_kelayakan;
