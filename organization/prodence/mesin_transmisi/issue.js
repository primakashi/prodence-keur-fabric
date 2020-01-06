'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const convert = require('../../../backend/helper');
const Mesin_transmisi = require('../contract/mesin_transmisi/lib/mesin_transmisi.js');
const path = require('path');
let yamlPath =  path.resolve(__dirname,'../gateway/networkConnection.yaml');
let walletPath =  path.resolve(__dirname,'../identity/user/adminkeur/wallet');

const wallet = new FileSystemWallet(walletPath);
const PosMesin_transmisi = () => {};

PosMesin_transmisi.createMesin_transmisi = (data, result) =>{

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
            const contract = await network.getContract('mesin_transmisicontract');
            const issueResponse = await contract.submitTransaction('create', data.no_pemeriksaan, data.no_kendaraan, data.dudukan_mesin.toString(), data.kondisi_mesin.toString(), data.transmisi.toString(), data.sistem_gas_buang.toString(), data.emisi_asap.toString(), data.emisi_co.toString(), data.notes, data.status);
            let mesin_transmisi = Mesin_transmisi.fromBuffer(issueResponse);

            delete mesin_transmisi.class;
            delete mesin_transmisi.key;

            mesin_transmisi.dudukan_mesin = convert.convertToBool(mesin_transmisi.dudukan_mesin);
            mesin_transmisi.kondisi_mesin = convert.convertToBool(mesin_transmisi.kondisi_mesin);
            mesin_transmisi.transmisi = convert.convertToBool(mesin_transmisi.transmisi);
            mesin_transmisi.sistem_gas_buang = convert.convertToBool(mesin_transmisi.sistem_gas_buang);
            mesin_transmisi.emisi_asap = convert.convertToBool(mesin_transmisi.emisi_asap);
            mesin_transmisi.emisi_co = convert.convertToBool(mesin_transmisi.emisi_co);

            result(null, {data : mesin_transmisi});

            console.log(mesin_transmisi);

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

module.exports = PosMesin_transmisi;