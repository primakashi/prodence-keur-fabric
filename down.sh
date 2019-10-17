cd basic-network
./stop.sh
./teardown.sh
docker kill $(docker ps -q)
./teardown.sh