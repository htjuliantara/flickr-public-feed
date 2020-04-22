docker rmi $(docker images -f "dangling=true" -q)
cat ./password.txt | docker login --username htjuliantara --password-stdin
docker-compose pull
docker-compose up -d