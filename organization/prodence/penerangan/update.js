'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const convert = require('../../../backend/helper');
const Penerangan = require('../contract/penerangan/lib/penerangan.js');
const path = require('path');
let yamlPath =  path.resolve(__dirname,'../gateway/networkConnection.yaml');
let walletPath =  path.resolve(__dirname,'../identity/user/adminkeur/wallet');

const wallet = new FileSystemWallet(walletPath);
const PosPenerangan = () => {};

PosPenerangan.updatePenerangan = (data, result) =>{


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
            const contract = await network.getContract('penerangancontract');
            const issueResponse = await contract.submitTransaction('update', data.no_pemeriksaan, data.no_kendaraan, data.lampu_jauh.toString(), data.tambahan_lampu_jauh.toString(), data.lampu_dekat.toString(), data.arah_lampu.toString(), data.lampu_kabut.toString(), data.lampu_posisi.toString(), data.lampu_belakang.toString(), data.lampu_rem.toString(), data.lampu_plat_nomor.toString(), data.lampu_mundur.toString(), data.lampu_kabut_belakang.toString(), data.lampu_peringatan.toString(), data.reflektor_merah.toString(), data.lampu_tambahan_lain.toString(), data.status);
            let penerangan = Penerangan.fromBuffer(issueResponse);

            delete penerangan.class;
            delete penerangan.key;

            penerangan.lampu_jauh = convert.convertToBool(penerangan.lampu_jauh);
            penerangan.tambahan_lampu_jauh = convert.convertToBool(penerangan.tambahan_lampu_jauh);
            penerangan.lampu_dekat = convert.convertToBool(penerangan.lampu_dekat);
            penerangan.arah_lampu = convert.convertToBool(penerangan.arah_lampu);
            penerangan.lampu_kabut = convert.convertToBool(penerangan.lampu_kabut);
            penerangan.lampu_posisi = convert.convertToBool(penerangan.lampu_posisi);
            penerangan.lampu_belakang = convert.convertToBool(penerangan.lampu_belakang);
            penerangan.lampu_rem = convert.convertToBool(penerangan.lampu_rem);
            penerangan.lampu_plat_nomor = convert.convertToBool(penerangan.lampu_plat_nomor);
            penerangan.lampu_mundur = convert.convertToBool(penerangan.lampu_mundur);
            penerangan.lampu_kabut_belakang = convert.convertToBool(penerangan.lampu_kabut_belakang);
            penerangan.lampu_peringatan = convert.convertToBool(penerangan .lampu_peringata);
            penerangan.reflektor_merah = convert.convertToBool(penerangan.reflektor_merah);
            penerangan.lampu_tambahan_lain = convert.convertToBool(penerangan.lampu_tambahan_lain);

            result(null, {data : penerangan});

            console.log(penerangan);

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