'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const convert = require('../../../backend/helper');
const TireRim = require('../contract/tirerim/lib/tirerim.js');
const path = require('path');
let yamlPath =  path.resolve(__dirname,'../gateway/networkConnection.yaml');
let walletPath =  path.resolve(__dirname,'../identity/user/adminkeur/wallet');

const wallet = new FileSystemWallet(walletPath);
const PosTireRim = () => {};

PosTireRim.createTireRim = (data, result) =>{

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
            const contract = await network.getContract('tirerimcontract');
            const issueResponse = await contract.submitTransaction('create', data.no_pemeriksaan, data.no_kendaraan, data.ukuran_dan_jenis_ban.toString(), data.keadaan_ban.toString(), data.kedalaman_kembang_ban.toString(), data.ukuran_dan_jenis_pelek.toString(), data.keadaan_pelek.toString(), data.penguatan_ban.toString(), data.status);
            let tirerim = TireRim.fromBuffer(issueResponse);

            delete tirerim.class;
            delete tirerim.key;
            delete tirerim.currentState;

            tirerim.ukuran_dan_jenis_ban = convert.convertToBool(tirerim.ukuran_dan_jenis_ban);
            tirerim.keadaan_ban = convert.convertToBool(tirerim.keadaan_ban);
            tirerim.kedalaman_kembang_ban = convert.convertToBool(tirerim.kedalaman_kembang_ban);
            tirerim.ukuran_dan_jenis_pelek = convert.convertToBool(tirerim.ukuran_dan_jenis_pelek);
            tirerim.keadaan_pelek = convert.convertToBool(tirerim.keadaan_pelek);
            tirerim.penguatan_ban = convert.convertToBool(tirerim.penguatan_ban);

            result(null, {data : tirerim});

            console.log(tirerim);

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

module.exports = PosTireRim;