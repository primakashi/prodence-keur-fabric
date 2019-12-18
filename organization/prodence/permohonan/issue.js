'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const Permohonan = require('../contract/permohonan/lib/permohonan.js');
const path = require('path');
let yamlPath =  path.resolve(__dirname,'../gateway/networkConnection.yaml');
let walletPath =  path.resolve(__dirname,'../identity/user/adminkeur/wallet');

const wallet = new FileSystemWallet(walletPath);
const PosPermohonan = () => {};

PosPermohonan.createPermohonan = (data, result) =>{

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
            const contract = await network.getContract('permohonancontract');

            console.log('Submit kendaraan issue transaction.');
            const issueResponse = await contract.submitTransaction('create',data.no_stnk,data.no_kendaraan,data.no_ktp,data.no_mesin,data.no_rangka,data.buku_uji,data.no_laporan,data.status,data.jarak_pemaikaian,data.tgl_pemeriksaan,data.no_pemeriksaan,data.lokasi_pengujian,data.no_kode);

            console.log('Process issue transaction response.'+issueResponse);
            let permohonan = Permohonan.fromBuffer(issueResponse);

            delete permohonan.class;
            delete permohonan.key;
            delete permohonan.currentState;

            result(null, {data : permohonan});

            console.log(`${permohonan.no_pemeriksaan} kendaraan : ${permohonan.no_kendaraan} successfully issued for value ${permohonan.no_pemeriksaan}`);
            console.log('Transaction complete.');

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

module.exports = PosPermohonan;