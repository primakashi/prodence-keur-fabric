cd basic-network
./stop.sh
docker kill $(docker ps -q)
./teardown.sh