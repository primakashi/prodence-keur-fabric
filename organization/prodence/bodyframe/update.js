'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const convert = require('../../../backend/helper');
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
            await gateway.connect(connectionProfile, connectionOptions);
            const network = await gateway.getNetwork('mychannel');
            const contract = await network.getContract('bodyframecontract');
            const issueResponse = await contract.submitTransaction('update', data.no_pemeriksaan, data.no_kendaraan, data.rangka_penopang.toString(), data.bemper.toString(), data.tempat_roda_cadangan.toString(), data.keamanan_bodi.toString(), data.kondisi_bodi.toString(), data.ruang_pengemudi.toString(), data.tempat_duduk.toString(), data.sambungan_kereta_gandengan.toString(), data.notes, data.status);
            let bodyframe = BodyFrame.fromBuffer(issueResponse);

            delete bodyframe.class;
            delete bodyframe.key;

            bodyframe.rangka_penopang = convert.convertToBool(bodyframe.rangka_penopang);
            bodyframe.bemper = convert.convertToBool(bodyframe.bemper);
            bodyframe.tempat_roda_cadangan = convert.convertToBool(bodyframe.tempat_roda_cadangan);
            bodyframe.keamanan_bodi = convert.convertToBool(bodyframe.keamanan_bodi);
            bodyframe.kondisi_bodi = convert.convertToBool(bodyframe.kondisi_bodi);
            bodyframe.ruang_pengemudi = convert.convertToBool(bodyframe.ruang_pengemudi);
            bodyframe.tempat_duduk = convert.convertToBool(bodyframe.tempat_duduk);
            bodyframe.sambungan_kereta_gandengan = convert.convertToBool(bodyframe.sambungan_kereta_gandengan);

            result(null, {data : bodyframe});

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