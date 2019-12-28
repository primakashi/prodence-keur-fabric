'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const Uji_kelayakan = require('../contract/uji_kelayakan/lib/uji_kelayakan.js');
const path = require('path');
let yamlPath =  path.resolve(__dirname,'../gateway/networkConnection.yaml');
let walletPath =  path.resolve(__dirname,'../identity/user/adminkeur/wallet');

const wallet = new FileSystemWallet(walletPath);
const PosUji_kelayakan = () => {};

PosUji_kelayakan.createUji_kelayakan = (data, result) =>{

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
            const issueResponse = await contract.submitTransaction('create', data.no_pemeriksaan, data.no_kendaraan, data.side_slip.toString(), data.rem_utama.toString(), data.rem_parkir.toString(), data.gaya_rem_s11.toString(), data.gaya_rem_s12.toString(), data.gaya_rem_s21.toString(), data.gaya_rem_s22.toString(), data.gaya_rem_s31.toString(), data.gaya_rem_s32.toString(), data.gaya_rem_s41.toString(), data.gaya_rem_s42.toString(), data.speedometer.toString(), data.notes, data.status);
            let uji_kelayakan = Uji_kelayakan.fromBuffer(issueResponse);

            delete uji_kelayakan.class;
            delete uji_kelayakan.key;
            delete uji_kelayakan.currentState;

            uji_kelayakan.side_slip = parseInt(uji_kelayakan.side_slip);
            uji_kelayakan.rem_utama = parseInt(uji_kelayakan.rem_utama);
            uji_kelayakan.rem_parkir = parseInt(uji_kelayakan.rem_parkir);
            uji_kelayakan.gaya_rem_s11 = parseInt(uji_kelayakan.gaya_rem_s11);
            uji_kelayakan.gaya_rem_s12 = parseInt(uji_kelayakan.gaya_rem_s12);
            uji_kelayakan.gaya_rem_s21 = parseInt(uji_kelayakan.gaya_rem_s21);
            uji_kelayakan.gaya_rem_s22 = parseInt(uji_kelayakan.gaya_rem_s22);
            uji_kelayakan.gaya_rem_s31 = parseInt(uji_kelayakan.gaya_rem_s31);
            uji_kelayakan.gaya_rem_s32 = parseInt(uji_kelayakan.gaya_rem_s32);
            uji_kelayakan.gaya_rem_s41 = parseInt(uji_kelayakan.gaya_rem_s41);
            uji_kelayakan.gaya_rem_s42 = parseInt(uji_kelayakan.gaya_rem_s42);
            uji_kelayakan.speedometer = parseInt(uji_kelayakan.speedometer);

            result(null, {data : uji_kelayakan});

            console.log(uji_kelayakan);

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

module.exports = PosUji_kelayakan;
