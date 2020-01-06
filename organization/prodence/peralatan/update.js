'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const convert = require('../../../backend/helper');
const { FileSystemWallet, Gateway } = require('fabric-network');
const Peralatan = require('../contract/peralatan/lib/peralatan.js');
const path = require('path');
let yamlPath =  path.resolve(__dirname,'../gateway/networkConnection.yaml');
let walletPath =  path.resolve(__dirname,'../identity/user/adminkeur/wallet');

const wallet = new FileSystemWallet(walletPath);
const PosPeralatan = () => {};

PosPeralatan.updatePeralatan = (data, result) =>{


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
            const contract = await network.getContract('peralatancontract');
            const issueResponse = await contract.submitTransaction('update', data.no_pemeriksaan, data.no_kendaraan, data.no_rangka.toString(), data.pelat_pabrik_pembuatnya.toString(), data.pelat_nomor.toString(), data.tulisan.toString(), data.penghapus_kaca_dapan.toString(), data.klakson.toString(), data.kaca_spion.toString(), data.pandangan_ke_depan.toString(), data.kaca_penawar_sinar.toString(), data.alat_pengendalian.toString(), data.lampu_indikasi.toString(), data.speedometer.toString(), data.perlangkapan.toString(), data.notes, data.status);
            let peralatan = Peralatan.fromBuffer(issueResponse);

            delete peralatan.class;
            delete peralatan.key;

            peralatan.no_rangka = convert.convertToBool(peralatan.no_rangka);
            peralatan.pelat_pabrik_pembuatnya = convert.convertToBool(peralatan.pelat_pabrik_pembuatnya);
            peralatan.pelat_nomor = convert.convertToBool(peralatan.pelat_nomor);
            peralatan.tulisan = convert.convertToBool(peralatan.tulisan);
            peralatan.penghapus_kaca_dapan = convert.convertToBool(peralatan.penghapus_kaca_dapan);
            peralatan.klakson = convert.convertToBool(peralatan.klakson);
            peralatan.kaca_spion = convert.convertToBool(peralatan.kaca_spion);
            peralatan.pandangan_ke_depan = convert.convertToBool(peralatan.pandangan_ke_depan);
            peralatan.kaca_penawar_sinar = convert.convertToBool(peralatan.kaca_penawar_sinar);
            peralatan.alat_pengendalian = convert.convertToBool(peralatan.alat_pengendalian);
            peralatan.lampu_indikasi = convert.convertToBool(peralatan.lampu_indikasi);
            peralatan.speedometer = convert.convertToBool(peralatan.speedometer);
            peralatan.perlangkapan = convert.convertToBool(peralatan.perlangkapan);

            result(null, {data : peralatan});

            console.log(peralatan);

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

module.exports = PosPeralatan;