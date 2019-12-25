'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const Lain_lain = require('../contract/lain_lain/lib/lain_lain.js');
const path = require('path');
let yamlPath =  path.resolve(__dirname,'../gateway/networkConnection.yaml');
let walletPath =  path.resolve(__dirname,'../identity/user/adminkeur/wallet');

const wallet = new FileSystemWallet(walletPath);
const PosLain_lain = () => {};

// PosLain_lain.getLain_lain = (data, result) =>{

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
            console.log('Connect to Fabric gateway.');
            await gateway.connect(connectionProfile, connectionOptions);

            console.log('Use network channel: mychannel.');
            const network = await gateway.getNetwork('mychannel');

            console.log('Use org.prodence.kendaraan smart contract.');
            const contract = await network.getContract('lain_laincontract');

            console.log('Submit kendaraan issue transaction.');
            const issueResponse = await contract.submitTransaction('getLain_lain', data.no_pemeriksaan, data.no_kendaraan );

            console.log('Process issue transaction response.'+issueResponse);
            let lain_lain = Lain_lain.fromBuffer(issueResponse);

            delete lain_lain.class;
            delete lain_lain.key;

            lain_lain.sistem_bahan_bakar = (lain_lain.sistem_bahan_bakar == 'true');
            lain_lain.sistem_kelistrikan = (lain_lain.sistem_kelistrikan == 'true');
            lain_lain.status = (lain_lain.status == 'true');

            // result(null, {data : lain_lain});

            console.log(`${lain_lain.no_pemeriksaan} kendaraan : ${lain_lain.no_kendaraan} successfully issued for value ${lain_lain.no_pemeriksaan}`);
            console.log('Transaction complete.');
            console.log(lain_lain);

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

// module.exports = PosLain_lain;