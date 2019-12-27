'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const convert = require('../../../backend/helper');
const Sistem_rem = require('../contract/sistem_rem/lib/sistem_rem.js');
const path = require('path');
let yamlPath =  path.resolve(__dirname,'../gateway/networkConnection.yaml');
let walletPath =  path.resolve(__dirname,'../identity/user/adminkeur/wallet');

const wallet = new FileSystemWallet(walletPath);
// const PosSistem_rem = () => {};

// PosSistem_rem.createSistem_rem = (data, result) =>{

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
        const contract = await network.getContract('sistem_remcontract');
        const issueResponse = await contract.submitTransaction('create', '1314325', 'AD3435FE', 'baik', 'baik', 'baik', 'baik', 'baik', 'baik', 'baik', 'baik', 'baik', 'baik', 'baik', 'baik', 'baik', 'baik', 'baik', 'baik', 'baik', 'baik', 'baik', 'baik', 'false', 'baik', 'baik', 'lulus');
        let sistem_rem = Sistem_rem.fromBuffer(issueResponse);

        delete sistem_rem.class;
        delete sistem_rem.key;
        delete sistem_rem.currentState;

        sistem_rem.pedal_rem = convert.convertToBool(sistem_rem.pedal_rem);
        sistem_rem.speling_pedal = convert.convertToBool(sistem_rem.speling_pedal);
        sistem_rem.kebocoran_kelemahan = convert.convertToBool(sistem_rem.kebocoran_kelemahan);
        sistem_rem.sambungan_tuas_kabel = convert.convertToBool(sistem_rem.sambungan_tuas_kabel);
        sistem_rem.pipa_selang = convert.convertToBool(sistem_rem.pipa_selang);
        sistem_rem.silinder_katup = convert.convertToBool(sistem_rem.silinder_katup);
        sistem_rem.terombol_cakram = convert.convertToBool(sistem_rem.terombol_cakram);
        sistem_rem.porode = convert.convertToBool(sistem_rem.porode);
        sistem_rem.sistem_vakum_fungsi = convert.convertToBool(sistem_rem.sistem_vakum_fungsi);
        sistem_rem.sistem_vakum_kebocoran = convert.convertToBool(sistem_rem.sistem_vakum_kebocoran);
        sistem_rem.sistem_vakum_pengisian = convert.convertToBool(sistem_rem.sistem_vakum_pengisian);
        sistem_rem.sistem_vakum_penggerak_rem = convert.convertToBool(sistem_rem.sistem_vakum_penggerak_rem);
        sistem_rem.sistem_vakum_pengisisan_kereta_gandengan = convert.convertToBool(sistem_rem.sistem_vakum_pengisisan_kereta_gandengan);
        sistem_rem.sistem_vakum_tekanan_angin = convert.convertToBool(sistem_rem.sistem_vakum_tekanan_angin);
        sistem_rem.rem_parkir_tuas_tangan = convert.convertToBool(sistem_rem.rem_parkir_tuas_tangan);
        sistem_rem.rem_parkir_speling_tuas = convert.convertToBool(sistem_rem.rem_parkir_speling_tuas);
        sistem_rem.rem_parkir_kebocoran = convert.convertToBool(sistem_rem.rem_parkir_kebocoran);
        sistem_rem.rem_parkir_sambungan_tuas_kabel = convert.convertToBool(sistem_rem.rem_parkir_sambungan_tuas_kabel);
        sistem_rem.sistem_rem_gas_buang = convert.convertToBool(sistem_rem.sistem_rem_gas_buang);
        sistem_rem.efisiensi_rem_utama = convert.convertToBool(sistem_rem.efisiensi_rem_utama);
        sistem_rem.efisiensi_rem_perbedaan_depan = convert.convertToBool(sistem_rem.efisiensi_rem_perbedaan_depan);
        sistem_rem.efisiensi_rem_perbedaan_belakang = convert.convertToBool(sistem_rem.efisiensi_rem_perbedaan_belakang);
        sistem_rem.efisiensi_rem_parkir = convert.convertToBool(sistem_rem.efisiensi_rem_parkir);

        // result(null, {data : sistem_rem});

        console.log(sistem_rem);

    } catch (error) {

        // result(true, null);

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
    // result(true, null);

    console.log('Issue program exception.');
    console.log(e);
    console.log(e.stack);
    process.exit(-1);

});
// };

// module.exports = PosSistem_rem;