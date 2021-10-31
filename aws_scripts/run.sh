#!/bin/bash
cd /home/ubuntu/applications/car_sharing || exit
docker-compose build --no-cache
docker-compose up -d