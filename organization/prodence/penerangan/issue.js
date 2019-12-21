'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const Penerangan = require('../contract/penerangan/lib/penerangan.js');
const path = require('path');
let yamlPath =  path.resolve(__dirname,'../gateway/networkConnection.yaml');
let walletPath =  path.resolve(__dirname,'../identity/user/adminkeur/wallet');

const wallet = new FileSystemWallet(walletPath);
const PosPenerangan = () => {};

PosPenerangan.createPenerangan = (data, result) =>{

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
            const contract = await network.getContract('penerangancontract');

            console.log('Submit kendaraan issue transaction.');
            const issueResponse = await contract.submitTransaction('create', data.no_pemeriksaan, data.no_kendaraan, data.lampu_jauh.toString(), data.tambahan_lampu_jauh.toString(), data.lampu_dekat.toString(), data.arah_lampu.toString(), data.lampu_kabut.toString(), data.lampu_posisi.toString(), data.lampu_belakang.toString(), data.lampu_rem.toString(), data.lampu_plat_nomor.toString(), data.lampu_mundur.toString(), data.lampu_kabut_belakang.toString(), data.lampu_peringatan.toString(), data.reflektor_merah.toString(), data.lampu_tambahan_lain.toString(), data.status);

            console.log('Process issue transaction response.'+issueResponse);
            let penerangan = Penerangan.fromBuffer(issueResponse);

            delete penerangan.class;
            delete penerangan.key;
            delete penerangan.currentState;

            penerangan.lampu_jauh = (penerangan.lampu_jauh === 'true');
            penerangan.tambahan_lampu_jauh = (penerangan.tambahan_lampu_jauh === 'true');
            penerangan.lampu_dekat = (penerangan.lampu_dekat === 'true');
            penerangan.arah_lampu = (penerangan.arah_lampu === 'true');
            penerangan.lampu_kabut = (penerangan.lampu_kabut === 'true');
            penerangan.lampu_posisi = (penerangan.lampu_posisi === 'true');
            penerangan.lampu_belakang = (penerangan.lampu_belakang === 'true');
            penerangan.lampu_rem = (penerangan.lampu_rem === 'true');
            penerangan.lampu_plat_nomor = (penerangan.lampu_plat_nomor === 'true');
            penerangan.lampu_mundur = (penerangan.lampu_mundur === 'true');
            penerangan.lampu_kabut_belakang = (penerangan.lampu_kabut_belakang === 'true');
            penerangan.lampu_peringatan = (penerangan .lampu_peringatan=== 'true');
            penerangan.reflektor_merah = (penerangan.reflektor_merah === 'true');
            penerangan.lampu_tambahan_lain = (penerangan.lampu_tambahan_lain === 'true');

            result(null, {data : penerangan});

            console.log(`${penerangan.no_pemeriksaan} kendaraan : ${penerangan.no_kendaraan} successfully issued for value ${penerangan.no_pemeriksaan}`);
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

module.exports = PosPenerangan;