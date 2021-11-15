#!/bin/bash
sudo service docker start
docker container prune -f
docker image prune -f