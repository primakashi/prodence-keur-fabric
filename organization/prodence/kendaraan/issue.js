'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const Kendaraan = require('../contract/kendaraan/lib/kendaraan.js');
const path = require('path');
var yamlPath =  path.resolve(__dirname,'../gateway/networkConnection.yaml');
var walletPath =  path.resolve(__dirname,'../identity/user/adminkeur/wallet');

const wallet = new FileSystemWallet(walletPath);
const Vehicle = () => {};

Vehicle.createVehicle = (data, result) =>{

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
            const contract = await network.getContract('kendaraancontract');

            console.log('Submit kendaraan issue transaction.');
            const issueResponse = await contract.submitTransaction('create', data.srut, data.no_stnk, data.no_kendaraan, data.no_ktp, data.no_mesin, data.no_rangka, data.nama_pemilik, data.merk_pabrik, data.tipe_kendaraan, data.mulai_diperginakan, data.alamat_garasi, data.kategori_kendaraan, data.kategori_no_kendaraan);

            console.log('Process issue transaction response.'+issueResponse);
            let kendaraan = Kendaraan.fromBuffer(issueResponse);

<<<<<<< HEAD
            delete kendaraan.class
            delete kendaraan.key
            delete kendaraan.currentState
=======
        console.log(kendaraan);

    } catch (error) {
>>>>>>> update contract kendaraan

            result(null, {'data' : kendaraan});

            console.log(`${kendaraan.srut} kendaraan : ${kendaraan.no_kendaraan} successfully issued for value ${kendaraan.no_ktp}`);
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
}

module.exports = Vehicle;