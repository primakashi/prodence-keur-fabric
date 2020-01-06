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
            await gateway.connect(connectionProfile, connectionOptions);
            const network = await gateway.getNetwork('mychannel');
            const contract = await network.getContract('permohonancontract');
            const issueResponse = await contract.submitTransaction('create',data.no_stnk,data.no_kendaraan,data.no_ktp,data.no_mesin,data.no_rangka,data.buku_uji,data.no_laporan,data.status,data.jarak_pemakaian,data.tgl_pemeriksaan,data.no_pemeriksaan,data.lokasi_pengujian,data.no_kode);

            let permohonan = Permohonan.fromBuffer(issueResponse);

            delete permohonan.class;
            delete permohonan.key;

            result(null, {data : permohonan});

            console.log(permohonan);

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