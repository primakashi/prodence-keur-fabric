'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const Peralatan = require('../contract/peralatan/lib/peralatan.js');
const path = require('path');
let yamlPath =  path.resolve(__dirname,'../gateway/networkConnection.yaml');
let walletPath =  path.resolve(__dirname,'../identity/user/adminkeur/wallet');

const wallet = new FileSystemWallet(walletPath);
const PosPeralatan = () => {};

PosPeralatan.createPeralatan = (data, result) =>{

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
            const contract = await network.getContract('peralatancontract');

            console.log('Submit kendaraan issue transaction.');
            const issueResponse = await contract.submitTransaction('create', data.no_pemeriksaan.toString(), data.no_kendaraan.toString(), data.no_rangka.toString(), data.pelat_pabrik_pembuatnya.toString(), data.pelat_nomor.toString(), data.tulisan.toString(), data.penghapus_kaca_dapan.toString(), data.klakson.toString(), data.kaca_spion.toString(), data.pandangan_ke_depan.toString(), data.kaca_penawar_sinar.toString(), data.alat_pengendalian.toString(), data.lampu_indikasi.toString(), data.speedometer.toString(), data.perlangkapan.toString(), data.status.toString());

            console.log('Process issue transaction response.'+issueResponse);
            let peralatan = Peralatan.fromBuffer(issueResponse);

            delete peralatan.class;
            delete peralatan.key;
            delete peralatan.currentState;

            peralatan.no_rangka = (peralatan.no_rangka === 'true');
            peralatan.pelat_pabrik_pembuatnya = (peralatan.pelat_pabrik_pembuatnya === 'true');
            peralatan.pelat_nomor = (peralatan.pelat_nomor === 'true');
            peralatan.tulisan = (peralatan.tulisan === 'true');
            peralatan.penghapus_kaca_dapan = (peralatan.penghapus_kaca_dapan === 'true');
            peralatan.klakson = (peralatan.klakson === 'true');
            peralatan.kaca_spion = (peralatan.kaca_spion === 'true');
            peralatan.pandangan_ke_depan = (peralatan.pandangan_ke_depan === 'true');
            peralatan.kaca_penawar_sinar = (peralatan.kaca_penawar_sinar === 'true');
            peralatan.alat_pengendalian = (peralatan.alat_pengendalian === 'true');
            peralatan.lampu_indikasi = (peralatan.lampu_indikasi === 'true');
            peralatan.speedometer = (peralatan.speedometer === 'true');
            peralatan.perlangkapan = (peralatan.perlangkapan === 'true');

            result(null, {data : peralatan});

            console.log(`${peralatan.no_pemeriksaan} kendaraan : ${peralatan.no_kendaraan} successfully issued for value ${peralatan.no_pemeriksaan}`);
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

module.exports = PosPeralatan;