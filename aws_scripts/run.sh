#!/bin/bash
cd /home/ubuntu/my_services || exit
docker-compose build --no-cache
docker-compose up -d