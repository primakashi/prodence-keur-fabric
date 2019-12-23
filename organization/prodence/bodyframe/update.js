'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const BodyFrame = require('../contract/tirerim/lib/tirerim.js');
const path = require('path');
let yamlPath =  path.resolve(__dirname,'../gateway/networkConnection.yaml');
let walletPath =  path.resolve(__dirname,'../identity/user/adminkeur/wallet');

const wallet = new FileSystemWallet(walletPath);
const PosBodyFrame = () => {};

PosBodyFrame.updateBodyFrame = (data, result) =>{

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
            const contract = await network.getContract('bodyframecontract');

            console.log('Submit kendaraan issue transaction.');
            const issueResponse = await contract.submitTransaction('update', data.no_pemeriksaan, data.no_kendaraan, data.rangka_penopang, data.bemper, data.tempat_roda_cadangan, data.keamanan_bodi, data.kondisi_bodi, data.ruang_pengemudi, data.tempat_duduk, data.sambungan_kereta_gandengan, data.status);

            console.log('Process issue transaction response.'+issueResponse);
            let bodyframe = BodyFrame.fromBuffer(issueResponse);

            delete bodyframe.class;
            delete bodyframe.key;

            result(null, {data : bodyframe});

            console.log(`${bodyframe.no_pemeriksaan} kendaraan : ${bodyframe.no_kendaraan} successfully issued for value ${bodyframe.no_pemeriksaan}`);
            console.log('Transaction complete.');
            console.log(bodyframe);

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

module.exports = PosBodyFrame;