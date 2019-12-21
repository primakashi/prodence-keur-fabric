# docker exec rodence peer chaincode instantiate -n pprodence peer chaincode install -n papercontract -v 0 -p /opt/gopath/src/github.com/contract/paper -l node
# docker exec papercontract -v 0 -l node -c '{"Args":["org.papernet.commercialpaper:instantiate"]}' -C mychannel -P "AND ('Org1MSP.member')"

# docker exec prodence peer chaincode install -n kendaraancontract -v 0 -p /opt/gopath/src/github.com/contract/kendaraan -l node
# docker exec prodence peer chaincode instantiate -n kendaraancontract -v 0 -l node -c '{"Args":["org.prodence.kendaraan:instantiate"]}' -C mychannel -P "AND ('Org1MSP.member')"

# docker exec prodence peer chaincode install -n permohonancontract -v 0 -p /opt/gopath/src/github.com/contract/permohonan -l node
# docker exec prodence peer chaincode instantiate -n permohonancontract -v 0 -l node -c '{"Args":["org.prodence.permohonan:instantiate"]}' -C mychannel -P "AND ('Org1MSP.member')"

docker exec prodence peer chaincode install -n peralatancontract -v 0 -p /opt/gopath/src/github.com/contract/peralatan -l node
docker exec prodence peer chaincode instantiate -n peralatancontract -v 0 -l node -c '{"Args":["org.prodence.peralatan:instantiate"]}' -C mychannel -P "AND ('Org1MSP.member')"