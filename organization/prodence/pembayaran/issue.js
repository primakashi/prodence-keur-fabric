'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const Pembayaran = require('../contract/pembayaran/lib/pembayaran.js');
const path = require('path');
let yamlPath =  path.resolve(__dirname,'../gateway/networkConnection.yaml');
let walletPath =  path.resolve(__dirname,'../identity/user/adminkeur/wallet');

const wallet = new FileSystemWallet(walletPath);
const PosPembayaran = () => {};

// PosPembayaran.createPembayaran = (data, result) =>{

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
            const contract = await network.getContract('pembayarancontract');

            console.log('Submit kendaraan issue transaction.');
            const issueResponse = await contract.submitTransaction('create','11111', 'ap34', '7653', '4546', 'f45', 'lunas', '3536');

            console.log('Process issue transaction response.'+issueResponse);
            let pembayaran = Pembayaran.fromBuffer(issueResponse);

            delete pembayaran.class;
            delete pembayaran.key;
            delete pembayaran.currentState;

            // result(null, {data : pembayaran});

            console.log(`${pembayaran.no_pemeriksaan} kendaraan : ${pembayaran.no_kendaraan} successfully issued for value ${pembayaran.no_pemeriksaan}`);
            console.log('Transaction complete.');

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

// module.exports = PosPembayaran;