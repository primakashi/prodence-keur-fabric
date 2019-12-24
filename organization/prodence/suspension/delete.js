'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const convert = require('../../../backend/helper');
const Suspension = require('../contract/suspension/lib/suspension.js');
const path = require('path');
let yamlPath =  path.resolve(__dirname,'../gateway/networkConnection.yaml');
let walletPath =  path.resolve(__dirname,'../identity/user/adminkeur/wallet');

const wallet = new FileSystemWallet(walletPath);
const PosSuspension = () => {};

PosSuspension.deleteSuspension = (data, result) =>{

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
            const contract = await network.getContract('suspensioncontract');

            console.log('Submit kendaraan issue transaction.');
            const issueResponse = await contract.submitTransaction('delete', data.no_pemeriksaan, data.no_kendaraan );

            console.log('Process issue transaction response.'+issueResponse);
            let suspension = Suspension.fromBuffer(issueResponse);

            delete suspension.class;
            delete suspension.key;

            suspension.suspensi_roda_depan = convert.convertToBool(suspension.suspensi_roda_depan);
            suspension.suspensi_roda_belakang = convert.convertToBool(suspension.suspensi_roda_belakang);
            suspension.sumbu = convert.convertToBool(suspension.sumbu);
            suspension.pemasangan_sumbu = convert.convertToBool(suspension.pemasangan_sumbu);
            suspension.pegas = convert.convertToBool(suspension.pegas);
            suspension.bantalan_roda = convert.convertToBool(suspension.bantalan_roda);

            result(null, {data : suspension});

            console.log(`${suspension.no_pemeriksaan} kendaraan : ${suspension.no_kendaraan} successfully issued for value ${suspension.no_pemeriksaan}`);
            console.log('Transaction complete.');
            console.log(suspension);

        } catch (error) {

            result(true, null);

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
        result(true, null);

        console.log('Issue program exception.');
        console.log(e);
        console.log(e.stack);
        process.exit(-1);

    });
};

module.exports = PosSuspension;