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

docker exec prodence peer chaincode install -n othercontract -v 0 -p /opt/gopath/src/github.com/contract/other -l node
docker exec prodence peer chaincode instantiate -n othercontract -v 0 -l node -c '{"Args":["org.prodence.other:instantiate"]}' -C mychannel -P "AND ('Org1MSP.member')"