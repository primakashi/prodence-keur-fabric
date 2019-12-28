# docker exec prodence peer chaincode install -n kendaraancontract -v 0 -p /opt/gopath/src/github.com/contract/kendaraan -l node
# docker exec prodence peer chaincode instantiate -n kendaraancontract -v 0 -l node -c '{"Args":["org.prodence.kendaraan:instantiate"]}' -C mychannel -P "AND ('Org1MSP.member')"

# docker exec prodence peer chaincode install -n permohonancontract -v 0 -p /opt/gopath/src/github.com/contract/permohonan -l node
# docker exec prodence peer chaincode instantiate -n permohonancontract -v 0 -l node -c '{"Args":["org.prodence.permohonan:instantiate"]}' -C mychannel -P "AND ('Org1MSP.member')"

# docker exec prodence peer chaincode install -n peralatancontract -v 0 -p /opt/gopath/src/github.com/contract/peralatan -l node
# docker exec prodence peer chaincode instantiate -n peralatancontract -v 0 -l node -c '{"Args":["org.prodence.peralatan:instantiate"]}' -C mychannel -P "AND ('Org1MSP.member')"

# docker exec prodence peer chaincode install -n penerangancontract -v 0 -p /opt/gopath/src/github.com/contract/penerangan -l node
# docker exec prodence peer chaincode instantiate -n penerangancontract -v 0 -l node -c '{"Args":["org.prodence.penerangan:instantiate"]}' -C mychannel -P "AND ('Org1MSP.member')"

# docker exec prodence peer chaincode install -n pembayarancontract -v 0 -p /opt/gopath/src/github.com/contract/pembayaran -l node
# docker exec prodence peer chaincode instantiate -n pembayarancontract -v 0 -l node -c '{"Args":["org.prodence.pembayaran:instantiate"]}' -C mychannel -P "AND ('Org1MSP.member')"

# docker exec prodence peer chaincode install -n tirerimcontract -v 0 -p /opt/gopath/src/github.com/contract/tirerim -l node
# docker exec prodence peer chaincode instantiate -n tirerimcontract -v 0 -l node -c '{"Args":["org.prodence.tirerim:instantiate"]}' -C mychannel -P "AND ('Org1MSP.member')"

# docker exec prodence peer chaincode install -n bodyframecontract -v 0 -p /opt/gopath/src/github.com/contract/bodyframe -l node
# docker exec prodence peer chaincode instantiate -n bodyframecontract -v 0 -l node -c '{"Args":["org.prodence.bodyframe:instantiate"]}' -C mychannel -P "AND ('Org1MSP.member')"

# docker exec prodence peer chaincode install -n suspensioncontract -v 0 -p /opt/gopath/src/github.com/contract/suspension -l node
# docker exec prodence peer chaincode instantiate -n suspensioncontract -v 0 -l node -c '{"Args":["org.prodence.suspension:instantiate"]}' -C mychannel -P "AND ('Org1MSP.member')"

# docker exec prodence peer chaincode install -n othercontract -v 0 -p /opt/gopath/src/github.com/contract/other -l node
# docker exec prodence peer chaincode instantiate -n othercontract -v 0 -l node -c '{"Args":["org.prodence.other:instantiate"]}' -C mychannel -P "AND ('Org1MSP.member')"

# docker exec prodence peer chaincode install -n mesin_transmisicontract -v 0 -p /opt/gopath/src/github.com/contract/mesin_transmisi -l node
# docker exec prodence peer chaincode instantiate -n mesin_transmisicontract -v 0 -l node -c '{"Args":["org.prodence.mesin_transmisi:instantiate"]}' -C mychannel -P "AND ('Org1MSP.member')"

# docker exec prodence peer chaincode install -n sistem_remcontract -v 0 -p /opt/gopath/src/github.com/contract/sistem_rem -l node
# docker exec prodence peer chaincode instantiate -n sistem_remcontract -v 0 -l node -c '{"Args":["org.prodence.sistem_rem:instantiate"]}' -C mychannel -P "AND ('Org1MSP.member')"

docker exec prodence peer chaincode install -n uji_kelayakancontract -v 0 -p /opt/gopath/src/github.com/contract/uji_kelayakan -l node
docker exec prodence peer chaincode instantiate -n uji_kelayakancontract -v 0 -l node -c '{"Args":["org.prodence.uji_kelayakan:instantiate"]}' -C mychannel -P "AND ('Org1MSP.member')"